function partition(arr, low, high) {
  let pivot = arr[high];

  let inputCopy = [...arr];
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
      inputCopy = [...arr];
      swap(arr, i, j);
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
    inputCopy = [...arr];
  }
  swap(arr, i + 1, high);
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
  console.log("Pivot", pivot, i + 1, inputCopy);
  return i + 1;
}

function merge(array, left, mid, right) {
  let subArrayOneLength = mid - left + 1;
  let subArrayTwoLength = right - mid;
  let inputCopy, inputLeftCopy, inputRightCopy;

  let indexOfSubArrayOne = 0,
    indexOfSubArrayTwo = 0;
  let indexOfMergedArray = left;

  let leftArray = [],
    rightArray = [];

  for (let i = 0; i < subArrayOneLength; i++) leftArray[i] = array[left + i];

  for (let j = 0; j < subArrayTwoLength; j++)
    rightArray[j] = array[mid + 1 + j];

  inputCopy = [...array];
  inputLeftCopy = [...leftArray];
  inputRightCopy = [...rightArray];

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
      inputCopy = [...array];
      inputLeftCopy = [...leftArray];
      array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
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

      inputCopy = [...array];
      inputRightCopy = [...rightArray];
      array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
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

    inputCopy = [...array];
    inputLeftCopy = [...leftArray];
    array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
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

    inputCopy = [...array];
    inputRightCopy = [...rightArray];
    array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
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

function heapify(arr, n, i) {
  largest = i;
  l = 2 * i + 1;
  r = 2 * i + 2;
  let inputCopy = [...arr];

  if (l < n && arr[l] > arr[largest]) {
    largest = l;
  }

  if (r < n && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest != i) {
    swap(arr, i, largest);

    heapify(arr, n, largest);
  }
  console.log(inputCopy, i);
}

function swap(input, xp, yp) {
  temp = input[xp];
  input[xp] = input[yp];
  input[yp] = temp;
}
