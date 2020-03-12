Rails.application.routes.draw do
  devise_for :users
  root to: 'threads#index'
end
