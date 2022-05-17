function partition(arr, low, high, original) {
  let pivot = arr[high];

  let inputCopy = [...original];
  let i = low - 1;
  // console.log("Pivot", pivot, i, inputCopy);

  algorithmSimData.algorithmSequenceInitialInstance.push([
    "assign",
    high,
    high,
    `outerrecursionloop0 ${low}${high}`,
    low,
    high,
    high - 1,
    inputCopy,
    high,
  ]);

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      inputCopy = [...original];
      swap(arr, i, j);
      swap(original, i, j);
      algorithmSimData.algorithmSequenceInitialInstance.push([
        "swap",
        i,
        j,
        `innerloop0 ${i}${j}`,
        low,
        high,
        high - 1,
        inputCopy,
        high,
      ]);
    }
    inputCopy = [...original];
  }
  swap(arr, i + 1, high);
  swap(original, i + 1, high);
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "swap",
    i + 1,
    high,
    `outerrecursionloop0 ${low}${high}`,
    low,
    high,
    high - 1,
    inputCopy,
    high,
  ]);
  // console.log("Pivot", pivot, i + 1, inputCopy);
  return i + 1;
}

function merge(array, left, mid, right, original) {
  let subArrayOneLength = mid - left + 1;
  let subArrayTwoLength = right - mid;
  let inputCopy, inputLeftCopy, inputRightCopy;

  let indexOfSubArrayOne = 0,
    indexOfSubArrayTwo = 0;
  let indexOfMergedArray = left;

  let leftArray = [],
    leftOriginal = [],
    rightArray = [],
    rightOriginal = [];

  for (let i = 0; i < subArrayOneLength; i++) {
    leftArray[i] = array[left + i];
    leftOriginal[i] = original[left + i];
  }

  for (let j = 0; j < subArrayTwoLength; j++) {
    rightArray[j] = array[mid + 1 + j];
    rightOriginal[j] = original[mid + 1 + j];
  }

  inputCopy = [...original];
  inputLeftCopy = [...leftOriginal];
  inputRightCopy = [...rightOriginal];

  //create extra elements
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "create",
    indexOfMergedArray,
    indexOfSubArrayOne,
    `mergeloop0 ${indexOfMergedArray}${indexOfSubArrayTwo}`,
    left,
    mid,
    right,
    inputCopy,
    null,
    [inputLeftCopy, inputRightCopy],
  ]);

  // console.log(array);

  while (
    indexOfSubArrayOne < subArrayOneLength &&
    indexOfSubArrayTwo < subArrayTwoLength
  ) {
    if (leftArray[indexOfSubArrayOne] <= rightArray[indexOfSubArrayTwo]) {
      // console.log("left");
      inputCopy = [...original];
      inputLeftCopy = [...leftOriginal];
      array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
      original[indexOfMergedArray] = leftOriginal[indexOfSubArrayOne];
      algorithmSimData.algorithmSequenceInitialInstance.push([
        "assign",
        indexOfSubArrayOne,
        indexOfMergedArray,
        `mergeloop0 ${indexOfMergedArray}${indexOfSubArrayTwo}`,
        left,
        mid,
        right,
        inputCopy,
        null,
        [inputLeftCopy],
        0,
      ]);
      indexOfSubArrayOne++;
    } else {
      // console.log("right");

      inputCopy = [...original];
      inputRightCopy = [...rightOriginal];
      array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
      original[indexOfMergedArray] = rightOriginal[indexOfSubArrayTwo];
      algorithmSimData.algorithmSequenceInitialInstance.push([
        "assign",
        indexOfSubArrayTwo,
        indexOfMergedArray,
        `mergeloop0 ${indexOfMergedArray}${indexOfSubArrayTwo}`,
        left,
        mid,
        right,
        inputCopy,
        null,
        [inputRightCopy],
        1,
      ]);
      indexOfSubArrayTwo++;
    }
    indexOfMergedArray++;
    // console.log(array);
  }

  while (indexOfSubArrayOne < subArrayOneLength) {
    console.log(
      "Suspected merge : ",
      array[indexOfMergedArray],
      leftArray[indexOfSubArrayOne]
    );

    inputCopy = [...original];
    inputLeftCopy = [...leftOriginal];
    array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
    original[indexOfMergedArray] = leftOriginal[indexOfSubArrayOne];
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "assign",
      indexOfSubArrayOne,
      indexOfMergedArray,
      `mergeloop0 ${indexOfMergedArray}${indexOfSubArrayTwo}`,
      left,
      mid,
      right,
      inputCopy,
      null,
      [inputLeftCopy],
      0,
    ]);
    indexOfSubArrayOne++;
    indexOfMergedArray++;
    // console.log(array);
  }

  while (indexOfSubArrayTwo < subArrayTwoLength) {
    console.log(
      "Suspected merge : ",
      array[indexOfMergedArray],
      rightArray[indexOfSubArrayTwo]
    );

    inputCopy = [...original];
    inputRightCopy = [...rightOriginal];
    array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
    original[indexOfMergedArray] = rightOriginal[indexOfSubArrayTwo];
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "assign",
      indexOfSubArrayTwo,
      indexOfMergedArray,
      `mergeloop0 ${indexOfMergedArray}${indexOfSubArrayTwo}`,
      left,
      mid,
      right,
      inputCopy,
      null,
      [inputRightCopy],
      1,
    ]);
    indexOfSubArrayTwo++;
    indexOfMergedArray++;
    // console.log(array);
  }
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "scopeout",
    left,
    right,
    `mergeloop0 ${indexOfMergedArray}${indexOfSubArrayTwo}`,
    left,
    mid,
    right,
    inputCopy,
  ]);
  // console.log(array);
}

function heapify(arr, n, i, original) {
  largest = i;
  l = 2 * i + 1;
  r = 2 * i + 2;
  let inputCopy = [...original];

  if (l < n && arr[l] > arr[largest]) {
    largest = l;
  }

  if (r < n && arr[r] > arr[largest]) {
    largest = r;
  }

  algorithmSimData.algorithmSequenceInitialInstance.push([
    "information",
    i,
    largest,
    `heapify ${i}${n}`,
    l,
    r,
    2,
    inputCopy,
    null,
  ]);

  if (largest != i) {
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "swap",
      i,
      largest,
      `heapify ${i}${n}`,
      l,
      r,
      r,
      inputCopy,
      null,
    ]);

    swap(arr, i, largest);
    swap(original, i, largest);
    inputCopy = [...original];
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "information",
      largest,
      i,
      `heapify ${i} hf`,
      n,
      n,
      0,
      inputCopy,
      null,
    ]);

    heapify(arr, n, largest, original);
  } else {
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "information",
      i,
      largest,
      `heapify ${i} hfe`,
      n,
      n,
      1,
      inputCopy,
      null,
    ]);
  }
  // console.log(arr, i);
}

function swap(input, xp, yp) {
  temp = input[xp];
  input[xp] = input[yp];
  input[yp] = temp;
}
