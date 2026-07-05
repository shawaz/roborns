// Physics/chemistry calc engine for the cooling & desalination loop simulation.
// Formulas and constants mirror §5 of ~/Documents/Roborns/Cooling_Desalination_Process_Technical.md,
// which sources every figure from app/server/page.tsx, app/water/page.tsx, app/mineral/page.tsx,
// app/page.tsx (home), and the internal financial model.

export const PUE = 1.028; // app/server/page.tsx
export const SEAWATER_FLOW_L_PER_H_PER_KW = 150; // app/server/page.tsx
export const COOLANT_EXIT_TEMP_C = 65; // point value within published 60-70°C range

// Waste-heat ratio: home page states 0.70 (~700kW/MW); the financial model's
// "Heat available (2MW) ~1.6MW thermal" implies 0.80. Per §7.1/§6 of the technical
// doc, 0.80 reproduces the published 50,000 L/day Y1 freshwater target far more
// closely (92.2%) than 0.70 (80.6%), so it's used as the design basis here.
export const WASTE_HEAT_RATIO = 0.80;

export const FRESHWATER_L_PER_KWH_WASTE_HEAT = 1.2; // app/server/page.tsx
export const THERMAL_ENERGY_PER_L_KWH = 0.022; // app/water/page.tsx (informational)
export const CO2_SAVED_KG_PER_L = 0.028; // app/water/page.tsx

export const PLANT_CAPACITY_L_PER_DAY_Y1 = 50000;
export const PLANT_CAPACITY_L_PER_DAY_MAX = 150000; // app/water/page.tsx

export const BRINE_CONCENTRATION_FACTOR = 35; // financial model "Mineral assumptions"
export const BRINE_M3_PER_TONNE_CRYSTALLIZED = 18; // app/mineral/page.tsx

// Mineral recovery rates and Y3 reference yields at 150,000 L/day freshwater output.
// Other loads scale these linearly by (freshwaterLitersDay / 150000) — a calc-engine
// simplification flagged in §7.4 of the technical doc, pending a real brine mass-balance.
export const MINERAL_RECOVERY_RATES = {
  nacl: 0.92,
  mgOh2: 0.78,
  bromine: 0.80,
};

export const REFERENCE_YIELDS_KG_PER_DAY_AT_150K = {
  nacl: 8000,
  mgOh2: 1200,
  bromine: 120,
};

export interface SimulationResult {
  loadMw: number;
  powerKw: number;
  facilityDrawKw: number;
  seawaterFlowLPerH: number;
  seawaterFlowLPerDay: number;
  wasteHeatKw: number;
  coolantExitTempC: number;
  freshwaterLPerDay: number;
  freshwaterCapped: boolean;
  thermalAbsorbedMwhPerMonth: number;
  co2AvoidedKgPerDay: number;
  mineralYieldsKgPerDay: {
    nacl: number;
    mgOh2: number;
    bromine: number;
  };
  totalCrystallizedKgPerDay: number;
  brineProcessedM3PerDay: number;
}

export function computeSimulation(loadMw: number): SimulationResult {
  const powerKw = loadMw * 1000;
  const facilityDrawKw = powerKw * PUE;

  const seawaterFlowLPerH = powerKw * SEAWATER_FLOW_L_PER_H_PER_KW;
  const seawaterFlowLPerDay = seawaterFlowLPerH * 24;

  const wasteHeatKw = powerKw * WASTE_HEAT_RATIO;

  const freshwaterUncapped = wasteHeatKw * 24 * FRESHWATER_L_PER_KWH_WASTE_HEAT;
  const freshwaterLPerDay = Math.min(freshwaterUncapped, PLANT_CAPACITY_L_PER_DAY_MAX);
  const freshwaterCapped = freshwaterUncapped > PLANT_CAPACITY_L_PER_DAY_MAX;

  const thermalAbsorbedMwhPerMonth = (freshwaterLPerDay * 30.4 * THERMAL_ENERGY_PER_L_KWH) / 1000;
  const co2AvoidedKgPerDay = freshwaterLPerDay * CO2_SAVED_KG_PER_L;

  const scale = freshwaterLPerDay / PLANT_CAPACITY_L_PER_DAY_MAX;
  const mineralYieldsKgPerDay = {
    nacl: REFERENCE_YIELDS_KG_PER_DAY_AT_150K.nacl * scale,
    mgOh2: REFERENCE_YIELDS_KG_PER_DAY_AT_150K.mgOh2 * scale,
    bromine: REFERENCE_YIELDS_KG_PER_DAY_AT_150K.bromine * scale,
  };
  const totalCrystallizedKgPerDay =
    mineralYieldsKgPerDay.nacl + mineralYieldsKgPerDay.mgOh2 + mineralYieldsKgPerDay.bromine;
  const brineProcessedM3PerDay = (totalCrystallizedKgPerDay / 1000) * BRINE_M3_PER_TONNE_CRYSTALLIZED;

  return {
    loadMw,
    powerKw,
    facilityDrawKw,
    seawaterFlowLPerH,
    seawaterFlowLPerDay,
    wasteHeatKw,
    coolantExitTempC: COOLANT_EXIT_TEMP_C,
    freshwaterLPerDay,
    freshwaterCapped,
    thermalAbsorbedMwhPerMonth,
    co2AvoidedKgPerDay,
    mineralYieldsKgPerDay,
    totalCrystallizedKgPerDay,
    brineProcessedM3PerDay,
  };
}
