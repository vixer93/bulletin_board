Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'users/registrations',
                                   sessions: 'users/sessions'}
  get 'users/current'

  resources :groups, only: [:index, :create, :show] do
    get :info, on: :collection
    resources :responses, only: [:index, :create]
  end


  root to: 'groups#index'
end
