var pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();

  pos3 = e.clientX;
  pos4 = e.clientY;

  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();

  pos1 = Math.abs(100 - e.clientX);
  pos2 = Math.abs(20 - e.clientY);

  pageElements.simulationControlCont.style = `transform: translate(${pos1}px,${pos2}px);display:block;`;

  // console.log(pos3, pos4);
}

function closeDragElement(e) {
  document.onmouseup = null;
  document.onmousemove = null;
  (pos1 = 0), (pos2 = 0), (pos3 = 0), (pos4 = 0);
}
