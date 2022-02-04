require 'pry'

class PortfoliosController < ApplicationController
    #Portfolio belongs to user, has many positions
    before_action :authorize 

    def show_all
        users = User.all
        if users
            render json: users.portfolio
        else
            render json: { error: "NOT FOUND" }, status: :unauthorized
        end
    end

    def create
        portfolio = current_user.create_portfolio(portfolio_params)
        if portfolio.valid?
            render json: portfolio
        else 
            render json: { errors: portfolio.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        portfolio = current_user.portfolio
        if portfolio
            render json: portfolio
        else
            render json: { error: "NOT FOUND" }, status: :unauthorized
        end
    end

    def update
        portfolio = current_user.portfolio
        if portfolio
            portfolio.update(portfolio_params)
        else
            #byebug
            render json: { error: "COULDN'T UPDATE" }, status: :unauthorized
        end
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def portfolio_params
        params.permit(:id, :cash_balance)
    end

    def authorize
        return render json: {error: "NOT AUTHORIZED"}, status: :unauthorized unless session.include? :user_id
    end
end
