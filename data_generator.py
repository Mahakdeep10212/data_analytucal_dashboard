import pandas as pd
import openpyxl
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.chart import BarChart, LineChart, Reference
import json
import os

# 1. RAW DATA DEFINITIONS (FY2016 to FY2025)
# In Indian Rupees (INR) - Crores (Cr)
raw_data = {
    "HUL": {
        "Name": "Hindustan Unilever Limited",
        "Sector": "FMCG - Diversified",
        "CMP": 2520.0,
        "MarketCap": 592100, # Cr
        "PE_FY25": 57.5,
        "PB_FY25": 11.3,
        "BookValue": 222.0,
        "Years": list(range(2016, 2026)),
        "Sales": [31051, 31890, 34525, 38224, 38785, 45996, 51193, 58154, 59574, 61250],
        "Expenses": [25301, 25843, 27248, 29587, 29185, 34620, 38693, 44522, 45474, 46550],
        "OtherIncome": [570, 530, 567, 664, 713, 513, 393, 517, 704, 820],
        "Interest": [15, 35, 20, 7, 106, 108, 98, 101, 284, 250],
        "Depreciation": [320, 396, 478, 524, 938, 1012, 1025, 1030, 1080, 1100],
        "Tax": [1885, 1656, 2125, 2434, 2531, 1819, 2289, 2718, 2630, 2770],
        "ShareCapital": [216, 216, 216, 216, 216, 235, 235, 235, 235, 235],
        "Reserves": [6059, 6274, 6859, 7443, 7815, 47199, 48599, 49914, 51114, 52200],
        "Borrowings": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "TotalAssets": [11500, 12200, 13500, 15400, 17200, 68000, 70000, 72000, 74000, 76000],
        "DividendPayout": [88.0, 91.0, 86.0, 88.0, 89.0, 92.0, 95.0, 96.0, 94.0, 95.0]
    },
    "ITC": {
        "Name": "ITC Limited",
        "Sector": "FMCG - Cigarettes & Conglomerate",
        "CMP": 435.0,
        "MarketCap": 543000,
        "PE_FY25": 25.8,
        "PB_FY25": 6.9,
        "BookValue": 63.0,
        "Years": list(range(2016, 2026)),
        "Sales": [36251, 38850, 40625, 44996, 45619, 48151, 59101, 69480, 70588, 72400],
        "Expenses": [22451, 24200, 25100, 27700, 27719, 28701, 37101, 44230, 44488, 45200],
        "OtherIncome": [1780, 1920, 2120, 2480, 3013, 3251, 2590, 2940, 3100, 3250],
        "Interest": [50, 24, 85, 45, 55, 47, 42, 44, 42, 45],
        "Depreciation": [1010, 1085, 1145, 1310, 1563, 1645, 1652, 1780, 1850, 1900],
        "Tax": [4620, 4861, 5135, 5421, 4261, 3819, 5027, 6086, 6268, 6425],
        "ShareCapital": [1216, 1220, 1222, 1226, 1229, 1231, 1243, 1247, 1247, 1247],
        "Reserves": [31784, 34180, 39625, 51433, 62771, 64002, 65201, 66500, 68023, 70000],
        "Borrowings": [50, 40, 30, 20, 15, 10, 5, 5, 0, 0],
        "TotalAssets": [42000, 46000, 52000, 65000, 77000, 79000, 81000, 83000, 85000, 88000],
        "DividendPayout": [75.0, 80.0, 72.0, 78.0, 84.0, 89.0, 91.0, 92.0, 93.0, 94.0]
    },
    "NESTLE": {
        "Name": "Nestle India Limited",
        "Sector": "FMCG - Foods & Beverages",
        "CMP": 2350.0,
        "MarketCap": 226600,
        "PE_FY25": 70.8,
        "PB_FY25": 64.7,
        "BookValue": 36.3,
        "Years": list(range(2016, 2026)),
        "Sales": [9159, 10135, 11292, 12368, 13350, 14709, 16897, 19126, 19500, 20400],
        "Expenses": [7272, 7990, 8742, 9568, 10150, 11109, 13097, 14676, 14950, 15600],
        "OtherIncome": [150, 165, 180, 220, 150, 120, 130, 140, 155, 170],
        "Interest": [5, 4, 3, 5, 120, 130, 140, 150, 152, 155],
        "Depreciation": [330, 340, 350, 370, 370, 390, 410, 420, 440, 450],
        "Tax": [550, 616, 757, 815, 660, 800, 880, 1020, 1040, 1105],
        "ShareCapital": [96, 96, 96, 96, 96, 96, 96, 96, 96, 96],
        "Reserves": [2804, 2904, 3104, 1820, 1920, 1980, 2200, 2400, 3200, 3400],
        "Borrowings": [20, 20, 15, 10, 40, 35, 30, 25, 20, 15],
        "TotalAssets": [4800, 5100, 5400, 6200, 7200, 7500, 7900, 8200, 8800, 9200],
        "DividendPayout": [95.0, 92.0, 94.0, 125.0, 110.0, 105.0, 98.0, 96.0, 95.0, 96.0]
    },
    "BRITANNIA": {
        "Name": "Britannia Industries Limited",
        "Sector": "FMCG - Foods & Bakery",
        "CMP": 4950.0,
        "MarketCap": 119200,
        "PE_FY25": 54.2,
        "PB_FY25": 31.4,
        "BookValue": 158.0,
        "Years": list(range(2016, 2026)),
        "Sales": [7947, 8500, 9914, 11054, 11599, 13136, 14136, 16301, 16769, 17500],
        "Expenses": [6747, 7250, 8414, 9354, 9799, 10936, 11836, 13401, 13869, 14450],
        "OtherIncome": [140, 160, 180, 210, 280, 310, 220, 240, 250, 270],
        "Interest": [10, 8, 12, 9, 77, 110, 140, 169, 180, 175],
        "Depreciation": [115, 125, 142, 162, 185, 198, 201, 226, 240, 250],
        "Tax": [415, 452, 516, 563, 418, 599, 619, 746, 730, 765],
        "ShareCapital": [24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
        "Reserves": [2276, 2476, 2976, 4226, 4376, 3526, 3326, 3500, 3776, 3776],
        "Borrowings": [100, 150, 120, 80, 1500, 1700, 2000, 1800, 1600, 1500],
        "TotalAssets": [3500, 3800, 4200, 5500, 7500, 7800, 8200, 8400, 8500, 8600],
        "DividendPayout": [65.0, 70.0, 68.0, 75.0, 92.0, 120.0, 98.0, 95.0, 94.0, 95.0]
    },
    "TATACONSUM": {
        "Name": "Tata Consumer Products Limited",
        "Sector": "FMCG - Foods & Beverages (Tata Group)",
        "CMP": 1120.0,
        "MarketCap": 109800,
        "PE_FY25": 84.5,
        "PB_FY25": 6.1,
        "BookValue": 183.0,
        "Years": list(range(2016, 2026)),
        "Sales": [6530, 6780, 7150, 7251, 9637, 11602, 12425, 13783, 15206, 16500],
        "Expenses": [5730, 5950, 6220, 6301, 8337, 10102, 10725, 11983, 13206, 14250],
        "OtherIncome": [120, 130, 140, 150, 110, 140, 150, 160, 180, 200],
        "Interest": [35, 30, 25, 20, 73, 69, 72, 85, 95, 90],
        "Depreciation": [110, 115, 120, 125, 240, 250, 260, 280, 310, 330],
        "Tax": [225, 245, 275, 280, 284, 381, 398, 422, 465, 510],
        "ShareCapital": [63, 63, 63, 63, 92, 92, 92, 92, 98, 98],
        "Reserves": [5937, 6137, 6337, 6437, 13708, 14408, 14908, 15408, 17902, 18900],
        "Borrowings": [800, 750, 700, 650, 1100, 1050, 950, 1200, 1600, 1500],
        "TotalAssets": [8500, 8800, 9000, 9200, 19500, 20500, 21000, 22500, 25500, 26500],
        "DividendPayout": [40.0, 42.0, 45.0, 48.0, 50.0, 48.0, 45.0, 46.0, 45.0, 45.0]
    }
}

# 2. COMPUTING METRICS AND GENERATING DATAFRAMES
processed_data = {}

for ticker, details in raw_data.items():
    df = pd.DataFrame()
    df["Year"] = details["Years"]
    df["Sales"] = details["Sales"]
    df["Expenses"] = details["Expenses"]
    
    # Financial statements calculations
    df["Operating Profit"] = df["Sales"] - df["Expenses"]
    df["OPM %"] = (df["Operating Profit"] / df["Sales"]) * 100
    df["Other Income"] = details["OtherIncome"]
    df["Interest"] = details["Interest"]
    df["Depreciation"] = details["Depreciation"]
    
    # EBIT & PBT
    df["EBIT"] = df["Operating Profit"] + df["Other Income"] - df["Depreciation"]
    df["Profit Before Tax (PBT)"] = df["Operating Profit"] + df["Other Income"] - df["Interest"] - df["Depreciation"]
    df["Tax"] = details["Tax"]
    df["Net Profit"] = df["Profit Before Tax (PBT)"] - df["Tax"]
    df["NPM %"] = (df["Net Profit"] / df["Sales"]) * 100
    
    # Share capital, reserves, and net worth
    df["Share Capital"] = details["ShareCapital"]
    df["Reserves"] = details["Reserves"]
    df["Net Worth"] = df["Share Capital"] + df["Reserves"]
    df["Borrowings"] = details["Borrowings"]
    df["Capital Employed"] = df["Net Worth"] + df["Borrowings"]
    df["Total Assets"] = details["TotalAssets"]
    
    # Ratios
    df["ROE %"] = (df["Net Profit"] / df["Net Worth"]) * 100
    df["ROCE %"] = (df["EBIT"] / df["Capital Employed"]) * 100
    df["Debt to Equity"] = df["Borrowings"] / df["Net Worth"]
    
    # Dupont Decomposition
    df["Asset Turnover"] = df["Sales"] / df["Total Assets"]
    df["Equity Multiplier"] = df["Total Assets"] / df["Net Worth"]
    df["Dupont ROE %"] = df["NPM %"] * df["Asset Turnover"] * df["Equity Multiplier"]
    
    # Dividend
    df["Dividend Payout %"] = details["DividendPayout"]
    
    # YoY growth calculations
    df["Sales Growth %"] = df["Sales"].pct_change() * 100
    df["Profit Growth %"] = df["Net Profit"].pct_change() * 100
    
    # Fill NaN values with 0
    df.fillna(0, inplace=True)
    
    processed_data[ticker] = df

# 3. EXCEL STYLING AND EXPORT USING OPENPYXL
excel_file = "FMCG_Sector_Analysis.xlsx"
wb = openpyxl.Workbook()

# Style constants (Screener/ValueResearch Light style: Soft blues & grays, clean borders)
font_family = "Segoe UI"
header_fill = PatternFill(start_color="4F46E5", end_color="4F46E5", fill_type="solid") # Dark indigo
zebra_fill = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")  # Slate-50
title_fill = PatternFill(start_color="EEF2F6", end_color="EEF2F6", fill_type="solid")  # Slate-100
accent_fill = PatternFill(start_color="E0E7FF", end_color="E0E7FF", fill_type="solid") # Indigo-100

font_title = Font(name=font_family, size=16, bold=True, color="1E293B")
font_subtitle = Font(name=font_family, size=11, italic=True, color="64748B")
font_header = Font(name=font_family, size=11, bold=True, color="FFFFFF")
font_bold_data = Font(name=font_family, size=11, bold=True, color="000000")
font_regular = Font(name=font_family, size=11, color="000000")

thin_side = Side(style='thin', color='E2E8F0')
thick_bottom = Side(style='medium', color='4F46E5')
double_bottom = Side(style='double', color='000000')

border_cell = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
border_header = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thick_bottom)
border_total = Border(left=thin_side, right=thin_side, top=thin_side, bottom=double_bottom)

align_center = Alignment(horizontal="center", vertical="center")
align_left = Alignment(horizontal="left", vertical="center")
align_right = Alignment(horizontal="right", vertical="center")

# SHEET 1: OVERVIEW AND INSTRUCTIONS
ws_overview = wb.active
ws_overview.title = "Project Overview"
ws_overview.views.sheetView[0].showGridLines = True

ws_overview.column_dimensions['A'].width = 3
ws_overview.column_dimensions['B'].width = 32
ws_overview.column_dimensions['C'].width = 50

# Set up Title Blocks
ws_overview.merge_cells("B2:C2")
ws_overview["B2"] = "Lovely Professional University"
ws_overview["B2"].font = font_title
ws_overview["B2"].alignment = align_left

ws_overview.merge_cells("B3:C3")
ws_overview["B3"] = "Academic Project: PETV103 - Data Analytics Essentials with AI"
ws_overview["B3"].font = Font(name=font_family, size=12, bold=True, color="4F46E5")
ws_overview["B3"].alignment = align_left

# Project Details Metadata
metadata = [
    ("Course Title", "Data Analytics Essentials with AI: SQL, Python, Power BI, Tableau and Excel"),
    ("Course Code", "PETV103"),
    ("Section", "9PV24"),
    ("Project Topic", "Financial Ratio Analysis & Storytelling of Top 5 Indian FMCG Companies"),
    ("Target Sector", "Fast Moving Consumer Goods (FMCG) in India"),
    ("Selected Companies", "HUL, ITC, Nestle India, Britannia Industries, Tata Consumer Products"),
    ("Data Source", "Screener.in (Public Financial Statements)"),
    ("Data Source URL", "https://www.screener.in"),
    ("Dashboard Nature", "Dynamic & Interactive HTML5/JS Web Application"),
    ("Submission Date", "July 16, 2025")
]

row = 5
for label, val in metadata:
    cell_lbl = ws_overview.cell(row=row, column=2, value=label)
    cell_val = ws_overview.cell(row=row, column=3, value=val)
    cell_lbl.font = font_bold_data
    cell_val.font = font_regular
    cell_lbl.border = border_cell
    cell_val.border = border_cell
    cell_lbl.fill = zebra_fill
    row += 1

# Workbook sheet index table
row += 2
ws_overview.cell(row=row, column=2, value="Sheet Name").font = font_header
ws_overview.cell(row=row, column=2).fill = header_fill
ws_overview.cell(row=row, column=2).alignment = align_center
ws_overview.cell(row=row, column=3, value="Description / Contents").font = font_header
ws_overview.cell(row=row, column=3).fill = header_fill
ws_overview.cell(row=row, column=3).alignment = align_center

sheets_desc = [
    ("Project Overview", "Assignment information, project metadata, and structural index."),
    ("Peer Comparison", "Latest FY2025 snapshot comparing market shares, margins, and efficiency ratios."),
    ("HUL", "10-Year historical financial statement and ratio analysis of Hindustan Unilever Ltd."),
    ("ITC", "10-Year historical financial statement and ratio analysis of ITC Ltd."),
    ("NESTLE", "10-Year historical financial statement and ratio analysis of Nestle India Ltd."),
    ("BRITANNIA", "10-Year historical financial statement and ratio analysis of Britannia Industries Ltd."),
    ("TATACONSUM", "10-Year historical financial statement and ratio analysis of Tata Consumer Products Ltd.")
]

for sname, desc in sheets_desc:
    row += 1
    c1 = ws_overview.cell(row=row, column=2, value=sname)
    c2 = ws_overview.cell(row=row, column=3, value=desc)
    c1.font = font_bold_data
    c2.font = font_regular
    c1.border = border_cell
    c2.border = border_cell
    c1.alignment = align_left
    c2.alignment = align_left

# SHEET 2: PEER COMPARISON TABLE
ws_peer = wb.create_sheet(title="Peer Comparison")
ws_peer.views.sheetView[0].showGridLines = True

# Title block
ws_peer.merge_cells("A1:I1")
ws_peer["A1"] = "FMCG Sector Peer Comparison Table (FY2025)"
ws_peer["A1"].font = font_title
ws_peer["A1"].fill = title_fill
ws_peer["A1"].alignment = align_center
ws_peer.row_dimensions[1].height = 40

peer_headers = [
    "Company Ticker", "Company Name", "Market Cap (Cr)", "CMP (Rs)", 
    "P/E Ratio", "P/B Ratio", "OPM %", "ROE %", "ROCE %"
]

for col_idx, text in enumerate(peer_headers, 1):
    cell = ws_peer.cell(row=3, column=col_idx, value=text)
    cell.font = font_header
    cell.fill = header_fill
    cell.alignment = align_center
    cell.border = border_header
ws_peer.row_dimensions[3].height = 25

peer_tickers = ["HUL", "ITC", "NESTLE", "BRITANNIA", "TATACONSUM"]
for row_idx, ticker in enumerate(peer_tickers, 4):
    details = raw_data[ticker]
    df_latest = processed_data[ticker].iloc[-1] # FY2025 data row
    
    ws_peer.cell(row=row_idx, column=1, value=ticker).alignment = align_center
    ws_peer.cell(row=row_idx, column=2, value=details["Name"]).alignment = align_left
    ws_peer.cell(row=row_idx, column=3, value=details["MarketCap"]).number_format = '#,##0'
    ws_peer.cell(row=row_idx, column=4, value=details["CMP"]).number_format = '"₹"#,##0.00'
    ws_peer.cell(row=row_idx, column=5, value=details["PE_FY25"]).number_format = '0.0'
    ws_peer.cell(row=row_idx, column=6, value=details["PB_FY25"]).number_format = '0.0'
    ws_peer.cell(row=row_idx, column=7, value=df_latest["OPM %"] / 100).number_format = '0.0%'
    ws_peer.cell(row=row_idx, column=8, value=df_latest["ROE %"] / 100).number_format = '0.0%'
    ws_peer.cell(row=row_idx, column=9, value=df_latest["ROCE %"] / 100).number_format = '0.0%'
    
    for c in range(1, 10):
        cell = ws_peer.cell(row=row_idx, column=c)
        cell.font = font_regular
        cell.border = border_cell
        if row_idx % 2 == 1:
            cell.fill = zebra_fill

# Auto-fit column widths
for col in ws_peer.columns:
    max_len = max(len(str(cell.value or '')) for cell in col)
    col_letter = get_column_letter(col[0].column)
    ws_peer.column_dimensions[col_letter].width = max(max_len + 4, 12)



# HISTORICAL SHEETS FOR EACH COMPANY
for ticker, df in processed_data.items():
    ws = wb.create_sheet(title=ticker)
    ws.views.sheetView[0].showGridLines = True
    
    details = raw_data[ticker]
    
    # Title Block
    ws.merge_cells("A1:K1")
    ws["A1"] = f"{details['Name']} ({ticker}) - 10 Year Historical Performance"
    ws["A1"].font = font_title
    ws["A1"].fill = title_fill
    ws["A1"].alignment = align_left
    ws.row_dimensions[1].height = 35
    
    ws["A2"] = f"Sector: {details['Sector']} | Market Cap: ₹{details['MarketCap']:,} Cr | CMP: ₹{details['CMP']}"
    ws["A2"].font = font_subtitle
    ws["A2"].alignment = align_left
    ws.row_dimensions[2].height = 20
    
    # Table headers
    headers = [
        "FY Year", "Sales (Cr)", "Expenses (Cr)", "Operating Profit (Cr)", "OPM %",
        "Net Profit (Cr)", "NPM %", "ROE %", "ROCE %", "D/E Ratio", "Dividend Payout %"
    ]
    
    for col_idx, h in enumerate(headers, 1):
        cell = ws.cell(row=4, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = header_fill
        cell.alignment = align_center
        cell.border = border_header
    ws.row_dimensions[4].height = 25
    
    # Populate historical rows
    for r_idx, row_data_df in df.iterrows():
        excel_row_idx = int(r_idx) + 5
        
        ws.cell(row=excel_row_idx, column=1, value=f"FY{int(row_data_df['Year'])}").alignment = align_center
        ws.cell(row=excel_row_idx, column=2, value=row_data_df["Sales"]).number_format = '#,##0'
        ws.cell(row=excel_row_idx, column=3, value=row_data_df["Expenses"]).number_format = '#,##0'
        ws.cell(row=excel_row_idx, column=4, value=row_data_df["Operating Profit"]).number_format = '#,##0'
        ws.cell(row=excel_row_idx, column=5, value=row_data_df["OPM %"] / 100).number_format = '0.0%'
        ws.cell(row=excel_row_idx, column=6, value=row_data_df["Net Profit"]).number_format = '#,##0'
        ws.cell(row=excel_row_idx, column=7, value=row_data_df["NPM %"] / 100).number_format = '0.0%'
        ws.cell(row=excel_row_idx, column=8, value=row_data_df["ROE %"] / 100).number_format = '0.0%'
        ws.cell(row=excel_row_idx, column=9, value=row_data_df["ROCE %"] / 100).number_format = '0.0%'
        ws.cell(row=excel_row_idx, column=10, value=row_data_df["Debt to Equity"]).number_format = '0.00'
        ws.cell(row=excel_row_idx, column=11, value=row_data_df["Dividend Payout %"] / 100).number_format = '0.0%'
        
        # Style row cells
        for c in range(1, 12):
            cell = ws.cell(row=excel_row_idx, column=c)
            cell.font = font_regular
            cell.border = border_cell
            if excel_row_idx % 2 == 1:
                cell.fill = zebra_fill
        ws.row_dimensions[excel_row_idx].height = 20

    # Add Average / Summary row
    avg_row_idx = len(df) + 5
    ws.cell(row=avg_row_idx, column=1, value="Average / CAGR").alignment = align_center
    ws.cell(row=avg_row_idx, column=1).font = font_bold_data
    ws.cell(row=avg_row_idx, column=1).fill = accent_fill
    ws.cell(row=avg_row_idx, column=1).border = border_total
    
    # Calculate Sales CAGR (last 9 years since YoY is 9 intervals)
    sales_cagr = (df["Sales"].iloc[-1] / df["Sales"].iloc[0])**(1/9) - 1
    profit_cagr = (df["Net Profit"].iloc[-1] / df["Net Profit"].iloc[0])**(1/9) - 1
    
    # Formulate Averages and CAGR
    ws.cell(row=avg_row_idx, column=2, value=sales_cagr).number_format = '0.0%" CAGR"'
    ws.cell(row=avg_row_idx, column=3, value=df["Expenses"].mean()).number_format = '#,##0" Avg"'
    ws.cell(row=avg_row_idx, column=4, value=df["Operating Profit"].mean()).number_format = '#,##0" Avg"'
    ws.cell(row=avg_row_idx, column=5, value=df["OPM %"].mean() / 100).number_format = '0.0%" Avg"'
    ws.cell(row=avg_row_idx, column=6, value=profit_cagr).number_format = '0.0%" CAGR"'
    ws.cell(row=avg_row_idx, column=7, value=df["NPM %"].mean() / 100).number_format = '0.0%" Avg"'
    ws.cell(row=avg_row_idx, column=8, value=df["ROE %"].mean() / 100).number_format = '0.0%" Avg"'
    ws.cell(row=avg_row_idx, column=9, value=df["ROCE %"].mean() / 100).number_format = '0.0%" Avg"'
    ws.cell(row=avg_row_idx, column=10, value=df["Debt to Equity"].mean()).number_format = '0.00" Avg"'
    ws.cell(row=avg_row_idx, column=11, value=df["Dividend Payout %"].mean() / 100).number_format = '0.0%" Avg"'
    
    for c in range(2, 12):
        cell = ws.cell(row=avg_row_idx, column=c)
        cell.font = font_bold_data
        cell.fill = accent_fill
        cell.border = border_total
    ws.row_dimensions[avg_row_idx].height = 22
    
    # Adjust column widths
    for col in ws.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws.column_dimensions[col_letter].width = max(max_len + 4, 12)



# Save Excel Workbook
wb.save(excel_file)
print(f"[SUCCESS] Excel workbook '{excel_file}' created and styled beautifully.")

# 4. EXPORTING DATA FOR WEB DASHBOARD (data.js)
# Convert all dfs to dictionary formats that JSON can easily encode
json_ready_data = {}
for ticker, details in raw_data.items():
    df = processed_data[ticker]
    
    # P&L statement columns
    p_and_l = []
    for r_idx, row_df in df.iterrows():
        p_and_l.append({
            "Year": int(row_df["Year"]),
            "Sales": int(row_df["Sales"]),
            "Expenses": int(row_df["Expenses"]),
            "OperatingProfit": int(row_df["Operating Profit"]),
            "OPM": round(float(row_df["OPM %"]), 2),
            "OtherIncome": int(row_df["Other Income"]),
            "Interest": int(row_df["Interest"]),
            "Depreciation": int(row_df["Depreciation"]),
            "PBT": int(row_df["Profit Before Tax (PBT)"]),
            "Tax": int(row_df["Tax"]),
            "NetProfit": int(row_df["Net Profit"]),
            "NPM": round(float(row_df["NPM %"]), 2),
            "ROE": round(float(row_df["ROE %"]), 2),
            "ROCE": round(float(row_df["ROCE %"]), 2),
            "DebtToEquity": round(float(row_df["Debt to Equity"]), 2),
            "AssetTurnover": round(float(row_df["Asset Turnover"]), 2),
            "EquityMultiplier": round(float(row_df["Equity Multiplier"]), 2),
            "DividendPayout": round(float(row_df["Dividend Payout %"]), 2),
            "SalesGrowth": round(float(row_df["Sales Growth %"]), 2),
            "ProfitGrowth": round(float(row_df["Profit Growth %"]), 2),
        })
        
    json_ready_data[ticker] = {
        "Name": details["Name"],
        "Sector": details["Sector"],
        "CMP": details["CMP"],
        "MarketCap": details["MarketCap"],
        "PE_FY25": details["PE_FY25"],
        "PB_FY25": details["PB_FY25"],
        "BookValue": details["BookValue"],
        "History": p_and_l
    }

# Create dashboard directory if not exists
os.makedirs("dashboard", exist_ok=True)

# Write data.js
js_content = f"// Automatically generated data file\nconst fmcgSectorData = {json.dumps(json_ready_data, indent=2)};\n"
with open(os.path.join("dashboard", "data.js"), "w") as f:
    f.write(js_content)
    
print("[SUCCESS] Web Dashboard data file 'dashboard/data.js' successfully created.")
