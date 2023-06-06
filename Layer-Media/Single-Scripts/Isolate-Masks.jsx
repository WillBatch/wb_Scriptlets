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
alert("Done");
app.endUndoGroup();
