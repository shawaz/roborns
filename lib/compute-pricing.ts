/**
 * Commercial list prices for /server.
 * Change rates here; the page reads only this file.
 *
 * Colocation power is not priced. The page states that electricity is passed
 * through at the Karnataka HT-2(a) industrial tariff. That treatment is an
 * assumption until the owner confirms the tariff.
 */

export const INR_PER_USD = 93.5;

export const HOURS_PER_MONTH = 730;

export const CONTRACT_TERMS = [
  { months: 3, label: "3 Months", discount: 0 },
  { months: 12, label: "12 Months", discount: 0.1 },
  { months: 36, label: "36 Months", discount: 0.25 },
] as const;

export const COLOCATION = {
  rateMinInrPerKwMonth: 14_000,
  rateMaxInrPerKwMonth: 18_000,
  rateDefaultInrPerKwMonth: 14_000,
  rateStepInr: 500,
  maxKwPerRack: 100,
  // Slider ceiling matches the 10 MW upper end already published on the homepage.
  kwMin: 50,
  kwMax: 10_000,
  kwStep: 50,
  kwDefault: 100,
  kwPerRackMin: 10,
  kwPerRackStep: 5,
  rackMin: 1,
  rackMax: 100,
  rackDefault: 1,
  included: ["Rack space", "Immersion cooling", "Network"] as const,
  powerPassthrough:
    "Power is not included. It is passed through at the Karnataka HT-2(a) industrial tariff.",
} as const;

export const GPU_RENTAL = [
  { id: "h100", name: "NVIDIA H100 SXM5", memory: "80GB HBM3", usdPerGpuHour: 3.5 },
  { id: "h200", name: "NVIDIA H200 SXM5", memory: "141GB HBM3e", usdPerGpuHour: 4.75 },
  { id: "b200", name: "NVIDIA B200", memory: "192GB HBM3e", usdPerGpuHour: 6 },
] as const;

export const RENTAL_GPU_COUNT = {
  min: 8,
  max: 512,
  step: 8,
  default: 64,
} as const;

export function formatInr(amount: number) {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatUsd(amount: number, digits = 0) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function inrToUsd(amountInr: number) {
  return amountInr / INR_PER_USD;
}

export function discounted(amount: number, discount: number) {
  return amount * (1 - discount);
}
