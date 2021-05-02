Rails.application.routes.draw do
  resources :letters
  resources :users
  
  root 'letters#new'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/callback' => 'linebot#callback'
end
