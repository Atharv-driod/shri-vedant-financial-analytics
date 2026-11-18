-- Shri Vedant Pooja Bhandar - Retail Financial Analytics
-- Database setup. The tables below reflect the project schema used during import.
CREATE DATABASE IF NOT EXISTS retail_financial_analytics;
USE retail_financial_analytics;

-- Tables were populated from the project CSV files using MySQL Workbench.
-- Dates in sales, purchases and expenses were retained as VARCHAR during import
-- to preserve the source DD-MMM-YY / text format and avoid import conversion errors.
-- Products: product_id, product_name, category, selling_price, purchase_cost,
--           opening_stock, total_purchased, total_sold, closing_stock,
--           inventory_value, stock_status
-- Sales: sales_id, sale_date, customer_id, product_id, quantity,
--        unit_selling_price, discount_percent, payment_mode, unit_purchase_cost
-- Purchases: po_number, purchase_date, vendor_id, product_id,
--            quantity_purchased, unit_cost, payment_status, vendor_name,
--            product_name, purchase_value
-- Expenses: expense_id, expense_date, expense_category, amount, payment_mode
-- Vendors: vendor_id, vendor_name, city
