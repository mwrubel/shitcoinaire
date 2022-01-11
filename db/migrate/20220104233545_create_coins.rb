class CreateCoins < ActiveRecord::Migration[6.1]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :ticker
      t.integer :cost
      t.integer :position_id

      t.timestamps
    end
  end
end
