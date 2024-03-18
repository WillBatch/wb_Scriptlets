app.beginUndoGroup("Boil All");

// Run the main function
loopThroughComps();

// Main function to loop through all compositions in the project
function loopThroughComps() {
  var proj = app.project;
  for (var i = 1; i <= proj.numItems; i++) {
    var item = proj.item(i);
    if (item instanceof CompItem) {
      // If item is a composition
      checkLayersForLinesLayers(item);
    }
  }
}

// Function to loop through layers of a composition and check if are LINES comps
function checkLayersForLinesLayers(comp) {
  var layers = comp.layers;
  for (var i = 1; i <= layers.length; i++) {
    var layer = layers[i];
    // alert(contains_LINES(layer.name) + " " + "LAYER: " + layer.name);
    if (contains_LINES(layer.name) && isPhotoshopLayer(layer)) {
      addBoilEffect(layer);
    }
  }
}

function contains_LINES(str) {
  const regex = /LINE(S)?/i;
  return regex.test(str);
}
function isPhotoshopLayer(layer) {
  if (
    layer.source instanceof FootageItem &&
    layer.source.file instanceof File
  ) {
    var fileExtension = layer.source.file.displayName
      .split(".")
      .pop()
      .toLowerCase();
    // Check if the file extension indicates a Photoshop file
    if (fileExtension === "psd" || fileExtension === "psb") {
      return true;
    }
  }
  return false;
}

// Function to add a boil effect
function addBoilEffect(layer) {
  var boileffect = layer
    .property("Effects")
    .addProperty("ADBE Turbulent Displace");
  boileffect.property("ADBE Turbulent Displace-0002").setValue(30);
  boileffect.property("ADBE Turbulent Displace-0003").setValue(10);
  boileffect.property("ADBE Turbulent Displace-0006").expression =
    "posterizeTime(6); time * 100";
  boileffect.property("ADBE Turbulent Displace-0010").expression =
    "posterizeTime(6); timeToFrames(time)";
}
app.endUndoGroup();
