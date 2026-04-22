// ── math.utils.js ────────────────────────────────────────────
// Calculator and Armstrong number logic for MathTools.jsx.
// ─────────────────────────────────────────────────────────────

/** Handle a calculator button press. Returns { display, equation } */
export function handleCalcButton(val, display, equation) {
  if (val === 'C')  return { display: '0', equation: '' };
  if (val === '=') {
    try {
      // eslint-disable-next-line no-eval
      const res = eval(equation + display);
      return { display: String(res), equation: '' };
    } catch {
      return { display: 'Error', equation: '' };
    }
  }
  if (['+', '-', '*', '/'].includes(val)) {
    return { display: '0', equation: display + ' ' + val + ' ' };
  }
  return { display: display === '0' ? val : display + val, equation };
}

/** Check whether a number string is an Armstrong number */
export function isArmstrong(val) {
  if (!val) return null;
  const digits = val.split('');
  const power  = digits.length;
  const sum    = digits.reduce((acc, d) => acc + Math.pow(parseInt(d), power), 0);
  return sum === parseInt(val);
}

/** Calculator button grid layout */
export const CALC_BUTTONS = ['7','8','9','/','4','5','6','*','1','2','3','-','0','C','=','+'];
