class Coin < ApplicationRecord
    #Coin has many positions, has many portfolios through positions
    has_many :positions
    has_many :portfolios, through: :positions
end
