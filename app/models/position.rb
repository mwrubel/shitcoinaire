class Position < ApplicationRecord
    #Position belongs to  portfolio, has many coins
    #Position belongs to  portfolio, position belongs to coin


#     Nested Forms with accepts_nested_attributes:


# If joins table:
    belongs_to :portfolio
    belongs_to :coin
# Model:   belongs_to :coin
    accepts_nested_attributes_for :coin, reject_if: :all_blank

# Strong params:   :coin_id, coin_attributes: {}

    
end
