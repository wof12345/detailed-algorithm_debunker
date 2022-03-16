let pageElements = {
  simulationCont: GETDOMQUERY(".simulation_sec_cont"),
  simulationInnerCont: GETDOMQUERY(".simulation"),
  simulationDesc: GETDOMQUERY(".algorithm_desc"),
  simulationAlgorithmName: GETDOMQUERY(".current_algorithm_name"),
  simulationAlogorithmDescCont: GETDOMQUERY(".current_algorithm_name"),
  simulationStageTrack: GETDOMQUERY(".stage_tracker"),
  simulationInput: GETDOMQUERY("#text_inp"),
  simulationBtn: GETDOMQUERY(".start_sim"),
  simulationControlCont: GETDOMQUERY(".algorithm_controls_cont"),
  simulationControl: GETDOMQUERY(".algorithm_controls"),
  stageDetailsContCont: GETDOMQUERY(".stage_details_cont_cont"),
  stageDetailsCont: GETDOMQUERY(".stage_container"),
  stepIntervalControl: GETDOMQUERY(".auto_step_interval"),
};

let additionalVars = {
  mouseTracker: GETDOMQUERY(".mouse_tracker_hover"),
  mouseX: GETDOMQUERY(".posX"),
  mouseY: GETDOMQUERY(".posY"),
  arrowShape: GETDOMQUERY(".arrow_shape"),
  selectedElem: "",
  lastilluminated: [],
  currentIntervals: [],
  currentAutoPlayState: [],
  currentTimeouts: [],
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

let simOptions = {
  interval: 2000,
};

let pageElementsPredefinedPosition = {
  simulation: [],
  simulationSec: [],
};

let pageLogics = {
  stageDetailsOn: false,
};

let simObjGen = function (objClassNum, objItem, objItemIdx) {
  return `<div class="sim_obj c_${objClassNum}"><div class="sim_obj_movable i_${objClassNum}"><div class="sim_obj_item">${objItem}</div></div><div class="sim_obj_item_index">${objItemIdx}</div></div>`;
};

let simStageTrack = function (stage_no) {
  return `<stage-track class="stagetrack s_${stage_no}">${stage_no}</stage-track>`;
};

let simStageDetails = function (stage_no) {
  return ` <div class="stage sd_${stage_no}">${stageFiller(
    algorithmSimData.currentAlgorithm,
    stage_no
  )}</div>`;
};
