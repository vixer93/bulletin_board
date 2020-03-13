Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'users/registrations',
                                   sessions: 'users/sessions'}
  get 'users/current'
  resources :groups, only: [:index, :create, :show] do
    get :info, on: :collection
  end
  root to: 'groups#index'
end
