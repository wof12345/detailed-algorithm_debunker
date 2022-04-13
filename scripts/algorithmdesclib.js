function bubblesortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Bubble-sort`;
  pageElements.simulationDesc.textContent = ` This is the simplest of the sorting algortihms.
    In this algorithm, all of the elements of a collection are compared to each other and then swapped according to their positions.`;
}

function insertionsortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Insertion-sort`;

  pageElements.simulationDesc.textContent = ` This algorithm selects a key that is compared to all it's previous elements to place it in it's correct position.
  `;
}

function selectionsortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Selection-sort`;

  pageElements.simulationDesc.textContent = ` This algorithm finds the minimum most element in the collection and places it at the begining of the array.
  `;
}

function quicksortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Quick-sort`;

  pageElements.simulationDesc.textContent = ` Quick sort takes an element form the collection as a pivot and places elements smaller and greater than it in their sorted positions. This algorithm
  can be implemented in different ways. This implementation takes the last element as pivot and places it in it's sorted position.
  `;
}

function mergesortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Merge-sort`;

  pageElements.simulationDesc.textContent = `Merge-sort is a unique sorting algorithm that divides the collections into sub-collections and ultimately
  reorganizes the sub collections then merges them together. 
  `;
}

function countingsortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Counting-sort`;

  pageElements.simulationDesc.textContent = `
  `;
}

function bucketsortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Bucket-sort`;

  pageElements.simulationDesc.textContent = ` 
  `;
}

function heapsortDesc() {
  pageElements.simulationAlogorithmDescCont.textContent =
    algorithmSimData.currentAlgorithm = `Heapify and Heap-sort`;

  pageElements.simulationDesc.textContent = ` 
  `;
  additionalVars.treeDrawCanvas.style = "display: block;";
  invokeCreatedElements(true);
}
