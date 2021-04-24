class AddIdToLetters < ActiveRecord::Migration[6.1]
  def change
    add_column :letters, :id, :string, null: false
  end
end
