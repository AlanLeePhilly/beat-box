Rails.application.routes.draw do
  root                            to: 'welcome#index'
  get 'auth/:provider/callback',  to: 'sessions#create'
  get 'logout',                   to: 'sessions#destroy'

  get '/sync_repo/:id', to: 'samples#sync_repo', as: :sync_repo
  get '/stream/:id', to: 'samples#stream', as: :stream



  # namespace :api do
  #   namespace :v1 do
  #     resources :samples
  #   end
  # end

  resources :samples
  resources :settings, except: [:show, :new, :edit]
end
