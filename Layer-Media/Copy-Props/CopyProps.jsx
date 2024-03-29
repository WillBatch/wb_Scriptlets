(function (thisObj) {
  scriptBuildUI(thisObj);
  function scriptBuildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Copy Cat", undefined, {
            resizeable: true,
          });
    win.spacing = 0;
    win.orientation = "column";

    var group1 = win.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    group1.spacing = 3;

    function FancyButton(
      parentGroup,
      params,
      changeColorState_Fill,
      changeColorState_Stroke,
      strokeColor,
      strokeWidth
    ) {
      var button = parentGroup.add("customButton", undefined, "");
      button.width = params.width;
      button.height = params.height;
      button.text = params.text;
      button.color = params.color;

      button.preferredSize.height = button.height;
      button.preferredSize.width = button.width;

      button.addEventListener("mouseover", function () {
        drawFancyButton(
          button,
          true,
          changeColorState_Fill,
          changeColorState_Stroke,
          strokeColor,
          strokeWidth
        );
      });
      button.addEventListener("mouseout", function () {
        drawFancyButton(
          button,
          false,
          changeColorState_Fill,
          changeColorState_Stroke,
          strokeColor,
          strokeWidth
        );
      });
      drawFancyButton(
        button,
        false,
        changeColorState_Fill,
        changeColorState_Stroke,
        strokeColor,
        strokeWidth
      );

      return button;
    }
    function drawFancyButton(
      button,
      hover,
      changeColorState_Fill,
      changeColorState_Stroke,
      strokeColor,
      strokeWidth
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
      var strokePen = g.newPen(
        g.PenType.SOLID_COLOR,
        [strokeColor[0] / 255, strokeColor[1] / 255, strokeColor[2] / 255, 1], // Stroke color
        strokeWidth // Stroke width
      );

      if (changeColorState_Fill === true || changeColorState_Stroke === true) {
        changeColorState = true;
      }

      var textPen; // <-- new textPen variable
      if (hover) {
        textPen = g.newPen(
          g.PenType.SOLID_COLOR,
          [255 / 255, 255 / 255, 255 / 255, 1],
          1
        ); // <-- define textPen when hover is true
      } else {
        textPen = g.newPen(
          g.PenType.SOLID_COLOR,
          [0 / 255, 0 / 255, 0 / 255, 1],
          1
        ); // <-- define textPen when hover is false
      }
      var textSize = g.measureString(button.text);

      button.onDraw = function () {
        var blueBrush = g.newBrush(g.BrushType.SOLID_COLOR, [
          0 / 255,
          152 / 255,
          255 / 255,
          1,
        ]);
        var blackPen = g.newPen(
          g.PenType.SOLID_COLOR,
          [0 / 255, 0 / 255, 0 / 255, 1],
          1
        );
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
        // Draw the border stroke
        // g.drawRoundRect(0, 0, this.width, this.height, 15, strokePen);
      };
    }

    var button_StoreSelectedPropertiesData = new FancyButton(
      group1,
      {
        width: 80,
        height: 20,
        text: "Store",
        color: [0, 152, 255],
      },
      true,
      false,
      [255, 255, 255],
      3
    );

    // Function to update button label
    function updateButtonLabel() {
      if (selectedPropertyData !== null) {
        button_StoreSelectedPropertiesData.text = "Stored";
        button_StoreSelectedPropertiesData.color = [150, 0, 0];
      } else {
        button_StoreSelectedPropertiesData.text = "Store";
      }
    }

    button_StoreSelectedPropertiesData.onClick = function () {
      ///function goes here
      if (app.project.activeItem.selectedLayers[0]) {
        store_selected_properties_data(
          app.project.activeItem.selectedLayers[0]
        );
        updateButtonLabel();
      } else {
        alert("Select some properties");
      }
    };

    var button_PasteStoredPropertiesData = new FancyButton(
      group1,
      {
        width: 80,
        height: 20,
        text: "Paste",
        color: [0, 152, 255],
      },
      false,
      true,
      [255, 0, 0],
      1
    );
    button_PasteStoredPropertiesData.onClick = function () {
      if (
        selectedPropertyData !== null &&
        app.project.activeItem.selectedLayers.length !== 0
      ) {
        paste_selected_properties_data(app.project.activeItem.selectedLayers);
      }
      if (selectedPropertyData === null) {
        alert("No stored data");
      }
      if (app.project.activeItem.selectedLayers.length === 0) {
        alert("Select some layers");
      }
    };
    win.onResizing = win.onResize = function () {
      this.layout.resize();
    };

    win instanceof Window
      ? (win.center(), win.show())
      : (win.layout.layout(true), win.layout.resize());
  }
})(this);

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a variable to store the selected property data
var selectedPropertyData = null;
// var comp = app.project.activeItem;
// var layer = comp.selectedLayers[0];
// var layerProps = layer.numProperties;
// var newLayer = app.project.activeItem.layer(1); //temp layer
// var allLayersInComp = true;

// app.beginUndoGroup("1");
// var selectedLayerProperties = find_selected_properties_on_layer(
//   app.project.activeItem.selectedLayers[0]
// );
// copy_selected_properties(selectedLayerProperties);
// app.endUndoGroup();

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
function copy_selected_properties(props_array) {
  for (var n = 0; n < props_array.length; n++) {
    var propertyPathProps = get_selected_property_to_search(props_array[n]);
    if (allLayersInComp === true) {
      for (var m = 1; m <= comp.numLayers; m++) {
        var foundProperty = find_layer_property_by_matchName(
          comp.layer(m),
          propertyPathProps.propPath,
          app.project.activeItem.selectedLayers[0]
        );
        if (foundProperty) {
          clearExpression(foundProperty);
          copyValue(props_array[n].value, foundProperty);
          copyExpression(props_array[n], foundProperty);
          copyKeyframes(props_array[n], foundProperty);
        }
      }
    }
  }
}
function get_selected_property_to_search(prop) {
  var propertyPath = []; // Initialize an array to store the property path
  var propertyData = {}; // Initialize an object to store the property data
  var currentProp = prop; // Start with the given property

  // Traverse backward through the parentProperty chain until reaching the root level
  while (currentProp.parentProperty !== null) {
    propertyPath.unshift(currentProp.matchName); // Add the matchName of the current property to the beginning of the array
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

  return { propPath: propertyPath, propData: propertyData }; // Return the built property path
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

        // Copy keyframe temporal easing
        var temporalEaseIn = propToCopy.keyInTemporalEase(i);
        var temporalEaseOut = propToCopy.keyOutTemporalEase(i);

        // Add keyframe to 'prop' with the same value and time
        // prop.setValueAtTime(keyframeTime, keyframeValue);
        var newKeyIndex = prop.addKey(keyframeTime);
        prop.setValueAtKey(newKeyIndex, keyframeValue);
        prop.setTemporalEaseAtKey(newKeyIndex, temporalEaseIn, temporalEaseOut);
      }
    } catch (err) {
      null;
    }
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
function store_selected_properties_data(layer) {
  var props_array = find_selected_properties_on_layer(layer);
  selectedPropertyData = []; // Initialize selectedPropertyData as an array
  for (var n = 0; n < props_array.length; n++) {
    var selectedProperty_Object = get_selected_property_to_search(
      props_array[n]
    );
    selectedPropertyData.push(selectedProperty_Object); // Store each selected property object in selectedPropertyData array
  }
}
function paste_selected_properties_data(selectedLayers) {
  for (var n = 0; n < selectedPropertyData.length; n++) {
    var propertyPathProps = selectedPropertyData[n].propPath;
    var propertyPathData = selectedPropertyData[n].propData;
    // alert(propertyPathData.prop.expression);
    for (var m = 0; m < selectedLayers.length; m++) {
      var foundProperty = find_layer_property_by_matchName(
        selectedLayers[m],
        propertyPathProps,
        null
      );
      if (foundProperty) {
        clearExpression(foundProperty);
        copyValue(propertyPathData.value, foundProperty);
        copyExpression(propertyPathData.prop, foundProperty);
        // copyKeyframes(props_array[n], foundProperty);
      }
    }
  }
  alert("copied props!");
  //   alert(selectedPropertyData[0].propData.name);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OLD CODE//
//Effects properties that we want to grab are going to be .propertyType == PropertyType.PROPERTY
//An Effect like "Fill" is going to be PropertyType.NAMED_GROUP
// copypaste_effects_activecomp_MAIN(app.project.activeItem.selectedLayers[0]);
// var deepestSelectedProp = rd_GimmePropPath_findDeepestSelectedProp();
//ALL EFFECTS PROPERTIES ONLY
function copypaste_effects_activecomp_MAIN(selectedLayer) {
  var selectedPropsObject_Effects = (function (layer, parentProp_matchName) {
    //First we need to separate the selected Effect (like "Fill") from the specific properties selected like "Color"
    var selectedProps = [];
    var selectedLayerEffect = null;
    var layerProps_Effects = layer.property(parentProp_matchName);
    for (var i = 1; i <= layerProps_Effects.numProperties; i++) {
      //Loop through all Effects Properties to find which are selected
      if (layerProps_Effects.property(i).selected === true) {
        selectedLayerEffect = layerProps_Effects.property(i);
        for (var j = 1; j <= selectedLayerEffect.numProperties; j++) {
          if (
            selectedLayerEffect.property(j).selected === true &&
            selectedLayerEffect.property(j).propertyType ===
              PropertyType.PROPERTY
          ) {
            selectedProps.push(selectedLayerEffect.property(j));
          }
        }
      }
    }
    //   alert(selectedLayerEffect.name);
    return { props: selectedProps, effect: selectedLayerEffect };
  })(selectedLayer, "ADBE Effect Parade");

  app.beginUndoGroup("Copy");
  copypaste_effects_activecomp(
    app.project.activeItem,
    selectedPropsObject_Effects,
    "matchName"
  );
  app.endUndoGroup();

  //Scan ACTIVE COMP and update effects based on new values
  function copypaste_effects_activecomp(comp, propsObject, searchType) {
    //   First we need to find the layers that have the same effect using matchName
    var searchEffectProperty = propsObject.effect;
    for (var i = 1; i <= comp.numLayers; i++) {
      if (comp.layer(i).property("ADBE Effect Parade").numProperties > 0) {
        searchlayer = comp.layer(i);
        var matchingProperty = searchLayerEffects_matchName(
          searchlayer,
          searchEffectProperty.matchName
        );
        if (matchingProperty) {
          for (var n = 0; n < propsObject.props.length; n++) {
            copypaste_PropertyTypePROPERTY(
              matchingProperty,
              propsObject.props[n]
            );
          }
        }
      }
    }
    alert("Copied!");
    return;
  }
  function searchLayerEffects_matchName(layer, search_matchName) {
    for (
      var i = 1;
      i <= layer.property("ADBE Effect Parade").numProperties;
      i++
    ) {
      if (
        layer.property("ADBE Effect Parade").property(i).matchName ===
        search_matchName
      ) {
        return layer.property("ADBE Effect Parade").property(i); // Return true if match found
      }
    }
    return null; // Return false if no match found after checking all properties
  }
  function copypaste_PropertyTypePROPERTY(layerProperty, propsToCopy) {
    for (var i = 1; i <= layerProperty.numProperties; i++) {
      if (layerProperty.property(i).matchName == propsToCopy.matchName) {
        layerProperty.property(i).setValue(propsToCopy.value);
      }
    }
  }
}

function rd_GimmePropPath_findDeepestSelectedProp() {
  var comp = app.project.activeItem;
  var deepestProp,
    numDeepestProps = 0,
    deepestPropDepth = 0;
  var prop;

  for (var i = 0; i < comp.selectedProperties.length; i++) {
    prop = comp.selectedProperties[i];

    if (prop.propertyDepth >= deepestPropDepth) {
      if (prop.propertyDepth > deepestPropDepth) numDeepestProps = 0;
      deepestProp = prop;
      numDeepestProps++;
      deepestPropDepth = prop.propertyDepth;
    } else continue;
  }

  return numDeepestProps > 1 ? null : deepestProp;
}
// display_prop_names(props_array);
function display_prop_names(props_array) {
  var myAlert = "\n";
  for (var m = 0; m < props_array.length; m++) {
    myAlert += props_array[m].name + "\n";
  }
  alert(myAlert);
}
