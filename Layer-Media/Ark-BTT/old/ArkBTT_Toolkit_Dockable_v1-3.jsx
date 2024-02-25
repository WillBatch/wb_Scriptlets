//v1.2

(function (thisObj) {
  scriptBuildUI(thisObj);
  function scriptBuildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Ark BTT Toolkit v1.2", undefined, {
            resizeable: true,
          });
    win.spacing = 10;

    win.orientation = "column";
    var group1 = win.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    var group2 = win.add("group"); // Create a group for the first row
    group2.orientation = "row"; // Set the group orientation to "row"

    var checkbox = group1.add("checkbox");
    checkbox.helpTip = "Precompose Fill layer on Form Setup";

    var button1 = group1.add("button", undefined, "Form");
    button1.onClick = function () {
      setupForm(app.project.activeItem, inputField1.text, checkbox.value);
    };
    button1.helpTip = "Sets up Form on selected Fill layer.";

    var button2 = group1.add("button", undefined, "Render");
    button2.onClick = function () {
      renderForm(inputField2.text);
    };
    button2.helpTip = "Renders selected Form layer and adds to comp looping.";
    var button3 = group1.add("button", undefined, "Loop");
    button3.onClick = function () {
      loopFormPrerender();
    };
    button3.helpTip = "Loops a prerendered .mov Form file.";
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

    var inputField1 = group2.add(
      "edittext",
      [10, 10, 120, 30],
      "Form_NewBrushesStenciled_12 Strokes"
    );
    inputField1.enabled = false;
    inputField1.helpTip =
      "The name of the brush strokes comp. Names must match exactly";

    var inputField2 = group2.add(
      "edittext",
      [10, 40, 120, 60],
      "Form Fill Prerenders"
    );
    inputField2.enabled = false;
    inputField2.helpTip =
      "The name of the folder for Form Prerendered Mov's. Names must match exactly";

    var lockButton = group2.add("button", [120, 10, 190, 30], "Unlock");
    lockButton.onClick = function () {
      changeInput(inputField1, inputField2);
    };
    var lockState = false; // Initial state is unlocked
    lockButton.helpTip = "Unlock to set new names. Not advised.";

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

function setupForm(comp, brush_stroke_comp, precompose_boolean) {
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

  var comp = comp;
  if (comp.selectedLayers.length == 1) {
    var selLayer = comp.selectedLayers[0];
    var projectName = brush_stroke_comp;
    var foundComposition = findCompositionByName(app.project, projectName);

    if (foundComposition) {
      addFormSetup(foundComposition, comp, selLayer);
    } else {
      alert("Composition '" + projectName + "' not found in the project.");
    }

    function addFormSetup(brush_comp, currentComp, fill_layer) {
      var brushesComp = currentComp.layers.add(brush_comp);

      var newFormLayer = currentComp.layers.addSolid(
        [1, 1, 1],
        "FORM_" + selLayer.name,
        currentComp.width,
        currentComp.height,
        1
      );
      newFormLayer.label = 13;
      var newFormLayer_Effects = newFormLayer.property("ADBE Effect Parade");
      var xParticlesSlider = newFormLayer_Effects.addProperty(
        "ADBE Slider Control"
      );
      xParticlesSlider.name = "Particles X";
      xParticlesSlider.property("ADBE Slider Control-0001").setValue(40);
      var yParticlesSlider = newFormLayer_Effects.addProperty(
        "ADBE Slider Control"
      );
      yParticlesSlider.name = "Particles Y";
      yParticlesSlider.property("ADBE Slider Control-0001").setValue(40);
      var particleSize = newFormLayer_Effects.addProperty(
        "ADBE Slider Control"
      );
      particleSize.name = "Particle Size";
      particleSize.property("ADBE Slider Control-0001").setValue(80);
      var particleRotation = newFormLayer_Effects.addProperty(
        "ADBE Slider Control"
      );
      particleRotation.name = "Particle Rotation";
      particleRotation.property("ADBE Slider Control-0001").setValue(45);
      var formFrameRate = newFormLayer_Effects.addProperty(
        "ADBE Slider Control"
      );
      formFrameRate.name = "FPS - Do Not Modify";
      formFrameRate.property("ADBE Slider Control-0001").setValue(6);

      //Adds Form effect. Required alert to refresh Form.
      (function addFormEffectToLayer(layer) {
        var formEffect = newFormLayer_Effects.addProperty("tc Form");
        formEffect.property("tc Form-0489").setValue(2);
        formEffect.property("tc Form-0024").setValue(8);

        alert("Success!");
        app.executeCommand(5);
        return;
      })();
      var formEffect = newFormLayer_Effects.property("tc Form");

      formEffect.property("tc Form-0004").expression =
        "posterizeTime(0); thisComp.width";
      formEffect.property("tc Form-0005").expression =
        "posterizeTime(0); thisComp.height";
      formEffect.property("tc Form-0006").setValue(1);

      brushesComp.moveToEnd();
      brushesComp.label = 0;
      brushesComp.locked = true;

      newFormLayer.selected = false;

      newFormLayer.moveBefore(fill_layer);

      for (var i = 1; i <= currentComp.numLayers; i++) {
        currentComp.layer(i).selected = false;
      }

      // Particle Sprites
      formEffect.property("tc Form-0027").setValue(brushesComp.index);
      formEffect.property("tc Form-0028").setValue(2);

      //Layer Maps
      formEffect.property("tc Form-0055").setValue(fill_layer.index);
      formEffect.property("tc Form-0056").setValue(2);
      formEffect.property("tc Form-0057").setValue(2);

      //Particle Count
      formEffect.property("tc Form-0007").expression =
        'posterizeTime(0);effect("Particles X")("Slider")';
      formEffect.property("tc Form-0008").expression =
        'posterizeTime(0);effect("Particles Y")("Slider")';
      formEffect.property("tc Form-0009").setValue(1);

      //Particle Seed
      formEffect.property("tc Form-0301").expression =
        'posterizeTime(effect("FPS - Do Not Modify")("Slider").value);seedRandom(index, false);random(0,1000)';

      //Particle Size
      formEffect.property("tc Form-0033").expression =
        'posterizeTime(0);effect("Particle Size")("Slider")';

      //Particle Rotation
      formEffect.property("tc Form-0032").expression =
        'posterizeTime(0);effect("Particle Rotation")("Slider")';

      if (precompose_boolean == false) {
        var fill_layer = fill_layer;
      } else {
        var precompLayer = currentComp.layers.precompose(
          [fill_layer.index],
          fill_layer.name + "_Comp",
          true
        );
        currentComp.openInViewer();
        var fill_layer = currentComp.layer(precompLayer.name);
      }
      newFormLayer.setTrackMatte(fill_layer, TrackMatteType.ALPHA);
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
      fill_layer.label = 13;
      return;
    }
  } else {
    alert("Please select the FILL layer in your composition");
  }

  app.endUndoGroup();
  return;
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
