class CoinsController < ApplicationController
    #Coin belongs to many portfolios through positions,
    before_action :authorize 

    def index
        coins = Coin.all
        render json: coins
    end

    def create
        coin = Coin.create(coins_params)
        if coin.valid?
            render json: coin
        else 
            render json: { errors: coin.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        coin = Coin.find_by(id: params[:id]) 
        if coin
            render json: coin
        else
            render json: { error: "NOT FOUND" }, status: :unauthorized
        end
    end

    def destroy
        coin = Coin.find_by(id: params[:id]) 
        if coin
            coin.destroy
            head :no_content
        else
            render json: { error: "COULDNT FIND POSITION TO DELETE" }
        end
    end

    def update
        coin = Coin.find_by(id: params[:id]) 
        if coin
            coin.update(coins_params)
        else
            #byebug
            render json: { error: "COULDN'T UPDATE" }, status: :unauthorized
        end
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def coins_params
        params.permit(:id, :name, :ticker, :image, :description)
    end

    def authorize
        return render json: {error: "NOT AUTHORIZED"}, status: :unauthorized unless session.include? :user_id
    end
end