USE retail_financial_analytics;

-- Verify expected row counts
SELECT 'products' AS table_name, COUNT(*) AS total_records FROM products
UNION ALL
SELECT 'purchases', COUNT(*) FROM purchases
UNION ALL
SELECT 'sales', COUNT(*) FROM sales
UNION ALL
SELECT 'expenses', COUNT(*) FROM expenses
UNION ALL
SELECT 'vendors', COUNT(*) FROM vendors;

-- Inspect source tables
SELECT * FROM products;
SELECT * FROM sales LIMIT 10;
SELECT * FROM purchases LIMIT 10;
SELECT * FROM expenses LIMIT 10;
SELECT * FROM vendors;
