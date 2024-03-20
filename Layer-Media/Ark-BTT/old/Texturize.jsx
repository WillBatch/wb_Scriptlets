// Run the main function
fixTextures(1.2);

// Main function to loop through all compositions in the project
function fixTextures(textureValue) {
  app.beginUndoGroup("fix texturize");
  var selected = app.project.activeItem.selectedLayers;
  for (var i = 0; i < selected.length; i++) {
    if (hasTexturizeEffect(selected[i])) {
      // Run function if the layer has the "Texturize" effect
      runIfTexturize(selected[i], textureValue);
    }
  }
  app.endUndoGroup();
}
function hasTexturizeEffect(layer) {
  // Get all effects on the layer
  var effects = layer.property("ADBE Effect Parade");

  // Loop through effects to find "Texturize"
  for (var i = 1; i <= effects.numProperties; i++) {
    var effect = effects.property(i);
    if (effect.matchName === "ADBE Texturize") {
      return true;
    }
  }
  return false;
}

function runIfTexturize(layer, textureValue) {
  // Your code here
  layer
    .property("Effects")
    .property("Texturize")
    .property("Texture Contrast")
    .setValue(textureValue);
}
