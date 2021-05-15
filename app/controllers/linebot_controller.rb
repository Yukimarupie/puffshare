class LinebotController < ApplicationController
    require 'line/bot'
    
    #Line Botの処理のみ実施するようなアプリの場合はCSRF攻撃のリスクはほぼない。のでCSRF対策を無効化するコードを記述
    protect_from_forgery except: [:callback]
    
    def callback
        #LINEで送られてきたデータを取得する
        body = request.body.read
        # 悪意のあるサーバーからのリクエストを受信しないよう、署名を検証する
        signature = request.env['HTTP_X_LINE_SIGNATURE']
        unless client.validate_signature(body, signature)
        return head :bad_request
        end

        events = client.parse_events_from(body)
    
        events.each do |event|
        case event
            when Line::Bot::Event::Message
                case event.type
                when Line::Bot::Event::MessageType::Text
                    if event.message['text'].include?('使い方')
                        client.reply_message(
                            event['replyToken'],
                            {
                            type: 'flex',
                            altText: 'LINEアプリ『ぱふシェア』の使い方の説明です。',
                            contents:
                            {
                              "type": "carousel",
                              "contents": [
                                {
                                  "type": "bubble",
                                  "size": "micro",
                                  "hero": {
                                    "type": "image",
                                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip10.jpg",
                                    "size": "full",
                                    "aspectMode": "cover"
                                  }
                                },
                                {
                                  "type": "bubble",
                                  "size": "micro",
                                  "hero": {
                                    "type": "image",
                                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip11.jpg",
                                    "size": "full",
                                    "aspectMode": "cover"
                                  }
                                },
                                {
                                  "type": "bubble",
                                  "size": "micro",
                                  "hero": {
                                    "type": "image",
                                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg",
                                    "size": "full",
                                    "aspectMode": "cover"
                                  }
                                }
                              ]
                            }
                            }
                          )

                        else client.reply_message(
                        event['replyToken'],
                        {
                          type: 'text',
                          text: 'メッセージありがとうございます:))'
                        }
                      )
                    end
                end
            end
        end
        # 返信に成功した場合のステータスコード200を返すokを指定
        head :ok
    end
    
    private
    # クラス外からはアクセスできないことを表すアクセス修子privateで定義でok
    def client
        @client ||= Line::Bot::Client.new { |config|
        # ||=は左辺がnilやfalseの場合、右辺を代入するという意味
        config.channel_secret = ENV["LINE_CHANNEL_SECRET"]
        config.channel_token = ENV["LINE_CHANNEL_TOKEN"]
        }
    end

    def send_response
      message = {
        "type": "text",
        "text": "お手紙が送信できました！"
      }
      client = Line::Bot::Client.new { |config|
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
      }
      response = client.push_message(User.find(session[:user_id]).line_user_id, message)
      p response
    end
    
end
