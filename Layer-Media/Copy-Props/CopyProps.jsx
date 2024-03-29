var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];
var layerProps = layer.numProperties;
var newLayer = app.project.activeItem.layer(1); //temp layer
var allLayersInComp = true;

// alert(selectedPropsObject_Effects.effect.name);

//Effects properties that we want to grab are going to be .propertyType == PropertyType.PROPERTY
//An Effect like "Fill" is going to be PropertyType.NAMED_GROUP

// copypaste_effects_activecomp_MAIN(app.project.activeItem.selectedLayers[0]);
// var deepestSelectedProp = rd_GimmePropPath_findDeepestSelectedProp();
app.beginUndoGroup("1");
find_selected_properties_on_layer(app.project.activeItem.selectedLayers[0]);
app.endUndoGroup();

function find_selected_properties_on_layer(layer) {
  //Get all selected properties on the layer
  var props_array = [];
  for (var i = 0; i < layer.selectedProperties.length; i++) {
    if (layer.selectedProperties[i].propertyType === PropertyType.PROPERTY) {
      props_array.push(layer.selectedProperties[i]);
    }
  }

  for (var n = 0; n < props_array.length; n++) {
    var propertyPathProps = buildPropPath(props_array[n]);
    if (allLayersInComp === true) {
      for (var m = 1; m <= comp.numLayers; m++) {
        var foundProperty = findPropertyByPath(
          comp.layer(m),
          propertyPathProps
        );
        if (foundProperty) {
          copyValue(props_array[n].value, foundProperty);
          copyExpression(props_array[n], foundProperty);
        }
      }
    }
    // copyValue(props_array[n].value, foundProperty);
  }
  function buildPropPath(prop) {
    var propPath = []; // Initialize an array to store the property path
    var currentProp = prop; // Start with the given property

    // Traverse backward through the parentProperty chain until reaching the root level
    while (currentProp.parentProperty !== null) {
      propPath.unshift(currentProp.matchName); // Add the matchName of the current property to the beginning of the array
      currentProp = currentProp.parentProperty; // Move to the parent property
    }
    // Add the root property's name (usually the property of the layer) to the path
    //   propPath.unshift(currentProp.name);

    // Join the elements of the array to form the complete property path
    return propPath; // Return the built property path
  }
  function findPropertyByPath(layer, propertyPathProps) {
    var currentLayer = layer; // Start with the given layer

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
}
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
