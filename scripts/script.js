//init functions
pageElements.simulationControlCont.onmousedown = dragMouseDown;
pageElements.simulationControl.onmousedown = (e) => {
  e.stopPropagation();
};

addeventlistener(pageElements.simulationInput, "input", function (e) {
  getAndProcessInput();
});

setUndefinedVariables();

addeventlistener(document, "mousemove", function (e) {
  // trackMouse(e);
});

addeventlistener(document, "click", function (e) {
  clickEvents(e);
});

addeventlistener(document, "mousedown", function (e) {
  blurEvents(e);
});
