// var pos1 = 0,
//   pos2 = 0,
//   pos3 = 0,
//   pos4 = 0;

// function dragMouseDown(e) {
//   e = e || window.event;
//   e.preventDefault();

//   pos3 = e.clientX;
//   pos4 = e.clientY;

//   document.onmouseup = closeDragElement;
//   document.onmousemove = elementDrag;
// }

// function elementDrag(e) {
//   e = e || window.event;
//   e.preventDefault();

//   pos1 = Math.abs(100 - e.clientX);
//   pos2 = Math.abs(20 - e.clientY);
//   console.log(e.target);

//   if (e.target.className.includes("draggable"))
//     e.target.style = `transform: translate(${pos1}px,${pos2}px);display:block;`;

//   // console.log(pos3, pos4);
// }

// function closeDragElement(e) {
//   document.onmouseup = null;
//   document.onmousemove = null;
//   (pos1 = 0), (pos2 = 0), (pos3 = 0), (pos4 = 0);
// }

function mouseDownListener(e) {
  if (!globalMousePos.x || elementDiff.resetPos) return;
  globalMouseStatesLogics.down = true;

  let element = (additionalVars.selectedElem = e.target);
  let classes = element.className;

  if (!classes.includes("draggable")) {
    element = additionalVars.selectedElem = element.closest(".draggable");
    console.log("nt", element);
  }
  if (!element) {
    additionalVars.selectedElem = element;
    console.log("ne", element);

    return;
  }
  elementDiff.x = globalMousePos.x - element.offsetLeft;
  elementDiff.y = globalMousePos.y - element.offsetTop;
  element.setAttribute("selected", "yes");
}

function mouseUpListener(e) {
  let element = (additionalVars.selectedElem = e.target);
  globalMouseStatesLogics.down = false;
  element.setAttribute("selected", "no");
}

function addDragCapability(elements) {
  // console.log("adc", elements);

  elements.forEach((element) => {
    addeventlistener(element, "mousedown", mouseDownListener);

    addeventlistener(element, "mouseup", mouseUpListener);
  });
}

function dragConcur() {
  let element = additionalVars.selectedElem;
  let classes = element.className;

  if (!classes.includes("draggable")) {
    return;
  }

  let finalX = globalMousePos.x - elementDiff.x;
  let finalY = globalMousePos.y - elementDiff.y;

  element.style.position = "absolute";
  element.style.left = finalX + "px";
  element.style.top = finalY + "px";
}
