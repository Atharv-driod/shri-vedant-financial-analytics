USE retail_financial_analytics;

-- Query 7A: Inventory by product
SELECT
    product_id, product_name, category,
    opening_stock, total_purchased, total_sold,
    closing_stock, inventory_value, stock_status
FROM products
ORDER BY closing_stock ASC;

-- Query 7B: Inventory KPIs
SELECT
    COUNT(*) AS total_products,
    SUM(closing_stock) AS total_stock_units,
    ROUND(SUM(inventory_value), 2) AS total_inventory_value,
    SUM(CASE WHEN stock_status = 'Low Stock' THEN 1 ELSE 0 END)
        AS low_stock_products
FROM products;

-- Query 8: Payment mode analysis
SELECT
    payment_mode,
    COUNT(*) AS total_transactions,
    SUM(quantity) AS total_units_sold,
    ROUND(SUM(quantity * unit_selling_price *
        (1 - discount_percent / 100)), 2) AS total_revenue,
    ROUND(AVG(quantity * unit_selling_price *
        (1 - discount_percent / 100)), 2) AS average_transaction_value
FROM sales
GROUP BY payment_mode
ORDER BY total_revenue DESC;
