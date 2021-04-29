window.onload = function () {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const getProfileButton = document.querySelector("#getProfile")
  const iss_field = document.querySelector("#iss")
  const sub_field = document.querySelector("#sub")
  const aud_field = document.querySelector("#aud")
  const exp_field = document.querySelector("#exp")
  const iat_field = document.querySelector("#iat")
  const authTime_field = document.querySelector("#authTime")
  const nonce_field = document.querySelector("#nonce")
  const amr_field = document.querySelector("#amr")
  const name_field = document.querySelector("#name")
  const picture_field = document.querySelector("#picture")
  const email_field = document.querySelector("#email")
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
          iss_field.append(data.iss)
          sub_field.append(data.sub)
          aud_field.append(data.aud)
          exp_field.append(data.exp)
          iat_field.append(data.iat)
          authTime_field.append(data.auth_time)
          nonce_field.append(data.nonce)
          amr_field.append(data.amr)
          name_field.append(data.name)
          picture_field.append(data.picture)
          email_field.append(data.email)
        })

    })
}
