function main() {
  initImageListeners();
}

function initImageListeners() {
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
  anchor = clickEvent.target.parentElement.closest("a");
  const imageSource = anchor.href;

  dimLayer = dimTheBackground();
  showFocusedImage(imageSource, dimLayer);
  // setDeletionListener();
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
  element.style.opacity = 0;

  setTimeout(() => {
    element.style.opacity = 1;
  }, 100); // need delay for element to render with 0 opacity first

  element.addEventListener("click", () => {
    element.style.opacity = 0;
    element.style.pointerEvents = "none"; // do not block clicks anymore

    setTimeout(() => {
      removeSelf(element);
    }, durationSeconds * 1000);
  });

}

function removeChildren(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}

function removeSelf(element) {
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

main();
