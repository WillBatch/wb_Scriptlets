var comp = app.project.activeItem;
var layers = comp.selectedLayers.length;
//var layer = [];
var props = [];
//var prop = layer.selectedProperties;

app.beginUndoGroup("Link to Locktime");
checkForMarker();


layers == 0 ? alert("Please select at least one layer and a property") : null; 
//creates selected layers array
for (var i = 1; i <= layers; i++){
    var layer = comp.selectedLayers[i-1];
    //loops through each layer for selected properties
    var totalProps = layer.selectedProperties;
    for(var n = 0; n < totalProps.length; n++){
        var props = layer.selectedProperties[n];
        checkForExistingExpression(props);
    }
}
checkForDataNull() == true ? null : addDataNull();
app.endUndoGroup();

function checkForExistingExpression(props){
    props.expressionEnabled == true ? copyExpression(props) : addLinkToLocktimeExpression(props);
}

function copyExpression(props){
    var currentExpression = props.expression;
    props.expression =  addLinkToLocktimeExpression(props)[0] + "\n" + currentExpression;
}

function addLinkToLocktimeExpression(props){
    var link = props.expression = "var locktime = thisComp.layer(\"Controls: Data\").effect(\"locktime\")(\"Slider\");";
    var linkEnd = props.expression = "var locktime = thisComp.layer(\"Controls: Data\").effect(\"locktime\")(\"Slider\");\
    locktime ";
    return [link, linkEnd];
}

function checkForMarker(){
    
        
        if(comp.markerProperty.numKeys === 0){
            createCompMarker(comp);
        }
        for(var i = 1; i <= comp.markerProperty.numKeys; i++){
            if(comp.markerProperty.keyValue(i).comment != "locktime"){
                createCompMarker();
        }
        
        
    }
}

function checkForDataNull(){
    for(var i = 1; i <= comp.numLayers; i ++){
        //alert(comp.layer(i).name);
        if(comp.layer(i).name == "Controls: Data"){
            //alert(true);
            return true;
            
        }
    }
}

function createCompMarker(){
    var compMarker = new MarkerValue("locktime");
    compMarker.duration = 0;
    comp.markerProperty.setValueAtTime(1, compMarker);
    }

function addDataNull(){
    var newNullLayer = comp.layers.addNull(comp.duration);
            newNullLayer.name = "Controls: Data";
            var locktimeSlider = newNullLayer.property("ADBE Effect Parade").addProperty("Slider Control");
            locktimeSlider.name = "locktime";
            locktimeSlider.property("Slider").expression = "thisComp.marker.key(\"locktime\").time;";
            locktimeSlider.selected = false;
}