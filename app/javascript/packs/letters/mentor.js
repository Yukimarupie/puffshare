document.addEventListener('DOMContentLoaded', () => {
  // 他のメソッドを実行できるよう初期化
  liff.init({
    liffId: '1655861824-xLoVRAkl'
  })
    // ログイン処理
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const idToken = liff.getIDToken()
        const body = `idToken=${idToken}` //ここでbodyにidTokenを入れ込んで
        // console.log(body)
        const request = new Request('/users', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-CSRF-Token': token
          },
          method: 'POST',
          body: body //ここで格納してRailsのusersコントローラに投げる
        });
        // console.log(request);
        // liff.getIDToken()で取得したIDTokenの情報をfetchメソッドを使ってRailsに渡す
        fetch(request)
          .then(response => response.json())
          .then(data => {
            console.log(data)

            //プロフィール情報を取得し、HTMLに投げる為の処理
            liff.getProfile()
              .then(profile => {
                // liffのインスタンスでLINEの表示名とアイコンを取得して変数に格納
                const name = profile.displayName;
                const icon = profile.pictureUrl;

                // 【表示名】
                const getDomP = document.getElementById('-js-user-name'); // -js-user-nameというクラス・idを持ったHTML要素を取得し、getDomPに格納
                getDomP.innerHTML = `こんにちは${name}さん`; // innerHTMLでpElement2に格納されたp要素の中に、指定テキストを入れ込む

                //【アイコン】
                const DomImg = document.getElementsByClassName("-js-user-icon");
                DomImg[0].src = `${icon}`; //クラスで取得する際は、引数をつけてインデックスを指定してあげて入れ込む
              })
          })
      }
    })
  // function messageSend() {
  //   liff.init({
  //     liffId: '1655861824-xLoVRAkl'
  //   });
  //   if (!liff.isLoggedIn()) {
  //     liff.login();
  //   }
  //   alert(liff);
  //   alert('これはmessageSendの中身だよ');
  // }
  // if (liff.isApiAvailable('shareTargetPicker')) {
  //   liff.shareTargetPicker([
  //     {
  //       'type': 'text',
  //       'text': 'Hello, World!'
  //     }
  //   ])
  // }

  const postFormElm = document.querySelector('#form')
  postFormElm.addEventListener('ajax:success', (e) => {
    // ここでshared target pickerを呼び出す
    const redirect_url = `https://google.com`
    liff.shareTargetPicker([
      message = {
        "type": "template",
        "altText": "デートのおさそいが届いています",
        "template": {
          "thumbnailImageUrl": "https://res.cloudinary.com/dr1peiwz2/image/upload/v1613642190/girl_ymjnoj.jpg",
          "type": "buttons",
          "title": "デートのおさそい",
          "text": "大好きなあなたとデートに行きたいです！",
          "actions": [
            {
              "type": "uri",
              "label": "デートの詳細はここから確認してね！",
              "uri": redirect_url
            }
          ]
        }
      }
    ]).then((res) => {
      if (res) {
        // TargetPickerが送られたら
        liff.closeWindow();
      } else {
        // TargetPickerを送らずに閉じたら
        console.log('TargetPicker was closed!')
        liff.closeWindow();
      }
    })
      .then(() => {
        fetch('/message')
      })
      .catch(function (res) {
        alert("送信に失敗しました…")
      });
  })

  // document.getElementById('send').addEventListener('click', messageSend);

})
