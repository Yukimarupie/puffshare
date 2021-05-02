window.onload = function () {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const getProfileButton = document.querySelector("#getProfile")
  const sub_field = document.querySelector("#sub")
  const name_field = document.querySelector("#name")
  const picture_field = document.querySelector("#picture")

  // とりあえず。HTMLにpタグを入れ込むための変数
  const divPage = document.getElementById('liff-page');
  // p要素の取得
  const pElement = document.getElementById('liff-message');
  divPage.appendChild(pElement);

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
    .catch((err) => {
      console.log(err.code, err.message);
    })
    // idTokenからユーザーIDを取得し、userテーブルに保存する処理
    .then(() => {
      const idToken = liff.getIDToken()
      const body = `idToken=${idToken}`
      const request = new Request('/users', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-CSRF-Token': token
        },
        method: 'POST',
        body: body
      });
      // liff.getIDToken()で取得したIDTokenの情報をfetchメソッドを使ってRailsに渡す
      fetch(request)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          // alert(data.name)
          // sub_field.append(data.sub)
          // name_field.append(data.name)
          // picture_field.append(data.picture)

          //プロフィール情報の取得
          liff.getProfile()
            .then(profile => {
              const name = profile.displayName;
              const lineId = profile.userId;
              const pElement2 = document.createElement('p');
              pElement2.innerHTML = `あなたの名前は${name}です。`;
              divPage.appendChild(pElement2);
            })
        })

    })

}
