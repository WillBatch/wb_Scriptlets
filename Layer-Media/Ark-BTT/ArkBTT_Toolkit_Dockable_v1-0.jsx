//v1.0

(function (thisObj) {
  scriptBuildUI(thisObj);
  function scriptBuildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Ark BTT Toolkit v1.0", undefined, {
            resizeable: true,
          });
    win.spacing = 0;

    win.orientation = "column";
    var group1 = win.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    var group2 = win.add("group"); // Create a group for the first row
    group2.orientation = "row"; // Set the group orientation to "row"
    var group2column1 = group2.add("group"); // Create a group for the first row
    group2column1.orientation = "column"; // Set the group orientation to "row"
    var group2column2 = group2.add("group"); // Create a group for the first row
    group2column2.orientation = "column"; // Set the group orientation to "row"
    var group3 = win.add("group"); // Create a group for the first row
    group3.orientation = "row"; // Set the group orientation to "row"

    var button1 = group1.add("button", undefined, "Setup Form");
    button1.onClick = function () {
      setupForm(inputField1.text);
    };
    var button2 = group1.add("button", undefined, "Render Form");
    button2.onClick = function () {
      renderForm(inputField2.text);
    };
    var button3 = group1.add("button", undefined, "Loop Form MOV");
    button3.onClick = function () {
      loopFormPrerender();
    };
    var help = group1.add("button", undefined, "?");
    help.preferredSize.width = help.graphics.measureString("?").width + 20; // Add some padding
    help.onClick = function () {
      alert(
        "Setup Form\n\n" +
          "In your composition, select ONLY the desired Fill layer you want to use with Form, then click Setup Form. On completion, modify the Form style using the sliders in the Effects Controls. Check the Fill layer Minimax effect and change as needed.\n" +
          "////////////////////////////\n\n" +
          "Render Form\n\n" +
          'In the project window, make sure only your composition is selected. In your comp, select ONLY the Form layer. Click Render Form. It will render the file, add it to your comp, hide the Form effect layer, and loop the new .mov. It will move the new .mov into the folder "Form Fill Prerenders"\n' +
          "////////////////////////////\n\n" +
          "Loop For MOV\n\n" +
          "Select ONLY the prerendered Form .mov in your comp. This applies the looping expression and extends its duration.\n" +
          "////////////////////////////\n\n" +
          "If you wish to rename either the Form Comp or the Form Fill Prerenders folder, you can do so. However, if the names do not match perfectly, you will encounter errors."
      );
    };

    var inputField1 = group2column1.add(
      "edittext",
      [10, 10, 160, 30],
      "000_Form Copy Paste"
    );
    inputField1.enabled = false;

    var inputField2 = group2column2.add(
      "edittext",
      [10, 40, 160, 60],
      "Form Fill Prerenders"
    );
    inputField2.enabled = false;
    var lockButton = group2.add("button", [120, 10, 190, 30], "Unlock");
    lockButton.onClick = function () {
      changeInput(inputField1, inputField2);
    };
    var lockState = false; // Initial state is unlocked

    var label1 = group2column1.add(
      "statictext",
      undefined,
      "Comp Name with Form Setup"
    );
    var label2 = group2column2.add(
      "statictext",
      undefined,
      "Folder Name for Prerenders"
    );

    function changeInput(inputField1, inputField2) {
      inputField1.enabled = !inputField1.enabled;
      inputField2.enabled = !inputField2.enabled;
      // Toggle the lock state
      lockState = !lockState;

      // Update the button text based on the lock state
      lockButton.text = lockState ? "Lock" : "Unlock";
    }

    win.onResizing = win.onResize = function () {
      this.layout.resize();
    };

    win instanceof Window
      ? (win.center(), win.show())
      : (win.layout.layout(true), win.layout.resize());
  }
})(this);

function setupForm(formcompstring) {
  app.beginUndoGroup("Setup Form");
  // Function to find a composition by name
  function findCompositionByName(project, compName) {
    for (var i = 1; i <= project.numItems; i++) {
      var item = project.item(i);
      if (item instanceof CompItem && item.name === compName) {
        return item;
        break;
      }
    }
    return null; // Composition not found
  }

  // Check if a project is open

  var comp = app.project.activeItem;
  if (comp.selectedLayers.length == 1) {
    var selLayer = comp.selectedLayers[0];
    var projectName = formcompstring;
    var foundComposition = findCompositionByName(app.project, projectName);

    if (foundComposition) {
      copyPasteFormToActiveComp(
        foundComposition,
        app.project.activeItem,
        selLayer
      );
    } else {
      alert("Composition '" + projectName + "' not found in the project.");
    }

    function copyPasteFormToActiveComp(formComp, currentComp, fill_layer) {
      for (var i = 1; i <= formComp.numLayers; i++) {
        formComp.layer(i).selected = true;
      }
      formComp.openInViewer();
      app.executeCommand(19);
      currentComp.openInViewer();

      for (var i = 1; i <= currentComp.numLayers; i++) {
        currentComp.layer(i).selected = false;
      }
      app.executeCommand(20);

      var formLayer = currentComp.layer(1);
      var brushesComp = currentComp.layer(2);
      app.project.activeItem.layer(1).source.width = comp.width;
      app.project.activeItem.layer(1).source.height = comp.height;
      app.project.activeItem
        .layer(1)
        .property("Transform")
        .property("position")
        .setValue([currentComp.width / 2, currentComp.height / 2]);

      app.project.activeItem.layer(2).moveToEnd();
      brushesComp.label = 0;
      brushesComp.locked = true;
      if (fill_layer != null) {
        formLayer.moveBefore(fill_layer);
      }

      for (var i = 1; i <= app.project.activeItem.numLayers; i++) {
        app.project.activeItem.layer(i).selected = false;
      }

      //Set Up Form layers
      formLayer
        .property("ADBE Effect Parade")
        .property("tc Form")
        .property("tc Form-0027")
        .setValue(brushesComp.index);
      formLayer
        .property("ADBE Effect Parade")
        .property("tc Form")
        .property("tc Form-0055")
        .setValue(fill_layer.index);
      formLayer.setTrackMatte(fill_layer, TrackMatteType.ALPHA);
      var minimaxEffect = fill_layer
        .property("ADBE Effect Parade")
        .addProperty("ADBE Minimax");
      minimaxEffect.property("ADBE Minimax-0002").setValue(6);

      minimaxEffect.property("ADBE Minimax-0003").setValue(6);
      var fillEffect = fill_layer
        .property("ADBE Effect Parade")
        .addProperty("ADBE Fill");
      fillEffect
        .property("ADBE Fill-0002")
        .setValue([0.92156, 0.87843, 0.79215]);
      fill_layer.enabled = true;
      return;
    }
  } else {
    alert("Please select the FILL layer in your composition");
  }

  app.endUndoGroup();
}
function renderForm(folderstring) {
  var comp = app.project.activeItem;
  // Set work area to the first 30 frames
  comp.workAreaStart = 0;
  comp.workAreaDuration = comp.frameDuration * 30;

  if (comp.selectedLayers.length === 1) {
    var layer = comp.selectedLayers[0];
    beginRenderForm(layer);
  } else {
    alert("Please select ONLY your Form layer");
  }

  function beginRenderForm(layer) {
    layer.enabled = true;
    layer.solo = true;
    //Adds item to render queue
    var renderQueueItem = app.project.renderQueue.items.add(comp);
    var outputModule = renderQueueItem.outputModule(1);
    // outputModule.file = File.openDialog();
    var prompt = File.saveDialog();
    outputModule.file = File(prompt.fsName + "_Form.mov");
    outputModule.postRenderAction = PostRenderAction.IMPORT;
    //Render
    app.project.renderQueue.render();
    for (var i = 1; i <= app.project.numItems; i++) {
      if (
        app.project.item(i).selected == true &&
        app.project.item(i) instanceof FootageItem
      ) {
        var footage = app.project.item(i);
      }
    }
    app.project.activeItem.openInViewer();
    app.project.activeItem.layers.add(footage);
    var footageLayer = app.project.activeItem.layer(1);
    footageLayer.solo = false;
    layer.solo = false;
    layer.enabled = false;
    footageLayer.moveBefore(layer);
    for (var n = 1; n <= app.project.activeItem.numLayers; n++) {
      app.project.activeItem.layer(n).selected = false;
    }
    footageLayer.selected = true;
    footageLayer.label = 13;
    loopFormPrerender();

    for (var i = 1; i <= app.project.numItems; i++) {
      if (app.project.item(i).name == folderstring) {
        var myFolder = app.project.item(i);
      }
    }
    footage.parentFolder = myFolder;

    return;
  }
  return;
}
function loopFormPrerender() {
  app.beginUndoGroup("Loop");
  // Check if a composition is active
  if (app.project.activeItem instanceof CompItem) {
    var comp = app.project.activeItem;

    // Check if a layer is selected
    if (comp.selectedLayers.length > 0) {
      var selectedLayer = comp.selectedLayers[0];
      app.executeCommand(2153);

      // Check if the layer has keyframes
      if (selectedLayer.property("Time Remap").canSetExpression) {
        // Enable time remapping
        selectedLayer.timeRemapEnabled = true;

        // Add a keyframe 1 frame before the last keyframe
        var lastKeyframeTime = selectedLayer
          .property("Time Remap")
          .keyTime(selectedLayer.property("Time Remap").numKeys);
        var newKeyframeTime = lastKeyframeTime - comp.frameDuration;

        selectedLayer
          .property("Time Remap")
          .setValueAtTime(newKeyframeTime, newKeyframeTime);

        // Change the 3rd keyframe to a value of 0
        if (selectedLayer.property("Time Remap").numKeys >= 3) {
          selectedLayer
            .property("Time Remap")
            .setValueAtTime(selectedLayer.property("Time Remap").keyTime(3), 0);
        }

        // Extend the duration of the selected layer to match the composition duration
        selectedLayer.outPoint = comp.duration;

        // Add an expression to the time remapping parameter: loopOut()
        selectedLayer.property("Time Remap").expression = "loopOut()";
      } else {
        alert(
          "Selected layer does not have keyframes or time remapping is not supported."
        );
      }
    } else {
      alert("Please select a layer.");
    }
  } else {
    alert("Please open a composition.");
  }
  app.endUndoGroup();
}
