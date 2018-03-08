Rails.application.routes.draw do
  root                            to: 'welcome#index'
  get 'auth/:provider/callback',  to: 'sessions#create'
  get 'logout',                   to: 'sessions#destroy'

end
