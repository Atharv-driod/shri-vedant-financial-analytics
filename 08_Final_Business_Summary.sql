USE retail_financial_analytics;

-- Consolidated financial KPI summary
SELECT
    ROUND(SUM(quantity * unit_selling_price *
        (1 - discount_percent / 100)), 2) AS total_revenue,
    ROUND(SUM(quantity * unit_purchase_cost), 2) AS total_cogs,
    ROUND(
        SUM(quantity * unit_selling_price *
            (1 - discount_percent / 100))
        - SUM(quantity * unit_purchase_cost), 2
    ) AS gross_profit,
    ROUND(
        (
            SUM(quantity * unit_selling_price *
                (1 - discount_percent / 100))
            - SUM(quantity * unit_purchase_cost)
        ) / NULLIF(SUM(quantity * unit_selling_price *
            (1 - discount_percent / 100)), 0) * 100, 2
    ) AS gross_profit_margin,
    (SELECT ROUND(SUM(amount), 2) FROM expenses) AS total_expenses,
    (SELECT ROUND(SUM(inventory_value), 2) FROM products) AS inventory_value
FROM sales;

-- Simplified operating result: gross profit less recorded expenses
SELECT
    ROUND(
        (SELECT SUM(quantity * unit_selling_price *
            (1 - discount_percent / 100) - quantity * unit_purchase_cost)
         FROM sales)
        - (SELECT SUM(amount) FROM expenses),
        2
    ) AS simplified_operating_profit;
