var yAnchorSourceRectExpression = "const { layerRect } = footage(\"anchorfunctions.jsx\").sourceData.getFunctions();\
var posterizeCheckbox = effect(\"teXtAnchor\")(\"Freeze Calculations\");\
posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;\
posterizeTime(posterizeTimeValue);\
var l = thisComp.layer(effect(\"teXtAnchor\")(\"Text Layer\").name);\
var xHeightPositions = l.effect(\"teXtAnchor\")(\"Position\").value - 1;\
var xHeightText = [\"leftCenter\", \"center\", \"rightCenter\", \"topLeft\", \"topCenter\", \"topRight\", \"bottomLeft\", \"bottomCenter\", \"bottomRight\"];\
var valueAtTimeArray = [time,effect(\"teXtAnchor\")(\"Value At Time\")];\
layerRect({  l, sampleTime: valueAtTimeArray[posterizeCheckbox], anchor: xHeightText[xHeightPositions] , xHeight : false}).position[1];"

var textLayerAnchorExpression = "switch(effect(\"teXtAnchor\")(\"Y Anchor Select\").value){\
    case 1: a = effect(\"teXtAnchor\")(\"yAnchorDescenders\");\
    break;	\
    case 2: a = effect(\"teXtAnchor\")(\"yAnchorSourceRect\");\
    break;\
        }\
    [effect(\"teXtAnchor\")(\"xAnchor\"), a] + value"


var xAnchorExpression = "const { layerRect } = footage(\"anchorfunctions.jsx\").sourceData.getFunctions();\
var posterizeCheckbox = effect(\"teXtAnchor\")(\"Freeze Calculations\");\
posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;\
posterizeTime(posterizeTimeValue);\
var l = thisComp.layer(effect(\"teXtAnchor\")(\"Text Layer\").name);\
var xHeightPositions = l.effect(\"teXtAnchor\")(\"Position\").value - 1;\
var xHeightText = [\"leftCenter\", \"center\", \"rightCenter\", \"topLeft\", \"topCenter\", \"topRight\", \"bottomLeft\", \"bottomCenter\", \"bottomRight\"];\
var valueAtTimeArray = [time,effect(\"teXtAnchor\")(\"Value At Time\")];\
layerRect({  l, sampleTime: valueAtTimeArray[posterizeCheckbox], anchor: xHeightText[xHeightPositions] , xHeight : false}).position[0];"


var yAnchorDescendersExpression = "const { layerRect } = footage(\"anchorfunctions.jsx\").sourceData.getFunctions();\
var posterizeCheckbox = effect(\"teXtAnchor\")(\"Freeze Calculations\");\
posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;\
posterizeTime(posterizeTimeValue);\
var l = thisComp.layer(effect(\"teXtAnchor\")(\"Text Layer\").name);\
var xHeightPositions = l.effect(\"teXtAnchor\")(\"Position\").value - 1;\
var xHeightText = [\"leftCenter\", \"center\", \"rightCenter\", \"topLeft\", \"topCenter\", \"topRight\", \"bottomLeft\", \"bottomCenter\", \"bottomRight\"];\
var valueAtTimeArray = [time,effect(\"teXtAnchor\")(\"Value At Time\")];\
layerRect({  l, sampleTime: valueAtTimeArray[posterizeCheckbox], anchor: xHeightText[xHeightPositions]}).position[1];"