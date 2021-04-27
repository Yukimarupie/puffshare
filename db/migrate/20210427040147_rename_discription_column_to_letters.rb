class RenameDiscriptionColumnToLetters < ActiveRecord::Migration[6.1]
  def change
    rename_column :letters, :discription, :description
    remove_column :letters, :create_date, :datetime
  end
end
