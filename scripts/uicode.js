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
    iframeUrlSet(targetAlgo);
    UIelements.algoBtns[ind].style =
      " width: 200px;padding: 10px 0;background-color: black;color: white;";

    UIelements.iframeCont.style = `top:${
      globalMousePos.y + 70
    }px;left:2px; height:315px; transform:translateY(0)`;

    // console.log(target.dataset.alg);
  });

  elm.addEventListener("mouseout", (e) => {
    let target = e.target;
    let targetClasses = target.className;
    UIlogics.mouseOverActivation = false;
    UIelements.algoBtns[ind].style = "";

    // console.log(targetClasses);
  });
});

function iframeUrlSet(algo) {
  let setUrl = "https://www.youtube.com/embed/";
  if (algo === "Bubble-sort") {
    setUrl += "p__ETf2CKY4";
  } else if (algo === "Insertion-sort") {
    setUrl += "oTICKmJhLXI";
  } else if (algo === "Selection-sort") {
    setUrl += "9oWd4VJOwr0";
  } else if (algo === "Quick-sort") {
    setUrl += "7h1s2SojIRw";
  } else if (algo === "Merge-sort") {
    setUrl += "mB5HXBb_HY8";
  } else if (algo === "Counting-sort") {
    setUrl += "7zuGmKfUt7s";
  } else if (algo === "Bucket-sort") {
    setUrl += "JMlYkE8hGJM";
  } else if (algo === "Heapify and Heap-sort") {
    setUrl += "MtQL_ll5KhQ";
  }

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
