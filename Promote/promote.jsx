//The idea is to have a 3 buttons to promote a property either into a slider, a master control layer, or the comp above it

function createDockableUI(thisObj) {
    var dialog =
        thisObj instanceof Panel
            ? thisObj
            : new Window("window", undefined, undefined, { resizeable: true });
    dialog.onResizing = dialog.onResize = function() {
        this.layout.resize();
    };
    return dialog;
}

function showWindow(myWindow) {
    if (myWindow instanceof Window) {
        myWindow.center();
        myWindow.show();
    }
    if (myWindow instanceof Panel) {
        myWindow.layout.layout(true);
        myWindow.layout.resize();
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UI Build
// DIALOG
// ======
var dialog = createDockableUI(this);
    dialog.text = "Promote!"; 
    dialog.orientation = "row"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var button1 = dialog.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "Self";
    button1.helpTip = "Alt + Click to add controls to a master control layer"; 

var button2 = dialog.add("button", undefined, undefined, {name: "button2"}); 
    button2.text = "Parent"; 
    button2.helpTip = "The first layer selected will become the control layer"; 

var button3 = dialog.add("button", undefined, undefined, {name: "button3"}); 
    button3.text = "P2P"; 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
showWindow(dialog);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button Functionality
button1.onClick = function(){
    var layer = getSelectedLayers(getActiveComp(p));
    app.beginUndoGroup("promote 1");
    promoteSelectedPropertiesToSelf(layer);
    app.beginUndoGroup();
}
    

button2.onClick = function(){
    var layer = getSelectedLayers(getActiveComp(p));
    app.beginUndoGroup("promote 2");
    promoteSelectedPropertiesToParent(layer);
    app.beginUndoGroup();

}
button3.addEventListener("keydown", checkAltKey);
button3.addEventListener("keydown", checkShiftKey);
button3.onClick = function(){
    var layer = getSelectedLayers(getActiveComp(p));
    var alt = checkAltKey();
    var shift = checkShiftKey();
    var command = 1;
    app.beginUndoGroup("promote 1");
    propsToProp(layer, alt, shift, command);
    app.beginUndoGroup();

}
function checkShiftKey(){

    var keyState = ScriptUI.environment.keyboardState;
    if(keyState.shiftKey){
        return true
    }else{
        return false
    }

}
function checkAltKey(){

    var keyState = ScriptUI.environment.keyboardState;
    if(keyState.altKey){
        return true
    }else{
        return false
    }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Code Functionality

// Globals
var p = app.project;
function getActiveComp(p){
    if(p.activeItem == undefined) alert("No composition selected or active.");
    return p.activeItem};
function getSelectedLayers(comp){
    if(comp.selectedLayers.length == 0){
        alert("Please select at least one layer.");
    }else{
        return comp.selectedLayers;
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function promoteSelectedPropertiesToSelf(layer){
    if(layer.length == 1) {
        if(layer[0].selectedProperties.length == 0){
            alert("Please select at least one property.");
        }else{
            for(var i = 0; i < layer[0].selectedProperties.length; i++){
                promoteProperties(layer[0], layer[0].selectedProperties[i]);
            }
        }
    }

    if(layer.length > 1){
        for(var i = 0; i < layer.length; i ++ ){
            var layerProps = layer[i].selectedProperties;
            if(layerProps.length != 0){
                for(var n = 0; n < layerProps.length; n++){
                    promoteProperties(layer[i], layerProps[n]);
                }
            }else{
                continue
            }
        }
    }
};

function promoteSelectedPropertiesToParent(){

}

function promoteProperties(layer, prop){
    layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control").name = prop.name;
}; 

function propsToProp(layer, alt, shift, command){

    foundProps_array = [];

    //First selected layer is the parent
    if(shift == false){
        var parent = layer[0];
        var modifyLoop = 0;
    }
    if(shift == true){
        var parent = layer[layer.length - 1];
        var modifyLoop = -1;
    }

    var prop = getSelectedPropertiesOnParent(parent);
    
    //Builds array of property names for each property in prop array
    for(var i = 0; i < prop.length; i++){
        var currentProp = prop[i];
        var propname_array = buildPropNameArray(prop[i], prop[i].propertyDepth);
        alert(propname_array);
        //For each selected layer child copy the property values
        for(var n = 1 + modifyLoop; n < layer.length + modifyLoop; n++){
            var foundProp = findProperty(layer[n], currentProp, propname_array, currentProp.propertyIndex);
            if(alt == false){
                foundProp.property(currentProp.propertyIndex).setValue(currentProp.value);
            }
            if(alt == true){
                var expression = getExpression(currentProp, propname_array);
                foundProp.property(currentProp.propertyIndex).expression = expression;
            }    
                
            }
                            
        }  

    

    //Finds the property in the child layer. Returns property. May need property index to set value later.
    function findProperty(layer, prop, array){
        // alert(array);
        for(var i = 1; i <= layer.numProperties; i++){
            var p = layer.property(i);
            if(p.matchName == array[0]){
                // alert("Matched");
                if(array.length > 1){
                    findProperty(p, prop, array.slice(1, array.length));
                }else{          
                    return p;                 
                }

            }else{
                continue
            }
                
        }

    }
    function getSelectedPropertiesOnParent(layer){

        var allSelectedProps_array = layer.selectedProperties;
        var selectedProps_array = [];
        //Eliminates any nested or named property groups
        for(var i = 0; i < allSelectedProps_array.length; i++){
            if((layer.selectedProperties[i].propertyType === PropertyType.INDEXED_GROUP)|| (layer.selectedProperties[i].propertyType === PropertyType.NAMED_GROUP)){
                // alert("This is not the property you want");
                continue
            }else{
                selectedProps_array.push(layer.selectedProperties[i]);
            }
        }
        return selectedProps_array;
    }

    //Builds array of all property groups to find the property in child layers
    function buildPropNameArray(prop, propDepth){
        var propname_array = [];
        for(var i = 1; i <= Math.max(propDepth - 1, 1); i++){
            if((prop.propertyIndex == 1) || prop.propertyIndex == 2){
                //Builds array for properties with no property group
                propname_array.push(prop.matchName);           
            }else{
                alert(prop.propertyGroup(i).name);
                //Builds array for typical properties
                propname_array.push(prop.propertyGroup(i).matchName);
            }

        }
        return propname_array.reverse();
    }
}
function getExpression(prop, proppath){
    alert(proppath);
    var layerName = proppath[0].propertyGroup(1).name;
    alert(layerName);
    return "value"
}
function findPropertyType(prop) {
    if (prop.propertyValueType == 6413) {
        alert("This is 3D Point Property");
        return;
    } else if (prop.propertyValueType == 6415) {
        alert("This is 2D Point Property");
        return;
    } else if (prop.propertyValueType == 6418) {
        alert("This is  Color Property");
        return;
    } else if (prop.propertyValueType == 6421) {
        alert("This is Layer Selector Property");
        return;
    } else if (prop.propertyValueType == 6417) {
        try {
            if (prop.maxValue == 1) {
                alert("This is CheckBox Property");
                return;
            } else {
                var propValue = prop.value;
                prop.setValue(0);
                prop.setValue(propValue);
                alert("This is Slider Control Property");
                return;
            }
        } catch (err) {
            if (prop.unitsText == "degrees") {
                alert("This is Angle Property");
                return;
            } else {
                alert("This is Dropdown Menu Control Property");
            }
        }
    }
}
