USE retail_financial_analytics;

-- Query 5: Expense category analysis
SELECT
    expense_category,
    COUNT(*) AS total_transactions,
    ROUND(SUM(amount), 2) AS total_expenses,
    ROUND(AVG(amount), 2) AS average_expense
FROM expenses
GROUP BY expense_category
ORDER BY total_expenses DESC;

-- Query 6: Vendor-wise purchase analysis
SELECT
    v.vendor_id, v.vendor_name, v.city,
    COUNT(p.po_number) AS total_purchase_orders,
    SUM(p.quantity_purchased) AS total_quantity_purchased,
    ROUND(SUM(p.purchase_value), 2) AS total_purchase_value
FROM vendors v
LEFT JOIN purchases p ON v.vendor_id = p.vendor_id
GROUP BY v.vendor_id, v.vendor_name, v.city
ORDER BY total_purchase_value DESC;
