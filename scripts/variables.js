let pageElements = {
  simulationControlCont: GETDOMQUERY(".algorithm_controls_cont"),
  simulationCont: GETDOMQUERY(".simulation_sec_cont"),
  simulationInnerCont: GETDOMQUERY(".simulation"),
  simulationDesc: GETDOMQUERY(".algorithm_desc"),
  simulationAlgorithmName: GETDOMQUERY(".current_algorithm_name"),
  simulationCreatedElementsCont: GETDOMQUERY(".simulation_sec_extra"),
  simulationAlogorithmDescCont: GETDOMQUERY(".current_algorithm_name"),
  simulationStageTrack: GETDOMQUERY(".stage_tracker"),
  simulationInput: GETDOMQUERY("#text_inp"),
  simulationBtn: GETDOMQUERY(".start_sim"),
  simulationControlCont: GETDOMQUERY(".algorithm_controls_cont"),
  simulationControl: GETDOMQUERY(".algorithm_controls"),
  stageDetailsContCont: GETDOMQUERY(".stage_details_cont_cont"),
  stageDetailsCont: GETDOMQUERY(".stage_container"),
  stepIntervalControl: GETDOMQUERY(".auto_step_interval"),
  notificationCorner: GETDOMQUERY(".notification_corner"),
  treeStructureDemo: GETDOMQUERY(".tree_item"),
};

let additionalVars = {
  mouseTracker: GETDOMQUERY(".mouse_tracker_hover"),
  treeDrawCanvas: document.getElementById("mynetwork"),
  mouseX: GETDOMQUERY(".posX"),
  mouseY: GETDOMQUERY(".posY"),
  arrowShape: GETDOMQUERY(".arrow_shape"),
  selectedElem: "",
  lastilluminated: [],
  currentIntervals: [],
  currentAutoPlayState: [],
  currentTimeouts: [],
  notificationTracker: [],
  controlStart: GETDOMQUERY(".auto_step_btn"),
  controlStop: GETDOMQUERY(".stop_step"),
  lastActivatedButtonAlgorithmControl: 0,
};

let algorithmSimData = {
  algorithmSequenceInitialInstance: [],
  algorithmSequenceCompleteInstance: [],
  currentAlgorithmInputData: [],
  currentAlgorithmInputDataOrigin: [],
  algorithmSimStage: -1,
  animationDone: true,
  currentAlgorithm: "",
};

let lastGraphDetails = {
  edges: [],
  nodes: [],
};

let globalMousePos = {
  x: 0,
  y: 0,
};

let elementDiff = {
  x: 0,
  y: 0,
  resetPos: false,
  transitionDelay: 400,
};

let globalMouseStatesLogics = {
  down: false,
};

let simOptions = {
  interval: 2000,
};

let pageElementsPredefinedPosition = {
  simulation: [],
  simulationSec: [],
};

let pageLogics = {
  stageDetailsOn: false,
  mouseDown: false,
};

let simObjGen = function (
  objClassOuterClass,
  objClassInnerClass,
  objItem,
  objItemIdx
) {
  return `<div class="sim_obj ${objClassOuterClass}"><div class="sim_obj_movable ${objClassInnerClass}"><div class="sim_obj_item">${objItem}</div></div><div class="sim_obj_item_index">${objItemIdx}</div></div>`;
};

let simStageTrack = function (stage_no) {
  return `<stage-track class="stagetrack s_${stage_no}">${stage_no}</stage-track>`;
};

let simStageDetails = function (stage_no) {
  return `<div class="stage sd_${stage_no}">${stageFiller(
    algorithmSimData.currentAlgorithm,
    stage_no
  )}</div>`;
};

let extraElements = function (number) {
  return `<div class="simulation_sec_cont_extra_${number} inner_obbj_cont"></div>`;
};

// let treeElement = function (containerType, edgeNo, number, treeItem) {
//   return `<div class="${containerType} edge${edgeNo}">
//   <div class="tree_item ti${number} tiv${treeItem} draggable">
//   <p class="tree_item_content">${treeItem}</p>
// </div>
// </div>`;
// };

let generateNotification = function (index, text) {
  return `<div class="fixed_notifications fi${index}" id="${index}">
  <img src="./images/infoicon.svg" class="notifications" alt="" />
  <p class="notification-information notifications">${text}</p>
</div>`;
};
