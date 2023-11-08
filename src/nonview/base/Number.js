const PRECISION = 0;
export default class Number {
  static humanize(n) {
    if (n < 1000) {
      return n;
    } else if (n < 1000000) {
      return `${(n / 1000).toFixed(PRECISION)}K`;
    } else {
      return `${(n / 1000000).toFixed(PRECISION)}M`;
    }
  }
}
