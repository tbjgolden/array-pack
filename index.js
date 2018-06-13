/* eslint-disable no-extend-native */

Array.prototype.pack = function (binMaxSize, sizeFunction) {
  sizeFunction = sizeFunction || (el => el);

  const original = this.map(el => [el, sizeFunction(el)]).sort((a, b) => a[1] - b[1]);
  if (!binMaxSize || binMaxSize < 0) binMaxSize = original.length ? original[0][1] : 0;

  const bins = [];
  while (original.length) {
    const nextLargest = original.pop();
    const binIndex = bins.findIndex(bin => bin.total + nextLargest[1] <= binMaxSize);
    if (~binIndex) {
      bins[binIndex].items.push(nextLargest[0]);
      bins[binIndex].total += nextLargest[1];
    } else {
      bins.push({ items: [nextLargest[0]], total: nextLargest[1] });
    }
  }

  return bins.map(bin => bin.items);
};
