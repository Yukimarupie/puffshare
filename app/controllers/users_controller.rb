class UsersController < ApplicationController
  require 'net/http'
  require 'uri'
  
  def create
    idToken = params[:idToken]
    channelId = ENV['LINE_CHANNEL_ID']
    res = Net::HTTP.post_form(URI.parse('https://api.line.me/oauth2/v2.1/verify'),
                          {'id_token'=>idToken, 'client_id'=>channelId})           
    # JSON.parseメソッド=JSON形式で書かれた文字列をJSのJSONオブジェクトに変換し、JSの中でJSONのデータを自由に扱えるようにする。
    line_user_id = JSON.parse(res.body)["sub"]
    user = User.find_by(line_user_id: line_user_id)
    if user.nil?
      user = User.create(line_user_id: line_user_id)
      session[:user_id] = user.id
      render :json => user
    elsif user
      session[:user_id] = user.id
      render :json => user
    end
  end
end
