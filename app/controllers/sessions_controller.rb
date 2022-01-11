class SessionsController < ApplicationController
    #login (create session)
    def create
        user = User.find_by(username: params[:username])
            if user && user.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user
            else
                render json: {error: "Invalid username/ password"}, status: :unauthorized
            end
    end
    
    #logout (destroy session)
    def destroy
        session.clear
     end
end
