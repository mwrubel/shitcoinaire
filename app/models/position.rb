class Position < ApplicationRecord
    #Position belongs to  portfolio, has many coins
    belongs_to :portfolio
    has_many :coins
end
