//init functions
// pageElements.simulationControlCont.onmousedown = dragMouseDown;
// pageElements.treeStructureDemo.onmousedown = dragMouseDown;
// pageElements.simulationControl.onmousedown = (e) => {
//   e.stopPropagation();
// };
// pageElements.treeStructureDemo.onmousedown = (e) => {
//   e.stopPropagation();
// // };
// invokeCreatedElements(true);
// pageElements.simulationCreatedElementsCont.insertAdjacentHTML(
//   "beforeend",
//   extraElements("tree")
// );
// let currentCont = GETDOMQUERY(`.simulation_sec_cont_extra_tree`);
// currentCont.innerHTML = `  <div class="tree_item ti${1} draggable">
// <p class="tree_item_content">1</p>
// </div>
// <div class="tree_item ti${2} draggable">
// <p class="tree_item_content">1</p>
// </div>
// <div class="tree_item ti${3} draggable">
// <p class="tree_item_content">1</p>
// </div>`;
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
  // trackMouse(e);

  if (!globalMouseStatesLogics.down) return;

  dragConcur();
});

// generateAndPushNotification(["1", "2", "3"]);
// generateAndPushNotification(["4", "5"]);
