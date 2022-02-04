class CreateCoins < ActiveRecord::Migration[6.1]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :ticker
      t.string :image
      t.string :description

      t.timestamps
    end
  end
end
