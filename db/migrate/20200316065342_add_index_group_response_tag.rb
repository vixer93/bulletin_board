class AddIndexGroupResponseTag < ActiveRecord::Migration[5.2]
  def change
    add_index :groups,    :title
    add_index :tags,      :name
  end
end
