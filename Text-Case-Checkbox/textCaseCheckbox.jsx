var layers = app.project.activeItem.selectedLayers;

app.beginUndoGroup("Text Case Checkbox");

if(layers.length > 0){
    for(var i = 0; i < layers.length; i++){
        runFunction(layers[i]);
    }
}

app.endUndoGroup();

var checkboxExpression = "posterizeTime(0); const { isAllCaps } = text.sourceText.style; isAllCaps == true ? 1 : 0;";

function runFunction(layer){
    var checkbox = layer.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
    checkbox.property("ADBE Checkbox Control-0001").expression = checkboxExpression;
    checkbox.name = "Upper Case Check";
    return
}
