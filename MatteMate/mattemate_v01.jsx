$.evalFile("expressions.jsx");

var proj = app.project;
var comp = proj.activeItem;

var shapeStrokeName = "Stroke_1";
var shapeMatteName = "Matte_1";

// first get the Folder Path
var scriptFolderPath = (File($.fileName)).parent.absoluteURI;
// create the preset File
var pseudoEffectFile = new File(scriptFolderPath+"/"+"mattematepsuedoeffect.ffx");
if(pseudoEffectFile.exists){
null;
}else{
    alert("can't find preset");
};



if(comp.selectedLayers.length == 0){
    app.beginUndoGroup("Add Matte Only");
    addMatteOnly(proj.activeItem);
    app.endUndoGroup();
}else{
    app.beginUndoGroup("Add Matte To Layer");
    addMatteToLayer(comp.selectedLayers);
    app.endUndoGroup();
}

function addMatteOnly(comp){
    var shapeStroke = createShapeLayer(comp, 10, false);
    shapeStroke.name = shapeStrokeName;
    applyPreset(comp, shapeStroke);
    addExpressions(shapeStroke);
    var shapeMatte = createShapeLayer(comp, 0, true);
    shapeMatte.name = shapeMatteName;


}

function createShapeLayer(comp, strokeWidth, fill){
    var newShapeLayer = comp.layers.addShape();
    var shapeGroup = newShapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    shapeGroup.name = "Rectangle 1";
    shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
    if(fill == true){
        shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
    }
    shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Width").setValue(strokeWidth);
    // shapeGroup.property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").setValue([1920,1080]);
    newShapeLayer.property("Position").dimensionsSeparated = true;

    return newShapeLayer;
}
function applyPreset(comp, layer){
    //Deselects All Layers
    for(var i = 1; i <= comp.numLayers; i++){
        comp.layer(i).selected = false;
    }
    //Reselects Layer
    layer.selected = true;

    //Applies pseudo effect
    comp.selectedLayers[0].applyPreset(pseudoEffectFile);
}
function addExpressions(shape){
    shape.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").expression = strokeShapeSize;
    shape.property("ADBE Effect Parade").property("Pseudo/mattemate8510E").property("Pseudo/mattemate8510E-0001").setValue(comp.width); //xSize
    shape.property("ADBE Effect Parade").property("Pseudo/mattemate8510E").property("Pseudo/mattemate8510E-0002").setValue(comp.height); //ySize
    shape.property("ADBE Effect Parade").property("Pseudo/mattemate8510E").property("Pseudo/mattemate8510E-0001").expression = xSizeExpression;
    shape.property("ADBE Effect Parade").property("Pseudo/mattemate8510E").property("Pseudo/mattemate8510E-0002").expression = ySizeExpression;
}