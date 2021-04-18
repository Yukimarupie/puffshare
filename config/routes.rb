Rails.application.routes.draw do
  root 'landinpages#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/callback', to: 'linebot#callback'
end
