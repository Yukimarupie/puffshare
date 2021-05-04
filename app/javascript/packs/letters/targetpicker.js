// 参考: https://qiita.com/chuck0523/items/1868a4c04ab4d8cdfb23 cmd+F=CommonJS
//　別ファイルで呼び出したい時はこんな感じ？？↓　
document.addEventListener('DOMContentLoaded', () => {
  const liffModule = require('loginModule');
  const loginModuleInstance = new liffModule();
  console.log(loginModuleInstance); //ログイン処理とユーザー情報の表示の呼び出し

  // メッセージの送信
  $(function () {
    $('#send').click(function (e) {
      e.preventDefault();
      var val = $('#message').val();
      liff.shareTargetPicker([
        message = {
          "type": "template",
          "altText": "${name}さんからお手紙が届いています",
          "template": {
            "thumbnailImageUrl": "https://res.cloudinary.com/dr1peiwz2/image/upload/v1613642190/girl_ymjnoj.jpg",
            "type": "buttons",
            "title": "${name}さんからのお手紙",
            "text": "大好きなあなたとデートに行きたいです！",
            "actions": [
              {
                "type": "uri",
                "label": "お手紙を読みますか？",
                "uri": redirect_url
              }
            ]
          }
        }
      ])
        .then(
          alert("メッセージを送信しました")
        ).catch(function (res) {
          alert("送信に失敗しました")
        })
    });
  });
})
