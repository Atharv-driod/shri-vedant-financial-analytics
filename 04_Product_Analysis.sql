USE retail_financial_analytics;

-- Query 3: Product-wise revenue
SELECT
    p.product_id, p.product_name, p.category,
    SUM(s.quantity) AS units_sold,
    ROUND(SUM(s.quantity * s.unit_selling_price *
        (1 - s.discount_percent / 100)), 2) AS total_revenue
FROM sales s
JOIN products p ON s.product_id = p.product_id
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC;

-- Query 4: Product-wise gross profit
SELECT
    p.product_name,
    SUM(s.quantity) AS units_sold,
    ROUND(SUM(s.quantity * s.unit_selling_price *
        (1 - s.discount_percent / 100)), 2) AS total_revenue,
    ROUND(SUM(s.quantity * s.unit_purchase_cost), 2) AS total_cogs,
    ROUND(
        SUM(s.quantity * s.unit_selling_price *
            (1 - s.discount_percent / 100))
        - SUM(s.quantity * s.unit_purchase_cost), 2
    ) AS gross_profit
FROM sales s
JOIN products p ON s.product_id = p.product_id
GROUP BY p.product_name
ORDER BY gross_profit DESC;

-- Query 9: Products above average revenue per product (subquery)
SELECT product_name, total_revenue
FROM (
    SELECT
        p.product_name,
        SUM(s.quantity * s.unit_selling_price *
            (1 - s.discount_percent / 100)) AS total_revenue
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    GROUP BY p.product_name
) AS product_revenue
WHERE total_revenue > (
    SELECT AVG(product_total)
    FROM (
        SELECT
            SUM(quantity * unit_selling_price *
                (1 - discount_percent / 100)) AS product_total
        FROM sales
        GROUP BY product_id
    ) AS average_revenue
)
ORDER BY total_revenue DESC;
