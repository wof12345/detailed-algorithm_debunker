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
