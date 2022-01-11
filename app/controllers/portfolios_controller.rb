class PortfoliosController < ApplicationController
    before_action :authorize 

    def create
        portfolio = current_user.portfolio.create(portfolio_params)
        if portfolio.valid?
            render json: portfolio
        else 
            render json: { errors: portfolio.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        portfolio = current_user.portfolio#.find_by(id: params[:id]) 
        if portfolio
            render json: portfolio
        else
            render json: { error: "NOT FOUND" }, status: :unauthorized
            portfolio.create(cash_balance: 100000)
        end
    end

    def update
        portfolio = current_user.portfolio#.find_by(id: params[:id]) 
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
