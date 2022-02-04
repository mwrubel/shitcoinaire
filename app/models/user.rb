class User < ApplicationRecord
    #User has one portfolio and has many positions through portfolio, has many coins through positions
    has_secure_password
    validates :username, :password, :password_confirmation, presence: true #, uniqueness: { scope: :username}

    has_one :portfolio
    has_many :positions, through: :portfolio
    has_many :coins, through: :positions
end
