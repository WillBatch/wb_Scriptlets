//Global Variable Declarations
var project = app.project;
var templateCompsFolder = checkForProjectItem(
  1,
  "---TEMPLATE COMPS---DO NOT MODIFY---"
);
var masterCompTemplate = checkForProjectItem(3, "Endslate_4K Template_16x9");
var layerCompTemplateFolder = checkForProjectItem(4, "02_Layer Comp Template");
var layerCompTemplate = checkForProjectItem(5, "TemplateComp-DO NOT MODIFY_1");
var renderCompFolder = checkForProjectItem(6, "01_Render");

// alert(templateCompsFolder.name);
// alert(masterCompTemplate.name);
// alert(layerCompTemplateFolder.name);
// alert(layerCompTemplate.name);
// alert(renderCompFolder.name);

if (
  templateCompsFolder === undefined ||
  masterCompTemplate === undefined ||
  layerCompTemplateFolder === undefined ||
  layerCompTemplate === undefined ||
  renderCompFolder === undefined
) {
  alert("Could not find all necessary project items. Aborting script.");
} else {
  app.beginUndoGroup("Run Script");
  runScript();
  app.endUndoGroup();
}

//Main Script
function runScript() {
  var psdLayerComp = project.activeItem;
  var zeroLayer = psdLayerComp.selectedLayers[0];
  var template_comps_array = [];
  var psd_layer_arry = [];
  if (psdLayerComp === undefined || zeroLayer === undefined) {
    alert(
      "Please open the imported PSD layer comp and select the layer you wish to be at Z-Space if 0."
    );
  } else {
    //Builds array of PSD layers
    for (var a = 1; a <= psdLayerComp.numLayers; a++) {
      psd_layer_arry.push(psdLayerComp.layer(a));
    }
    //Duplicate Template Comps for each PSD layer
    template_comps_array.push(layerCompTemplate); //Pushes the first template comp to the array
    for (var n = 1; n < psdLayerComp.numLayers; n++) {
      var duplicate = layerCompTemplate.duplicate(); //Duplicates template comp
      template_comps_array.push(duplicate); //adds duplicated comp to array
    }

    for (var i = 1; i <= psdLayerComp.numLayers; i++) {
      copyLayerToComp(i, zeroLayer.index);
    }
    masterCompTemplate.openInViewer(); //Opens up the master comp

    //Finds the template comp layer in the master comp, duplicates it, and replaces it with the second one
    for (var i = 0; i < template_comps_array.length - 1; i++) {
      var templateCompToCopy;
      for (var b = 1; b < app.project.activeItem.numLayers; b++) {
        if (
          app.project.activeItem.layer(b).name === template_comps_array[i].name
        ) {
          templateCompToCopy = app.project.activeItem.layer(b);
        }
      }
      duplicateAndReplace(templateCompToCopy, i);
    }
    //Renames all new comps to match the layer name
    (function () {
      for (var i = 0; i < template_comps_array.length; i++) {
        var layerName = template_comps_array[i].layer(1).name;
        var suffix;
        if (layerName === zeroLayer.name) {
          suffix = "_Comp Z Zero";
        } else {
          suffix = "_Comp";
        }
        template_comps_array[i].name = layerName + suffix;
      }
    })();
    //Finds the Comp Z Zero variable
    var compZZero = (function () {
      for (var i = 0; i < template_comps_array.length; i++) {
        var compName = template_comps_array[i].name;
        var patternString = "_Comp Z Zero";
        var matchResult = compName.match(patternString);
        if (matchResult) {
          return template_comps_array[i];
        }
      }
    })();
    var comp_layers_array = [];
    for (var i = 1; i < project.activeItem.numLayers; i++) {
      if (project.activeItem.layer(i).label == 9) {
        comp_layers_array.push(project.activeItem.layer(i));
      }
    }
    (function () {
      var newCompZZero;
      for (var i = 0; i < comp_layers_array.length; i++) {
        if (comp_layers_array[i].name == compZZero.name) {
          newCompZZero = comp_layers_array[i];
        }
      }
      //Puts marker zero on Comp Z Zero
      var markerZero = new MarkerValue(0);
      newCompZZero.marker.setValueAtTime(0, markerZero);
      (function () {
        for (var i = 0; i < comp_layers_array.length; i++) {
          if (comp_layers_array[i].index != newCompZZero.index) {
            var markerValue = new MarkerValue(
              comp_layers_array[i].index - newCompZZero.index
            );
            comp_layers_array[i].marker.setValueAtTime(0, markerValue);
          }
        }
      })();
    })();

    app.project.activeItem.layers.add(psdLayerComp);
    app.project.activeItem.layer(1).guideLayer = true;
    app.project.activeItem
      .layer(1)
      .property("Transform")
      .property("Scale")
      .setValue([50, 50]);

    function duplicateAndReplace(comp, i) {
      var duplicatedTemplateComp = comp.duplicate();
      duplicatedTemplateComp.moveAfter(comp);
      duplicatedTemplateComp.replaceSource(template_comps_array[i + 1], true);
      return;
    }
  }

  function copyLayerToComp(i, zeroLayerIndex) {
    app.executeCommand(2004); // Deselects All
    psdLayerComp.layer(i).selected = true;
    app.executeCommand(19); //Copy
    template_comps_array[i - 1].openInViewer();
    app.executeCommand(20); //Paste
    app.project.activeItem.layer(1).parent = app.project.activeItem.layer(2); //Parents new layer to GLOBAL NULL Layer
    app.project.activeItem.layer(1).motionBlur = true;
    app.project.activeItem.layer(1).threeDLayer = true;
    psdLayerComp.openInViewer();
    psdLayerComp.layer(i).selected = false;
  }
}

//Utility Functions
function checkForProjectItem(variable, matchName) {
  try {
    project.item(variable);
  } catch (err) {
    return;
  }
  return checkForProjectItemName(project.item(variable), matchName);
}
function checkForProjectItemName(projectItem, matchName) {
  if (projectItem.name === matchName) {
    return projectItem;
  } else {
    alert(
      "This project has been modified and the script will not work properly. Please make sure you have a project item:" +
        "\n" +
        matchName +
        "\n" +
        " in your project."
    );
  }
}

//REPLACE FOOTAGE ALT-DRAG CODE
// layer.replaceSource(SourceItem, true)
// If thats true it will make changes in expression based on the replaced footage
