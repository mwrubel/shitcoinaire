class Coin < ApplicationRecord
    #Coin belongs to many portfolios through positions,
    belongs_to :portfolio, through :positions
end
