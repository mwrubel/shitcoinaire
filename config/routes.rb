Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/portfolio', to: 'portfolios#show'
  post '/portfolio', to: 'portfolios#create'
  get '/portfolios', to: 'portfolios#show_all'

  resources :portfolios, :positions, :coins

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
