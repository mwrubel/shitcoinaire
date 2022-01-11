class User < ApplicationRecord
    has_secure_password
    validates :username, :password, :password_confirmation, presence: true #, uniqueness: { scope: :username}

    has_one :portfolio
    has_many :coins, through: :positions
end
