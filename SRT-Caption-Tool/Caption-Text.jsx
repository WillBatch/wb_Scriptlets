// Main script
var mainComp = app.project.activeItem;
if (mainComp && mainComp instanceof CompItem) {
  var compositionsArray = collectCompositions(mainComp);

  if (compositionsArray.length > 0) {
    app.beginUndoGroup("Duplicate Text Layers");

    duplicateTextLayers(mainComp, compositionsArray);
    app.endUndoGroup();
  } else {
    alert("No nested compositions found in the main composition.");
  }
} else {
  alert("Please select or open a composition in After Effects.");
}

// Function to collect all compositions within the main composition
function collectCompositions(mainComp) {
  var compositionsArray = [];

  for (var i = 1; i <= mainComp.numLayers; i++) {
    var layer = mainComp.layer(i);
    if (layer.source instanceof CompItem) {
      compositionsArray.push(layer);
    }
  }
  return compositionsArray;
}

// Function to duplicate text layers from compositions and add them to the main composition
function duplicateTextLayers(mainComp, compositionsArray) {
  for (var i = 0; i < compositionsArray.length; i++) {
    var comp = compositionsArray[i];
    comp.openInViewer();
    for (var j = 1; j <= comp.numLayers; j++) {
      var layer = comp.layer(j);

      if (layer instanceof TextLayer) {
        var newTextLayer = mainComp.layers.addText(layer.sourceText.value);
        newTextLayer.startTime = layer.startTime;
        newTextLayer.inPoint = layer.inPoint;
        newTextLayer.outPoint = layer.outPoint;
      }
    }
  }
}

// function isCompositionLayer(layer) {
//   return layer.source instanceof CompItem;
// }
