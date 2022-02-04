class CreatePositions < ActiveRecord::Migration[6.1]
  def change
    create_table :positions do |t|
      t.integer :quantity
      t.integer :cost_basis
      t.integer :portfolio_id
      t.integer :coin_id

      t.timestamps
    end
  end
end
