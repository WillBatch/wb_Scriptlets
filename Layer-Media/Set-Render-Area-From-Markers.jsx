var selection_array = app.project.selection;
var selected_comps_array = [];
//Filter out all non-comps into new array
for (var i = 0; i < selection_array.length; i++) {
  if (selection_array[i] instanceof CompItem) {
    selected_comps_array.push(selection_array[i]);
  } else {
    continue;
  }
}

app.beginUndoGroup("Marker OUT");
selected_comps_array.length > 0 ? proceed(selected_comps_array) : null;
function proceed(c) {
  for (var i = 0; i < c.length; i++) {
    renderCompAreaFromMarkers(c[i]);
  }
}
app.endUndoGroup();

function renderCompAreaFromMarkers(comp) {
  var frameRate = comp.frameRate;

  //   var workStart = comp.workAreaStart;
  //   var workDuration = comp.workAreaDuration;
  //   var workEnd = workStart + workDuration;

  // Search for START and END markers
  var compMarkers = comp.markerProperty.numKeys;

  if (compMarkers > 1) {
    var inMarker = findMarker(compMarkers, "START");
    var outMarker = findMarker(compMarkers, "END");
  }
  if (inMarker != null && outMarker != null) {
    // alert(inMarker);
    // alert(outMarker);
    comp.workAreaStart = inMarker;
    comp.workAreaDuration = outMarker - inMarker;
  }

  function findMarker(markers, searchString) {
    for (var i = 1; i <= markers; i++) {
      //   alert(comp.markerProperty.keyValue(i).comment);
      if (comp.markerProperty.keyValue(i).comment == searchString) {
        // alert(comp.markerProperty.keyValue(i).frameTarget)
        return comp.markerProperty.keyTime(i);
      }
    }
  }

  //   var markerNameIn = "START";
  //   var markerNameOut = "END";

  //   var compMarkerIn = new MarkerValue(markerNameIn.toString());
  //   compMarkerIn.duration = 0;
  //   compMarkerIn.label = 9;

  //   var compMarkerOut = new MarkerValue(markerNameOut.toString());
  //   compMarkerOut.duration = 0;
  //   compMarkerOut.label = 8;

  //   comp.markerProperty.setValueAtTime(workStart, compMarkerIn);
  //   comp.markerProperty.setValueAtTime(workEnd, compMarkerOut);

  return;
}
