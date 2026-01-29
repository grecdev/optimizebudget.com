/**
 * Source: Graphics Gems edited by Andrew S. Glassner.
 * https://theswissbay.ch/pdf/Gentoomen%20Library/Game%20Development/Programming/Graphics%20Gems%201.pdf
 *
 * When creating a graph by computer, it is desirable to label the x and y
 * axes with “nice” numbers: simple decimal numbers.
 *
 * The primary observation is that the “nicest” numbers in decimal are:
 * 1, 2, 5, and all power-of-ten multiples of these numbers (10^x).
 */

const DEFAULT_TICKS = 10;

/**
 * @summary - "Pretty" our target number
 *
 * @param {number} target - The number we want to change.
 * @param {boolean} round - We can specify if our target number needs to be rounded.
 *
 * @public
 * @returns {number} - A "nice" number.
 */
function niceNum(target: number, round: boolean): number {
  let niceFraction;

  const EXPONENT = Math.floor(Math.log10(target));
  const FRACTION = target / Math.pow(10, EXPONENT);

  if (round) {
    if (FRACTION < 1.5) {
      niceFraction = 1;
    } else if (FRACTION < 3) {
      niceFraction = 2;
    } else if (FRACTION < 7) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  } else {
    if (FRACTION <= 1) {
      niceFraction = 1;
    } else if (FRACTION <= 2) {
      niceFraction = 2;
    } else if (FRACTION <= 5) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  }

  return niceFraction * Math.pow(10, EXPONENT);
}

/**
 * @summary - Generate an array with "nice" numbers.
 *
 * Used when we want to render numbers on x and y axes.
 *
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @param {number} [totalTicks=10] - Total ticks or labels if you want.
 *
 * @public
 * @returns {Array<number>}
 */
function generateNiceNumbersArray(
  min: number,
  max: number,
  totalTicks: number = DEFAULT_TICKS
): Array<number> {
  const VALUES: Array<number> = [];
  const RANGE = niceNum(max - min, false);
  const TICK_MARK_SPACING = niceNum(RANGE / (totalTicks - 1), true);

  // Round up or down to the nearest multiple of X.
  const GRAPH_MIN = Math.floor(min / TICK_MARK_SPACING) * TICK_MARK_SPACING;
  const GRAPH_MAX = Math.ceil(max / TICK_MARK_SPACING) * TICK_MARK_SPACING;

  for (let i = GRAPH_MIN; i <= GRAPH_MAX + 0.5 * TICK_MARK_SPACING; i += TICK_MARK_SPACING) {
    VALUES.push(i);
  }

  return VALUES;
}

export { DEFAULT_TICKS, generateNiceNumbersArray };
