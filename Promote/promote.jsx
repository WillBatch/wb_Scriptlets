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
button3.onClick = function(){
    var layer = getSelectedLayers(getActiveComp(p));
    var alt = checkAltKey();
    app.beginUndoGroup("promote 1");
    propsToProp(layer, alt);
    app.beginUndoGroup();

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

function propsToProp(layer, alt){

    var propname_array = [];
    //First selected layer is the parent
    if(alt == false){
        var parent = layer[0];
        var props = parent.selectedProperties;
        var prop = props[props.length - 1];
        var propDepth = prop.propertyDepth;

        // alert(prop.propertyIndex);
        // alert(prop.matchName);
        // alert(propDepth);
        //Custom situations for Markers and Timeremapping

        for(var i = 1; i <= Math.max(propDepth - 1, 1); i++){
            if((prop.propertyIndex == 1) || prop.propertyIndex == 2){
                //Builds array for properties with no property group
                propname_array.push(prop.matchName);
            
            }else{
                //Builds array for typical properties
                propname_array.push(prop.propertyGroup(i).matchName);
            }

        }
        for(var i = 1; i <= layer.length; i++){
            var foundProp = findProperty(layer[i], prop, propname_array.reverse(), prop.propertyIndex);
            alert(foundProp.property(prop.propertyIndex).value);
        }

        

    }
    //Last selected layer is the parent
    if(alt == true){
        var parent = layer[layer.length - 1];
        var props = parent.selectedProperties;
        var prop = props[props.length - 1];
        var propDepth = prop.propertyDepth;

        for(var i = 1; i <= propDepth - 1; i++){
            propname_array.push(prop.propertyGroup(i).matchName);
        }
        for(var i = 0; i < layer.length - 1; i++){
            findProperty(layer[i], prop, propname_array.reverse());
        }

    }

    function findProperty(layer, prop, array, index){
        // alert(array);
        for(var i = 1; i <= layer.numProperties; i++){
            var p = layer.property(i);

            if(p.matchName == array[0]){
                // alert("Matched");
                if(array.length > 1){
                    findProperty(p, prop, array.slice(1, array.length));
                }else{
                    if(index == 1){
                    //Markers (prop index 1)
                    break
                    }
                    if(index == 2){
                    //Time Remapping (prop index 2)
                    p.setValueAtTime(0, prop.value);
                    break
                    }
                    if(index > 2){
                    //Everything else            
                    // p.property(prop.propertyIndex).setValue(prop.value);
                    return p;
                    }

                }

            }else{
                continue
            }
                
        }

    }

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


// var selectedProperty = app.project.activeItem.selectedProperties[1];

// findPropertyType(selectedProperty);