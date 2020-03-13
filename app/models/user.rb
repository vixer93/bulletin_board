class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :groups

  validates :email, uniqueness: {case_sensitive: false},
                    format: {with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i}
end
