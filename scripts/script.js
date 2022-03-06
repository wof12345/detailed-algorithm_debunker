addeventlistener(pageElements.simulationInput, "input", function (e) {
  getAndProcessInput();
});

setUndefinedVariables();
// getPosition()

addeventlistener(document, "mousemove", function (e) {
  // trackMouse(e);
});

addeventlistener(document, "click", function (e) {
  clickEvents(e);
});

addeventlistener(document, "mousemove", function (e) {
  dragEvents(e);
});
