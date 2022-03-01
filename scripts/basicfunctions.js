function addeventlistener(element, event, func) {
  element.addEventListener(`${event}`, func);
}

function getAndProcessInput() {
  let input = pageElements.simulationInput.value;
  let processedInput = input.split(/[ ,]+/);
  let objNumber = processedInput.length - 1;
  LOG(`Debug: ${objNumber}`, "red", "white", "log");
  generateSimObj(processedInput, objNumber);
}

function generateSimObj(objItems, number) {
  let generatedHtml = "";
  for (let i = 0; i < number; i++) {
    generatedHtml += simObjGen(i + 1, objItems[i], i);
  }
  pageElements.simulationCont.innerHTML = generatedHtml;
}
