"use strict";

export function initImageFadeListeners() {
  const images = document.getElementsByTagName("img");
  if (!images) {
    return;
  }
  Array.from(images).forEach(image => {
    image.addEventListener("click", (event) => {
      focusImage(event);
    });
  });
}

const focusImage = (clickEvent) => {
  clickEvent.preventDefault();
  const anchor = clickEvent.target.parentElement.closest("a");
  const imageSource = anchor.href;

  const dimLayer = dimTheBackground();
  showFocusedImage(imageSource, dimLayer);
};

function dimTheBackground() {
  const dimLayer = document.createElement("div");
  dimLayer.className = "dim-layer";
  addFadeInOut(dimLayer);

  document.body.appendChild(dimLayer);
  return dimLayer;
}

function addFadeInOut(element) {
  const durationSeconds = 0.3;
  element.style.transition = `opacity ${durationSeconds}s`;

  fadeIn(element);
  addFadeOutListeners(element, durationSeconds);
}

function fadeIn(element) {
  element.style.opacity = "0";
  setTimeout(() => {
    element.style.opacity = "1";
  }, 100); // need delay for element to render with 0 opacity first
}

function fadeOut(element) {
  element.style.opacity = "0";
  element.style.pointerEvents = "none"; // only block first click
}

function addFadeOutListeners(element, durationSeconds) {
  const removeElementAndKeyListener = (element, durationSeconds) => {
    setTimeout(() => {
      removeSelf(element);
      // keyup listener needs to be removed from document every time the image preview is dismissed.
      document.removeEventListener("keyup", fadeOutListener);
    }, durationSeconds * 1000);
  };

  const fadeOutListener = () => {
    fadeOut(element, durationSeconds);
    removeElementAndKeyListener(element, durationSeconds);
  };

  element.addEventListener("click", fadeOutListener);
  document.addEventListener("keyup", fadeOutListener);
}

function removeSelf(element) {
  if (element.parentNode === null) {
    // Element is already removed, or is important such as document
    return;
  }
  element.parentNode.removeChild(element);
}

function showFocusedImage(source, parent) {
  const image = document.createElement("img");
  image.className = "img-focused";
  image.src = source;

  addFadeInOut(image);
  parent.appendChild(image);
}

function log(message) {
  console.log(message ? message : "");
}
