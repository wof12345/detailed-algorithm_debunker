//init functions
// pageElements.simulationControlCont.onmousedown = dragMouseDown;
// pageElements.treeStructureDemo.onmousedown = dragMouseDown;
// pageElements.simulationControl.onmousedown = (e) => {
//   e.stopPropagation();
// };
// pageElements.treeStructureDemo.onmousedown = (e) => {
//   e.stopPropagation();
// };
addDragCapability([pageElements.simulationControlCont]);
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

setPosition(pageElements.treeStructureDemo, 20, 20);
setTimeout(() => {
  setPosition(pageElements.treeStructureDemo, 20, 200);
}, 2000);

addeventlistener(document, "mousemove", function (e) {
  updateMousePos(e);

  if (!globalMouseStatesLogics.down) return;

  dragConcur();
});

// generateAndPushNotification(["1", "2", "3"]);
// generateAndPushNotification(["4", "5"]);
