class Portfolio < ApplicationRecord
    #Portfolio belongs to user, has many  positions
    #Portfolio belongs to user, has many positions, has many  coins through positions
    belongs_to :user
    has_many :positions
    has_many :coins, through: :positions
end
