# Shri Vedant Pooja Bhandar – Financial Analytics Dashboard

## Open the dashboard
1. Keep the `index.html`, `styles.css`, `app.js`, and `data` folder together.
2. Double-click `index.html` to open it in a modern browser (Chrome or Edge).
3. Use the Reporting month dropdown to filter sales and expense analysis.

This dashboard is self-contained and uses locally embedded data in `data/data.js`; it does not require a server or internet connection.

## Data sources
- `data/sales.csv`
- `data/products.csv`
- `data/expenses.csv`
- `data/purchases.csv`
- `data/vendors.csv`

## Metric definitions
- Revenue: sum of `Total Revenue` in SALES.
- COGS: sum of `Total Cost (COGS)` in SALES.
- Gross profit: sum of `Gross Profit` in SALES.
- Gross margin: gross profit / revenue.
- Simplified operating profit: gross profit minus EXPENSES `Amount (₹)`.
- Inventory value: sum of PRODUCTS `Inventory Value (₹)`.

Operating profit is a simplified project metric based on the supplied files. It is not an audited or statutory profit figure. Inventory and procurement metrics use their full current datasets and are not affected by the reporting-month filter.

## Dataset snapshot
- Sales transactions: 180
- Revenue: ₹133,537
- COGS: ₹86,398
- Gross profit: ₹47,139
- Expenses: ₹85,250
- Simplified operating profit: -₹38,111
- Product inventory value: ₹359,080
- Closing stock: 2,067 units
- Low-stock products: 1

## Project skills demonstrated
Excel data preparation, CSV handling, KPI design, profitability analysis, inventory analysis, procurement/vendor analysis, HTML, CSS, JavaScript, data visualization and business interpretation.
