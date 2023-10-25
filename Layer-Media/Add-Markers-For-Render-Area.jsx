var comp = app.project.activeItem;

app.beginUndoGroup("Marker OUT");
compAreaMarkers(comp);
app.endUndoGroup();

function compAreaMarkers(comp) {
  var frameRate = comp.frameRate;
  var workStart = comp.workAreaStart;
  var workDuration = comp.workAreaDuration;
  var workEnd = workStart + workDuration;

  var markerNameIn = "START";
  var markerNameOut = "END";

  var compMarkerIn = new MarkerValue(markerNameIn.toString());
  compMarkerIn.duration = 0;
  compMarkerIn.label = 9;

  var compMarkerOut = new MarkerValue(markerNameOut.toString());
  compMarkerOut.duration = 0;
  compMarkerOut.label = 8;

  comp.markerProperty.setValueAtTime(workStart, compMarkerIn);
  comp.markerProperty.setValueAtTime(workEnd, compMarkerOut);

  return;
}
