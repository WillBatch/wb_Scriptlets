// var comp = app.project.activeItem;
// var layer = comp.selectedLayers[0];
// var layerProps = layer.numProperties;

// alert(selectedPropsObject_Effects.effect.name);

//Effects properties that we want to grab are going to be .propertyType == PropertyType.PROPERTY
//An Effect like "Fill" is going to be PropertyType.NAMED_GROUP
copypaste_effects_activecomp_MAIN(app.project.activeItem.selectedLayers[0]);
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
