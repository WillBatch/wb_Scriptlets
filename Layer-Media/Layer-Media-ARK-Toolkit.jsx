function createDockableUI(thisObj) {
  var dialog =
    thisObj instanceof Panel
      ? thisObj
      : new Window("window", undefined, undefined, { resizeable: true });
  dialog.onResizing = dialog.onResize = function () {
    this.layout.resize();
  };
  return dialog;
}

function showWindow(myWindow) {
  if (myWindow instanceof Window) {
    myWindow.center();
    myWindow.show();
  }
  if (myWindow instanceof Panel) {
    myWindow.layout.layout(true);
    myWindow.layout.resize();
  }
}

var win = createDockableUI(this);

var textLine = win.add("statictext", undefined, "Layer Media - ARK Toolkit");
textLine.alignment = ["center", "top"];

var buttonGroup = win.add("group");
buttonGroup.orientation = "column";

var row1Group = buttonGroup.add("group");
row1Group.orientation = "row";
row1Group.alignment = ["fill", "top"];
var button1 = row1Group.add("button", undefined, "Auto-Trace Cleanup");
var button3 = row1Group.add("button", undefined, "?");
button3.preferredSize.width = 20;

var row2Group = buttonGroup.add("group");
row2Group.orientation = "row";
row2Group.alignment = ["fill", "top"];
var button2 = row2Group.add("button", undefined, "Isolate Selected Mask");
var button4 = row2Group.add("button", undefined, "?");
button4.preferredSize.width = 20;

var row3Group = buttonGroup.add("group");
row3Group.orientation = "row";
row3Group.alignment = ["fill", "top"];
var button5 = row3Group.add("button", undefined, "Select Auto-Traces");
var button6 = row3Group.add("button", undefined, "Select Mattes");

// Set the button properties
// button1.alignment = ["fill", "top"];
// button2.alignment = ["fill", "top"];
// button3.alignment = ["fill", "top"];
// button4.alignment = ["fill", "top"];

//Static Text Watermark
var textLine2 = win.add("statictext", undefined, "will@willbatchelor.com");
textLine2.alignment = ["center", "top"];

// Button 1 click function
button1.onClick = function () {
  runAfterAutoTrace();
};

// Button 2 click function
button2.onClick = function () {
  isolateMasks();
};

button3.onClick = function () {
  helpAuto =
    "Must have ONE auto-trace layer selected. Deletes all keyframes on masks. Moves the new autotrace layer above the art layer and set the art layer to alpha matte the trace layer. Matches label color of art layer to autotrace layer. Matches comment field of art layer to autotrace layer.";
  alert(helpAuto);
};

button4.onClick = function () {
  helpIsolate =
    "This will split off any selected mask from an auto-trace layer and create and new layer with just that mask. Must have ONE mask selected. ";
  alert(helpIsolate);
};

button5.onClick = function () {
  selectAutoTraces();
};

button6.onClick = function () {
  selectMattes();
};

showWindow(win);

function runAfterAutoTrace() {
  // Check if a composition is open
  if (
    app.project.activeItem == null ||
    !(app.project.activeItem instanceof CompItem)
  ) {
    throw new Error("Please open a composition.");
  }

  // Check if a layer is selected
  if (app.project.activeItem.selectedLayers.length === 0) {
    throw new Error("Please select a layer.");
  }

  var selectedLayer = app.project.activeItem.selectedLayers[0];
  var masks = selectedLayer.property("Masks");
  // alert(masks.numProperties);

  // Check if the selected layer has masks
  if (masks.numProperties === 0) {
    throw new Error("The selected layer has no masks.");
  }

  // Remove keyframes for each mask path
  for (var i = 1; i <= masks.numProperties; i++) {
    var mask = masks.property(i);
    var maskPath = mask.property("Mask Path");

    // Check if the mask path has keyframes
    if (maskPath.numKeys > 0) {
      // maskPath.selected = true;
      maskPath.removeKey(1);
    }
  }

  ("All keyframes for mask paths on the selected layer have been removed.");

  var selectedLayerName = selectedLayer.name.split("Auto-traced ")[1];
  var sourceLayer = getSourceLayer(selectedLayerName);

  function getSourceLayer(layer) {
    for (var i = 1; i <= app.project.activeItem.numLayers; i++) {
      if (app.project.activeItem.layer(i).name == layer) {
        return app.project.activeItem.layer(i);
      }
    }
  }

  // alert(sourceLayer.comment);
  app.beginUndoGroup("do");
  selectedLayer.label = sourceLayer.label;
  selectedLayer.moveBefore(sourceLayer);
  selectedLayer.comment = sourceLayer.comment;
  sourceLayer.setTrackMatte(selectedLayer, TrackMatteType.ALPHA);
  app.endUndoGroup();
}

function isolateMasks() {
  // Check if a composition is open
  if (
    app.project.activeItem == null ||
    !(app.project.activeItem instanceof CompItem)
  ) {
    throw new Error("Please open a composition.");
  }

  // Check if a layer is selected
  if (app.project.activeItem.selectedLayers.length === 0) {
    throw new Error("Please select a layer.");
  }

  var selectedLayer = app.project.activeItem.selectedLayers[0];
  var masks = selectedLayer.property("Masks");
  // alert(masks.numProperties);

  // Check if the selected layer has masks
  if (masks.numProperties === 0) {
    throw new Error("The selected layer has no masks.");
  }

  // Remove keyframes for each mask path
  for (var i = 1; i <= masks.numProperties; i++) {
    var mask = masks.property(i);
    var selectedMask;
    if (mask.selected == true) {
      selectedMask = mask;
    }
  }
  app.beginUndoGroup("do");

  var newSelectedLayer = selectedLayer.duplicate();
  var maskNumberMatch = parseInt(selectedMask.name.split(" ")[1]);
  selectedMask.remove();

  for (var i = newSelectedLayer.property("Masks").numProperties; i > 0; i--) {
    var mNum = parseInt(
      newSelectedLayer.property("Masks").property(i).name.split(" ")[1]
    );
    if (mNum != maskNumberMatch) {
      newSelectedLayer.property("Masks").property(i).remove();
    } else {
      continue;
    }
  }
  newSelectedLayer.comment += " - MASK: " + maskNumberMatch.toString();

  app.endUndoGroup();
}

function selectAutoTraces() {
  // Check if a composition is open
  if (
    app.project.activeItem == null ||
    !(app.project.activeItem instanceof CompItem)
  ) {
    throw new Error("Please open a composition.");
  }

  var searchString = "Auto";
  var foundLayers = [];

  for (var i = 1; i <= app.project.activeItem.numLayers; i++) {
    if (app.project.activeItem.layer(i).name.search(searchString) != -1) {
      // foundLayers.push(app.project.activeItem.layer(i));
      app.project.activeItem.layer(i).selected = true;
    }
  }
}

function selectMattes() {
  // Check if a composition is open
  if (
    app.project.activeItem == null ||
    !(app.project.activeItem instanceof CompItem)
  ) {
    throw new Error("Please open a composition.");
  }

  var searchString = "mov";
  var foundLayers = [];

  for (var i = 1; i <= app.project.activeItem.numLayers; i++) {
    if (
      app.project.activeItem.layer(i).name.toLowerCase().search(searchString) !=
      -1
    ) {
      // foundLayers.push(app.project.activeItem.layer(i));
      app.project.activeItem.layer(i).selected = true;
    }
  }
}
