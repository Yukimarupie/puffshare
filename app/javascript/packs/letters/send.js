// 'use strict';

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
          .then(response => response.json())//これはfetchの鉄板文。このJSON変換？処理を挟まないと、 Promiseで返ってきたresponseの中身がわからないが、これのおかげで何が入ってるか見れる。JSONは直接JSで使えないため、JSON.parse();する必要があるが、このresponse.json()で自動パースできる
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

  const postFormElm = document.querySelector('#form')
  postFormElm.addEventListener('ajax:success', (event) => {
    // ここでshared target pickerを呼び出す
    const redirectUrl = `https://google.com`
    // const redirectUrl = 'https://liff.line.me/1655861824-xLoVRAkl/login?token=${event.detail[0].token}'
    liff.shareTargetPicker([
      message = {
        "type": "template",
        "altText": "あなた宛にお手紙が届いています",
        "template": {
          "thumbnailImageUrl": "https://user-images.githubusercontent.com/64563988/117742992-dff5a180-b240-11eb-894c-b94c7c2b2d47.png",
          "type": "buttons",
          "title": "幸せの青い鳥がお手紙を届けてくれたよ！",
          "text": "さっそく読んでみよう〜",
          "actions": [
            {
              "type": "uri",
              "label": "ここをクリック☺︎👆",
              "uri": redirectUrl
            }
          ]
        }
      }
    ]).then((response) => {
      if (response) {
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

  // const DomFormContents = document.querySelector('#form');
  // DomFormContents.addEventListener('ajax:success', (event) => {
  //   // console.log(event);
  //   // ここでshared target pickerを呼び出す
  //   // const redirectUrl = 'https://liff.line.me/1655861824-xLoVRAkl/login?token=${event.detail[0].token}'
  //   const redirectUrl = 'https://google.com'
  //   if (liff.isApiAvailable('shareTargetPicker')) {
  //     liff.shareTargetPicker([
  //       message = {
  //         "type": "template",
  //         "altText": 'あなた宛のお手紙が届いてます！',
  //         "template": {
  //           "thumbnailImageUrl": "https://user-images.githubusercontent.com/64563988/117742992-dff5a180-b240-11eb-894c-b94c7c2b2d47.png",
  //           "type": "buttons",
  //           "title": "幸せの青い鳥がお手紙を届けてくれたよ！",
  //           "text": "さっそく読んでみよう〜",
  //           "actions": [
  //             {
  //               "type": "uri",
  //               "label": "ここをクリックしてね☺︎",
  //               "uri": redirectUrl
  //             }
  //           ]
  //         }
  //       }
  //     ])
  //     // .then(() => {
  //     //   liff.closeWindow();
  //     // })
  //     //   .then(() => {
  //     //     alert('お手紙が送信できました！')
  //     //   })
  //     //   .catch(() => {
  //     //     alert("送信に失敗しました…")
  //     //   });
  //   }
  // })



})


  // document.getElementById('send').addEventListener('click', send);
  // function send() {
  //   const redirectUrl = 'https://google.comhttps://liff.line.me/1655861824-xLoVRAkl/login?token=${event.detail[0].token}'
  //   if (liff.isApiAvailable('shareTargetPicker')) {
  //     liff.shareTargetPicker([
  //       message = {
  //         "type": "template",
  //         "altText": 'あなた宛のお手紙が届いてます！',
  //         "template": {
  //           "thumbnailImageUrl": "https://user-images.githubusercontent.com/64563988/117566498-d6115880-b0f1-11eb-8fa2-236d6f05c6ae.png",
  //           "type": "buttons",
  //           "title": "幸せの青い鳥からお手紙が届きました！",
  //           "text": "早速読んでみよう〜",
  //           "actions": [
  //             {
  //               "type": "uri",
  //               "label": "ここをクリックしてね☺︎",
  //               "uri": redirectUrl
  //             }
  //           ]
  //         }
  //       }
  //     ]).then(() => {
  //       liff.closeWindow();
  //     })
  //       .then(() => {
  //         alert('お手紙が送信できました！')
  //       })
  //       .catch(() => {
  //         alert("送信に失敗しました…")
  //       });
  //   }
  // }
