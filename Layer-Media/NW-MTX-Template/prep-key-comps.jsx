var selectedComps = app.project.selection;
// var selectedLayers = comp.selectedLayers;
// var p = prompt("Define name prefix", "KEYED");
var p = "KEYED";

app.beginUndoGroup("Layers To Markers");
renameComps(p);
app.endUndoGroup();

function renameComps() {
  for (var i = 1; i <= selectedComps.length; i++) {
    selectedComps[i - 1].name = p + "_" + i;
    greenscreensetup(selectedComps[i - 1]);
  }
}

function greenscreensetup(c) {
  c.layer(1).duplicate();
  c.layer(1).duplicate();

  var layerOne = c.layer(1);
  var layerTwo = c.layer(2);
  var layerThree = c.layer(3);

  layerOne.enabled = false;

  //Adds keylight to layer 2
  layerTwo.property("Effects").addProperty("Keylight (1.2)");
  layerTwo
    .property("Effects")
    .property("Keylight (1.2)")
    .property("View")
    .setValue(10);
  layerTwo
    .property("Effects")
    .property("Keylight (1.2)")
    .property("Screen Colour")
    .setValue([0, 0.996078431372549, 0]);
  layerTwo
    .property("Effects")
    .property("Keylight (1.2)")
    .property("Clip Black")
    .setValue(10);
  layerTwo
    .property("Effects")
    .property("Keylight (1.2)")
    .property("Clip White")
    .setValue(85);
  //Adds Simple Choker to layer 2
  layerTwo.property("Effects").addProperty("Simple Choker");
  layerTwo
    .property("Effects")
    .property("Simple Choker")
    .property("Choke Matte")
    .setValue(2);
  //Adds Gaussian Blur to layer 2
  layerTwo.property("Effects").addProperty("Gaussian Blur");
  layerTwo
    .property("Effects")
    .property("Gaussian Blur")
    .property("Blurriness")
    .setValue(2);

  layerThree.property("Effects").addProperty("Advanced Spill Suppressor");
  layerThree
    .property("Effects")
    .property("Advanced Spill Suppressor")
    .property("Method")
    .setValue(2);
  layerThree
    .property("Effects")
    .property("Advanced Spill Suppressor")
    .property("Key Color").expression =
    'thisComp.layer(2).effect("Keylight (1.2)")("Screen Colour")';
  layerThree.setTrackMatte(layerTwo, TrackMatteType.ALPHA);
  // layerThree.trackMatteType = TrackMatteType.ALPHA

  layerOne.audioEnabled = false;
  layerTwo.audioEnabled = false;
  layerThree.audioEnabled = false;
}
