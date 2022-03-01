function merge(array, left, mid, right, originalInput) {
  let subArrayOne = mid - left + 1;
  let subArrayTwo = right - mid;

  let leftArray = [],
    rightArray = [];

  for (let i = 0; i < subArrayOne; i++) leftArray[i] = array[left + i];

  for (let j = 0; j < subArrayTwo; j++) rightArray[j] = array[mid + 1 + j];

  let indexOfSubArrayOne = 0,
    indexOfSubArrayTwo = 0;
  let indexOfMergedArray = left;

  while (indexOfSubArrayOne < subArrayOne && indexOfSubArrayTwo < subArrayTwo) {
    if (leftArray[indexOfSubArrayOne] <= rightArray[indexOfSubArrayTwo]) {
      array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
      indexOfSubArrayOne++;
    } else {
      array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
      indexOfSubArrayTwo++;
    }
    indexOfMergedArray++;
    backupVariables.globalteration++;
  }

  while (indexOfSubArrayOne < subArrayOne) {
    array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
    indexOfSubArrayOne++;
    indexOfMergedArray++;
  }

  while (indexOfSubArrayTwo < subArrayTwo) {
    array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
    indexOfSubArrayTwo++;
    indexOfMergedArray++;
  }
  backupVariables.globalteration++;
}

function partition(arr, low, high, originalInput) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++, backupVariables.globalteration++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  backupVariables.globalteration++;
  return i + 1;
}

function heapify(arr, n, i, originalInput) {
  largest = i;
  l = 2 * i + 1;
  r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) {
    largest = l;
  }

  if (r < n && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest != i) {
    swap(arr, i, largest);

    heapify(arr, n, largest, originalInput);
  }
  backupVariables.globalteration++;
}

function swap(input, xp, yp) {
  temp = input[xp];
  input[xp] = input[yp];
  input[yp] = temp;
}
