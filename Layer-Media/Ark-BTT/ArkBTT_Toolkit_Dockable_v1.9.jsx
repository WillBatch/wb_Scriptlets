//v1.7

(function (thisObj) {
  scriptBuildUI(thisObj);
  function scriptBuildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Ark BTT Toolkit v1.8", undefined, {
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
    var button4 = group1.add("button", undefined, "Boil");
    button4.onClick = function () {
      boilmyshit();
    };
    var button5 = group1.add("button", undefined, "Fill");
    button5.onClick = function () {
      scribble("fillMATTE");
    };
    var button6 = group1.add("button", undefined, "Line");
    button6.onClick = function () {
      scribble("lineMATTE");
    };
    var button7 = group1.add("button", undefined, "Tex");
    button7.onClick = function () {
      fixTextures(1.2);
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

  if (comp.selectedLayers.length == 1) {
    var selLayer = comp.selectedLayers[0];
    var foundComposition = findCompositionByName(
      app.project,
      brush_stroke_comp
    );

    if (foundComposition) {
      addFormSetup(foundComposition, comp, selLayer);
    } else {
      alert("Composition '" + projectName + "' not found in the project.");
    }
  } else {
    alert("Please select the FILL layer in your composition");
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
    var particleSize = newFormLayer_Effects.addProperty("ADBE Slider Control");
    particleSize.name = "Particle Size";
    particleSize.property("ADBE Slider Control-0001").setValue(80);
    var particleRotation = newFormLayer_Effects.addProperty(
      "ADBE Slider Control"
    );
    particleRotation.name = "Particle Rotation";
    particleRotation.property("ADBE Slider Control-0001").setValue(45);
    var formFrameRate = newFormLayer_Effects.addProperty("ADBE Slider Control");
    formFrameRate.name = "FPS - Do Not Modify";
    formFrameRate.property("ADBE Slider Control-0001").setValue(6);

    //Adds Form effect. Required alert to refresh Form.
    (function addFormEffectToLayer() {
      var formEffect = newFormLayer_Effects.addProperty("tc Form");
      formEffect.property("tc Form-0489").setValue(2);
      formEffect.property("tc Form-0024").setValue(8);

      // alert("Success!");
      // app.executeCommand(5);
      app.beginUndoGroup("remove Form");
      formEffect.remove();
      app.endUndoGroup();
      app.executeCommand(16);
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
    brushesComp.enabled = false;

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
    formEffect.property("tc Form-0296").setValue(2);

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
    fillEffect.property("ADBE Fill-0002").setValue([0.92156, 0.87843, 0.79215]);
    fill_layer.enabled = true;
    fill_layer.label = 13;
    return;
  }

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
    footage.selected = false;

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
  return;
}

function boilmyshit() {
  app.beginUndoGroup("Boil All");

  // Run the main function
  loopThroughComps();

  // Main function to loop through all compositions in the project
  function loopThroughComps() {
    var proj = app.project;
    for (var i = 1; i <= proj.numItems; i++) {
      var item = proj.item(i);
      if (item instanceof CompItem) {
        // If item is a composition
        checkLayersForLinesLayers(item);
      }
    }
  }

  // Function to loop through layers of a composition and check if are LINES comps
  function checkLayersForLinesLayers(comp) {
    var layers = comp.layers;
    for (var i = 1; i <= layers.length; i++) {
      var layer = layers[i];
      // alert(contains_LINES(layer.name) + " " + "LAYER: " + layer.name);
      if (contains_LINES(layer.name) && isPhotoshopLayer(layer)) {
        addBoilEffect(layer);
      }
    }
  }

  function contains_LINES(str) {
    const regex = /LINE(S)?/i;
    return regex.test(str);
  }
  function isPhotoshopLayer(layer) {
    if (
      layer.source instanceof FootageItem &&
      layer.source.file instanceof File
    ) {
      var fileExtension = layer.source.file.displayName
        .split(".")
        .pop()
        .toLowerCase();
      // Check if the file extension indicates a Photoshop file
      if (fileExtension === "psd" || fileExtension === "psb") {
        return true;
      }
    }
    return false;
  }

  // Function to add a boil effect
  function addBoilEffect(layer) {
    var boileffect = layer
      .property("Effects")
      .addProperty("ADBE Turbulent Displace");
    boileffect.property("ADBE Turbulent Displace-0002").setValue(30);
    boileffect.property("ADBE Turbulent Displace-0003").setValue(10);
    boileffect.property("ADBE Turbulent Displace-0006").expression =
      "posterizeTime(6); time * 100";
    boileffect.property("ADBE Turbulent Displace-0010").expression =
      "posterizeTime(6); timeToFrames(time)";
  }
  app.endUndoGroup();
}
function scribble(shapeLayerName) {
  app.beginUndoGroup("Scribble Matte");

  // Run the main function
  runCreateScribbleMatte();
  app.endUndoGroup();
  // Main function to loop through all compositions in the project
  function runCreateScribbleMatte() {
    // Create a new shape layer
    var shapeLayer = app.project.activeItem.layers.addShape();
    shapeLayer.name = shapeLayerName;

    // Create two points for the shape layer
    var startPoint = [0, 0];
    var endPoint = [startPoint[0] + 200, startPoint[1]]; // 200 pixels apart vertically

    // Create a shape group with a path containing the two points
    var shapeGroup = shapeLayer
      .property("Contents")
      .addProperty("ADBE Vector Group");
    var shapePath = shapeGroup
      .property("Contents")
      .addProperty("ADBE Vector Shape - Group");
    var pathData = new Shape();
    pathData.vertices = [startPoint, endPoint];
    pathData.closed = false;
    shapePath.property("Path").setValue(pathData);

    // Add stroke to the shape layer
    var stroke = shapeLayer
      .property("Contents")
      .property("Group 1")
      .property("Contents")
      .addProperty("ADBE Vector Graphic - Stroke");
    stroke.property("Color").setValue([0, 1, 0]); // Bright green color
    stroke.property("Stroke Width").setValue(50); // Stroke width of 50 pixels

    //Add trim path to the shape layer
    var trimpath = shapeLayer
      .property("Contents")
      .property("Group 1")
      .property("Contents")
      .addProperty("ADBE Vector Filter - Trim");

    // Set keyframes for the "end" parameter
    var endProperty = trimpath.property("End");
    var currentTime = app.project.activeItem.time;
    endProperty.setValuesAtTimes([currentTime, currentTime + 1.5], [0, 100]);
    endProperty.expression = "posterizeTime(15); value";
    // Add easing to the keyframes
    var key1 = endProperty.keyTime(1);
    var key2 = endProperty.keyTime(2);
    var easeInkey1 = new KeyframeEase(0, 10); // Ease in value and influence
    var easeOutkey1 = new KeyframeEase(0.1, 30); // Ease out value and influence
    var easeInkey2 = new KeyframeEase(0.1, 55); // Ease in value and influence
    var easeOutkey2 = new KeyframeEase(0, 50); // Ease out value and influence
    endProperty.setTemporalEaseAtKey(1, [easeInkey1], [easeOutkey1]);
    endProperty.setTemporalEaseAtKey(2, [easeInkey2], [easeOutkey2]);

    // Adjust the position of the shape layer if needed
    shapeLayer.position.setValue([
      app.project.activeItem.width / 2,
      app.project.activeItem.height / 2,
    ]);

    //Adds roughen edges to shape layer
    var roughenEdges = shapeLayer
      .property("ADBE Effect Parade")
      .addProperty("ADBE Roughen Edges");
    roughenEdges.property("ADBE Roughen Edges-0003").setValue(10);
    roughenEdges.property("ADBE Roughen Edges-0005").setValue(10);

    if (shapeLayerName == "fillMATTE") {
      var strokeWidth = shapeLayer
        .property("Contents")
        .property("Group 1")
        .property("Contents")
        .property("ADBE Vector Graphic - Stroke")
        .property("Stroke Width");
      strokeWidth.setValuesAtTimes(
        [currentTime + 0.45, currentTime + 1.95],
        [50, 120]
      );
      strokeWidth.expression = "posterizeTime(15); value";
      var key1 = strokeWidth.keyTime(1);
      var key2 = strokeWidth.keyTime(2);
      var easeInkey1 = new KeyframeEase(0, 10); // Ease in value and influence
      var easeOutkey1 = new KeyframeEase(0.1, 30); // Ease out value and influence
      var easeInkey2 = new KeyframeEase(0.1, 55); // Ease in value and influence
      var easeOutkey2 = new KeyframeEase(0, 50); // Ease out value and influence
      strokeWidth.setTemporalEaseAtKey(1, [easeInkey1], [easeOutkey1]);
      strokeWidth.setTemporalEaseAtKey(2, [easeInkey2], [easeOutkey2]);
    }

    // Select the shape layer
    shapeLayer.selected = true;
  }
}
// Main function to loop through all compositions in the project
function fixTextures(textureValue) {
  app.beginUndoGroup("fix texturize");
  var compItems = app.project.activeItem.numLayers;
  for (var i = 1; i <= compItems; i++) {
    var l = app.project.activeItem.layer(i);
    if (hasTexturizeEffect(l)) {
      // Run function if the layer has the "Texturize" effect
      runIfTexturize(l, textureValue);
    }
  }
  app.endUndoGroup();
}
function hasTexturizeEffect(layer) {
  // Get all effects on the layer
  var effects = layer.property("ADBE Effect Parade");

  // Loop through effects to find "Texturize"
  for (var i = 1; i <= effects.numProperties; i++) {
    var effect = effects.property(i);
    if (effect.matchName === "ADBE Texturize") {
      return true;
    }
  }
  return false;
}

function runIfTexturize(layer, textureValue) {
  // Your code here
  layer
    .property("Effects")
    .property("Texturize")
    .property("Texture Contrast")
    .setValue(textureValue);
}
