document.addEventListener('DOMContentLoaded', () => {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // 他のメソッドを実行できるようになるために初期化
  liff.init({
    liffId: "1655861824-xLoVRAkl"
  })
    // ログイン処理
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    })
    // try..catch構文の応用。
    .catch((err) => {
      console.log(err.code, err.message);
    })
    // idTokenからユーザーIDを取得し、userテーブルに保存する処理
    .then(() => {
      const idToken = liff.getIDToken()
      const body = `idToken=${idToken}` //ここでbodyにidTokenを入れ込んで
      const request = new Request('/users', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-CSRF-Token': token
        },
        method: 'POST',
        body: body //ここで格納してRailsのusersコントローラに投げる
      });

      // liff.getIDToken()で取得したIDTokenの情報をfetchメソッドを使ってRailsに渡す
      fetch(request)
        .then(response => response.json())
        .then(data => {
          console.log(data)

          //プロフィール情報を取得し、HTMLに投げる。
          liff.getProfile()
            .then(profile => {
              // liffのインスタンスでLINEの表示名とアイコンを取得して変数に格納
              const name = profile.displayName;
              const icon = profile.pictureUrl;

              // 【USER NAME】-js-user-nameというクラス・idを持ったHTML要素を取得し、getDomPに格納
              const DomP = document.getElementById('-js-user-name');
              // 【USER NAME】innerHTMLでpElement2に格納されたp要素の中に、指定テキストを入れ込む
              DomP.innerHTML = `こんにちは${name}さん`;

              const DomImg = document.getElementsByClassName("-js-user-icon");
              DomImg.src = `${icon}`;

            })
        })

    })

})
