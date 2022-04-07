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

function addDragCapability(elements) {
  elements.forEach((element) => {
    addeventlistener(element, "mousedown", function (e) {
      if (!globalMousePos.x || elementDiff.resetPos) return;
      globalMouseStatesLogics.down = true;
      additionalVars.selectedElem = e.target;
      elementDiff.x = globalMousePos.x - element.offsetLeft;
      elementDiff.y = globalMousePos.y - element.offsetTop;
      element.setAttribute("selected", "yes");
    });

    addeventlistener(element, "mouseup", function (e) {
      globalMouseStatesLogics.down = false;
    });
  });
}

function dragConcur() {
  let element = additionalVars.selectedElem;
  let classes = element.className;
  if (!classes.includes("draggable")) return;
  let finalX = globalMousePos.x - elementDiff.x;
  let finalY = globalMousePos.y - elementDiff.y;

  element.style.left = finalX + "px";
  element.style.top = finalY + "px";
}
