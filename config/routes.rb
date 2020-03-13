Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'users/registrations',
                                   sessions: 'users/sessions'}
  get 'users/current'
  resources :groups, only: [:index]
  root to: 'groups#index'
end
