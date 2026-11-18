# Shri Vedant Pooja Bhandar — SQL Portfolio Scripts

These scripts document the SQL analysis performed for the retail financial analytics project.

## Run order
1. 01_Database_Setup.sql
2. 02_Data_Validation.sql
3. 03_Revenue_Analysis.sql
4. 04_Product_Analysis.sql
5. 05_Expense_Vendor_Analysis.sql
6. 06_Inventory_Payment_Analysis.sql
7. 07_Advanced_SQL.sql
8. 08_Final_Business_Summary.sql

The database tables are assumed to have already been created and populated from the project CSV files. The setup script documents the schema and selects the database; it does not recreate/drop populated tables.

## Important date note
Date columns were retained as VARCHAR during CSV import. Monthly analysis parses `sale_date` using `%d-%b-%y` (example: `14-Jan-26`). If the actual stored date text differs, adjust the STR_TO_DATE format accordingly.

## Validated headline figures
- Revenue: ₹133,537
- COGS: ₹86,398
- Gross profit: ₹47,139
- Gross profit margin: 35.30%
- Expenses: ₹85,250
- Inventory value: ₹359,080
- Simplified operating result: -₹38,111

Re-run the validation and KPI scripts against the database before publishing results.
