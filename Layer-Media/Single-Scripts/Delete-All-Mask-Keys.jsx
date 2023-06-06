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
