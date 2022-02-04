class UsersController < ApplicationController
    #User has one portfolio and has many coins through positions
    
    #index route
    def index
        users = User.all   
        render json: users
    end

    #show route
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {error: "unauthorized"}, status: :unauthorized
        end
    end

    #create (signup)
    def create
        #create user
        user = User.create(user_params)
        #byebug
        if user.valid?
        #login user
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: user.errors.full_messages}, status: :unprocessable_entitiy
        end
    end

    private
    
    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
