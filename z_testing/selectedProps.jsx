var comp = app.project.activeItem;
var myLayer = comp.selectedLayers[0];
var mySelectedProperties = [];
//Runs a loop for each effects property selected. Returns array of matchnames for each effect selected
for(var i = 0; i < myLayer.selectedProperties.length; i++){
    mySelectedProperties.push(myLayer.selectedProperties[i].value);
}
    var myLastProp = mySelectedProperties[mySelectedProperties.length - 1];
    alert(myLastProp); //Alerts position on the puppet effect



// // var layer = selection[0] //selected layer
// var propertyMatchName = findChildProps(layer)[0].matchName 
// alert(propertyMatchName) // alerts ADBE FreePin3 PosPin Position
// alert(layer.property("ADBE Effect Parade").property("'" + propertyMatchName + "'")) // alerts null