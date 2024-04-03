const {
  getDigit,
  mostDigits,
  pivot,
  div,
  uniteBothSorted,
} = require("./../utils");

module.exports = class nLogNSorts {
  constructor(array) {
    this.array = array;
  }
  quickSort(left = 0, right = this.array.length - 1) {
    if (left < right) {
      let pivotIndex = pivot(this.array, left, right); //3
      //left
      this.quickSort(this.array, left, pivotIndex - 1);
      //right
      this.quickSort(this.array, pivotIndex + 1, right);
    }
    return this.array;
  }
  // === По какой - то причине mergeSort вызванный через класс выдает HeapOutOfMemoryError
  // === Поэтому этот же алгоритм реализован отдельной функцией ниже в отдельном классе MergeSort
  //mergeSort() {...}

  radixSort() {
    let maxDigitCount = mostDigits(this.array);
    for (let i = 0; i < maxDigitCount; i++) {
      let digitBuckets = Array.from({ length: 10 }, () => []);
      for (let j = 0; j < this.array.length; j++) {
        let digit = getDigit(this.array[j], i);
        digitBuckets[digit].push(this.array[j]);
      }
      this.array = [].concat(...digitBuckets);
    }
    return this.array;
  }
  shellSort() {
    let gap = Math.floor(this.array.length / 2);
    while (gap > 0) {
      for (let i = gap; i < this.array.length; i++) {
        let j = i;
        while (j >= gap && this.array[j - gap] > this.array[j]) {
          [this.array[j], this.array[j - gap]] = [
            this.array[j - gap],
            this.array[j],
          ];
          j -= gap;
        }
      }
      gap = Math.floor(gap / 2);
    }
    return this.array;
  }
  tournamentSort() {
    const buildTournament = (arr) => {
      const n = arr.length;
      const m = n * 2 - 1;
      const tree = new Array(m).fill(null);

      // Initialize leaves of the tournament tree
      for (let i = 0; i < n; i++) {
        tree[n - 1 + i] = { index: i, value: arr[i] };
      }

      // Build the tournament tree by comparing elements
      for (let i = n - 2; i >= 0; i--) {
        const left = tree[2 * i + 1];
        const right = tree[2 * i + 2];
        tree[i] = left.value < right.value ? left : right;
      }

      return tree;
    };

    const replaceWinner = (tree, size, index) => {
      let i = index + size - 1; // Get the index in the tree
      tree[i] = { index: null, value: Infinity }; // Replace with infinity to simulate removal

      // Rebuild the path from the replaced node to the root
      while (i > 0) {
        i = Math.floor((i - 1) / 2);
        const left = tree[2 * i + 1];
        const right = tree[2 * i + 2];
        tree[i] = left.value < right.value ? left : right;
      }
    };

    const sortedArray = new Array(this.array.length);
    const tree = buildTournament(this.array);

    for (let i = 0; i < this.array.length; i++) {
      const winner = tree[0];
      sortedArray[i] = winner.value;
      replaceWinner(tree, this.array.length, winner.index);
    }

    this.array = sortedArray; // Update the original array
    return this.array;
  }

  heapSort() {
    let heap = new Heap([]);
    for (let el of this.array) {
      heap.insert(el);
    }
    for (let i = this.array.length - 1; i >= 0; i--) {
      this.array[i] = heap.deleteRoot();
    }
    return this.array;
  }
};

class MergeSort {
  sort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    this.sort(leftHalf);
    this.sort(rightHalf);

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < leftHalf.length && j < rightHalf.length) {
      if (leftHalf[i] < rightHalf[j]) {
        arr[k] = leftHalf[i];
        i++;
      } else {
        arr[k] = rightHalf[j];
        j++;
      }
      k++;
    }

    while (i < leftHalf.length) {
      arr[k] = leftHalf[i];
      i++;
      k++;
    }

    while (j < rightHalf.length) {
      arr[k] = rightHalf[j];
      j++;
      k++;
    }

    return arr;
  }
}

class Heap {
  constructor(array) {
    this.values = array;
  }
  insert(value) {
    this.values.push(value);
    this.bubbleUp(value);
  }
  bubbleUp(value) {
    let index = this.values.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (this.values[parentIndex] < value && parentIndex >= 0) {
      this.values[index] = this.values[parentIndex];
      this.values[parentIndex] = value;
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }
  deleteRoot() {
    const root = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return root;
  }
  bubbleDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}
