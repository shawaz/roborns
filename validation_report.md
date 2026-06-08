# Roborns Financial Model — Market Validation Report
**Date:** June 2, 2026  
**Prepared for:** Shawaz  
**Research Source:** Live Indian market data, KERC tariffs, vendor pricing, government scheme documentation

---

## Bottom Line

The core concept is **still viable**, but the financial model needs recalibration on **three critical vectors** before we pitch investors or government bodies.

---

## Critical Revisions Required

### 🔴 1. Industrial Power Cost (Biggest Risk)

| Metric | Model Value | Market Reality | Delta |
|--------|------------|----------------|-------|
| PPA rate | **₹3.0/kWh** | **₹7.00–₹7.65/kWh** | **+133–155%** |
| Source | MESCOM HT grid assumption | KERC FY 2024-25 HT 2a Industrial tariff + FAC charges | — |

**Impact:** Power is the largest opex line item. If it doubles, EBITDA margin drops significantly. Y1 EBITDA might go negative.

**Mitigation:** Three options:
- **Option A:** Dedicated solar/wind PPA + battery storage → targets ₹3.5–4.5/kWh blended (viable but needs land/PPA negotiation)
- **Option B:** Hybrid approach — 50% grid (₹7/kWh) + 50% renewable (₹3/kWh) → blended ~₹5/kWh
- **Option C:** Full grid at ₹7/kWh → model must be completely rebuilt

### 🔴 2. Desalination Water Revenue (100–200x Overestimate)

| Metric | Model Value | Market Reality | Delta |
|--------|------------|----------------|-------|
| Municipal water | **₹6/L** | **₹0.04–0.10/L** (₹40–100/kL) | **~100x lower** |
| Commercial water | **₹12/L** | **₹0.05–2.0/L** | **~10–200x lower** |
| Source | — | Chennai Minjur/Nemmeli SWRO plants, bulk water contract rates | — |

**Impact:** The water revenue line is the most inflated number in the entire model. Y1 water revenue drops from ₹1.5 Cr to potentially ₹1–10 Lakhs at realistic pricing.

**Mitigation:** The value prop needs restructuring:
- Water should be positioned as a **free byproduct of compute**, not a primary revenue driver
- The real revenue is **avoided cost** (free cooling for compute) + **ESG premium pricing** for colocation
- Bottled / specialty industrial water (ultra-pure) could command ₹2–6/L but at much smaller volumes

### 🟡 3. Immersion Cooling CapEx (3x Underestimate)

| Metric | Model Value | Market Reality | Delta |
|--------|------------|----------------|-------|
| 3 tanks at 2MW | **₹3.2 Cr** | **₹8–12 Cr** | **~3x higher** |
| Per MW cost | **₹1.6 Cr/MW** | **₹4–8 Cr/MW** (GRC / LiquidStack global rates) | — |

**Impact:** Building A CapEx increases by ₹5–9 Cr. Total seed raise jumps from ₹25 Cr to ₹30–35 Cr.

### 🟡 4. GPU Colocation Pricing (Moderately Overestimated)

| Metric | Model Value | Market Reality | Delta |
|--------|------------|----------------|-------|
| Colo rate | **₹18K/kW/mo** | **₹12–15K/kW/mo** | **~20% lower** |
| Comparable | — | CtrlS, Yotta, NTT, STT GDC India | — |

**Impact:** Revenue per MW drops. But premium pricing justified by ESG + zero-carbon cooling differential.

---

## What's Accurate ✅

| Assumption | Model Value | Market Reality | Verdict |
|-----------|------------|----------------|---------|
| Mg(OH)₂ price | ₹42,000/tonne | ₹30,000–₹50,000/tonne | ✅ Within range |
| NaCl / KCl / Bromine | Various | Within standard market bands | ✅ Valid |
| Govt grants availability | Assumed available | IndiaAI Mission (₹10,372 Cr), SIDBI, AMRUT 2.0, Startup India | ✅ Valid, must pursue |
| VA Tech Wabag MED skid | ₹3.2 Cr for 50K LPD | Aligns with small-scale MED-TVC pricing | ✅ Valid |

---

## Recommended Model Adjustments

| Line Item | Current Value | Recommended Value | Unit |
|-----------|--------------|-------------------|------|
| Power cost | ₹3.0 | **₹5.5 (blended hybrid)** or **₹7.0 (full grid)** | ₹/kWh |
| GPU colocation | ₹18,000 | **₹14,000** | ₹/kW/mo |
| Municipal water | ₹6.0 | **₹0.10** | ₹/L |
| Commercial water | ₹12.0 | **₹1.50** | ₹/L |
| Immersion cooling (2MW) | ₹3.2 Cr | **₹10 Cr** | Total CapEx |
| Total seed raise | ₹25 Cr | **₹30–35 Cr** | Revised |
| Pre-money valuation | ₹75 Cr | **Needs re-evaluation** | ₹ Cr |

---

## Grant Strategy (No-Cost Path Forward)

| Scheme | Amount | Relevance | Application Window |
|--------|--------|-----------|-------------------|
| **IndiaAI Mission** | Compute subsidy, grants for AI infra | 🎯 **Most relevant — AI compute infrastructure** | Open |
| **SIDBI Clean Tech** | Soft loans up to ₹5 Cr | Cleantech/water integration | Open |
| **Startup India Seed Fund** | Up to ₹50L grant + ₹5 Cr debt | Early-stage validation | Open |
| **AMRUT 2.0** | Water mgmt. tech grants | Desalination / water component | State-specific |
| **Karnataka Industrial Policy** | Capex subsidies, power tariff subsidies | Cleantech thrust sector | Ongoing |

---

## Next Step

Before any outreach, the financial model **must be recalibrated** with corrected assumptions. Pitching investors or government with numbers that are 100–200x off on a major revenue line will destroy credibility.

I recommend:
1. **Rebuild the model** with the recommended values above
2. **Run sensitivity analysis** (best/worst case on power cost)
3. **Publish the corrected model** to hq.codelude.com
4. **Then begin prospect outreach**
