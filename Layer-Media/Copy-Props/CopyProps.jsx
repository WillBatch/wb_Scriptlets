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

    var group1 = win.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    group1.spacing = 3;
    var button_StoreSelectedPropertiesData = group1.add(
      "button",
      undefined,
      "Store"
    );
    button_StoreSelectedPropertiesData.size = [70, 20];
    button_StoreSelectedPropertiesData.onClick = function () {
      ///function goes here
      store_selected_properties_data(app.project.activeItem.selectedLayers[0]);
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

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];
var layerProps = layer.numProperties;
var newLayer = app.project.activeItem.layer(1); //temp layer
var allLayersInComp = true;

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
          propertyPathProps,
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
  var propPath = []; // Initialize an array to store the property path
  var currentProp = prop; // Start with the given property

  // Traverse backward through the parentProperty chain until reaching the root level
  while (currentProp.parentProperty !== null) {
    propPath.unshift(currentProp.matchName); // Add the matchName of the current property to the beginning of the array
    currentProp = currentProp.parentProperty; // Move to the parent property
  }

  return propPath; // Return the built property path
}
function find_layer_property_by_matchName(
  layer,
  propertyPathProps,
  layerToSkip
) {
  var currentLayer = layer; // Start with the given layer
  if (
    currentLayer.name === layerToSkip.name &&
    currentLayer.index === layerToSkip.index
  ) {
    return null;
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
  for (var n = 0; n < props_array.length; n++) {
    var propertyPathProps = get_selected_property_to_search(props_array[n]);
  }
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
