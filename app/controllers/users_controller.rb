class UsersController < ApplicationController

  require 'net/http'
  require 'uri'
  
  def create
    idToken = params[:idToken]
    channelId = ENV['LINE_CHANNEL_IF']
    res = Net::HTTP.post_form(URI.parse('https://api.line.me/oauth2/v2.1/verify'),
                          {'id_token'=>idToken, 'client_id'=>channelId})
    render :json => res.body
  end
end
