// Splits selected layers based on markers

// Adapted from: https://community.adobe.com/t5/after-effects-discussions/script-that-splits-a-layer-into-multiple-layers-at-marked-points/td-p/13625174

var kButton = typeof kbar !== "undefined" ? kbar.button : null;

var comp = app.project.activeItem;
var layers = comp.selectedLayers;
var all = 0;
var stop = layers.length;
if (layers.length == 0) {
  layers = comp.layers;
  all = 1;
  stop = layers.length + 1;
}

app.beginUndoGroup("Split layers on markers");

if (layers.length > 0) {
  for (var i = all == 0 ? 0 : 1; i < stop; i++) {
    if (kButton && kButton.argument == "copy") {
      // Create a copy of original and hide
      copy = layers[i].duplicate();
      copy.audioEnabled = false;
      copy.enabled = false;
      copy.label = 0;
      copy.moveAfter(layers[i]);
    }

    var myLayer = layers[i];
    for (var i = 1; i <= myLayer.property("marker").numKeys; i++) {
      var newLayer = myLayer.duplicate();
      newLayer.inPoint = myLayer.property("marker").keyTime(i);
      newLayer.name = myLayer.property("marker").keyValue(i).comment;
      if (i < myLayer.property("marker").numKeys) {
        newLayer.outPoint = myLayer.property("marker").keyTime(i + 1);
      }

      // Cause duplicates to be created below original layer
      //newLayer.moveAfter(comp.layer(myLayer.index + (i-1)));

      // Cause duplicates to be created above original layer
      if (i > 1) newLayer.moveBefore(comp.layer(newLayer.index - (i - 1)));
    }

    if (myLayer.property("marker").numKeys > 0) {
      myLayer.outPoint = myLayer.property("marker").keyTime(1);
    }
    if (myLayer.inPoint == myLayer.outPoint) myLayer.remove();
  }
}

app.endUndoGroup();
