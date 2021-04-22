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
                              "type": "carousel",
                              "contents": [
                                {
                                  "type": "bubble",
                                  "size": "nano",
                                  "header": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "In Progress",
                                        "color": "#ffffff",
                                        "align": "start",
                                        "size": "md",
                                        "gravity": "center"
                                      },
                                      {
                                        "type": "text",
                                        "text": "70%",
                                        "color": "#ffffff",
                                        "align": "start",
                                        "size": "xs",
                                        "gravity": "center",
                                        "margin": "lg"
                                      },
                                      {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                          {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                              {
                                                "type": "filler"
                                              }
                                            ],
                                            "width": "70%",
                                            "backgroundColor": "#0D8186",
                                            "height": "6px"
                                          }
                                        ],
                                        "backgroundColor": "#9FD8E36E",
                                        "height": "6px",
                                        "margin": "sm"
                                      }
                                    ],
                                    "backgroundColor": "#27ACB2",
                                    "paddingTop": "19px",
                                    "paddingAll": "12px",
                                    "paddingBottom": "16px"
                                  },
                                  "body": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                      {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                          {
                                            "type": "text",
                                            "text": "Buy milk and lettuce before class",
                                            "color": "#8C8C8C",
                                            "size": "sm",
                                            "wrap": true
                                          }
                                        ],
                                        "flex": 1
                                      }
                                    ],
                                    "spacing": "md",
                                    "paddingAll": "12px"
                                  },
                                  "styles": {
                                    "footer": {
                                      "separator": false
                                    }
                                  }
                                },
                                {
                                  "type": "bubble",
                                  "size": "nano",
                                  "header": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "Pending",
                                        "color": "#ffffff",
                                        "align": "start",
                                        "size": "md",
                                        "gravity": "center"
                                      },
                                      {
                                        "type": "text",
                                        "text": "30%",
                                        "color": "#ffffff",
                                        "align": "start",
                                        "size": "xs",
                                        "gravity": "center",
                                        "margin": "lg"
                                      },
                                      {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                          {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                              {
                                                "type": "filler"
                                              }
                                            ],
                                            "width": "30%",
                                            "backgroundColor": "#DE5658",
                                            "height": "6px"
                                          }
                                        ],
                                        "backgroundColor": "#FAD2A76E",
                                        "height": "6px",
                                        "margin": "sm"
                                      }
                                    ],
                                    "backgroundColor": "#FF6B6E",
                                    "paddingTop": "19px",
                                    "paddingAll": "12px",
                                    "paddingBottom": "16px"
                                  },
                                  "body": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                      {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                          {
                                            "type": "text",
                                            "text": "Wash my car",
                                            "color": "#8C8C8C",
                                            "size": "sm",
                                            "wrap": true
                                          }
                                        ],
                                        "flex": 1
                                      }
                                    ],
                                    "spacing": "md",
                                    "paddingAll": "12px"
                                  },
                                  "styles": {
                                    "footer": {
                                      "separator": false
                                    }
                                  }
                                },
                                {
                                  "type": "bubble",
                                  "size": "nano",
                                  "header": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "In Progress",
                                        "color": "#ffffff",
                                        "align": "start",
                                        "size": "md",
                                        "gravity": "center"
                                      },
                                      {
                                        "type": "text",
                                        "text": "100%",
                                        "color": "#ffffff",
                                        "align": "start",
                                        "size": "xs",
                                        "gravity": "center",
                                        "margin": "lg"
                                      },
                                      {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                          {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                              {
                                                "type": "filler"
                                              }
                                            ],
                                            "width": "100%",
                                            "backgroundColor": "#7D51E4",
                                            "height": "6px"
                                          }
                                        ],
                                        "backgroundColor": "#9FD8E36E",
                                        "height": "6px",
                                        "margin": "sm"
                                      }
                                    ],
                                    "backgroundColor": "#A17DF5",
                                    "paddingTop": "19px",
                                    "paddingAll": "12px",
                                    "paddingBottom": "16px"
                                  },
                                  "body": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                      {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                          {
                                            "type": "text",
                                            "text": "Buy milk and lettuce before class",
                                            "color": "#8C8C8C",
                                            "size": "sm",
                                            "wrap": true
                                          }
                                        ],
                                        "flex": 1
                                      }
                                    ],
                                    "spacing": "md",
                                    "paddingAll": "12px"
                                  },
                                  "styles": {
                                    "footer": {
                                      "separator": false
                                    }
                                  }
                                }
                              ]
                            }
                        )

                        else client.reply_message(
                        event['replyToken'],
                        {
                          type: 'text',
                          text: 'メッセージありがとうございます！'
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

    
end
