////////////////////////
//      Utilities     //
////////////////////////

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getSelectAllInManyClicks = (minX, maxX, minY, maxY) => {
  const clicks = [];
  for (let i = minY; i <= maxY; i += (maxY - minY) / 100)
    clicks.push({ clientX: minX, clientY: i });

  for (let i = minX; i <= maxX; i += (maxX - minX) / 100)
    clicks.push({ clientX: i, clientY: maxY });

  for (let i = maxY; i >= minY; i -= (maxY - minY) / 100)
    clicks.push({ clientX: maxX, clientY: i });

  for (let i = maxX; i >= minX; i -= (maxX - minX) / 100)
    clicks.push({ clientX: i, clientY: minY });

  return clicks;
};

const generatePolygon = (clicks, radius, minX, maxX, minY, maxY) => {
  const path = [
    {
      clientX: randomIntFromInterval(minX, maxX),
      clientY: randomIntFromInterval(minY, maxY),
    },
  ];

  for (let i = 1; i < clicks; i++) {
    const lastClick = path.slice(-1)[0];
    const moveX = randomIntFromInterval(-radius, radius);
    const moveY = randomIntFromInterval(-radius, radius);
    path.push({
      clientX:
        lastClick.clientX + moveX > maxX
          ? lastClick.clientX - moveX
          : lastClick.clientX + moveX < minX
          ? lastClick.clientX - moveX
          : lastClick.clientX + moveX,
      clientY:
        lastClick.clientY + moveY > maxY
          ? lastClick.clientY - moveY
          : lastClick.clientY + moveY < minY
          ? lastClick.clientY - moveY
          : lastClick.clientY + moveY,
    });
  }

  return path;
};

const save = (filename, data) => {
  let blob = new Blob([data], { type: "text/json" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    let elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
};

////////////////////////
//      Selection     //
////////////////////////

const selectAll = (parent, selection, numberOfElements) => {
  const corners = multiselect_utilities.allCorners(parent.getClientRects()[0]);

  const t0 = performance.now();
  for (let i = 0; i < corners.length; i++) {
    let mousePos = selection.geometry().m2v(
      multiselect_utilities.offsetMousePos(parent, {
        clientX: corners[i].x,
        clientY: corners[i].y,
      })
    );
    if (i === 0) selection.click(mousePos);
    else selection.shiftClick(mousePos);
  }
  const t1 = performance.now();
  console.log("finito");

  return {
    clicks: corners.length,
    time: (t1 - t0).toFixed(4),
    timePerClick: (t1 - t0).toFixed(4) / corners.length,
    elements: numberOfElements,
    selectedPercent:
      (parent.getElementsByClassName("selected").length / numberOfElements) *
      100,
  };
};

const selectAllInManyClicks = (parent, selection, numberOfElements) => {
  const corners = multiselect_utilities.allCorners(parent.getClientRects()[0]);
  const minX = corners.reduce((prev, current) =>
    prev.x < current.x ? prev : current
  ).x;
  const maxX = corners.reduce((prev, current) =>
    prev.x > current.x ? prev : current
  ).x;
  const minY = corners.reduce((prev, current) =>
    prev.y < current.y ? prev : current
  ).y;
  const maxY = corners.reduce((prev, current) =>
    prev.y > current.y ? prev : current
  ).y;

  const clicks = getSelectAllInManyClicks(minX, maxX, minY, maxY);

  const t0 = performance.now();

  for (let i = 0; i < clicks.length; i++) {
    let mousePos = selection
      .geometry()
      .m2v(multiselect_utilities.offsetMousePos(parent, clicks[i]));

    if (i === 0) selection.click(mousePos);
    else selection.shiftClick(mousePos);
  }

  const t1 = performance.now();
  console.log("finito");

  return {
    clicks: clicks.length,
    time: (t1 - t0).toFixed(4),
    timePerClick: (t1 - t0).toFixed(4) / clicks.length,
    elements: numberOfElements,
    selectedPercent:
      (parent.getElementsByClassName("selected").length / numberOfElements) *
      100,
  };
};

const selectRandomPolygon = (parent, selection, numberOfElements) => {
  const corners = multiselect_utilities.allCorners(parent.getClientRects()[0]);
  const minX = corners.reduce((prev, current) =>
    prev.x < current.x ? prev : current
  ).x;
  const maxX = corners.reduce((prev, current) =>
    prev.x > current.x ? prev : current
  ).x;
  const minY = corners.reduce((prev, current) =>
    prev.y < current.y ? prev : current
  ).y;
  const maxY = corners.reduce((prev, current) =>
    prev.y > current.y ? prev : current
  ).y;

  const clicks = generatePolygon(500, 100, minX, maxX, minY, maxY);

  const t0 = performance.now();

  for (let i = 0; i < clicks.length; i++) {
    let mousePos = selection
      .geometry()
      .m2v(multiselect_utilities.offsetMousePos(parent, clicks[i]));

    if (i === 0) selection.click(mousePos);
    else selection.shiftClick(mousePos);
  }

  const t1 = performance.now();
  console.log("finito");

  return {
    clicks: clicks.length,
    time: (t1 - t0).toFixed(4),
    timePerClick: (t1 - t0).toFixed(4) / clicks.length,
    elements: numberOfElements,
    selectedPercent:
      (parent.getElementsByClassName("selected").length / numberOfElements) *
      100,
  };
};

const selectLargePolygon = (parent, selection, numberOfElements) => {
  const corners = multiselect_utilities.allCorners(parent.getClientRects()[0]);
  const minX = corners.reduce((prev, current) =>
    prev.x < current.x ? prev : current
  ).x;
  const maxX = corners.reduce((prev, current) =>
    prev.x > current.x ? prev : current
  ).x;
  const minY = corners.reduce((prev, current) =>
    prev.y < current.y ? prev : current
  ).y;
  const maxY = corners.reduce((prev, current) =>
    prev.y > current.y ? prev : current
  ).y;

  const numberOfClicks = randomIntFromInterval(3, 10000);
  const clicks = generatePolygon(numberOfClicks, 100, minX, maxX, minY, maxY);

  const t0 = performance.now();

  for (let i = 0; i < clicks.length; i++) {
    let mousePos = selection
      .geometry()
      .m2v(multiselect_utilities.offsetMousePos(parent, clicks[i]));

    if (i === 0) selection.click(mousePos);
    else selection.shiftClick(mousePos);
  }

  const t1 = performance.now();
  console.log("finito");

  return {
    clicks: clicks.length,
    time: (t1 - t0).toFixed(4),
    timePerClick: (t1 - t0).toFixed(4) / clicks.length,
    elements: numberOfElements,
    selectedPercent:
      (parent.getElementsByClassName("selected").length / numberOfElements) *
      100,
  };
};

////////////////////////
//        Setup       //
////////////////////////

const setupPage = (func, geometry, elements = undefined) => {
  const selectableArea = document.createElement("div");
  selectableArea.className = "selectable_area";
  document.getElementsByTagName("body")[0].appendChild(selectableArea);

  const numberOfElements = elements
    ? elements
    : randomIntFromInterval(1, 10000);
  for (let i = 0; i < numberOfElements; ++i) {
    let e = document.createElement("span");
    e.setAttribute("class", "selectable");
    e.textContent = i;
    selectableArea.appendChild(e);
  }

  // The elements that can be selected are objects representing HTML spans.
  let selectables = selectableArea.getElementsByClassName("selectable");

  // The callback function that will show the selection state of the elements
  // is called after every selection command with a map of the changed
  // elements
  let refresh = function (sm, changed) {
    changed.forEach(function (value, i) {
      selectables[i].classList.toggle("selected", value);
    });
  };

  let lassoGeometry =
    geometry === "nonIncremental"
      ? new multiselect_html_geometries.LassoGeometry(
          selectableArea,
          selectables
        )
      : new multiselect_html_geometries.IncrementalLassoGeometry(
          selectableArea,
          selectables
        );

  // Create a selection object
  let selection = new multiselect.SelectionState(lassoGeometry, refresh, true);

  // canvas will accept mouse and keyboard events and display the anchor,
  // cursor, and rubber band indicators
  let canvas = multiselect_utilities.createCanvas(selectableArea);

  multiselect_utilities.setupMouseEvents(selectableArea, canvas, selection);
  multiselect_utilities.setupKeyboardEvents(selectableArea, canvas, selection);

  return func(selectableArea, selection, numberOfElements);
};

document.addEventListener("DOMContentLoaded", (event) => {
  let results = [];

  // CHOOSE SELECTION GEOMETRY HERE

  const GEOMETRY = "nonIncremental";
  // const GEOMETRY = "incremental";

  for (let i = 0; i < 500; i++) {
    // CHOOSE WHICH TEST TO PERFORM HERE

    const result = setupPage(selectAll, GEOMETRY);
    // const result = setupPage(selectAllInManyClicks, GEOMETRY);
    // const result = setupPage(selectRandomPolygon, GEOMETRY);
    // const result = setupPage(selectLargePolygon, GEOMETRY, 2000);

    results.push(result);

    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = "";
  }

  save("results.json", JSON.stringify(results));
});
