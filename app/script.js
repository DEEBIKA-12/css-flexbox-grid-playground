const preview = document.getElementById("preview");

const layoutMode = document.getElementById("layoutMode");
const flexControls = document.getElementById("flexControls");
const gridControls = document.getElementById("gridControls");

const direction = document.getElementById("direction");
const justify = document.getElementById("justify");
const align = document.getElementById("align");
const wrap = document.getElementById("wrap");

const columns = document.getElementById("columns");
const gridGap = document.getElementById("gridGap");
const itemCount = document.getElementById("itemCount");
const resetButton = document.getElementById("resetButton");

const cssOutput = document.getElementById("cssOutput");
const copyButton = document.getElementById("copyButton");
const copyMessage = document.getElementById("copyMessage");

function createTiles() {
  const count = Number(itemCount.value);

  preview.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = i;
    preview.appendChild(tile);
  }
}

function updateLayout() {
  const mode = layoutMode.value;

  if (mode === "flex") {
    flexControls.hidden = false;
    gridControls.hidden = true;

    preview.style.display = "flex";
    preview.style.flexDirection = direction.value;
    preview.style.justifyContent = justify.value;
    preview.style.alignItems = align.value;
    preview.style.flexWrap = wrap.value;
    preview.style.gap = "12px";
  } else {
    flexControls.hidden = true;
    gridControls.hidden = false;

    preview.style.display = "grid";
    preview.style.gridTemplateColumns =
      `repeat(${columns.value}, minmax(0, 1fr))`;
    preview.style.gap = `${gridGap.value}px`;

    preview.style.flexDirection = "";
    preview.style.justifyContent = "";
    preview.style.alignItems = "";
    preview.style.flexWrap = "";
  }

  showGeneratedCSS();
}

function showGeneratedCSS() {
  let css = "";

  if (layoutMode.value === "flex") {
    css = `.preview {
  display: flex;
  flex-direction: ${direction.value};
  justify-content: ${justify.value};
  align-items: ${align.value};
  flex-wrap: ${wrap.value};
  gap: 12px;
}`;
  } else {
    css = `.preview {
  display: grid;
  grid-template-columns: repeat(${columns.value}, minmax(0, 1fr));
  gap: ${gridGap.value}px;
}`;
  }

  cssOutput.textContent = css;
}

function copyGeneratedCSS() {
  const css = cssOutput.textContent;

  navigator.clipboard.writeText(css)
    .then(() => {
      copyMessage.textContent = "CSS copied!";
    })
    .catch(() => {
      copyMessage.textContent =
        "Copy was blocked by the browser. Select and copy the CSS manually.";
    });
}

function resetLayout() {
  layoutMode.value = "flex";
  direction.value = "row";
  justify.value = "flex-start";
  align.value = "stretch";
  wrap.value = "nowrap";
  columns.value = "3";
  gridGap.value = "12";
  itemCount.value = "4";

  createTiles();
  updateLayout();
  copyMessage.textContent = "";
}

layoutMode.addEventListener("change", updateLayout);
direction.addEventListener("change", updateLayout);
justify.addEventListener("change", updateLayout);
align.addEventListener("change", updateLayout);
wrap.addEventListener("change", updateLayout);
columns.addEventListener("change", updateLayout);
gridGap.addEventListener("change", updateLayout);

itemCount.addEventListener("change", () => {
  createTiles();
  updateLayout();
});

resetButton.addEventListener("click", resetLayout);
copyButton.addEventListener("click", copyGeneratedCSS);

// Initialize the app when the page loads.
createTiles();
updateLayout();