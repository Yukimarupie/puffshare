class CreateLetters < ActiveRecord::Migration[6.1]
  def change
    create_table :letters do |t|
      t.string :send_by, null: false
      t.string :send_to, null: false
      t.text :discription, null: false
      t.datetime :create_date, null: false
      t.string :api_status, defalut: 'success'

      t.timestamps
    end
  end
end
