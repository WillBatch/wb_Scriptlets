var proj = app.project;
var comp = app.project.activeItem;
var functionImportFile = "anchorfunctions.jsx";
//var pseudoEffectFile = File("./src/teXtAnchor_1.ffx");
var xHeightAnchorExpression = File("./src/xHeightAnchor.txt");
var sourceRectAnchorExpression = File("./src/sourceRect.txt");
var xAnchorExpression = File("./src/xAnchor.txt");
var textAnchorExpression = File("./src/textAnchor.txt");
// first get the Folder Path
var scriptFolderPath = (File($.fileName)).parent.absoluteURI;
// create the preset File
var pseudoEffectFile = new File(scriptFolderPath+"/src/"+"teXtAnchor.ffx");
if(pseudoEffectFile.exists){
null;
}else{
    alert("can't find preset");
};



var activeLayer = checkForTextLayer(comp);
//Deselects All Layers
for(var i = 1; i <= comp.numLayers; i++){
    comp.layer(i).selected = false;
}
//Reselects Layer
activeLayer.selected = true;
//Applies pseudo effect
comp.selectedLayers[0].applyPreset(pseudoEffectFile);

var xAnchorSlider = activeLayer.property("ADBE Effect Parade").property("Pseudo/84913ID/teXtAnchor").property("Pseudo/84913ID/teXtAnchor-0006");
xAnchorSlider.expression = readExpression(xAnchorExpression);
var xHeightSlider = activeLayer.property("ADBE Effect Parade").property("Pseudo/84913ID/teXtAnchor").property("Pseudo/84913ID/teXtAnchor-0007");
xHeightSlider.expression = readExpression(xHeightAnchorExpression);
var sourceRectSlider = activeLayer.property("ADBE Effect Parade").property("Pseudo/84913ID/teXtAnchor").property("Pseudo/84913ID/teXtAnchor-0008");
sourceRectSlider.expression = readExpression(sourceRectAnchorExpression);
activeLayer.property("ADBE Transform Group").property("ADBE Anchor Point").expression = readExpression(textAnchorExpression);

checkForaeFunctionsLibrary(proj);
activeLayer.selected = true;
function checkForaeFunctionsLibrary(proj){
    for(i = 1; i <= proj.items.length; i++){
        if (proj.item(i).name == "anchorfunctions.jsx"){
            var aeFunctions = true;
            var footage = proj.item(i);
            break;
        }else{
            var aeFunctions = false;
        }
    }
    aeFunctions == true ? checkInComp(comp, footage) : importaeFunctionsLibrary(proj, comp);

}

function importaeFunctionsLibrary(proj, comp){
    var item;
    var file = File("./src/anchorfunctions.jsx");
    var item = proj.importFile(new ImportOptions(file));
    comp.selected = true;
    comp.layers.add(item);
    comp.layer("anchorfunctions.jsx").moveToEnd();
    comp.layer("anchorfunctions.jsx").shy = true;
    comp.layer("anchorfunctions.jsx").selected = false;
    
}

function checkForTextLayer(comp){
        
    if(comp.selectedLayers.length > 0){
        //Gets selected layer, checks if its text, separates position dimensions
        var activeLayer = comp.selectedLayers[0];
        if(activeLayer instanceof TextLayer){
            activeLayer.property("Position").dimensionsSeparated = true;
            return activeLayer;
        }else{
            //Creates the text layer the layer selected is not a text layer
            var activeLayer = createTextLayer(comp);
            
            return activeLayer;
        }

    }else{
            //Creates the text layer if there isn't one select
            var activeLayer = createTextLayer(comp);
        
        return activeLayer;
    }
}

function createTextLayer(comp){
    var newTextLayer = comp.layers.addText("teXtAnchor");

    newTextLayer.property("Position").dimensionsSeparated = true;

    return newTextLayer;
}


//Read Expression Functions
function readExpression(file){

    file.open("r");
        while(!file.eof){
        
            currentTxt = file.read();
        }
        file.close();

        return currentTxt;
}

function checkInComp(comp, footage){
    
    for(i = 1; i <= comp.numLayers; i++){
        //alert(comp.layer(i).name);
        if(comp.layer(i).name == footage.name){
            var inComp = true;
            }else{
            var inComp = false;
            }
    }
    if(inComp == true ){
        null;
    } else{
        comp.layers.add(footage).moveToEnd();
        var functionfootage = comp.layer(i);
        functionfootage.shy = true;
        functionfootage.selected = false;
     }
    
    
}
