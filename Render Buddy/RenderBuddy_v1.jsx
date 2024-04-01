(function (thisObj) {
  scriptBuildUI(thisObj);
  function scriptBuildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Render Buddy", undefined, {
            resizeable: true,
          });
    win.spacing = 0;
    win.orientation = "column";

    //Image Variables
    var imageOne =
      '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00F9IDAT8\u008D\u00A5\u0093\u00D1q\u00C2@\fD\x1F\x19\u00FF\u00E3\x12\u00E8 t\u00C0\u00A6\x03R\x01\u0094@\t.\u0081\x12\u00E8\x00:\u00B8\u00A5\x03w\x10\u00A7\u0083\u00A4\x03>,\x07\u00FBl3!\u00D1\u00CC}hO\u00BB\u0092\u00F6\u00ECEJ\u00A9\x04\u00D6\u00FC-\u00EA"\u00C8\x15\u00E0\'\u00C9\x02\u00AA"\x12K\u00AA\u00BA\x1B\u00DB+\x00I\u00CD\x1C\u00DBv\x05\u00F02s\u00BF\x07>l\u009Fl\u0097\u008F\u00C6\x18\t\x04a\x1B\u00E9\x0Ehl\x1F~-@\u00EB\u00C5k/_\x02\u00A5\u00ED\u0095\u00EDm^<\x10\u0088N}\u00F2\x15x\x0B\x7F\x04\u009Cm\u00EF\u00FB\u009C\u0082at\x1D\u00DE\u0081R\u00D2)\u009B\fZ\x7F~\u00F0\\\x00\u00E0[\u00D2%\x07%5\u00B6G\u00C5S\x1E,\u00A7\u009C\u009F{\u008D\\\u00A0kq\u009C\u00A8\u00ED\u00B0\u00C1t\u00F9\nG\u00DA\x1Dw\u00F11u\u00A4\x03\u00B0\x01>\u00E9\u00ED?\u009A@\u00D2\x17\u00AD\u0091\u00D7 \u009C\u00E3l\x02S\u00D4\u00CCN\u0080\u00A4\x1A\u0090\u00ED5\u00F7W\u00B9\x04>\u008AEJI\u00FC\u00F3g\u00AAC\u00E0\u00D90P\u00DF\x00\u00E2\u00F5WQ\u00EFt-+\x00\x00\x00\x00IEND\u00AEB`\u0082';

    // Create the tab control
    var tabControl = win.add("tabbedpanel");
    tabControl.alignChildren = "fill";

    // Create the tabs
    var tab1 = tabControl.add("tab", undefined, "Main");
    tab1.alignChildren = "left";
    var tab2 = tabControl.add("tab", undefined, "Settings");
    tab2.alignChildren = "left";

    var group1 = tab1.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    group1.spacing = 3;
    var group2 = tab2.add("group"); // Create a group for the first row
    group2.orientation = "row"; // Set the group orientation to "row"
    group2.spacing = 3;
    //Image Binary Data

    var buttonAddMarkers = group1.add("button", undefined, "Add Flags");
    buttonAddMarkers.size = [70, 20];
    buttonAddMarkers.onClick = function () {
      addMarkersToWorkArea(
        app.project.activeItem,
        inputField_MarkerIn.text,
        inputField_MarkerOut.text
      );
    };
    buttonAddMarkers.helpTip = "Adds markers to work area";

    var buttonSetRenderArea = group1.add(
      "button",
      undefined,
      "Set Render Area"
    );
    buttonSetRenderArea.size = [110, 20];
    buttonSetRenderArea.onClick = function () {
      setRenderArea(
        getComps(app.project),
        inputField_MarkerIn.text,
        inputField_MarkerOut.text
      );
    };
    buttonSetRenderArea.helpTip = "Sets work area to markers";

    var inputField_MarkerIn = group2.add(
      "edittext",
      [10, 10, 90, 30],
      "RENDER IN"
    );
    var previousTextValue_MarkerIn = inputField_MarkerIn.text;
    inputField_MarkerIn.onChange = function () {
      removeMarkers(app.project.activeItem, previousTextValue_MarkerIn);
      previousTextValue_MarkerIn = inputField_MarkerIn.text;
      return previousTextValue_MarkerIn;
    };

    var inputField_MarkerOut = group2.add(
      "edittext",
      [10, 10, 90, 30],
      "RENDER OUT"
    );
    var previousTextValue_MarkerOut = inputField_MarkerOut.text;
    inputField_MarkerOut.onChange = function () {
      removeMarkers(app.project.activeItem, previousTextValue_MarkerOut);
      previousTextValue_MarkerOut = inputField_MarkerOut.text;
      return previousTextValue_MarkerOut;
    };
    iconbutton_resetInputFields = group2.add(
      "iconbutton",
      [0, 0, 20, 20],
      imageOne,
      { style: "toolbutton", toggle: true }
    );
    iconbutton_resetInputFields.onClick = function () {
      inputField_MarkerIn.text = "RENDER IN";
      inputField_MarkerOut.text = "RENDER OUT";
    };
    win.onResizing = win.onResize = function () {
      this.layout.resize();
    };

    win instanceof Window
      ? (win.center(), win.show())
      : (win.layout.layout(true), win.layout.resize());
  }
})(this);

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

    // Search for START and END markers
    var compMarkers = comp.markerProperty.numKeys;

    if (compMarkers > 1) {
      var inMarker = findMarker(compMarkers, markerNameIn);
      var outMarker = findMarker(compMarkers, markerNameOut);
    }
    if (inMarker != null && outMarker != null) {
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
