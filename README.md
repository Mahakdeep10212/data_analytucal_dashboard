# India FMCG Sector Financial Analytics & Interactive Dashboard
### 10-Year Performance Assessment & Peer Comparison (FY2016 - FY2025)

A comprehensive financial ratio analysis and interactive data visualization platform covering the top 5 Fast-Moving Consumer Goods (FMCG) companies in India:
*   **Hindustan Unilever Limited (HUL)**
*   **ITC Limited**
*   **Nestle India Limited**
*   **Britannia Industries Limited**
*   **Tata Consumer Products Limited (TCPL)**

This project integrates a Python data processing pipeline, a custom styled Excel database, an academic PDF document compiled via ReportLab, and a light-themed, interactive web dashboard modeled after leading Indian financial portals like *Screener.in* and *Groww*.

---

## 🚀 Key Features

### 1. Interactive Web Dashboard (`dashboard/`)
*   **Dynamic Sidebar Tab Switcher:** Switch between companies instantly from the sidebar. The entire view—including the profile stats, canvases, P&L tables, and written narratives—updates dynamically.
*   **Live Official Logos:** Fetches high-quality, professional brand logos live from the free **Hunter.io Company Logo API** (Unilever, ITC, Nestle, Britannia, Tata Consumer), bypassing the local environment's Python internet restrictions.
*   **Dynamic Chart Insights:** Displays detailed financial insights directly below each chart, updating dynamically in real-time as you switch between companies.
*   **Cache-Busting Integration:** Implements version query parameters (`?v=1.1`) for CSS and JS assets to prevent local browsers from loading outdated cached scripts.
*   **Chart.js Visualizations:** Features 3 animated interactive charts:
    *   *10-Year Growth Trends:* Dual-axis line chart tracking Sales vs. Net Profits.
    *   *Margin Dynamics:* Area line charts tracking OPM % vs. NPM %.
    *   *Capital Efficiency:* Bar charts tracking ROE % vs. ROCE % over 10 years.
*   **Sortable Peer Matrix:** Side-by-side FY2025 comparison table. Click any column header to sort peers ascending or descending.
*   **Interactive DuPont Calculator:** Interactive range sliders to simulate changes in Net Margin (NPM), Asset Turnover, and Financial Leverage (Equity Multiplier) to see the visual mathematical impact on Return on Equity (ROE) in real-time, accompanied by animated progress gauges.
*   **Premium Animations:** Custom card-entry animations, button hover micro-interactions, and fade-transition page switching.

### 2. Automated Python Reports
*   **Custom Styled Excel Sheet (`FMCG_Sector_Analysis.xlsx`):** A professionally formatted workbook containing separate sheets for each company and a summary comparison. Includes customized headers, gridlines, currency/percentage cell formatting, and calculated Excel formula cells. All native Excel charts have been removed to present clean, structured data tables. Data sources and the Screener.in URL are clearly documented on the Index sheet.
*   **Academic Report Compiler (`generate_report.py`):** Programmatically generates a 5-page formatted PDF report (`FMCG_Sector_Report.pdf`) featuring structured financial tables, analytical case stories for each company, and a dedicated prep sheet for the Viva-Voce oral exam. The cover page metadata block is left clean of personal student name identifiers.

---

## 📂 Project Architecture

```text
data_analytics_dashboard/
│
├── dashboard/                     # Web Dashboard Frontend
│   ├── index.html                 # Core markup (Clean semantic layout, live Hunter.io logos)
│   ├── style.css                  # Custom Vanilla CSS (Soft gray/indigo theme, animations)
│   ├── app.js                     # Dashboard controller (Chart.js, dynamic insights, & DuPont)
│   └── data.js                    # Local JSON database wrapper (Avoids browser CORS blocking)
│
├── data_generator.py              # Raw data database, financial formulas, & Excel exporter
├── generate_report.py             # Academic PDF report generator (using ReportLab)
├── download_logos.py              # Optional script to fetch logos locally
├── run_dashboard.py               # Local server runner and browser launcher
│
├── FMCG_Sector_Analysis.xlsx      # Output Excel file (Cleanly styled tables with formulas)
├── FMCG_Sector_Report.pdf         # Output PDF report (Ready for print/submission)
└── README.md                      # Project documentation (This file)
```

---

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have Python 3.8+ installed on your system. Install the required dependencies:
```bash
pip install pandas openpyxl reportlab
```

### Quickstart: Run the Dashboard
To start the local web server and launch the interactive dashboard in your default browser:
```bash
python run_dashboard.py
```
*The server runs locally at `http://localhost:8000/dashboard/index.html`. To stop the server, press `Ctrl+C` in your terminal.*

### Regenerate Data and Reports
If you update `data_generator.py` or want to rebuild the files from scratch:

1. **Rebuild Excel & JSON Database:**
   ```bash
   python data_generator.py
   ```
2. **Recompile PDF Academic Report:**
   ```bash
   python generate_report.py
   ```

---

## 📊 Financial Model & Ratio Formulas

*   **Operating Profit Margin (OPM %):**
    $$\text{OPM} = \frac{\text{Sales} - \text{Expenses}}{\text{Sales}} \times 100$$
*   **Net Profit Margin (NPM %):**
    $$\text{NPM} = \frac{\text{Net Profit}}{\text{Sales}} \times 100$$
*   **Return on Capital Employed (ROCE %):**
    $$\text{ROCE} = \frac{\text{EBIT}}{\text{Share Capital} + \text{Reserves} + \text{Borrowings}} \times 100$$
*   **Return on Equity (ROE %):**
    $$\text{ROE} = \frac{\text{Net Profit}}{\text{Net Worth}} \times 100$$
*   **DuPont Breakdown Model:**
    $$\text{ROE} = \text{Net Profit Margin} \times \text{Asset Turnover} \times \text{Equity Multiplier}$$
    *   *Net Profit Margin (Profitability):* $\text{Net Profit} / \text{Sales}$
    *   *Asset Turnover (Asset Efficiency):* $\text{Sales} / \text{Total Assets}$
    *   *Equity Multiplier (Financial Leverage):* $\text{Total Assets} / \text{Net Worth}$
