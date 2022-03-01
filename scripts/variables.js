let pageElements = {
  simulationCont: GETDOMQUERY(".simulation_sec_cont"),
  simulationInput: GETDOMQUERY("#text_inp"),
};

let simObjGen = function (objClassNum, objItem, objItemIdx) {
  return `<div class="sim_obj ${objClassNum}"><div class="sim_obj_item">${objItem}</div><div class="sim_obj_item_index">${objItemIdx}</div></div>`;
};
