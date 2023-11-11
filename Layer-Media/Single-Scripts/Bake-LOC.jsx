// var textLayer = app.project.activeItem.selectedLayers[0];
var textLayers = app.project.activeItem.selectedLayers;
app.beginUndoGroup("Bake LOC");
for (var i = 0; i < textLayers.length; i++) {
  if (textLayers[i] instanceof TextLayer) {
    bakeLOC(textLayers[i]);
  } else {
    continue;
  }
}

app.endUndoGroup();

function bakeLOC(layer) {
  var srcText = layer.property("Text").property("Source Text");
  var copyText = srcText.value;
  copyText.text = copyText.toString();
  srcText.expression = "";
  srcText.setValue(copyText);
}

// var textLayer = app.project.item(1).layer(1).text.sourceText
// var textDoc = textLayer.value
// textDoc.text = 'new text'
// textLayer.setValue(textDoc)
