// Main script
var selectedItems = selectedCompItems(app.project);
if (selectedItems && app.project.activeItem) {
  var selectedItems_Comps = [];
  for (var i = 0; i < selectedItems.length; i++) {
    if (isCompositionLayer(selectedItems[i])) {
      selectedItems_Comps.push(selectedItems[i]);
    }
  }
  app.beginUndoGroup("Prep Text");
  decomposeTextFromComps(selectedItems_Comps, app.project.activeItem);
  app.endUndoGroup();
  var promptDelete = confirm("Delete text compositions?");
  if (promptDelete) {
    app.beginUndoGroup("Delete");
    deleteSelectedItems_Comps(selectedItems_Comps);
    app.endUndoGroup();
  }
} else {
  alert("Please select the text compositions in the project panel.");
}

function decomposeTextFromComps(compositionsArray, mainComp) {
  for (var i = 0; i < compositionsArray.length; i++) {
    var comp = compositionsArray[i];
    for (var j = 1; j <= comp.numLayers; j++) {
      var layer = comp.layer(j);
      if (layer instanceof TextLayer) {
        var layerPosition = layer.property("Transform").property("Position");

        var textProp = layer.property("Source Text");
        var textDocument = textProp.value;
        var newTextLayer = mainComp.layers.addText(layer.sourceText.value);
        newTextLayer.sourceText.setValue(textDocument);
        newTextLayer.startTime = layer.startTime;
        newTextLayer.inPoint = layer.inPoint;
        newTextLayer.outPoint = layer.outPoint;
        newTextLayer
          .property("Transform")
          .property("Position")
          .setValue(layerPosition.value);
      }
    }
  }
}
function deleteSelectedItems_Comps(comps) {
  for (var i = comps.length - 1; i >= 0; i--) {
    comps[i].remove();
  }
}

function selectedCompItems(project) {
  return project.selection.length > 0 ? project.selection : null;
}
function isCompositionLayer(layer) {
  // return layer.source instanceof CompItem;
  return layer instanceof CompItem;
}
// function isTextLayer(layer) {
//   return layer.source instanceof TextLayer;
// }
