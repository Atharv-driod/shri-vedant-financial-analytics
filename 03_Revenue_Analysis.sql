USE retail_financial_analytics;

-- Query 1: Overall sales KPIs
SELECT
    COUNT(*) AS total_transactions,
    SUM(quantity) AS total_units_sold,
    ROUND(SUM(quantity * unit_selling_price *
        (1 - discount_percent / 100)), 2) AS total_revenue
FROM sales;

-- Query 2: Monthly revenue (sale_date stored as text, e.g. 14-Jan-26)
SELECT
    DATE_FORMAT(STR_TO_DATE(sale_date, '%d-%b-%y'), '%M') AS month_name,
    MONTH(STR_TO_DATE(sale_date, '%d-%b-%y')) AS month_number,
    ROUND(SUM(quantity * unit_selling_price *
        (1 - discount_percent / 100)), 2) AS monthly_revenue
FROM sales
GROUP BY
    MONTH(STR_TO_DATE(sale_date, '%d-%b-%y')),
    DATE_FORMAT(STR_TO_DATE(sale_date, '%d-%b-%y'), '%M')
ORDER BY month_number;
