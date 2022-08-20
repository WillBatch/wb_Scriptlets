//ESSENTIAL GRAPHICS EXPRESSIONS

//DATA EXPRESSIONS
var locktime = "posterizeTime(0);thisComp.marker.key('locktime').time";

var GlobalXPositionLinear = "var minValue = -thisComp.width;\
var maxValue = thisComp.width;\
var layer = thisComp.layer(\"Controls: Essential Graphics\").effect(\"Global X Position\")(\"Slider\");\
var minLinear = linear(layer, -100, 0, minValue, 0 );\
var maxLinear = linear(layer, 0, 100, 0, maxValue);\
add(minLinear, maxLinear)";


var GlobalYPositionLinear = "var minValue = -thisComp.height;\
var maxValue = thisComp.height;\
var layer = thisComp.layer(\"Controls: Essential Graphics\").effect(\"Global Y Position\")(\"Slider\");\
var minLinear = linear(layer, -100, 0, minValue, 0 );\
var maxLinear = linear(layer, 0, 100, 0, maxValue);\
add(minLinear, maxLinear)";

var BackgroundOpacityLinear = "var fadeTimeIn = effect(\"locktime\")(\"Slider\");\
var fadeTimeOut = 1;\
var slider = thisComp.layer(\"Controls: Essential Graphics\").effect(\"Background Opacity\")(\"Slider\");\
a = linear(time, 0, fadeTimeIn, 0, slider);\
b = linear(time, thisComp.duration - fadeTimeOut, thisComp.duration - framesToTime(1), 0, slider);\
a - b";

//COLOR EXPRESSIONS




