// Variables to keep track of state
let currentTicker = "HUL";
let activeCharts = {};
let sortDirection = {}; // To toggle sorting order

// 1. STORY & INFERENCES DATABASE (Telling the story of each company)
const companyStories = {
    "HUL": `
        <h4 class="story-section-title"><i class="fa-solid fa-gem"></i> The Market Leader's Premiumization Moat</h4>
        <p class="story-para"><strong>Hindustan Unilever Limited (HUL)</strong> is India's largest FMCG player, with over 9 out of 10 Indian households using one or more of its products daily. Over the past 10 years, HUL has executed a deliberate <strong>"Premiumization" strategy</strong>—shifting consumers from mass products to higher-margin premium products (e.g., Surf Excel Matic, Dove, and premium tea brands). This has helped HUL sustain strong Operating Profit Margins (OPM) above 23-24% despite inflationary pressures.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-chart-pie"></i> Capital Allocation & Efficiency</h4>
        <p class="story-para">HUL has an exceptional return profile with ROE and ROCE consistently exceeding 30%. Because HUL operates on a negative working capital model (collecting money from distributors before paying suppliers) and has zero borrowings, it requires very little capital to grow. Consequently, the company distributes almost 90-95% of its net profits back to shareholders as dividends, making it a highly tax-efficient wealth compounder.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-triangle-exclamation"></i> Key Inferences & Outlook</h4>
        <ul class="story-bullets">
            <li><strong>GSK Merger Boost:</strong> The integration of Horlicks & Boost in FY2021 expanded the nutrition portfolio, boosting sales and creating a massive equity premium in reserves.</li>
            <li><strong>Margin Leadership:</strong> OPM expanded from 18.5% in FY2016 to over 24% by FY2025 due to supply chain synergies and pricing power.</li>
            <li><strong>Growth Challenges:</strong> Slower volume growth in rural India represents the key hurdle; HUL's performance is highly linked to the recovery of rural disposable income.</li>
        </ul>
    `,
    "ITC": `
        <h4 class="story-section-title"><i class="fa-solid fa-smoking"></i> The Conglomerate Cash Engine & FMCG Expansion</h4>
        <p class="story-para"><strong>ITC Limited</strong> presents a unique corporate story. Historically dependent on cigarettes for over 85% of its profits, the company has spent the last decade aggressively diversifying into non-cigarette FMCG (Aashirvaad, Sunfeast, YiPPee!), Hotels, Paperboards, and Agri-Business. The cigarette division acts as a <strong>monopolistic cash cow</strong> (with over 75% market share in organized cigarettes), funding the capital expenditure of other businesses.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-scale-balanced"></i> FMCG Margin Turnaround</h4>
        <p class="story-para">A key story in ITC's financials is the profitability ramp-up of its <strong>Other FMCG segment</strong>. OPM for this division was in the low single digits 8 years ago but has crossed 11% in FY2025, driven by scale, digital supply chains (ITC e-Store), and premium brand building. This has helped ITC de-risk its business model from regulatory and tax shocks on tobacco.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-hand-holding-dollar"></i> Key Inferences & Capital Distribution</h4>
        <ul class="story-bullets">
            <li><strong>High Dividend Yield:</strong> ITC maintains a robust dividend payout policy (>90% payout ratio), resulting in a consistent dividend yield of 3.5% to 4.5% for investors.</li>
            <li><strong>ROCE Stability:</strong> ROCE has recovered and stabilized near 35%+ in FY2025 due to efficient capital utilization, hotels turnaround, and asset-light expansion.</li>
            <li><strong>Demerger Value Unlock:</strong> The ongoing demerger of the Hotels business is expected to clean up ITC's balance sheet, reducing capital intensity and further boosting return ratios.</li>
        </ul>
    `,
    "NESTLE": `
        <h4 class="story-section-title"><i class="fa-solid fa-crown"></i> The Premium Pricing Power and Maggi Moat</h4>
        <p class="story-para"><strong>Nestle India Limited</strong> is the undisputed leader in infant nutrition, instant coffee (Nescafe), and instant noodles (Maggi). Nestle's financial story is characterized by <strong>extreme efficiency</strong>. It has the highest ROCE in the FMCG sector, frequently touching 50% to 65%. Nestle achieves this by keeping its equity base low and maintaining an asset-light, high-turnover operations model.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-percent"></i> Margin Resiliency & Brands</h4>
        <p class="story-para">Nestle enjoys premium positioning, allowing it to pass on commodity cost increases (like milk, wheat, and cocoa) directly to consumers without losing market share. This pricing power has kept Operating Profit Margins stable around 22% to 23% over the decade, proving the strength of its brands against generic competitors.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-arrow-trend-up"></i> Key Inferences & Observations</h4>
        <ul class="story-bullets">
            <li><strong>Exceptional Efficiency:</strong> ROE of ~94% in FY2025 is driven by high asset turnover (over 2.2x) and a low equity base due to payouts exceeding 95% of profits.</li>
            <li><strong>Post-2015 Comeback:</strong> Following the Maggi crisis in 2015, Nestle restructured, launched 100+ new products, and doubled sales by FY2025 with zero debt.</li>
            <li><strong>CapEx Cycle:</strong> The company is investing ₹5,000 Cr in capacity expansion between 2023 and 2026, which may temporarily check cash balances but will secure long-term volumes.</li>
        </ul>
    `,
    "BRITANNIA": `
        <h4 class="story-section-title"><i class="fa-solid fa-cookie"></i> Biscuit Market Leadership & Distribution Synergy</h4>
        <p class="story-para"><strong>Britannia Industries Limited</strong> holds a dominant market share in India's biscuit industry (Good Day, Marie Gold, Tiger). Britannia's core strategy has been <strong>direct distribution expansion</strong> (replacing wholesalers with direct sales agents in rural areas) and product diversification into dairy (cheese, milkshakes) and adjacent bakery (cakes, croissants).</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-bolt"></i> Operating Efficiencies & Leverage</h4>
        <p class="story-para">Britannia maintains solid profitability margins, with OPM hovering between 16% and 18%. Unlike HUL and Nestle, Britannia utilizes moderate <strong>financial leverage (borrowings)</strong> to fund expansion and optimize its capital structure. While this introduces a minor debt-to-equity ratio (approx 0.40 in FY2025), it successfully boosts its ROE to an impressive 57%+ range.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-list-check"></i> Key Inferences & Strategic Focus</h4>
        <ul class="story-bullets">
            <li><strong>Rural Focus:</strong> Britannia's rural distribution footprint increased from 10,000 outlets a decade ago to over 28,000 outlets, driving market share gains from unorganized players.</li>
            <li><strong>Cost Optimization:</strong> Continuous cost reduction programs (waste reduction, energy-efficient ovens, factory automation) have saved 2% of sales annually, protecting margins.</li>
            <li><strong>Dividend Strategy:</strong> Intermittent special dividends have kept the average payout high, driving excellent shareholder returns.</li>
        </ul>
    `,
    "TATACONSUM": `
        <h4 class="story-section-title"><i class="fa-solid fa-arrows-spin"></i> The Tata Group's FMCG Consolidation Story</h4>
        <p class="story-para"><strong>Tata Consumer Products Limited (TCPL)</strong> has undergone a massive transformation. Formerly Tata Global Beverages (focused only on tea and coffee), it merged with the Consumer Products Division of Tata Chemicals in 2020. This combined Tata Salt, Tata Sampann (pulses, spices), and Tata Tea into a unified FMCG engine. The story is one of <strong>portfolio scaling and acquisition-led growth</strong>.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-building-wheat"></i> Expansion at the Cost of Short-term Ratios</h4>
        <p class="story-para">In FY2024, TCPL acquired key food brands Capital Foods (Ching's Secret) and Organic India for ~₹7,000 Cr. While these acquisitions have accelerated Sales Growth (from 6.5k Cr in FY16 to 16.5k Cr in FY25), they have added significant assets, goodwill, and borrowings to the balance sheet. Consequently, TCPL's Asset Turnover has dropped to ~0.62x, and its ROE stands at a modest 6.8% in FY2025. This represents an <strong>"investment phase"</strong>—ratios are expected to rise as synergies kick in.</p>
        
        <h4 class="story-section-title"><i class="fa-solid fa-chart-line"></i> Key Inferences & Long-term Thesis</h4>
        <ul class="story-bullets">
            <li><strong>Premium Foods Play:</strong> Tata Salt is the market leader; Tata Sampann represents a massive opportunity to brand unorganized commodities like pulses and spices.</li>
            <li><strong>Integration Lag:</strong> Borrowings increased to ₹1,500 Cr in FY2025 to fund acquisitions, causing interest costs to rise and depressing net margins to 7.8% (lowest in peer group).</li>
            <li><strong>Tata Moat:</strong> Being a Tata Group company provides superior credit ratings (low borrowing rates) and high corporate governance scores.</li>
        </ul>
    `
};

// 1.5. CHART INSIGHTS DATABASE (Dynamic insights for each chart)
const chartInsights = {
    "HUL": {
        growth: "Insight: HUL maintained steady revenue growth (FY16: ₹31,000 Cr to FY25: ~₹61,250 Cr) with net profits more than doubling.",
        margin: "Insight: Operating margins expanded from 18.5% to 24% over the decade due to successful brand premiumization.",
        efficiency: "Insight: Consistently high Return Ratios (ROE > 30%, ROCE > 36%) driven by a negative working capital cycle and zero debt."
    },
    "ITC": {
        growth: "Insight: Revenues scaled from ₹36,251 Cr to ₹72,400 Cr, backed by stable cigarette volumes and rapid non-cigarette FMCG growth.",
        margin: "Insight: Maintained peer-leading OPM (~37.5%) due to high tobacco margins and scale-driven FMCG margin expansion to 11%.",
        efficiency: "Insight: Return ratios stabilized near 35% ROCE; the upcoming hotel business demerger is expected to further boost capital efficiency."
    },
    "NESTLE": {
        growth: "Insight: Sales doubled to ₹20,400 Cr since the 2015 Maggi restructuring, exhibiting robust organic volume growth.",
        margin: "Insight: Highly stable operating margins (22%-23%) demonstrating immense brand pricing power against raw material inflation.",
        efficiency: "Insight: Industry-leading ROE (~94%) and ROCE (~128%) driven by ultra-high asset turnover (2.22x) and paying out ~95% dividends."
    },
    "BRITANNIA": {
        growth: "Insight: Sales grew steadily to ₹17,500 Cr, supported by expanding rural direct reach and volume leadership in biscuits.",
        margin: "Insight: OPM remained resilient between 16% and 18%, protected by continuous cost optimization programs.",
        efficiency: "Insight: Robust ROE of 57.8% achieved by using low-cost debt (D/E: 0.40) to optimize the capital structure."
    },
    "TATACONSUM": {
        growth: "Insight: Revenue surged to ₹16,500 Cr, driven by the integration of Tata Chemicals' foods and premium acquisitions in FY24.",
        margin: "Insight: NPM fell temporarily to 7.9% due to rising interest costs and goodwill amortization from recent acquisitions.",
        efficiency: "Insight: Return ratios are in a transition phase (ROE: 6.8%, ROCE: 7.2%) as the company integrates major brand acquisitions."
    }
};

// 2. INITIALIZATION ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    // Bind sidebar buttons
    const buttons = document.querySelectorAll("#companyTabs .tab-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Find parent button in case they click a child element
            const button = e.target.closest(".tab-btn");
            const ticker = button.getAttribute("data-ticker");
            
            // Toggle active class on sidebar buttons
            buttons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            
            // Switch dashboard company context
            switchCompany(ticker);
        });
    });

    // Initialize Dupont slider listeners
    document.getElementById("dupontNPM").addEventListener("input", updateDupontCalculation);
    document.getElementById("dupontAssetTurn").addEventListener("input", updateDupontCalculation);
    document.getElementById("dupontLeverage").addEventListener("input", updateDupontCalculation);

    // Bind DuPont Reset button
    const resetBtn = document.getElementById("resetDupont");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            const company = fmcgSectorData[currentTicker];
            if (company) {
                const latestYearData = company.History[company.History.length - 1];
                initDupontSliders(latestYearData);
            }
        });
    }

    // Bind download feedback toasts
    const downloadBtns = document.querySelectorAll(".btn-download");
    downloadBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const isExcel = btn.href.includes("xlsx");
            const message = isExcel ? "Preparing and exporting styled Excel workbook..." : "Opening Academic Report PDF document...";
            showToast(message, isExcel ? "success" : "info");
        });
    });

    // Theme Toggle implementation
    const themeToggleBtn = document.getElementById("themeToggle");
    
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            
            const isDark = document.body.classList.contains("dark-theme");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            
            // Re-render the charts with the new theme colors
            const company = fmcgSectorData[currentTicker];
            if (company) {
                renderCharts(company.History);
            }
        });
    }

    // Initial render
    switchCompany("HUL");
    renderPeerTable();
});

// Helper function to animate counting up for metrics
function animateCount(id, endValue, prefix = "", suffix = "", isFloat = false) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const duration = 500; // ms
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentValue = endValue * ease;
        
        if (isFloat) {
            element.innerText = prefix + currentValue.toFixed(2) + suffix;
        } else {
            element.innerText = prefix + Math.floor(currentValue).toLocaleString('en-IN') + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isFloat) {
                element.innerText = prefix + endValue.toFixed(2) + suffix;
            } else {
                element.innerText = prefix + endValue.toLocaleString('en-IN') + suffix;
            }
        }
    }
    
    requestAnimationFrame(update);
}

// 3. SWITCH BOARD DATA ON SELECTING COMPANY
function switchCompany(ticker) {
    currentTicker = ticker;
    const company = fmcgSectorData[ticker];
    
    const contentArea = document.querySelector(".app-content");
    if (contentArea) {
        contentArea.classList.add("fade-hidden");
    }
    
    setTimeout(() => {
        // Update Header Text & stats
        document.getElementById("currentCompanyName").innerText = company.Name;
        document.getElementById("currentCompanySector").innerText = company.Sector;
        document.getElementById("currentCompanyTicker").innerText = ticker;
        
        const latestYearData = company.History[company.History.length - 1];
        
        // Update Stats Grid with count-up animations
        animateCount("statMarketCap", company.MarketCap, "₹", " Cr");
        animateCount("statCMP", company.CMP, "₹", "");
        animateCount("statPE", parseFloat(company.PE_FY25) || 0, "", "", true);
        animateCount("statBookValue", company.BookValue, "₹", "");
        animateCount("statROCE", latestYearData.ROCE, "", "%", true);
        animateCount("statROE", latestYearData.ROE, "", "%", true);
        
        // Update color indicator for stats (ROE/ROCE)
        const roceElement = document.getElementById("statROCE");
        const roeElement = document.getElementById("statROE");
        roceElement.className = latestYearData.ROCE >= 20 ? "stat-value text-green" : "stat-value text-red";
        roeElement.className = latestYearData.ROE >= 15 ? "stat-value text-green" : "stat-value text-red";

        // Redraw charts
        renderCharts(company.History);

        // Fill Profit & Loss table
        renderPLTable(company.History);

        // Highlight row in peer table
        highlightPeerRow(ticker);

        // Set up DuPont slider actuals
        initDupontSliders(latestYearData);

        // Load Story Inferences
        document.getElementById("storyContent").innerHTML = companyStories[ticker];

        // Update Chart Insights dynamically
        const insights = chartInsights[ticker];
        if (insights) {
            document.querySelector("#growthChartInsight .insight-text").innerText = insights.growth;
            document.querySelector("#marginChartInsight .insight-text").innerText = insights.margin;
            document.querySelector("#efficiencyChartInsight .insight-text").innerText = insights.efficiency;
        }
        
        if (contentArea) {
            contentArea.classList.remove("fade-hidden");
        }
    }, 200);
}

// 4. CHART RENDERING MODULE (Chart.js)
function renderCharts(historyData) {
    const years = historyData.map(d => `FY${d.Year}`);
    const sales = historyData.map(d => d.Sales);
    const netProfits = historyData.map(d => d.NetProfit);
    const opm = historyData.map(d => d.OPM);
    const npm = historyData.map(d => d.NPM);
    const roe = historyData.map(d => d.ROE);
    const roce = historyData.map(d => d.ROCE);

    // Destroy existing charts to prevent overlapping rendering on re-initialization
    if (activeCharts.growthChart) activeCharts.growthChart.destroy();
    if (activeCharts.marginChart) activeCharts.marginChart.destroy();
    if (activeCharts.efficiencyChart) activeCharts.efficiencyChart.destroy();

    // Theme-aware Chart colors
    const isDark = document.body.classList.contains('dark-theme');
    const gridColor = isDark ? '#1f2937' : '#f1f5f9';
    const tickColor = isDark ? '#9ca3af' : '#64748b';
    const tooltipBg = isDark ? 'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    const tooltipTitle = isDark ? '#f3f4f6' : '#1e293b';
    const tooltipBody = isDark ? '#9ca3af' : '#475569';
    const tooltipBorder = isDark ? '#374151' : '#e2e8f0';

    // Shared Tooltip & Animation styling
    const sharedTooltipOpts = {
        backgroundColor: tooltipBg,
        titleColor: tooltipTitle,
        titleFont: { family: 'Outfit', weight: 'bold', size: 13 },
        bodyColor: tooltipBody,
        bodyFont: { family: 'Inter', size: 12 },
        borderColor: tooltipBorder,
        borderWidth: 1,
        padding: 12,
        boxPadding: 8,
        usePointStyle: true,
        cornerRadius: 8
    };

    const sharedAnimationOpts = {
        duration: 1200,
        easing: 'easeInOutQuart'
    };

    // Chart 1: Sales & Net Profit Growth (Dual Axis)
    const ctxGrowth = document.getElementById("growthChart").getContext("2d");
    activeCharts.growthChart = new Chart(ctxGrowth, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Sales (Left)',
                    data: sales,
                    borderColor: '#4f46e5', // indigo
                    backgroundColor: 'rgba(79, 70, 229, 0.05)',
                    yAxisID: 'ySales',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.25,
                    pointRadius: 3,
                    pointHoverRadius: 6
                },
                {
                    label: 'Net Profit (Right)',
                    data: netProfits,
                    borderColor: '#10b981', // emerald green
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    yAxisID: 'yProfit',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.25,
                    pointRadius: 3,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: sharedAnimationOpts,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                ySales: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: gridColor },
                    ticks: { color: tickColor, font: { family: 'Inter' } },
                    title: { display: true, text: 'Sales (Cr)', color: tickColor, font: { family: 'Outfit', weight: 'bold', size: 11 } }
                },
                yProfit: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: { color: tickColor, font: { family: 'Inter' } },
                    title: { display: true, text: 'Net Profit (Cr)', color: tickColor, font: { family: 'Outfit', weight: 'bold', size: 11 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: tickColor, font: { family: 'Inter' } }
                }
            },
            plugins: {
                legend: { 
                    position: 'top',
                    labels: { color: tickColor, font: { family: 'Inter', weight: 500 }, boxWidth: 10, usePointStyle: true, pointStyle: 'circle' }
                },
                tooltip: sharedTooltipOpts
            }
        }
    });

    // Chart 2: Margins (%)
    const ctxMargin = document.getElementById("marginChart").getContext("2d");
    activeCharts.marginChart = new Chart(ctxMargin, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Operating Margin (OPM %)',
                    data: opm,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.25,
                    pointRadius: 2,
                    pointHoverRadius: 5
                },
                {
                    label: 'Net Margin (NPM %)',
                    data: npm,
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.05)',
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.25,
                    pointRadius: 2,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: sharedAnimationOpts,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    min: 0,
                    grid: { color: gridColor },
                    ticks: { callback: value => `${value}%`, color: tickColor, font: { family: 'Inter' } },
                    title: { display: true, text: 'Margin (%)', color: tickColor, font: { family: 'Outfit', weight: 'bold', size: 11 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: tickColor, font: { family: 'Inter' } }
                }
            },
            plugins: {
                legend: { 
                    position: 'top',
                    labels: { color: tickColor, font: { family: 'Inter', weight: 500 }, boxWidth: 10, usePointStyle: true, pointStyle: 'circle' }
                },
                tooltip: sharedTooltipOpts
            }
        }
    });

    // Chart 3: Return Ratios (ROE % vs ROCE %)
    const ctxEfficiency = document.getElementById("efficiencyChart").getContext("2d");
    activeCharts.efficiencyChart = new Chart(ctxEfficiency, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'ROCE %',
                    data: roce,
                    backgroundColor: '#818cf8', // light indigo
                    hoverBackgroundColor: '#4f46e5',
                    borderRadius: 6
                },
                {
                    label: 'ROE %',
                    data: roe,
                    backgroundColor: '#34d399', // light emerald
                    hoverBackgroundColor: '#10b981',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: sharedAnimationOpts,
            scales: {
                y: {
                    min: 0,
                    grid: { color: gridColor },
                    ticks: { callback: value => `${value}%`, color: tickColor, font: { family: 'Inter' } },
                    title: { display: true, text: 'Return (%)', color: tickColor, font: { family: 'Outfit', weight: 'bold', size: 11 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: tickColor, font: { family: 'Inter' } }
                }
            },
            plugins: {
                legend: { 
                    position: 'top',
                    labels: { color: tickColor, font: { family: 'Inter', weight: 500 }, boxWidth: 10, usePointStyle: true, pointStyle: 'circle' }
                },
                tooltip: sharedTooltipOpts
            }
        }
    });
}

// 5. RENDER PROFIT & LOSS STATEMENT TABLE
function renderPLTable(historyData) {
    const table = document.getElementById("plTable");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");

    // Clear existing
    thead.innerHTML = "";
    tbody.innerHTML = "";

    // Generate years header row
    let headerRowHTML = "<tr><th>Metric (INR Cr)</th>";
    historyData.forEach(d => {
        headerRowHTML += `<th>FY${d.Year}</th>`;
    });
    headerRowHTML += "</tr>";
    thead.innerHTML = headerRowHTML;

    // Define table rows structure (label, data key, format type)
    const rowSchemas = [
        { label: "Sales (Revenue)", key: "Sales", type: "number" },
        { label: "Expenses", key: "Expenses", type: "number" },
        { label: "Operating Profit", key: "OperatingProfit", type: "number", bold: true },
        { label: "Operating Margin (OPM %)", key: "OPM", type: "percent" },
        { label: "Other Income", key: "OtherIncome", type: "number" },
        { label: "Interest Paid", key: "Interest", type: "number" },
        { label: "Depreciation", key: "Depreciation", type: "number" },
        { label: "Profit Before Tax (PBT)", key: "PBT", type: "number", bold: true },
        { label: "Tax Expense", key: "Tax", type: "number" },
        { label: "Net Profit", key: "NetProfit", type: "number", bold: true },
        { label: "Net Margin (NPM %)", key: "NPM", type: "percent" },
        { label: "Return on Equity (ROE %)", key: "ROE", type: "percent" },
        { label: "Return on Capital (ROCE %)", key: "ROCE", type: "percent" },
        { label: "Debt to Equity Ratio", key: "DebtToEquity", type: "decimal" },
        { label: "Dividend Payout %", key: "DividendPayout", type: "percent" },
        { label: "Year-on-Year Sales Growth", key: "SalesGrowth", type: "growth" },
        { label: "Year-on-Year Profit Growth", key: "ProfitGrowth", type: "growth" }
    ];

    // Build row cells HTML
    let tbodyHTML = "";
    rowSchemas.forEach(schema => {
        let rowClass = schema.bold ? "class='total-row'" : "";
        tbodyHTML += `<tr ${rowClass}><td>${schema.label}</td>`;
        
        historyData.forEach(d => {
            const val = d[schema.key];
            let displayVal = val;
            
            // Format output based on schemas
            if (schema.type === "number") {
                displayVal = val.toLocaleString('en-IN');
            } else if (schema.type === "percent") {
                displayVal = `${val}%`;
            } else if (schema.type === "decimal") {
                displayVal = val.toFixed(2);
            } else if (schema.type === "growth") {
                if (val === 0) {
                    displayVal = "-";
                } else {
                    const arrow = val > 0 ? "▲" : "▼";
                    const colorClass = val > 0 ? "text-green" : "text-red";
                    displayVal = `<span class="${colorClass}">${arrow} ${Math.abs(val)}%</span>`;
                }
            }
            
            tbodyHTML += `<td>${displayVal}</td>`;
        });
        tbodyHTML += "</tr>";
    });
    tbody.innerHTML = tbodyHTML;
}

// 6. RENDER PEER COMPARISON TABLE (Latest year comparison)
function renderPeerTable() {
    const tbody = document.querySelector("#peerTable tbody");
    tbody.innerHTML = "";

    let rowsHTML = "";
    Object.keys(fmcgSectorData).forEach(ticker => {
        const comp = fmcgSectorData[ticker];
        const latest = comp.History[comp.History.length - 1];

        rowsHTML += `
            <tr id="peer-row-${ticker}" data-ticker="${ticker}">
                <td>${ticker}</td>
                <td style="text-align: left">${comp.Name}</td>
                <td data-val="${comp.MarketCap}">₹${comp.MarketCap.toLocaleString('en-IN')} Cr</td>
                <td data-val="${comp.CMP}">₹${comp.CMP.toLocaleString('en-IN')}</td>
                <td data-val="${comp.PE_FY25}">${comp.PE_FY25}</td>
                <td data-val="${comp.PB_FY25}">${comp.PB_FY25}</td>
                <td data-val="${latest.OPM}">${latest.OPM}%</td>
                <td data-val="${latest.ROE}" class="${latest.ROE >= 15 ? 'text-green' : 'text-red'}">${latest.ROE}%</td>
                <td data-val="${latest.ROCE}" class="${latest.ROCE >= 20 ? 'text-green' : 'text-red'}">${latest.ROCE}%</td>
            </tr>
        `;
    });
    tbody.innerHTML = rowsHTML;

    // Highlight row matching current selected ticker
    highlightPeerRow(currentTicker);
    
    // Bind click events on rows in the peer comparison to select company
    document.querySelectorAll("#peerTable tbody tr").forEach(row => {
        row.style.cursor = "pointer";
        row.addEventListener("click", () => {
            const ticker = row.getAttribute("data-ticker");
            // Set active class on corresponding sidebar tab
            document.querySelectorAll("#companyTabs .tab-btn").forEach(b => {
                if (b.getAttribute("data-ticker") === ticker) {
                    b.classList.add("active");
                } else {
                    b.classList.remove("active");
                }
            });
            switchCompany(ticker);
        });
    });
}

function highlightPeerRow(ticker) {
    document.querySelectorAll("#peerTable tbody tr").forEach(row => {
        row.classList.remove("current-peer");
    });
    const activeRow = document.getElementById(`peer-row-${ticker}`);
    if (activeRow) activeRow.classList.add("current-peer");
}

// Peer Table Sorting function
function sortPeerTable(colIndex, type) {
    const table = document.getElementById("peerTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    
    // Determine sort direction (ASC/DESC toggle)
    const isAscending = !sortDirection[colIndex];
    sortDirection[colIndex] = isAscending;

    // Remove sorting indicators on headers and add to the clicked one
    const ths = table.querySelectorAll("thead th");
    ths.forEach((th, idx) => {
        let text = th.innerText.replace(/ [▲▼]/, "").replace(/ [▼▲]/, "").trim();
        let icon = " <i class='fa-solid fa-sort'></i>";
        if (idx === colIndex) {
            icon = isAscending ? " <i class='fa-solid fa-sort-up'></i>" : " <i class='fa-solid fa-sort-down'></i>";
        }
        th.innerHTML = th.innerHTML.split("<")[0] + icon;
    });

    // Sorting algorithm
    rows.sort((a, b) => {
        let cellA = a.cells[colIndex];
        let cellB = b.cells[colIndex];
        
        let valA = cellA.getAttribute("data-val") || cellA.innerText.trim();
        let valB = cellB.getAttribute("data-val") || cellB.innerText.trim();

        if (type === "number") {
            return isAscending ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
        } else {
            return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });

    // Re-append sorted rows
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

// 7. DUPONT ANALYSIS INTERACTIVE WIDGET
function initDupontSliders(latestData) {
    // Populate slider values from actual company data
    const npmSlider = document.getElementById("dupontNPM");
    const assetSlider = document.getElementById("dupontAssetTurn");
    const EMslider = document.getElementById("dupontLeverage");

    npmSlider.value = latestData.NPM;
    assetSlider.value = latestData.AssetTurnover;
    EMslider.value = latestData.EquityMultiplier;

    // Set limits dynamically if needed (or stick to standard range)
    document.getElementById("actualROE").innerText = `${latestData.ROE.toFixed(2)}%`;

    updateDupontCalculation();
}

function updateDupontCalculation() {
    const npm = parseFloat(document.getElementById("dupontNPM").value);
    const assetTurn = parseFloat(document.getElementById("dupontAssetTurn").value);
    const EM = parseFloat(document.getElementById("dupontLeverage").value);

    // Update slider UI labels
    document.getElementById("valNPM").innerText = `${npm.toFixed(1)}%`;
    document.getElementById("valAssetTurn").innerText = assetTurn.toFixed(2);
    document.getElementById("valLeverage").innerText = EM.toFixed(2);

    // Update horizontal visual gauges
    // NPM range: 0 to 40
    const npmPct = (npm / 40) * 100;
    // AssetTurn range: 0.1 to 4.0 (diff = 3.9)
    const assetPct = ((assetTurn - 0.1) / 3.9) * 100;
    // Leverage range: 1.0 to 5.0 (diff = 4.0)
    const leveragePct = ((EM - 1.0) / 4.0) * 100;

    document.getElementById("barNPM").style.width = `${npmPct}%`;
    document.getElementById("barAssetTurn").style.width = `${assetPct}%`;
    document.getElementById("barLeverage").style.width = `${leveragePct}%`;

    // Formula: ROE = NPM * AssetTurnover * EquityMultiplier
    const simulatedROE = npm * assetTurn * EM;

    // Display result
    const simulatedROEElement = document.getElementById("simulatedROE");
    simulatedROEElement.innerText = `${simulatedROE.toFixed(2)}%`;

    // Update simulated ROE gauge (relative to 100% max)
    const simulatedROEPct = Math.min((simulatedROE / 100) * 100, 100);
    document.getElementById("barSimulatedROE").style.width = `${simulatedROEPct}%`;

    // Update actual ROE gauge
    const actualROEText = document.getElementById("actualROE").innerText;
    const actualROEVal = parseFloat(actualROEText) || 0;
    const actualROEPct = Math.min((actualROEVal / 100) * 100, 100);
    document.getElementById("barActualROE").style.width = `${actualROEPct}%`;

    // Visual coloring indicator
    if (simulatedROE >= 25) {
        simulatedROEElement.className = "calc-value text-green";
    } else if (simulatedROE < 12) {
        simulatedROEElement.className = "calc-value text-red";
    } else {
        simulatedROEElement.className = "calc-value";
    }
}

// 8. TOAST NOTIFICATION UTILITY
function showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
    
    const toast = document.createElement("div");
    toast.style.cssText = `
        background-color: var(--bg-card);
        color: var(--text-main);
        border-left: 4px solid ${type === "success" ? "var(--success)" : "var(--primary)"};
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        padding: 12px 18px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        font-family: 'Inter', sans-serif;
        font-size: 12.5px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        transform: translateX(120%);
        transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    const icon = document.createElement("i");
    icon.className = type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-circle-info";
    icon.style.color = type === "success" ? "#10b981" : "#4f46e5";
    
    toast.appendChild(icon);
    
    const textSpan = document.createElement("span");
    textSpan.innerText = message;
    toast.appendChild(textSpan);
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = "translateX(0)";
    }, 50);
    
    setTimeout(() => {
        toast.style.transform = "translateX(120%)";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 2800);
}
