class Group < ApplicationRecord
  belongs_to :user
  has_many :responses
  has_many :group_tag_relations
  has_many :tags, through: :group_tag_relations

  validates :title, presence: true
end
