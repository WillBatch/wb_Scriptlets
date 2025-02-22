// Rename selected text layers to match their sourceText property
(function () {
  var project = app.project;

  if (!project) return;

  var activeComp = project.activeItem;

  if (!(activeComp && activeComp instanceof CompItem)) return;

  var selectedLayers = activeComp.selectedLayers;

  if (selectedLayers.length === 0) return;

  app.beginUndoGroup("Rename Text Layers");

  for (var i = 0; i < selectedLayers.length; i++) {
    var layer = selectedLayers[i];

    if (layer.property("Source Text")) {
      var sourceText = layer.property("Source Text").value;
      if (sourceText && sourceText.text) {
        layer.name = sourceText.text.substring(0, 31); // AE layer names have a max of 31 characters
      }
    }
  }

  app.endUndoGroup();
})();
