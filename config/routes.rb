Rails.application.routes.draw do
  root                            to: 'welcome#index'
  get 'auth/:provider/callback',  to: 'sessions#create'
  get 'logout',                   to: 'sessions#destroy'


  namespace :api do
      namespace :v1 do
        resources :samples, only: [:index, :show] 
        resources :patterns, only: [:index, :show, :create] 
      end
    end
end
