class Response < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :responser, :content, presence: true
end
