class PositionsController < ApplicationController
    before_action :authorize 

    def index
        positions = current_user.positions
        render json: positions
    end

    def create
        position = current_user.positions.create(positions_params)
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
            trail.destroy
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
        params.permit(:id, :quantity, :cost_basis)
    end

    def authorize
        return render json: {error: "NOT AUTHORIZED"}, status: :unauthorized unless session.include? :user_id
    end
end
