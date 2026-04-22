// ── units.data.js ────────────────────────────────────────────
// Conversion ratios and unit options for UnitConverter.jsx.
// Edit this file to add new units or fix ratios.
// ─────────────────────────────────────────────────────────────

export const CONVERSIONS = {
  length: {
    meters: { feet: 3.28084,     miles: 0.000621371, km: 0.001      },
    feet:   { meters: 0.3048,    miles: 0.000189394, km: 0.0003048  },
    km:     { meters: 1000,      feet: 3280.84,      miles: 0.621371 },
  },
  weight: {
    kg:    { lbs: 2.20462,  grams: 1000,     oz: 35.274  },
    lbs:   { kg: 0.453592,  grams: 453.592,  oz: 16      },
    grams: { kg: 0.001,     lbs: 0.00220462, oz: 0.035274},
  },
};

/** Unit options per mode */
export const UNIT_OPTIONS = {
  length: [
    { value: 'meters', label: 'Meters (m)'       },
    { value: 'feet',   label: 'Feet (ft)'         },
    { value: 'km',     label: 'Kilometers (km)'   },
    { value: 'miles',  label: 'Miles (mi)'        },  // result-side only
  ],
  weight: [
    { value: 'kg',    label: 'Kilograms (kg)' },
    { value: 'lbs',   label: 'Pounds (lbs)'   },
    { value: 'grams', label: 'Grams (g)'      },
    { value: 'oz',    label: 'Ounces (oz)'    },
  ],
  temp: [
    { value: 'C', label: 'Celsius (°C)'     },
    { value: 'F', label: 'Fahrenheit (°F)'  },
  ],
};

/** Default from/to pair for each mode */
export const MODE_DEFAULTS = {
  length: { from: 'meters', to: 'feet'  },
  weight: { from: 'kg',     to: 'lbs'   },
  temp:   { from: 'C',      to: 'F'     },
};

/** Convert a value between two units */
export function convert(value, from, to, mode) {
  if (from === to) return Number(value);
  if (mode === 'temp') {
    if (from === 'C' && to === 'F') return (Number(value) * 9 / 5) + 32;
    if (from === 'F' && to === 'C') return (Number(value) - 32) * 5 / 9;
    return Number(value);
  }
  return Number(value) * (CONVERSIONS[mode]?.[from]?.[to] ?? 1);
}
