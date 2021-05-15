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
  // document.getElementById('send').addEventListener('click', messageSend);
  // function messageSend() {
  //   //   liff.init({
  //   //     liffId: '1655861824-xLoVRAkl'
  //   //   });
  //   //   if (!liff.isLoggedIn()) {
  //   //     liff.login();
  //   //   }
  //   //   alert(liff);
  //   //   alert('これはmessageSendの中身だよ');
  //   // }
  //   if (liff.isApiAvailable('shareTargetPicker')) {
  //     liff.shareTargetPicker([
  //       {
  //         'type': 'text',
  //         'text': 'これはajax:successジャないよ'
  //       }
  //     ])
  //   }
  // }




  const postFormElm = document.querySelector('#form')
  // ajax:successはails-ujsのイベントハンドラ。つまりRailsの拡張イベント的な
  postFormElm.addEventListener('ajax:success', (event) => {
    // ここでshared target pickerを呼び出す
    // const redirectUrl = `https://google.com`
    const redirectUrl = 'https://liff.line.me/1655861824-xLoVRAkl/login?token=${event.detail[0].token}'
    liff.shareTargetPicker([
      message = {
        "type": "template",
        "altText": "mentor.jsのajax:successのほうだよ",
        "template": {
          "thumbnailImageUrl": "https://user-images.githubusercontent.com/64563988/117742992-dff5a180-b240-11eb-894c-b94c7c2b2d47.png",
          "type": "buttons",
          "title": "mentor.jsのajax:successのほうだよ",
          "text": "eをeventにしたよ",
          "actions": [
            {
              "type": "uri",
              "label": "デートの詳細はここから確認してね！",
              "uri": redirectUrl
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
        fetch('/letters')
      })
      .catch(function (res) {
        alert("送信に失敗しました…")
      });
  })



})
