export default class Number {
  static humanize(n) {
    if (n < 1000) {
      return n;
    } else if (n < 1000000) {
      return `${(n / 1000).toFixed(1)}K`;
    } else {
      return `${(n / 1000000).toFixed(1)}M`;
    }
  }
}
