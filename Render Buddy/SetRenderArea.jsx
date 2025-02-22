setRenderArea(getComps(app.project), "START", "END");
//addMarkersToWorkArea(app.project.activeItem, "START", "END");

function addMarkersToWorkArea(comp, markerNameIn, markerNameOut) {
  app.beginUndoGroup("Markers");
  checkForMarkers(comp);
  compAreaMarkers(comp);
  app.endUndoGroup();

  function checkForMarkers(comp) {
    var numMarkers = comp.markerProperty.numKeys;
    if (numMarkers > 0) {
      var compMarkers = comp.markerProperty;
      for (var i = numMarkers; i > 0; i--) {
        if (
          compMarkers.keyValue(i).comment == markerNameIn ||
          compMarkers.keyValue(i).comment == markerNameOut
        ) {
          compMarkers.removeKey(i);
        }
      }
    }
  }

  function compAreaMarkers(comp) {
    var frameRate = comp.frameRate;
    var singleFrame = 1 / frameRate;
    var workStart = comp.workAreaStart;
    var workDuration = comp.workAreaDuration;
    var workEnd = workStart + workDuration - singleFrame;
    // var workEnd = workStart + workDuration;

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
}

function setRenderArea(comp, markerNameIn, markerNameOut) {
  if (comp.compCheck != false) {
    var isArray = comp.isArray;

    if (isArray) {
      setRenderArea_MultipleComps(comp.comp);
    } else {
      setRenderArea_SingleComp(comp.comp);
    }
  }
  function setRenderArea_MultipleComps(comp) {
    var selection_array = comp;
    var selected_comps_array = [];
    //Filter out all non-comps into new array
    for (var i = 0; i < selection_array.length; i++) {
      if (selection_array[i] instanceof CompItem) {
        selected_comps_array.push(selection_array[i]);
      } else {
        continue;
      }
    }

    app.beginUndoGroup("Set Render Area");
    selected_comps_array.length > 0 ? proceed(selected_comps_array) : null;
    function proceed(c) {
      for (var i = 0; i < c.length; i++) {
        renderCompAreaFromMarkers(c[i]);
      }
    }
    app.endUndoGroup();
  }
  function setRenderArea_SingleComp(comp) {
    app.beginUndoGroup("Set Render Area");
    renderCompAreaFromMarkers(comp);
    app.endUndoGroup();
  }
  function renderCompAreaFromMarkers(comp) {
    var frameRate = comp.frameRate;
    var singleFrame = 1 / frameRate;

    // Search for START and END markers
    var compMarkers = comp.markerProperty.numKeys;

    if (compMarkers > 1) {
      var inMarker = findMarker(compMarkers, markerNameIn);
      var outMarker = findMarker(compMarkers, markerNameOut);
    }
    if (inMarker != null && outMarker != null) {
      comp.workAreaStart = inMarker;
      comp.workAreaDuration = outMarker - inMarker + singleFrame;
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

    return;
  }
}
function getComps(proj) {
  if (proj.activeItem && proj.selection.length <= 1) {
    return { comp: proj.activeItem, isArray: false, compCheck: true };
  }
  if (proj.selection.length > 1 && proj.activeItem) {
    var comp_array = proj.selection;
    comp_array.push(proj.activeItem);
    return { comp: comp_array, isArray: true, compCheck: true };
  }
  if (proj.selection.length > 1) {
    return { comp: proj.selection, isArray: true, compCheck: true };
  }
  if (proj.selection.length === 1) {
    return { comp: proj.selection[0], isArray: false, compCheck: true };
  }
  if (proj.selection.length === 0 && proj.activeItem == null) {
    alert("Select a comp or multiple comps");
    return { compCheck: false };
  }
}
function removeMarkers(comp, oldMarkerName) {
  var numMarkers = comp.markerProperty.numKeys;
  if (numMarkers > 0) {
    var compMarkers = comp.markerProperty;
    for (var i = numMarkers; i > 0; i--) {
      if (compMarkers.keyValue(i).comment == oldMarkerName) {
        compMarkers.removeKey(i);
      }
    }
  }
}
