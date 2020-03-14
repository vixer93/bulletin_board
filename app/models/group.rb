class Group < ApplicationRecord
  belongs_to :user
  has_many :responses

  validates :title, presence: true
end
