'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 他のメソッドを実行できるよう初期化
  liff.init({
    liffId: '1655861824-xLoVRAkl' //process.env.LIFF_ID
  })
    // ログイン処理
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
      else {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const idToken = liff.getIDToken()
        const bodyInIdToken = `idToken=${idToken}` //ここでbodyにidTokenを入れ込んで
        // console.log(body)
        const request = new Request('/users', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-CSRF-Token': token
          },
          method: 'POST',
          body: bodyInIdToken //ここで格納してRailsのusersコントローラに投げる
        });
        // console.log(request);
        // liff.getIDToken()で取得したIDTokenの情報をfetchメソッドを使ってRailsに渡す
        fetch(request)
          .then(response => response.json())//これはfetchの鉄板文。このJSON変換？処理を挟まないと、 Promiseで返ってきたresponseの中身がわからないが、これのおかげで何が入ってるか見れる。大前提: JSONは直接JSで使えないため、JSON.parse();する必要があるが、このresponse.json()では自動でパースできる
          .then(data => {
            console.log(data)
            //プロフィール情報を取得し、HTMLに表示させる為の処理
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
})

