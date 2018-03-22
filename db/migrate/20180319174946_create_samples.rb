class CreateSamples < ActiveRecord::Migration[5.1]
  def change
    create_table :samples do |t|
      t.string :kit_name, null: false
      t.string :drum_name, null: false
      t.string :url, null: false
    end
  end
end
