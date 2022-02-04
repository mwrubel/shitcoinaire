require 'pry'
class PositionsController < ApplicationController
    #Position belongs to  portfolio, has many coins
    before_action :authorize 

    def index
        positions = current_user.positions
        render json: positions
    end

    def create
        #pararams will include either coin_id or coin_attributes
        portfolio = current_user.portfolio
        position = portfolio.positions.create(positions_params)
        if position.valid?
            render json: position
        else 
            render json: { errors: position.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        position = current_user.positions.find_by(id: params[:id]) 
        if position
            render json: position
        else
            render json: { error: "NOT FOUND" }, status: :unauthorized
        end
    end

    def destroy
        position = current_user.positions.find_by(id: params[:id]) 
        if position
            position.destroy
            head :no_content
        else
            render json: { error: "COULDNT FIND POSITION TO DELETE" }
        end
    end

    def update
        position = current_user.positions.find_by(id: params[:id]) 
        if position
            position.update(positions_params)
        else
            #byebug
            render json: { error: "COULDN'T UPDATE" }, status: :unauthorized
        end
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def positions_params
        params.require(:position).permit(:id, :quantity, :cost_basis, :coin_id, coin_attributes: [name: params[:name], ticker: params[:ticker], image: params[:image], description: params[:description]])
    end

    def authorize
        return render json: {error: "NOT AUTHORIZED"}, status: :unauthorized unless session.include? :user_id
    end
end
