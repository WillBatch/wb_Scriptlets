$.evalFile("src/UsefulExpressions.jsx");
$.evalFile("src/ApplyPseudoEffectBinary.jsx");

var positionExpressionText = File("./src/positionExpression.txt");
var positionExpression = readTxt(positionExpressionText);

// first get the Folder Path
var scriptFolderPath = (File($.fileName)).parent.absoluteURI;
// create the preset File
/*var pseudoEffectFile = new File(scriptFolderPath+"/"+"anchor.ffx");
if(pseudoEffectFile.exists){
null;
}else{
    alert("can't find preset");
};
*/


function readTxt(file){
    //var currentLine;
    //var textArray = [];
    file.open("r");
        while(!file.eof){
            //currentLine = file.readln();
            //textArray.push(currentLine);
            currentTxt = file.read();
        }
        file.close();
        //return textArray;
        return currentTxt;
}
//alert(fileData);

var activeComp = app.project.activeItem;
app.beginUndoGroup("Adds Animation Control Null");

var activeLayer = checkForShapeLayer(activeComp);
var shapeType = getShapeType(activeLayer);
//Deselects All Layers
for(var i = 1; i <= activeComp.numLayers; i++){
    activeComp.layer(i).selected = false;
}
//Reselects Layer
activeLayer.selected = true;

//Applies pseudo effect
//activeComp.selectedLayers[0].applyPreset(pseudoEffectFile);

var pseudoEffectFile = runApplyPreset();

addExpressionToShapePosition(activeLayer, shapeType, positionExpression);
xPositionCenter(activeLayer, shapeType);
yPositionCenter(activeLayer, shapeType);
//addExpressionToStroke(activeLayer);
activeLayer.selected = false;
app.endUndoGroup();

function checkForShapeLayer(comp){
        
        if(comp.selectedLayers.length > 0){
            //Gets selected shape layer, checks if its shape, separates position dimensions
            var activeLayer = comp.selectedLayers[0];
            if(activeLayer instanceof ShapeLayer){
                activeLayer.property("Position").dimensionsSeparated = true;
                return activeLayer;
            }else{
                var activeLayer = createShapeLayer(comp);
                return activeLayer;
            }

        }else{
            //Creates new shape layer with rectangle shape and fill
            var activeLayer = createShapeLayer(comp);
            return activeLayer;
        }
    }
function createCheckbox(layer, value){
        var checkbox = layer.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
        checkbox.property("ADBE Checkbox Control-0001").setValue(value);
        checkbox.name = "Keep Center";
        return checkbox;
    }
function xPositionCenter(layer, shape){
        var xPos = layer.property("ADBE Transform Group").property("ADBE Position_0");
        if(shape == "Rectangle"){
            xPos.expression = centerXPositionRectangleExpression;
        }
        if(shape == "Ellipse"){
            xPos.expression = centerXPositionEllipseExpression;
        }
        
    }
function yPositionCenter(layer, shape){
        var yPos = layer.property("ADBE Transform Group").property("ADBE Position_1");
        if(shape == "Rectangle"){
            yPos.expression = centerYPositionRectangleExpression;
        }
        if(shape == "Ellipse"){
            yPos.expression = centerYPositionEllipseExpression;
        }
    }
function createShapeLayer(comp){
        var newShapeLayer = comp.layers.addShape();
        var shapeGroup = newShapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        shapeGroup.name = "Rectangle 1";
        shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
        shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
        shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Width").setValue(0);
        shapeGroup.property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").setValue([1920,1080]);
        newShapeLayer.property("Position").dimensionsSeparated = true;

        return newShapeLayer;
    }
function getShapeType(layer){
    var shapeTypeString = layer.property("Contents").property(1).name.split(" ")[0];
    return shapeTypeString;
}
function addExpressionToShapePosition(layer, shape, expression){
    if(shape == "Rectangle"){
        layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Position").expression = expression;
    }
    if(shape == "Ellipse"){
        layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Position").expression = anchorPointDropDownEllipseExpression;
    }
}

function addExpressionToStroke(layer){
    var strokeProperty = layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Width");
    var dropDownController = layer.property("Effects").property("Anchor").property("Stroke Position").value;
    
}