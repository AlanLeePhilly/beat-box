class CreatePatterns < ActiveRecord::Migration[5.1]
  def change
    create_table :patterns do |t|
      t.belongs_to :user
      t.string :name, null: false
      t.integer :grid, array: true, null: false
      t.string :device, null: false
      
      t.timestamps
    end
  end
end
