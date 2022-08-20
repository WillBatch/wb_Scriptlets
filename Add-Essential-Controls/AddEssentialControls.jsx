$.evalFile("src/expressions.jsx");
var comp = app.project.activeItem;
var numberOfNulls = 3;
var numberOfColors = 4;
var colornames = ["Main Text Color", "Secondary Text Color", "Box Color", "Fill Color"];
var names = ["Essential Graphics", "Data", "Color"];
var nullArray = [];
var nullArrayModified = [];

app.beginUndoGroup("Adds Controls Null Layer");

for(i = 1; i <= numberOfNulls; i++){
var nullLayer = comp.layers.addNull(comp.duration);
nullArray.push(nullLayer);
}

var myNullLayers = modifyNullLayers(nullArray, names);

modifyData(nullArray[1], nullArray[0]);
modifyEssentials(nullArray[0]);
modifyColor(nullArray[2], numberOfColors);
expressionRefresh(nullArray);
//expressionsToText(expressionRefresh(nullArray));
app.endUndoGroup();

function modifyNullLayers(nul, names){
    var totalNullLayers = nul.length;
    for(i = 0; i < totalNullLayers; i++){
        nul[i].label = 2 + i;
        nul[i].guideLayer = true;
        nul[i].enabled = false;
        nul[i].name = "Controls: "+ names[i];
        nul[i].selected = false;
        comp.layer(i + 1).moveToBeginning();
        nullArrayModified.push(nul[i]);
    }
    return nullArrayModified;
        
}
function modifyData(nul){
    addMarker();
    var locktimeSlider = nul.property("ADBE Effect Parade").addProperty("Slider Control");
    locktimeSlider.name = "locktime";
    locktimeSlider.property("Slider").expression = locktime;
    var globalSliderX = nul.property("ADBE Effect Parade").addProperty("Slider Control");
    globalSliderX.name = "Global X Position Linear";
    globalSliderX.property("Slider").expression = GlobalXPositionLinear;
    var globalSliderY = nul.property("ADBE Effect Parade").addProperty("Slider Control");
    globalSliderY.name = "Global Y Position Linear";
    globalSliderY.property("Slider").expression = GlobalYPositionLinear;
    var backgroundOpacitySlider = nul.property("ADBE Effect Parade").addProperty("Slider Control");
    backgroundOpacitySlider.name = "Background Opacity Linear";
    backgroundOpacitySlider.property("Slider").expression = BackgroundOpacityLinear;

}
function addMarker(){
    var compMarker = new MarkerValue("locktime");
    compMarker.duration = 0;
    comp.markerProperty.setValueAtTime(1, compMarker);

}
function modifyEssentials(nul){
    var fontSize = nul.property("ADBE Effect Parade").addProperty("Slider Control");
    fontSize.name = "Font Size";
    fontSize.property("Slider").setValue(60);
    nul.property("ADBE Effect Parade").addProperty("Slider Control").name = "Leading";
    nul.property("ADBE Effect Parade").addProperty("Slider Control").name = "Global X Position";
    nul.property("ADBE Effect Parade").addProperty("Slider Control").name = "Global Y Position";
    var backgroundOpacitySlider = nul.property("ADBE Effect Parade").addProperty("Slider Control");
    backgroundOpacitySlider.name = "Background Opacity";
    backgroundOpacitySlider.property("Slider").setValue(80);
}
function modifyColor(nul, numcolors){
    for(i = 1; i <= numcolors; i++){
        var colorcontrol = nul.property("ADBE Effect Parade").addProperty("ADBE Color Control");
        colorcontrol.name = colornames[i-1];
    }
}
function expressionRefresh(nul){
    for(i = 0; i < nul.length; i++){
        var nulLayer = nul[i];
        var nulPropsGroup = nulLayer.property("ADBE Effect Parade");
        var nulPropsCount = nulPropsGroup.numProperties;
        
        for(n = 1; n <= nulPropsCount; n++){
            var nulPropsTarget = nulPropsGroup.property(n).property(1);
           if(nulPropsTarget.expressionEnabled == true){
            //alert(nulPropsTarget.name);
            nulPropsTarget.expressionEnabled = false;
            nulPropsTarget.expressionEnabled = true;
           }
        }
        
        
    }
    
}
function expressionsToText(){

    var scriptFolderPath = File($.fileName).path; // the URI of the folder that contains the script file    
    var TimerFolderPath = scriptFolderPath + encodeURI("/src"); // the URI of the folder for your script resources
    var JFile = new File(TimerFolderPath + encodeURI("/NewExpressions.jsx"));
    //var content = "That is a text file";
    var content = expressionText(nullArray);

    //alert(content.join(""));

    if (!canWriteFiles()) return null;

    writeFile(JFile, content.join(""));

    function writeFile(fileObj, fileContent, encoding) {

    encoding = encoding || "utf-8";

    fileObj = (fileObj instanceof File) ? fileObj : new File(fileObj);

    var parentFolder = fileObj.parent;

    if (!parentFolder.exists && !parentFolder.create())

        throw new Error("Cannot create file in path " + fileObj.fsName);

    fileObj.encoding = encoding;

    fileObj.open("w");

    fileObj.write(fileContent);

    fileObj.close();

    return fileObj;

}

    function canWriteFiles() {

    if (isSecurityPrefSet()) return true;

    alert(script.name + " requires access to write files.\n" +

        "Go to the \"General\" panel of the application preferences and make sure " +

        "\"Allow Scripts to Write Files and Access Network\" is checked.");

    app.executeCommand(2359);

    return isSecurityPrefSet();

    function isSecurityPrefSet() {

        return app.preferences.getPrefAsLong(

            "Main Pref Section",

            "Pref_SCRIPTING_FILE_NETWORK_SECURITY"

        ) === 1;

    }

}
}

function expressionText(nul){
    var expressionArray = [];
    for(i = 0; i < nul.length; i++){
        var nulLayer = nul[i];
        
        var nulPropsGroup = nulLayer.property("ADBE Effect Parade");
        var nulPropsCount = nulPropsGroup.numProperties;
        
        for(n = 1; n <= nulPropsCount; n++){
            var nulPropsTarget = nulPropsGroup.property(n).property(1);
           if(nulPropsTarget.expressionEnabled == true){

            expressionArray.push("var " + nulPropsGroup.property(n).name.replace(/ /g, "") + " = \"" + nulPropsTarget.expression.replace(/\"/g, "\\" + "\"") + "\";"  + "\r");
           }
        }
        
        
    }
    
    return expressionArray;
}