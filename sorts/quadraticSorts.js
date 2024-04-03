module.exports = class Quadratic {
  constructor(array) {
    this.array = array;
  }
  bubbleSort() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length - i - 1; j++) {
        if (this.array[j] > this.array[j + 1]) {
          [this.array[j], this.array[j + 1]] = [
            this.array[j + 1],
            this.array[j],
          ];
        }
      }
    }
    return this.array;
  }
  insertionSort() {
    for (let i = 0; i < this.array.length; i++) {
      let aMax = this.array[i];
      let iMax = i;
      for (let j = i + 1; j < this.array.length; j++) {
        if (this.array[j] > aMax) {
          aMax = this.array[j];
          iMax = j;
        }
      }
      this.array[i] = aMax;
      this.array[iMax] = this.array[i];
    }
    return this.array;
  }
  selectionSort() {
    for (let i = 0; i < this.array.length; i++) {
      let min = i;
      for (let j = i + 1; j < this.array.length; j++) {
        if (this.array[j] < this.array[min]) {
          min = j;
        }
      }
      // === Optimization 1 ===
      if (min !== i) {
        [this.array[i], this.array[min]] = [this.array[min], this.array[i]];
      }
      // === Old version without checking if a current element is already in a right position ===
      // this.array[i] = this.array[min];
      // this.array[min] = this.array[i];
    }
    return this.array;
  }

  gnomeSort() {
    let current = 1;
    let next = 2;
    while (current < this.array.length) {
      if (this.array[current - 1] < this.array[current]) {
        current = next;
        next = next + 1;
      } else {
        // === Optimization 1 ===
        [
          this.array[current - 1],
          (this.array[current] = this.array[current]),
          this.array[current - 1],
        ];
        current -= 1;

        // === old code ===
        // let temp = this.array[current- 1];
        // this.array[current- 1] = this.array[i];
        // this.array[i] = temp;

        // === Optimization 2 ===
        if (current === 0) {
          current = next;
          next = next + 1;
        }
      }
    }
    return this.array;
  }
};
