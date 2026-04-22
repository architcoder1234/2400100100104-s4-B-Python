// ── finance.data.js ──────────────────────────────────────────
// Exchange rates and currency options for FinanceConverter.jsx.
// Update the RATES object here to change exchange values.
// ─────────────────────────────────────────────────────────────

/** Approximate static exchange rates (update manually as needed) */
export const RATES = {
  USD: { INR: 83.5,  EUR: 0.92,  GBP: 0.79  },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
  EUR: { USD: 1.08,  INR: 90.2,  GBP: 0.86  },
};

export const CURRENCIES = [
  { value: 'USD', label: '🇺🇸 USD - US Dollar'   },
  { value: 'INR', label: '🇮🇳 INR - Indian Rupee' },
  { value: 'EUR', label: '🇪🇺 EUR - Euro'         },
];

/** Perform the conversion */
export function convertCurrency(amount, from, to) {
  if (from === to) return Number(amount);
  return Number(amount) * (RATES[from]?.[to] ?? 1);
}
