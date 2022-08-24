$.evalFile("src/expressions.jsx");
var bounceExpression;
var proj = app.project;
var comp = app.project.activeItem;

// first get the Folder Path
var scriptFolderPath = (File($.fileName)).parent.absoluteURI;
// create the preset File
var pseudoEffectFile = new File(scriptFolderPath+"/src/"+"BouncyText.ffx");
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
addAnimatorAndExpression(comp.selectedLayers[0], bounceExpression);





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
    var newTextLayer = comp.layers.addText("Bouncy Text");

    newTextLayer.property("Position").dimensionsSeparated = true;

    return newTextLayer;
}

function addAnimatorAndExpression(layer, expression){
    var animator = layer.Text.Animators.addProperty("ADBE Text Animator"); 
    var position = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Position 3D").setValue([0, 50]);
    //var selector = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector"); 
    var expressionselector = animator.property("ADBE Text Selectors").addProperty("ADBE Text Expressible Selector");
    expressionselector.property("ADBE Text Expressible Amount").expression = expression;
    
}