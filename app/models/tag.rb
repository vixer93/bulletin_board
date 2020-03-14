class Tag < ApplicationRecord
  has_many :group_tag_relations
  has_many :groups, through: :group_tag_relations

  validates :name, presence: true
end
