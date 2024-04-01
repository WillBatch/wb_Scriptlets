//version 1.00

//FOLD ALL SHORTCUT cmd + K cmd + 0
//UNFORLD ALL cmd + K cmd + J

var green600 = [0, 132, 15];
var blue600 = [6, 108, 231];
var grey100 = [29, 29, 29];
var grey600 = [176, 176, 176];
// var selectedPropertyData = null;

(function (thisObj) {
  scriptBuildUI(thisObj);
  function scriptBuildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Copy Cat", undefined, {
            resizeable: true,
          });
    win.spacing = 3;
    win.orientation = "column";
    win.alignChildren = "left";

    var group1 = win.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    group1.spacing = 5;
    var group2 = win.add("group"); // Create a group for the first row
    group2.orientation = "row"; // Set the group orientation to "row"
    group2.spacing = 5;
    var group3 = win.add("group"); // Create a group for the first row
    group3.orientation = "row"; // Set the group orientation to "row"
    group3.spacing = 5;

    function FancyButton(
      parentGroup,
      params,
      changeColorState_Fill,
      changeColorState_Stroke
    ) {
      var button = parentGroup.add("customButton", undefined, "");
      button.width = params.width;
      button.height = params.height;
      button.text = params.text;
      button.color = params.color;
      button.strokeWidth = params.strokeWidth;
      button.strokeColor = params.strokeColor;

      button.preferredSize.height = button.height;
      button.preferredSize.width = button.width;

      button.addEventListener("mouseover", function () {
        drawFancyButton(
          button,
          true,
          changeColorState_Fill,
          changeColorState_Stroke
        );
      });
      button.addEventListener("mouseout", function () {
        drawFancyButton(
          button,
          false,
          changeColorState_Fill,
          changeColorState_Stroke
        );
      });
      drawFancyButton(
        button,
        false,
        changeColorState_Fill,
        changeColorState_Stroke
      );

      return button;
    }
    function drawFancyButton(
      button,
      hover,
      changeColorState_Fill,
      changeColorState_Stroke
    ) {
      var g = button.graphics;
      var fillBrush;
      var changeColorState;

      fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, [
        button.color[0] / 255,
        button.color[1] / 255,
        button.color[2] / 255,
        1,
      ]);

      // Create a stroke pen
      strokePen = g.newPen(
        g.PenType.SOLID_COLOR,
        [
          button.strokeColor[0] / 255,
          button.strokeColor[1] / 255,
          button.strokeColor[2] / 255,
          1,
        ], // Stroke color
        button.strokeWidth // Stroke width
      );

      var textPen; // <-- new textPen variable
      if (hover) {
        textPen = g.newPen(
          g.PenType.SOLID_COLOR,
          [220 / 255, 220 / 255, 220 / 255, 1],
          1
        ); // <-- define textPen when hover is true
      } else {
        textPen = g.newPen(
          g.PenType.SOLID_COLOR,
          [grey600[0] / 255, grey600[1] / 255, grey600[2] / 255, 1],
          1
        ); // <-- define textPen when hover is false
      }
      var textSize = g.measureString(button.text);

      button.onDraw = function () {
        var textSize = g.measureString(button.text);
        var textX = (this.size.width - textSize.width) / 2;
        var textY = (this.size.height - textSize.height) / 2;
        g.newPath();
        g.rectPath(0, 0, this.size.width, this.size.height);
        g.fillPath(fillBrush);
        g.strokePath(strokePen);
        g.drawString(
          button.text,
          textPen,
          (this.width - textSize.width) / 2,
          (this.height - textSize.height) / 2
        );
      };
    }

    var button_StoreSelectedPropertiesData = new FancyButton(
      group1,
      {
        width: 60,
        height: 20,
        text: "Store",
        color: grey100,
        strokeWidth: 2,
        strokeColor: grey600,
      },
      true,
      false
    );

    button_StoreSelectedPropertiesData.onClick = function () {
      ///function goes here
      if (checkAltKey()) {
        if (selectedPropertyData !== null) {
          // alert(selectedPropertyData[0].propData.name);
          display_prop_names(selectedPropertyData);
        } else {
          alert("No properties currently stored");
        }
      } else {
        if (app.project.activeItem) {
          if (
            app.project.activeItem.selectedLayers[0].selectedProperties
              .length !== 0
          ) {
            var updateData = store_selected_properties_data(
              app.project.activeItem.selectedLayers[0]
            );
            updateButtonLabel(updateData);
          } else {
            alert("Select some properties");
          }
        } else {
          alert("Select some properties");
        }
      }
    };

    var button_PasteStoredPropertiesData = new FancyButton(
      group1,
      {
        width: 60,
        height: 20,
        text: "Paste",
        color: grey100,
        strokeWidth: 2,
        strokeColor: grey600,
      },
      false,
      true
    );

    button_PasteStoredPropertiesData.onClick = function () {
      if (selectedPropertyData !== null) {
        switch (dropdown_PasteToOption.selection.index) {
          case 0:
            if (app.project.activeItem.selectedLayers.length !== 0) {
              go_paste();
            } else {
              alert("Select some layers");
            }
            break;
          case 1:
            if (app.project.activeItem) {
              go_paste();
            } else {
              alert("Active Comp not found");
            }
            break;
          case 2:
            go_paste();
            break;
        }
      } else {
        alert("No stored data");
      }
      function go_paste() {
        app.beginUndoGroup("Paste");
        paste_selected_properties_data(
          app.project.activeItem.selectedLayers,
          dropdown_PasteToOption.selection.index,
          checkBox_copyValues.value,
          checkBox_copyKeyframes.value,
          checkBox_copyExpressions.value
        );
        app.endUndoGroup();
      }
    };
    var button_LinkPropertiesWithExpressions = new FancyButton(
      group1,
      {
        width: 60,
        height: 20,
        text: "Link",
        color: grey100,
        strokeWidth: 2,
        strokeColor: grey600,
      },
      true,
      false
    );
    button_LinkPropertiesWithExpressions.onClick = function () {
      if (selectedPropertyData !== null) {
        switch (dropdown_PasteToOption.selection.index) {
          case 0:
            if (app.project.activeItem.selectedLayers.length !== 0) {
              go_link();
            } else {
              alert("Select some layers");
            }
            break;
          case 1:
            if (app.project.activeItem) {
              go_link();
            } else {
              alert("Active Comp not found");
            }
            break;
          case 2:
            go_link();
            break;
        }
      } else {
        alert("No stored data");
      }
      function go_link() {
        app.beginUndoGroup("Link");
        link_selected_properties_data(
          app.project.activeItem.selectedLayers,
          dropdown_PasteToOption.selection.index
        );
        app.endUndoGroup();
      }
    };
    // var button_AlertStoredProperties = new FancyButton(
    //   group1,
    //   {
    //     width: 20,
    //     height: 20,
    //     text: ":)",
    //     color: grey100,
    //     strokeWidth: 2,
    //     strokeColor: grey600,
    //   },
    //   false,
    //   true
    // );
    // button_AlertStoredProperties.onClick = function () {
    //   var alt = checkAltKey();
    //   if (selectedPropertyData !== null) {
    //     // alert(selectedPropertyData[0].propData.name);
    //     display_prop_names(selectedPropertyData);
    //   } else {
    //     alert("No properties ready to paste");
    //   }
    // };

    var staticText_CopyTo = group2.add("statictext", undefined, "Paste to");
    var dropdown_PasteToOption_array = [
      "Selected Layers",
      "Comp Layers",
      "Project Layers",
    ];
    var dropdown_PasteToOption = group2.add(
      "dropdownlist",
      undefined,
      undefined,
      {
        name: "dropdown1",
        items: dropdown_PasteToOption_array,
      }
    );
    dropdown_PasteToOption.selection = 0;
    var staticText_checkboxLabel = group3.add(
      "statictext",
      undefined,
      "Paste:"
    );
    var checkBox_copyValues = group3.add("checkbox", undefined, "Value");
    checkBox_copyValues.value = 1;
    var checkBox_copyKeyframes = group3.add("checkbox", undefined, "Keyframe");
    checkBox_copyKeyframes.value = 1;
    var checkBox_copyExpressions = group3.add(
      "checkbox",
      undefined,
      "Expression"
    );
    checkBox_copyExpressions.value = 1;
    // Function to update button label
    function updateButtonLabel(updateData) {
      selectedPropertyData = updateData;
      if (selectedPropertyData !== null) {
        button_StoreSelectedPropertiesData.text = "Stored!";
      } else {
        button_StoreSelectedPropertiesData.text = "Store";
      }
    }
    function checkAltKey() {
      var keyState = ScriptUI.environment.keyboardState;
      if (keyState.altKey) {
        return true;
      } else {
        return false;
      }
    }
    win.onResizing = win.onResize = function () {
      this.layout.resize();
    };

    win instanceof Window
      ? (win.center(), win.show())
      : (win.layout.layout(true), win.layout.resize());
  }
})(this);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a variable to store the selected property data
var selectedPropertyData = null;

function find_selected_properties_on_layer(layer) {
  //Get all selected properties on the layer
  var props_array = [];
  for (var i = 0; i < layer.selectedProperties.length; i++) {
    if (layer.selectedProperties[i].propertyType === PropertyType.PROPERTY) {
      props_array.push(layer.selectedProperties[i]);
    }
  }
  return props_array;
}
function get_selected_property_to_search(prop, layer) {
  var propertyPath_matchName = []; // Initialize an array to store the property path
  var propertyPath_name = []; // Initialize an array to store the property path

  var propertyData = {}; // Initialize an object to store the property data
  var currentProp = prop; // Start with the given property

  // Traverse backward through the parentProperty chain until reaching the root level
  while (currentProp.parentProperty !== null) {
    propertyPath_matchName.unshift(currentProp.matchName); // Add the matchName of the current property to the beginning of the array
    currentProp = currentProp.parentProperty; // Move to the parent property
  }

  //NEW CODE
  currentProp = prop; // Reset currentProp to the original property object

  // Traverse backward through the parentProperty chain until reaching the root level
  while (currentProp.parentProperty !== null) {
    propertyPath_name.unshift(currentProp.name); // Add the name of the current property to the beginning of the array
    currentProp = currentProp.parentProperty; // Move to the parent property
  }
  // Store property data
  propertyData.prop = prop;
  propertyData.name = prop.name;
  propertyData.matchName = prop.matchName;
  propertyData.value = prop.value;
  propertyData.keyframes = [];

  // Store keyframe data if applicable
  if (prop.numKeys > 0) {
    for (var i = 1; i <= prop.numKeys; i++) {
      propertyData.keyframes.push({
        time: prop.keyTime(i),
        value: prop.keyValue(i),
        temporalEaseIn: prop.keyInTemporalEase(i),
        temporalEaseOut: prop.keyOutTemporalEase(i),
      });
    }
  }

  return {
    propPath: propertyPath_matchName,
    propPath_name: propertyPath_name,
    propData: propertyData,
    propLayer: layer,
  }; // Return the built property path
}
function find_layer_property_by_matchName(
  layer,
  propertyPathProps,
  layerToSkip
) {
  var currentLayer = layer; // Start with the given layer
  if (layerToSkip !== null) {
    if (
      currentLayer.name === layerToSkip.name &&
      currentLayer.index === layerToSkip.index
    ) {
      return null;
    }
  }

  // Traverse down the property path on the layer
  for (var i = 0; i < propertyPathProps.length; i++) {
    var propertyName = propertyPathProps[i];

    // Find the property with the current matchName on the current layer
    var foundProperty = null;
    for (var j = 1; j <= currentLayer.numProperties; j++) {
      var property = currentLayer.property(j);
      if (property.matchName === propertyName) {
        foundProperty = property;
        break;
      }
    }

    // If the property is found and it's not the last property in the path, move to its child property
    if (foundProperty !== null && i < propertyPathProps.length - 1) {
      currentLayer = foundProperty;
    } else {
      return foundProperty; // Return the found property
    }
  }

  return null; // Return null if the property is not found
}
function store_selected_properties_data(layer) {
  var props_array = find_selected_properties_on_layer(layer);
  selectedPropertyData = []; // Initialize selectedPropertyData as an array
  for (var n = 0; n < props_array.length; n++) {
    var selectedProperty_Object = get_selected_property_to_search(
      props_array[n],
      layer
    );
    selectedPropertyData.push(selectedProperty_Object); // Store each selected property object in selectedPropertyData array
  }
  return selectedPropertyData;
}
function paste_selected_properties_data(
  selectedLayers,
  dropdown_PasteToOption,
  checkBox_copyValues,
  checkBox_copyKeyframes,
  checkBox_copyExpressions
) {
  for (var n = 0; n < selectedPropertyData.length; n++) {
    var propertyPathProps = selectedPropertyData[n].propPath;
    var propertyPathData = selectedPropertyData[n].propData;
    var skipLayer = selectedPropertyData[n].propLayer;
    var loopInteger;
    var loopCondition;
    var loopLayers;

    switch (dropdown_PasteToOption) {
      case 0:
        loopInteger = 0;
        loopCondition = selectedLayers.length;
        loopLayers = selectedLayers; //An Array
        loop_through_and_paste_properties();
        break;
      case 1:
        loopInteger = 1;
        loopCondition = app.project.activeItem.numLayers + 1;
        loopLayers = app.project.activeItem; //An Array
        loop_through_and_paste_properties();
        break;
      case 2:
        var proj = app.project;
        for (var j = 1; j <= proj.numItems; j++) {
          var compItem = proj.item(j);
          if (compItem instanceof CompItem) {
            // If item is a composition
            loopInteger = 1;
            loopCondition = compItem.numLayers + 1;
            loopLayers = compItem;
            loop_through_and_paste_properties();
          }
        }
        break;
    }
    function loop_through_and_paste_properties() {
      for (var m = loopInteger; m < loopCondition; m++) {
        var loopLayer_forLoop;
        if (loopLayers instanceof Array) {
          loopLayer_forLoop = loopLayers[m];
        } else {
          loopLayer_forLoop = loopLayers.layer(m);
        }
        var foundProperty = find_layer_property_by_matchName(
          loopLayer_forLoop,
          propertyPathProps,
          skipLayer
        );
        if (foundProperty) {
          clearExpression(foundProperty);
          if (checkBox_copyValues) {
            copyValue(propertyPathData.value, foundProperty);
          }
          if (checkBox_copyKeyframes) {
            copyKeyframes(propertyPathData.prop, foundProperty);
          }
          if (checkBox_copyExpressions) {
            copyExpression(propertyPathData.prop, foundProperty);
          }
        }
      }
    }
  }
  //   alert(selectedPropertyData[0].propData.name);
}
function link_selected_properties_data(selectedLayers, dropdown_PasteToOption) {
  //Deselect all layers
  app.executeCommand(2004);

  //Select all selected properties and copy with property links
  (function () {
    for (var b = 0; b < selectedPropertyData.length; b++) {
      selectedPropertyData[b].propData.prop.selected = true;
    }
    //Copy with property links
    app.executeCommand(10310);

    //Deselect all layers
    app.executeCommand(2004);

    //Deselect the layer
    var selectedCompLayers = app.project.activeItem.selectedLayers; // Get a reference to the selected layers
    var numCompLayers = selectedCompLayers.length; // Get the initial number of selected layers

    // Loop until all layers are deselected
    while (numCompLayers > 0) {
      selectedCompLayers[numCompLayers - 1].selected = false; // Deselect the last selected layer
      numCompLayers--; // Decrement the count of selected layers
    }
  })();

  switch (dropdown_PasteToOption) {
    case 0:
      loopInteger = 0;
      loopCondition = selectedLayers.length;
      loopLayers = selectedLayers; //An Array
      loop_through_layers_and_paste_commandID();
      break;
    case 1:
      loopInteger = 1;
      loopCondition = app.project.activeItem.numLayers + 1;
      loopLayers = app.project.activeItem; //An Array
      loop_through_layers_and_paste_commandID();
      break;
    case 2:
      var proj = app.project;
      for (var j = 1; j <= proj.numItems; j++) {
        var compItem = proj.item(j);
        if (compItem instanceof CompItem) {
          // If item is a composition
          loopInteger = 1;
          loopCondition = compItem.numLayers + 1;
          loopLayers = compItem;
          loop_through_layers_and_paste_commandID();
        }
      }
      break;
  }
  function loop_through_layers_and_paste_commandID() {
    //Loop through each layer, either selected, in comp, or in project
    for (var m = loopInteger; m < loopCondition; m++) {
      var loopLayer_forLoop;
      if (loopLayers instanceof Array) {
        loopLayer_forLoop = loopLayers[m];
      } else {
        loopLayer_forLoop = loopLayers.layer(m);
      }
      var matchedPropertiesCount = 0;

      // Check if the current property's match name matches any item in propertyPathProps using our function
      for (var i = 0; i < selectedPropertyData.length; i++) {
        var foundProperty = find_layer_property_by_matchName(
          loopLayer_forLoop,
          selectedPropertyData[i].propPath,
          selectedPropertyData[0].propLayer
        );
        if (foundProperty) {
          matchedPropertiesCount++;
        } // Increment counter for matched properties
      }
      // Check if all properties match
      if (matchedPropertiesCount === selectedPropertyData.length) {
        // All properties match
        loopLayer_forLoop.selected = true; // Select the layer
        app.executeCommand(20); // Execute command
        // Now we need to delete the newly added keyframes. Good luck!
        for (var d = 0; d < selectedPropertyData.length; d++) {
          var foundProperty = find_layer_property_by_matchName(
            loopLayer_forLoop,
            selectedPropertyData[d].propPath,
            selectedPropertyData[0].propLayer
          );
          clearKeyframes(foundProperty);
        }
        loopLayer_forLoop.selected = false; // Deselect the layer
      }
    }
  }
}
function copyValue(propToCopy, prop) {
  try {
    clearKeyframes(prop);
    prop.setValue(propToCopy);
  } catch (err) {
    null;
  }
}
function copyExpression(propToCopy, prop) {
  if (propToCopy.expressionEnabled) {
    try {
      prop.expression = propToCopy.expression;
    } catch (err) {
      null;
    }
  }
}
function copyKeyframes(propToCopy, prop) {
  if (propToCopy.numKeys > 0) {
    try {
      clearKeyframes(prop);
      // Copy keyframes from 'propToCopy' to 'prop'
      for (var i = 1; i <= propToCopy.numKeys; i++) {
        // Get keyframe value and time from 'propToCopy'
        var keyframeValue = propToCopy.keyValue(i);
        var keyframeTime = propToCopy.keyTime(i);
        var keyIndex = propToCopy.nearestKeyIndex(keyframeTime);
        var keyTypeIn = propToCopy.keyInInterpolationType(keyIndex);
        var keyTypeOut = propToCopy.keyOutInterpolationType(keyIndex);
        // alert(keyTypeIn + "\n" + keyTypeOut);
        // Copy keyframe temporal easing
        var temporalEaseIn = propToCopy.keyInTemporalEase(i);
        var temporalEaseOut = propToCopy.keyOutTemporalEase(i);

        // alert(temporalEaseIn[0].speed + "   " + temporalEaseIn[0].influence);

        var newKeyIndex = prop.addKey(keyframeTime);
        prop.setValueAtKey(newKeyIndex, keyframeValue);
        // prop.setTemporalEaseAtKey(newKeyIndex, temporalEaseIn, temporalEaseOut);
      }
    } catch (err) {
      null;
    }
  }
}
function addExpression(propToCopy, prop) {
  null;
  try {
    null;
  } catch (err) {
    null;
  }
}
function clearKeyframes(prop) {
  // Clear existing keyframes in 'prop'
  if (prop.numKeys > 0) {
    var n = prop.numKeys;
    while (n >= 1) {
      prop.removeKey(n);
      // Decrement n for the next iteration
      n--;
    }
  }
}
function clearExpression(prop) {
  if (prop.expressionEnabled) {
    try {
      prop.expression = "";
    } catch (err) {
      null;
    }
  }
}
function display_prop_names(props_array) {
  var myAlert =
    "Stored Properties on layer: " + props_array[0].propLayer.name + "\n";
  for (var m = 0; m < props_array.length; m++) {
    myAlert +=
      props_array[m].propData.name +
      " = " +
      props_array[m].propData.value.toString() +
      "\n";
  }
  alert(myAlert);
}
