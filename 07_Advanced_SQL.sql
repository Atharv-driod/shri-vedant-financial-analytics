USE retail_financial_analytics;

-- Query 10: CTE - monthly revenue
WITH monthly_sales AS (
    SELECT
        MONTH(STR_TO_DATE(sale_date, '%d-%b-%y')) AS month_number,
        DATE_FORMAT(STR_TO_DATE(sale_date, '%d-%b-%y'), '%M') AS month_name,
        SUM(quantity * unit_selling_price *
            (1 - discount_percent / 100)) AS revenue
    FROM sales
    GROUP BY month_number, month_name
)
SELECT month_name, ROUND(revenue, 2) AS monthly_revenue
FROM monthly_sales
ORDER BY month_number;

-- Query 11: CTE - product profitability
WITH product_profit AS (
    SELECT
        p.product_id, p.product_name,
        SUM(s.quantity * s.unit_selling_price *
            (1 - s.discount_percent / 100)) AS revenue,
        SUM(s.quantity * s.unit_purchase_cost) AS cogs
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    GROUP BY p.product_id, p.product_name
)
SELECT
    product_name,
    ROUND(revenue, 2) AS revenue,
    ROUND(cogs, 2) AS cogs,
    ROUND(revenue - cogs, 2) AS gross_profit,
    ROUND((revenue - cogs) / NULLIF(revenue, 0) * 100, 2) AS gross_margin
FROM product_profit
ORDER BY gross_profit DESC;

-- Query 12: Window function - rank products by revenue
WITH product_revenue AS (
    SELECT
        p.product_name,
        SUM(s.quantity * s.unit_selling_price *
            (1 - s.discount_percent / 100)) AS revenue
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    GROUP BY p.product_name
)
SELECT
    product_name,
    ROUND(revenue, 2) AS revenue,
    RANK() OVER (ORDER BY revenue DESC) AS revenue_rank
FROM product_revenue;

-- Query 13: Window function - cumulative monthly revenue
WITH monthly_sales AS (
    SELECT
        MONTH(STR_TO_DATE(sale_date, '%d-%b-%y')) AS month_number,
        DATE_FORMAT(STR_TO_DATE(sale_date, '%d-%b-%y'), '%M') AS month_name,
        SUM(quantity * unit_selling_price *
            (1 - discount_percent / 100)) AS revenue
    FROM sales
    GROUP BY month_number, month_name
)
SELECT
    month_name,
    ROUND(revenue, 2) AS monthly_revenue,
    ROUND(SUM(revenue) OVER (ORDER BY month_number), 2) AS cumulative_revenue
FROM monthly_sales
ORDER BY month_number;
