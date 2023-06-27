function addeventlistener(element, event, func) {
  element.addEventListener(`${event}`, func);
}

addDragCapability([pageElements.simulationControlCont]);

addeventlistener(pageElements.simulationInput, "input", function (e) {
  getAndProcessInput(algorithmSimData.currentAlgorithm);
});

setUndefinedVariables();

addeventlistener(document, "mouseover", function (e) {
  mouseMoveEvent(e);
});

addeventlistener(document, "click", function (e) {
  clickEvents(e);
});

addeventlistener(document, "mousemove", function (e) {
  updateMousePos(e);

  if (!globalMouseStatesLogics.down) return;

  dragConcur();
});
