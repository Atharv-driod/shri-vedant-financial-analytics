# Shri Vedant Pooja Bhandar
## Retail Financial Analytics Dashboard

An end-to-end retail analytics portfolio project that transforms sales, product, purchase, vendor and expense records into financial KPIs and actionable business observations.

**🚀 Live Dashboard:** https://atharv-driod.github.io/shri-vedant-financial-analytics/

**📁 GitHub Repository:** https://github.com/Atharv-driod/shri-vedant-financial-analytics

---

## 1. Project Overview

This project analyses the financial and operational performance of a retail pooja products business using Microsoft Excel, CSV datasets, MySQL and an interactive web dashboard.

The objective is to understand sales performance, profitability, expenses, inventory position and procurement activities through structured data analysis and visual reporting.

**Reporting period:** January–October 2026.

## 2. Business Objectives

- Monitor revenue and gross profit across the reporting period.
- Calculate gross profit and gross profit margin.
- Compare monthly revenue, gross profit and expenses.
- Review product sales and inventory position.
- Analyse procurement and vendor records.
- Identify financial pressure points and opportunities for improvement.

## 3. Dashboard

**[Open the Live Interactive Dashboard](https://atharv-driod.github.io/shri-vedant-financial-analytics/)**

The dashboard includes:
- Revenue, gross profit and gross margin KPIs.
- Simplified operating result and total expenses.
- Inventory valuation.
- Monthly financial trend analysis.
- Reporting-month filter and reset functionality.
- Product, expense, procurement and inventory analysis.

## 4. Key Financial Results

| KPI | Result |
|---|---:|
| Total Revenue | ₹1,33,537 |
| Cost of Goods Sold | ₹86,398 |
| Gross Profit | ₹47,139 |
| Gross Profit Margin | 35.30% |
| Total Expenses | ₹85,250 |
| Simplified Operating Result | -₹38,111 |
| Inventory Value | ₹3,59,080 |
| Units Sold | 432 |
| Sales Transactions | 180 |
| Average Revenue per Transaction | ₹741.87 |

**Business observation:** Recorded expenses exceed gross profit by ₹38,111. This indicates a need to review expense drivers and gross-margin improvement opportunities.

*Note: Simplified operating result = Gross profit − recorded expenses. This is a project-level analytical measure, not an audited or statutory operating profit figure.*

### Monthly Revenue

| Month | Revenue |
|---|---:|
| January | ₹10,749.50 |
| February | ₹18,056.50 |
| March | ₹14,879.50 |
| April | ₹21,454.00 |
| May | ₹10,942.50 |
| June | ₹3,370.00 |
| July | ₹15,878.00 |
| August | ₹14,872.50 |
| September | ₹6,092.50 |
| October | ₹17,242.00 |

April recorded the highest monthly revenue, while June recorded the lowest in the supplied period.

## 5. Dataset Description

The project uses five datasets containing 323 records.

| Dataset | Records | Purpose |
|---|---:|---|
| Sales | 180 | Revenue and profitability analysis |
| Products | 20 | Product and inventory analysis |
| Purchases | 70 | Procurement analysis |
| Expenses | 48 | Expense analysis |
| Vendors | 5 | Vendor analysis |
| **Total** | **323** | |

## 6. Tools and Technologies

| Tool | Application |
|---|---|
| Microsoft Excel | Data preparation and financial calculations |
| CSV | Structured data storage and transfer |
| MySQL Workbench | Database querying and analysis |
| SQL | Data validation and business analysis |
| HTML | Dashboard structure |
| CSS | Dashboard styling |
| JavaScript | Data loading and dashboard interactivity |
| GitHub | Version control and project hosting |
| GitHub Pages | Live dashboard deployment |

## 7. SQL Analysis

The project includes eight SQL scripts covering:

1. Database setup and schema reference.
2. Data validation and record checks.
3. Revenue and monthly performance analysis.
4. Product performance analysis.
5. Expense and vendor analysis.
6. Inventory and payment analysis.
7. Advanced SQL analysis.
8. Final business summary.

**SQL concepts demonstrated:**
- SELECT, WHERE and ORDER BY.
- Aggregate functions.
- GROUP BY and HAVING.
- INNER JOIN and LEFT JOIN.
- CASE expressions.
- Subqueries.
- Common Table Expressions (CTEs).
- RANK() and window functions.
- Date parsing for monthly analysis.

See [README_SQL.md](README_SQL.md) for SQL execution order and database assumptions.

## 8. Repository Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── sales.csv
├── products.csv
├── expenses.csv
├── purchases.csv
├── Vendors.csv
├── 01_Database_Setup.sql
├── 02_Data_Validation.sql
├── 03_Revenue_Analysis.sql
├── 04_Product_Analysis.sql
├── 05_Expense_Vendor_Analysis.sql
├── 06_Inventory_Payment_Analysis.sql
├── 07_Advanced_SQL.sql
├── 08_Final_Business_Summary.sql
├── README_SQL.md
└── Project Documentation (.docx)
```

## 9. Project Documentation

Detailed project documentation is available in the repository:

**Shri_Vedant_Retail_Financial_Analytics_Project_Documentation.docx.docx**

It covers the project background, datasets, methodology and financial results.

## 10. Limitations and Data Notes

- Results are based on the supplied records for January–October 2026.
- The simplified operating result does not represent a complete statutory income statement.
- Date fields were retained as text during CSV import for compatibility; the SQL documentation explains the date parsing used.
- Personal, customer-identifiable, confidential or commercially sensitive information should be removed or anonymised before public sharing.

---

**Project Focus:** Retail Financial Analytics | Financial Reporting | Revenue Analysis | Profitability Analysis | Expense Analysis | Inventory Analysis | Procurement Analytics
