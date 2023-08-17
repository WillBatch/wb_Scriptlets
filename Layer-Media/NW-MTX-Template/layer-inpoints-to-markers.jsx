var comp = app.project.activeItem;
var selectedLayers = comp.selectedLayers;

app.beginUndoGroup("Layers To Markers");
layersToMarkers();
app.endUndoGroup();

function layersToMarkers() {
  for (var i = 0; i < selectedLayers.length; i++) {
    var layerInPoint = selectedLayers[i].inPoint;
    var markerName = i + 1;
    //   alert(layerInPoint);
    var compMarker = new MarkerValue(markerName.toString());
    compMarker.duration = 0;
    comp.markerProperty.setValueAtTime(layerInPoint, compMarker);
  }
}
