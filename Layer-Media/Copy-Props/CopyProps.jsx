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
      if (
        app.project.activeItem.selectedLayers[0].selectedProperties.length !== 0
      ) {
        var updateData = store_selected_properties_data(
          app.project.activeItem.selectedLayers[0]
        );
        updateButtonLabel(updateData);
      } else {
        alert("Select some properties");
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
    var button_AlertStoredProperties = new FancyButton(
      group1,
      {
        width: 20,
        height: 20,
        text: ":)",
        color: grey100,
        strokeWidth: 2,
        strokeColor: grey600,
      },
      false,
      true
    );
    button_AlertStoredProperties.onClick = function () {
      if (selectedPropertyData !== null) {
        // alert(selectedPropertyData[0].propData.name);
        display_prop_names(selectedPropertyData);
      } else {
        alert("No properties ready to paste");
      }
    };

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

// function copypaste_effects_activecomp_MAIN(selectedLayer) {
//   var selectedPropsObject_Effects = (function (layer, parentProp_matchName) {
//     //First we need to separate the selected Effect (like "Fill") from the specific properties selected like "Color"
//     var selectedProps = [];
//     var selectedLayerEffect = null;
//     var layerProps_Effects = layer.property(parentProp_matchName);
//     for (var i = 1; i <= layerProps_Effects.numProperties; i++) {
//       //Loop through all Effects Properties to find which are selected
//       if (layerProps_Effects.property(i).selected === true) {
//         selectedLayerEffect = layerProps_Effects.property(i);
//         for (var j = 1; j <= selectedLayerEffect.numProperties; j++) {
//           if (
//             selectedLayerEffect.property(j).selected === true &&
//             selectedLayerEffect.property(j).propertyType ===
//               PropertyType.PROPERTY
//           ) {
//             selectedProps.push(selectedLayerEffect.property(j));
//           }
//         }
//       }
//     }
//     //   alert(selectedLayerEffect.name);
//     return { props: selectedProps, effect: selectedLayerEffect };
//   })(selectedLayer, "ADBE Effect Parade");

//   app.beginUndoGroup("Copy");
//   copypaste_effects_activecomp(
//     app.project.activeItem,
//     selectedPropsObject_Effects,
//     "matchName"
//   );
//   app.endUndoGroup();

//   //Scan ACTIVE COMP and update effects based on new values
//   function copypaste_effects_activecomp(comp, propsObject, searchType) {
//     //   First we need to find the layers that have the same effect using matchName
//     var searchEffectProperty = propsObject.effect;
//     for (var i = 1; i <= comp.numLayers; i++) {
//       if (comp.layer(i).property("ADBE Effect Parade").numProperties > 0) {
//         searchlayer = comp.layer(i);
//         var matchingProperty = searchLayerEffects_matchName(
//           searchlayer,
//           searchEffectProperty.matchName
//         );
//         if (matchingProperty) {
//           for (var n = 0; n < propsObject.props.length; n++) {
//             copypaste_PropertyTypePROPERTY(
//               matchingProperty,
//               propsObject.props[n]
//             );
//           }
//         }
//       }
//     }
//     alert("Copied!");
//     return;
//   }
//   function searchLayerEffects_matchName(layer, search_matchName) {
//     for (
//       var i = 1;
//       i <= layer.property("ADBE Effect Parade").numProperties;
//       i++
//     ) {
//       if (
//         layer.property("ADBE Effect Parade").property(i).matchName ===
//         search_matchName
//       ) {
//         return layer.property("ADBE Effect Parade").property(i); // Return true if match found
//       }
//     }
//     return null; // Return false if no match found after checking all properties
//   }
//   function copypaste_PropertyTypePROPERTY(layerProperty, propsToCopy) {
//     for (var i = 1; i <= layerProperty.numProperties; i++) {
//       if (layerProperty.property(i).matchName == propsToCopy.matchName) {
//         layerProperty.property(i).setValue(propsToCopy.value);
//       }
//     }
//   }
// }

// function rd_GimmePropPath_findDeepestSelectedProp() {
//   var comp = app.project.activeItem;
//   var deepestProp,
//     numDeepestProps = 0,
//     deepestPropDepth = 0;
//   var prop;

//   for (var i = 0; i < comp.selectedProperties.length; i++) {
//     prop = comp.selectedProperties[i];

//     if (prop.propertyDepth >= deepestPropDepth) {
//       if (prop.propertyDepth > deepestPropDepth) numDeepestProps = 0;
//       deepestProp = prop;
//       numDeepestProps++;
//       deepestPropDepth = prop.propertyDepth;
//     } else continue;
//   }

//   return numDeepestProps > 1 ? null : deepestProp;
// }
// function copy_selected_properties(props_array) {
//   for (var n = 0; n < props_array.length; n++) {
//     var propertyPathProps = get_selected_property_to_search(props_array[n]);
//     if (allLayersInComp === true) {
//       for (var m = 1; m <= comp.numLayers; m++) {
//         var foundProperty = find_layer_property_by_matchName(
//           comp.layer(m),
//           propertyPathProps.propPath,
//           app.project.activeItem.selectedLayers[0]
//         );
//         if (foundProperty) {
//           clearExpression(foundProperty);
//           copyValue(props_array[n].value, foundProperty);
//           copyExpression(props_array[n], foundProperty);
//           copyKeyframes(props_array[n], foundProperty);
//         }
//       }
//     }
//   }
// }
var expressionNameMap = {
  "ADBE Transform Group": "'transform'",
  // Handle camera/light vs. AV layers
  "ADBE Anchor Point":
    "((prop.propertyGroup(prop.propertyDepth).property('intensity')!=null) || (prop.propertyGroup(prop.propertyDepth).property('zoom')!=null)) ? '.pointOfInterest' : '.anchorPoint'",
  "ADBE Position": "'.position'",
  "ADBE Scale": "'.scale'",
  "ADBE Orientation": "'.orientation'",
  "ADBE Rotate X": "'.xRotation'",
  "ADBE Rotate Y": "'.yRotation'",
  // Handle 3D vs. 2D layers
  "ADBE Rotate Z":
    "(prop.propertyGroup(prop.propertyDepth).threeDLayer || (prop.propertyGroup(prop.propertyDepth).property('intensity')!=null) || (prop.propertyGroup(prop.propertyDepth).property('zoom')!=null)) ? '.zRotation' : '.rotation'",
  "ADBE Opacity": "'.opacity'",

  "ADBE Material Options Group": "'materialOption'",
  "ADBE Casts Shadows": "'.castsShadows'",
  "ADBE Light Transmission": "'.lightTransmission'",
  "ADBE Accepts Shadows": "'.acceptsShadows'",
  "ADBE Accepts Lights": "'.acceptsLights'",
  "ADBE Ambient Coefficient": "'.ambient'",
  "ADBE Diffuse Coefficient": "'.diffuse'",
  "ADBE Specular Coefficient": "'.specular'",
  "ADBE Shininess Coefficient": "'.shininess'",
  "ADBE Metal Coefficient": "'.metal'",

  "ADBE Light Options Group": "'lightOption'",
  "ADBE Light Intensity": "'.intensity'",
  "ADBE Light Color": "'.color'",
  "ADBE Light Cone Angle": "'.coneAngle'",
  "ADBE Light Cone Feather 2": "'.coneFeather'",
  //"ADBE Casts Shadows":										"'.castsShadows'",	// Already covered previously
  "ADBE Light Shadow Darkness": "'.shadowDarkness'",
  "ADBE Light Shadow Diffusion": "'.shadowDiffusion'",

  "ADBE Camera Options Group": "'cameraOption'",
  "ADBE Camera Zoom": "'.zoom'",
  "ADBE Camera Depth of Field": "'.depthOfField'",
  "ADBE Camera Focus Distance": "'.focusDistance'",
  "ADBE Camera Aperture": "'.aperture'",
  "ADBE Camera Blur Level": "'.blurLevel'",

  "ADBE Text Properties": "'text'",
  "ADBE Text Document": "'.sourceText'",
  "ADBE Text Path Options": "'.pathOption'",
  "ADBE Text Path": "'.path'",
  "ADBE Text Reverse Path": "'.reversePath'",
  "ADBE Text Perpendicular To Path": "'.perpendicularToPath'",
  "ADBE Text Force Align Path": "'.forceAlignment'",
  "ADBE Text First Margin": "'.firstMargin'",
  "ADBE Text Last Margin": "'.lastMargin'",
  "ADBE Text More Options": "'.moreOption'",
  "ADBE Text Anchor Point Option": "'.anchorPointGrouping'",
  "ADBE Text Anchor Point Align": "'.groupingAlignment'",
  "ADBE Text Render Order": "'.fillANdStroke'",
  "ADBE Text Character Blend Mode": "'.interCharacterBlending'",

  "ADBE Text Animators": "'.animator'",
  //"ADBE Text Animator":										"''",		// No equivalent
  "ADBE Text Selectors": "'.selector'",
  //"ADBE Text Selector":											"''",		// No equivalent
  "ADBE Text Percent Start": "'.start'",
  "ADBE Text Percent End": "'.end'",
  "ADBE Text Percent Offset": "'.offset'",
  "ADBE Text Index Start": "'.start'",
  "ADBE Text Index End": "'.end'",
  "ADBE Text Index Offset": "'.offset'",
  "ADBE Text Range Advanced": "'.advanced'",
  "ADBE Text Range Units": "'.units'",
  "ADBE Text Range Type2": "'.basedOn'",
  "ADBE Text Selector Mode": "'.mode'",
  "ADBE Text Selector Max Amount": "'.amount'",
  "ADBE Text Range Shape": "'.shape'",
  "ADBE Text Selector Smoothness": "'.smoothness'",
  "ADBE Text Levels Max Ease": "'.easeHigh'",
  "ADBE Text Levels Min Ease": "'.easeLow'",
  "ADBE Text Randomize Order": "'.randomizeOrder'",
  "ADBE Text Random Seed": "'.randomSeed'",
  //"ADBE Text Wiggly Selector":								"''",		// No equivalent
  "ADBE Text Selector Mode": "'.mode'",
  "ADBE Text Wiggly Max Amount": "'.maxAmount'",
  "ADBE Text Wiggly Min Amount": "'.minAmount'",
  "ADBE Text Range Type2": "'.basedOn'",
  "ADBE Text Temporal Freq": "'.wigglesSecond'",
  "ADBE Text Character Correlation": "'.correlation'",
  "ADBE Text Temporal Phase": "'.temporalPhase'",
  "ADBE Text Spatial Phase": "'.spatialPhase'",
  "ADBE Text Wiggly Lock Dim": "'.lockDimensions'",
  "ADBE Text Wiggly Random Seed": "'.randomSeed'",
  //"ADBE Text Expressible Selector":						"''",		// No equivalent
  "ADBE Text Range Type2": "'.basedOn'",
  "ADBE Text Expressible Amount": "'.amount'",
  "ADBE Text Animator Properties": "'.property'",
  "ADBE Text Anchor Point 3D": "'.anchorPoint'",
  "ADBE Text Position 3D": "'.position'",
  "ADBE Text Scale 3D": "'.scale'",
  "ADBE Text Skew": "'.skew'",
  "ADBE Text Skew Axis": "'.skewAxis'",
  "ADBE Text Rotation X": "'.xRotation'",
  "ADBE Text Rotation Y": "'.yRotation'",
  "ADBE Text Rotation": "'.zRotation'",
  "ADBE Text Opacity": "'.opacity'",
  "ADBE Text Fill Opacity": "'.fillOpacity'",
  "ADBE Text Fill Color": "'.fillColor'",
  "ADBE Text Fill Hue": "'.fillHue'",
  "ADBE Text Fill Saturation": "'.fillSaturation'",
  "ADBE Text Fill Brightness": "'.fillBrightness'",
  "ADBE Text Stroke Opacity": "'.strokeOpacity'",
  "ADBE Text Stroke Color": "'.strokeColor'",
  "ADBE Text Stroke Hue": "'.strokeHue'",
  "ADBE Text Stroke Saturation": "'.strokeSaturation'",
  "ADBE Text Stroke Brightness": "'.strokeBrightness'",
  "ADBE Text Stroke Width": "'.strokeWidth'",
  "ADBE Text Line Anchor": "'.lineAnchor'",
  "ADBE Text Line Spacing": "'.lineSpacing'",
  "ADBE Text Track Type": "'.trackingType'",
  "ADBE Text Tracking Amount": "'.trackingAmount'",
  "ADBE Text Character Change Type": "'.characterAlignment'",
  "ADBE Text Character Range": "'.characterRange'",
  "ADBE Text Character Replace": "'.characterValue'",
  "ADBE Text Character Offset": "'.characterOffset'",
  "ADBE Text Blur": "'.blur'",

  "ADBE Mask Parade": "'mask'",
  "ADBE Mask Shape": "'.maskPath'",
  "ADBE Mask Feather": "'.maskFeather'",
  "ADBE Mask Opacity": "'.maskOpacity'",
  "ADBE Mask Offset": "'.maskExpansion'",

  "ADBE Effect Parade": "'effect'",

  //"ADBE Paint":													"''",
  //"ADBE Paint On Transparent":								"''",
  "ADBE Paint Group": "'.stroke'",
  //"ADBE Paint Atom":											"''",
  //"ADBE Paint Transfer Mode":								"''",
  //"ADBE Paint Duration":										"''",
  "ADBE Paint Shape": "'.path'",
  "ADBE Paint Properties": "'.strokeOption'",
  "ADBE Paint Begin": "'.start'",
  "ADBE Paint End": "'.end'",
  "ADBE Paint Color": "'.color'",
  "ADBE Paint Diameter": "'.diameter'",
  "ADBE Paint Angle": "'.angle'",
  "ADBE Paint Hardness": "'.hardness'",
  "ADBE Paint Roundness": "'.roundness'",
  "ADBE Paint Tip Spacing": "'.spacing'",
  "ADBE Paint Target Channels": "'.channels'",
  "ADBE Paint Opacity": "'.opacity'",
  "ADBE Paint Flow": "'.flow'",
  "ADBE Paint Clone Layer": "'.cloneSource'",
  "ADBE Paint Clone Position": "'.clonePosition'",
  "ADBE Paint Clone Time": "'.cloneTime'",
  "ADBE Paint Clone Time Shift": "'.cloneTimeShift'",
  //"ADBE Paint Clone Source Type":							"''",
  "ADBE Paint Transform": "'.transform'",
  "ADBE Paint Anchor Point": "'.anchorPoint'",
  "ADBE Paint Position": "'.position'",
  "ADBE Paint Scale": "'.scale'",
  "ADBE Paint Rotation": "'.rotation'",
  //"ADBE Paint Nibbler Group":								"''",

  "ADBE MTrackers": "'motionTracker'",
  "ADBE MTracker Pt Feature Center": "'.featureCenter'",
  "ADBE MTracker Pt Feature Size": "'.featureSize'",
  "ADBE MTracker Pt Search Ofst": "'.searchOffset'",
  "ADBE MTracker Pt Search Size": "'.searchSize'",
  "ADBE MTracker Pt Confidence": "'.confidence'",
  "ADBE MTracker Pt Attach Pt": "'.attachPoint'",
  "ADBE MTracker Pt Attach Pt Ofst": "'.attachPointOffset'",

  "ADBE Audio Group": "'audio'",
  "ADBE Audio Levels": "'.audioLevels'",

  "ADBE Time Remapping": "'timeRemap'",

  "ADBE Layer Styles": "'layerStyle'",
  "ADBE Blend Options Group": "'.blendingOption'",
  "ADBE Global Angle2": "'.globalLightAngle'",
  "ADBE Global Altitude2": "'.globalLightAltitude'",
  "ADBE Adv Blend Group": "'.advancedBlending'",
  "ADBE Layer Fill Opacity2": "'.fillOpacity'",
  "ADBE R Channel Blend": "'.red'",
  "ADBE G Channel Blend": "'.green'",
  "ADBE B Channel Blend": "'.blue'",
  "ADBE Blend Interior": "'.blendInteriorStylesAsGroup'",
  "ADBE Blend Ranges": "'.useBlendRangesFromSource'",
  "dropShadow/enabled": "'.dropShadow'",
  "dropShadow/mode2": "'.blendMode'",
  "dropShadow/color": "'.color'",
  "dropShadow/opacity": "'.opacity'",
  "dropShadow/useGlobalAngle": "'.useGlobalLight'",
  "dropShadow/localLightingAngle": "'.angle'",
  "dropShadow/distance": "'.distance'",
  "dropShadow/chokeMatte": "'.spread'",
  "dropShadow/blur": "'.size'",
  "dropShadow/noise": "'.noise'",
  "dropShadow/layerConceals": "'.layerKnocksOutDropShadow'",
  "innerShadow/enabled": "'.innerShadow'",
  "innerShadow/mode2": "'.blendMode'",
  "innerShadow/color": "'.color'",
  "innerShadow/opacity": "'.opacity'",
  "innerShadow/useGlobalAngle": "'.useGlobalLight'",
  "innerShadow/localLightingAngle": "'.angle'",
  "innerShadow/distance": "'.distance'",
  "innerShadow/chokeMatte": "'.choke'",
  "innerShadow/blur": "'.size'",
  "innerShadow/noise": "'.noise'",
  "outerGlow/enabled": "'.outerGlow'",
  "outerGlow/mode2": "'.blendMode'",
  "outerGlow/opacity": "'.opacity'",
  "outerGlow/noise": "'.noise'",
  "outerGlow/AEColorChoice": "'.colorType'",
  "outerGlow/color": "'.color'",
  //"outerGlow/gradient":											"'.'",		// No equivalent
  "outerGlow/gradientSmoothness": "'.gradientSmoothness'",
  "outerGlow/glowTechnique": "'.technique'",
  "outerGlow/chokeMatte": "'.spread'",
  "outerGlow/blur": "'.size'",
  "outerGlow/inputRange": "'.range'",
  "outerGlow/shadingNoise": "'.jitter'",
  "innerGlow/enabled": "'.innerGlow'",
  "innerGlow/mode2": "'.blendMode'",
  "innerGlow/opacity": "'.opacity'",
  "innerGlow/noise": "'.noise'",
  "innerGlow/AEColorChoice": "'.colorType'",
  "innerGlow/color": "'.color'",
  //"innerGlow/gradient":											"'.'",		// No equivalent
  "innerGlow/gradientSmoothness": "'.gradientSmoothness'",
  "innerGlow/glowTechnique": "'.technique'",
  "innerGlow/innerGlowSource": "'.source'",
  "innerGlow/chokeMatte": "'.choke'",
  "innerGlow/blur": "'.size'",
  "innerGlow/inputRange": "'.range'",
  "innerGlow/shadingNoise": "'.jitter'",
  "bevelEmboss/enabled": "'.bevelAndEmboss'",
  "bevelEmboss/bevelStyle": "'.style'",
  "bevelEmboss/bevelTechnique": "'.technique'",
  "bevelEmboss/strengthRatio": "'.depth'",
  "bevelEmboss/bevelDirection": "'.direction'",
  "bevelEmboss/blur": "'.size'",
  "bevelEmboss/softness": "'.soften'",
  "bevelEmboss/useGlobalAngle": "'.useGlobalLight'",
  "bevelEmboss/localLightingAngle": "'.angle'",
  "bevelEmboss/localLightingAltitude": "'.altitude'",
  "bevelEmboss/highlightMode": "'.highlightMode'",
  "bevelEmboss/highlightColor": "'.highlightColor'",
  "bevelEmboss/highlightOpacity": "'.highlightOpacity'",
  "bevelEmboss/shadowMode": "'.shadowMode'",
  "bevelEmboss/shadowColor": "'.shadowColor'",
  "bevelEmboss/shadowOpacity": "'.shadowOpacity'",
  "chromeFX/enabled": "'.satin'",
  "chromeFX/mode2": "'.blendMode'",
  "chromeFX/color": "'.color'",
  "chromeFX/opacity": "'.opacity'",
  "chromeFX/localLightingAngle": "'.angle'",
  "chromeFX/distance": "'.distance'",
  "chromeFX/blur": "'.size'",
  "chromeFX/invert": "'.invert'",
  "solidFill/enabled": "'.colorOverlay'",
  "solidFill/mode2": "'.blendMode'",
  "solidFill/color": "'.color'",
  "solidFill/opacity": "'.opacity'",
  "gradientFill/enabled": "'.gradientOverlay'",
  "gradientFill/mode2": "'.blendMode'",
  "gradientFill/opacity": "'.opacity'",
  //"gradientFill/gradient":										"'.'",		// No equivalent
  "gradientFill/gradientSmoothness": "'.gradientSmoothness'",
  "gradientFill/angle": "'.angle'",
  "gradientFill/type": "'.style'",
  "gradientFill/reverse": "'.reverse'",
  "gradientFill/align": "'.alignWithLayer'",
  "gradientFill/scale": "'.scale'",
  "gradientFill/offset": "'.offset'",
  "patternFill/enabled": "'.patternOverlay'",
  "patternFill/mode2": "'.blendMode'",
  "patternFill/opacity": "'.opacity'",
  "patternFill/align": "'.linkWithLayer'",
  "patternFill/scale": "'.scale'",
  "patternFill/phase": "'.offset'",
  "frameFX/enabled": "'.stroke'",
  "frameFX/mode2": "'.blendMode'",
  "frameFX/color": "'.color'",
  "frameFX/size": "'.size'",
  "frameFX/opacity": "'.opacity'",
  "frameFX/style": "'.position'",
};
