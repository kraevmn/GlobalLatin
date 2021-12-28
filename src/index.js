import "./style.css";
import "./components/header/header.sass";
import "./components/intro/intro.sass";
import "./components/countries/countries.sass";
import "./components/footer/footer.sass";

var wordStates = document.querySelectorAll(".countries__item");
var svgStates = document.querySelectorAll("#states > *");

function removeAllOn() {
  wordStates.forEach(function (el) {
    el.classList.remove("on");
    let [d, p] = el.children;
    d.classList.remove("on");
    p.classList.remove("on");
  });
  svgStates.forEach(function (el) {
    el.classList.remove("on");
  });
}

function addOnFromList(el) {
  var stateCode = el.getAttribute("data-state");
  var svgState = document.querySelector("#" + stateCode);
  el.classList.add("on");
  svgState.classList.add("on");
}

function addOnFromState(el) {
  var stateId = el.getAttribute("id");
  let [d, p] = document.querySelector(
    "[data-state='" + stateId + "']"
  ).children;
  el.classList.add("on");
  d.classList.add("on");
  p.classList.add("on");
}

function clickOnCountry(el) {
  var stateId = el.getAttribute("id");
  let elementA = document.querySelector("[data-state='" + stateId + "']");
  let elementHref = elementA.getAttribute("href");
  window.open(elementHref, "_blank");
}

wordStates.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    addOnFromList(el);
  });
  el.addEventListener("mouseleave", function () {
    removeAllOn();
  });

  el.addEventListener("touchstart", function () {
    removeAllOn();
    addOnFromList(el);
  });
});

svgStates.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    addOnFromState(el);
  });
  el.addEventListener("mouseleave", function () {
    removeAllOn();
  });
  el.addEventListener("click", function () {
    clickOnCountry(el);
  });

  el.addEventListener("touchstart", function () {
    removeAllOn();
    addOnFromState(el);
  });
});
