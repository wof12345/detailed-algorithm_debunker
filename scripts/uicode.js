let UIelements = {
  algoBtnConts: GETDOMQUERY(".algorithm_btn_cont"),
  algoBtns: GETDOMQUERY(".algorithm_item"),
  iframeCont: GETDOMQUERY(".algorithm_iframe_cont"),
};

let UIlogics = {
  mouseOverActivation: false,
};
// console.log(UIelements);

UIelements.algoBtnConts.forEach((elm, ind) => {
  elm.addEventListener("mouseover", (e) => {
    let target = e.target;
    let targetClasses = target.className;
    let targetAlgo = target.dataset.alg;
    UIlogics.mouseOverActivation = true;
    UIelements.algoBtns[ind].style =
      " width: 200px;padding: 10px 0;background-color: black;color: white;";
    elm.style = "background-color: rgb(219, 218, 216);";

    iframeUrlSet(targetAlgo);

    setTimeout(() => {
      UIelements.iframeCont.style = `opacity:1;`;
    }, 1000);
    // console.log(target.dataset.alg);
  });

  elm.addEventListener("mouseout", (e) => {
    let target = e.target;
    let targetClasses = target.className;
    UIlogics.mouseOverActivation = false;
    UIelements.algoBtns[ind].style = "";
    elm.style = "";

    // console.log(targetClasses);
  });
});

function iframeUrlSet(algo) {
  let setUrl = "./detailspages/";
  algo = algo.toLowerCase();

  setUrl += algo + ".html";

  // console.log(setUrl);

  document.getElementById("iframe_st").src = setUrl;
}

function death(targetClasses) {
  // console.log(targetClasses);
  if (
    !targetClasses.includes("algorithm_item") &&
    !targetClasses.includes("algorithm_btn_cont") &&
    !targetClasses.includes("iframe_st")
  ) {
    UIelements.iframeCont.style = ``;
  }
}
