var comp = app.project.activeItem;
var selectedLayers = comp.selectedLayers;
var selLayer = selectedLayers[0];

app.beginUndoGroup("Layers To Markers");
copyMarkersToComp(comp, selLayer);
app.endUndoGroup();

// function decomposeMarkers() {
//   var numMarkers = layer.marker.numKeys;

//   for (var i = 1; i <= numMarkers; i++) {
//     var markerName = layer.marker.key(i);
//     alert(markerName);
//     var markerTime = layer.marker.keyIndex(i).time;
//     //   alert(layerInPoint);
//     var compMarker = new MarkerValue(markerName);
//     compMarker.duration = 0;
//     comp.markerProperty.setValueAtTime(layerInPoint, compMarker);
//   }
// }

function copyMarkersToComp(slideComp, l) {
  var markersLayer = l;
  var marker;
  for (var i = 1; i <= markersLayer.marker.numKeys; i++) {
    marker = new MarkerValue(markersLayer.marker.keyValue(i).comment);
    marker.chapter = markersLayer.marker.keyValue(i).chapter;
    marker.comment = markersLayer.marker.keyValue(i).comment;
    marker.cuePointName = markersLayer.marker.keyValue(i).cuePointName;
    marker.duration = markersLayer.marker.keyValue(i).duration;
    marker.eventCuePoint = markersLayer.marker.keyValue(i).eventCuePoint;
    marker.frameTarget = markersLayer.marker.keyValue(i).frameTarget;
    marker.url = markersLayer.marker.keyValue(i).url;
    marker.label = markersLayer.marker.keyValue(i).label;
    marker.protectedRegion = markersLayer.marker.keyValue(i).protectedRegion;
    slideComp.markerProperty.setValueAtTime(
      markersLayer.marker.keyTime(i),
      marker
    );
  }
}
