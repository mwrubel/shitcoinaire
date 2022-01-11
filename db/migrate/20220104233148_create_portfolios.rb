class CreatePortfolios < ActiveRecord::Migration[6.1]
  def change
    create_table :portfolios do |t|
      t.string :cash_balance
      t.integer :user_id

      t.timestamps
    end
  end
end
