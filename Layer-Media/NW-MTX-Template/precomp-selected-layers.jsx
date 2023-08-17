var blurAmount = 0.35;
var sourceFootageFolderName = "06_Source Footage";
var sourceFootageFolder;
var rsmbFootageFolderName = "02_RSMB + KEYED";
var rsmbFootageFolder;

for (var i = 1; i <= app.project.numItems; i++) {
  if (app.project.item(i).name == sourceFootageFolderName) {
    sourceFootageFolder = app.project.item(i);
    break;
  }
}

for (var i = 1; i <= app.project.numItems; i++) {
  if (app.project.item(i).name == rsmbFootageFolderName) {
    rsmbFootageFolder = app.project.item(i);
    break;
  }
}

var selectedLayers = app.project.activeItem.selectedLayers;
var comp = app.project.activeItem;
app.beginUndoGroup("Precomp");

for (var i = 0; i < selectedLayers.length; i++) {
  preComp(selectedLayers[i], i + 1, sourceFootageFolder, rsmbFootageFolder);
}

app.endUndoGroup;

function preComp(layer, index, folder, precompFolder) {
  //   var layerDuration = layer.duration;
  //   alert(layerDuration);
  var newArray = [];
  newArray.push(layer.index);
  var precompName = layer.name.split(".mov")[0] + "_RSMB";

  var myprecomp = app.project.activeItem.layers.precompose(
    newArray,
    precompName,
    true
  );
  myprecomp.openInViewer();
  app.project.activeItem.layer(1).property("Effects").addProperty("RSMB Pro");
  app.project.activeItem
    .layer(1)
    .property("Effects")
    .property("RSMB Pro")
    .property("Main_BG: Blur Amt")
    .setValue(blurAmount);
  var layerIn = app.project.activeItem.layer(1).inPoint;
  var layerOut = app.project.activeItem.layer(1).outPoint;
  var layerDuration = layerOut - layerIn;
  myprecomp.workAreaStart = layerIn;
  myprecomp.workAreaDuration = layerDuration;
  app.executeCommand(2360);
  comp.openInViewer();
  comp.layer(index).startTime = layerIn;

  //Moves new comps to folder. Must be third item in folder structure
  //   alert(precompFolder.item(1).name);
  //   alert(folder.item(1).name);
  //   for (var i = 1; i <= folder.numItems; i++) {
  //     if (folder.item(i).name == precompName) {
  //       folder.item(i).parentFolder = app.project.item(precompFolder);
  //       break;
  //     }
  //   }
}
