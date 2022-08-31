var textControllerExpression = "comp(\"_Font Buddy\").layer(\"Style-";

var fontBuddyTextLayerExpression = "posterizeTime(0);thisLayer.name";

var linkControllersToDropDown = "select = effect(\"Link-To-Font-Buddy\")(\"Menu\").value;\
fontbuddytext = comp(\"_Font Buddy\").layer(select).text.sourceText;\
const { font } = fontbuddytext.style;\
try{var m = thisLayer.marker.key(\"Font Buddy Control Layer\")}catch(err){m = null}\
if(m != null){\
style.setFont(font);\
}else{\
	\"Do not modify or remove this marker\"\
}";



var linkTextToDropDownExpression = "select = effect(\"Link-To-Font-Buddy\")(\"Menu\").value;\
fontbuddytext = comp(\"_Font Buddy\").layer(select).text.sourceText;\
const { font } = fontbuddytext.style;\
style.setText(fontbuddytext + \" Controller\").setFont(font)";


var textControllersSourceTextExpression = "try{select = effect(\"Link-To-Font-Buddy\")(\"Menu\").value}catch(err){select = null};\
try{fontbuddytext = comp(\"_Font Buddy\").layer(select).text.sourceText}catch(err){fontbuddytext = thisLayer.text.sourceText};\
const { font } = fontbuddytext.style;\
if(effect(\"Essential-Graphics-Controls\")(\"Parent Layer\") == undefined){\
	var parent = thisLayer;\
}else{parent = effect(\"Essential-Graphics-Controls\")(\"Parent Layer\");}\
switch(effect(\"Essential-Graphics-Controls\")(\"Link Properties To Parent\").value){\
	case 0: l = thisLayer;\
	break;\
	case 1: l = parent;\
	break;\
}\
function getFontSize(layer){\
	if(effect(\"Essential-Graphics-Controls\")(\"Link Properties To Parent\") == 0){\
		f = effect(\"Essential-Graphics-Controls\")(\"Font Size\").value;\
	}else{\
		f = mul(layer.effect(\"Essential-Graphics-Controls\")(\"Font Size\"), div(effect(\"Essential-Graphics-Controls\")(\"Font Size From Parent\"), 100));\
	}\
	return f\
}\
var egc = l.text.sourceText.style\
.setFont(font)\
.setFontSize(getFontSize(l))\
.setAutoLeading(l.effect(\"Essential-Graphics-Controls\")(\"Auto-Leading\").value)\
.setLeading(l.effect(\"Essential-Graphics-Controls\")(\"Leading\"))\
.setTracking(l.effect(\"Essential-Graphics-Controls\")(\"Tracking\"))\
.setFillColor(l.effect(\"Essential-Graphics-Controls\")(\"Fill Color\"))\
try{var m = thisLayer.marker.key(\"Font Buddy Control Layer\")}catch(err){m = null}\
if(m != null){\
	switch(effect(\"Essential-Graphics-Controls\")(\"Enable\").value){\
		case 0: fontbuddytext.style;\
		break;\
		case 1: egc;\
		break;\
	}\
}else{\
	\"Do not modify or remove this marker\"\
}\ ";


var leftTextOpacityExpression = "try{select = thisComp.layer(\"_Font Buddy\").effect(\"Text Justification\")(\"Menu\").value}catch(err){select = 0};\
try{enable = thisComp.layer(\"_Font Buddy\").effect(\"Show Selected\")(\"Checkbox\")}catch(err){enable = 1};\
switch(select * enable){\
	case 0: value;\
	break;\
	case 1: value;\
	break;\
	case 2: 0;\
	break;\
	case 3: 0;\
	break\
} ";

var centerTextOpacityExpression = "try{select = thisComp.layer(\"_Font Buddy\").effect(\"Text Justification\")(\"Menu\").value}catch(err){select = 0};\
try{enable = thisComp.layer(\"_Font Buddy\").effect(\"Show Selected\")(\"Checkbox\")}catch(err){enable = 1};\
switch(select * enable){\
	case 0: value;\
	break;\
	case 1: 0;\
	break;\
	case 2: value;\
	break;\
	case 3: 0;\
	break\
} ";

var rightTextOpacityExpression = "try{select = thisComp.layer(\"_Font Buddy\").effect(\"Text Justification\")(\"Menu\").value}catch(err){select = 0};\
try{enable = thisComp.layer(\"_Font Buddy\").effect(\"Show Selected\")(\"Checkbox\")}catch(err){enable = 1};\
switch(select * enable){\
	case 0: value;\
	break;\
	case 1: 0;\
	break;\
	case 2: 0;\
	break;\
	case 3: value;\
	break\
} ";









// text layer source text expression

// function findIndexArray(c){
// 	indexArray = [];
// 	for(var i = 1; i<= c.numLayers; i++){
// 		indexArray.push(c.layer(i).effect("font-buddy-index")("Slider").value);
// 	}
// 	sortArray = indexArray.sort(function(a, b){return a - b});
// return sortArray;	
// }
// function findLayer(c, sortArray){
	
// 	for(var i = 0; i< sortArray.length; i++){
// 		if(c.layer(i+1).effect("font-buddy-index")("Slider").value == select){
// 			var l = c.layer(i+1);
// 			break
// 		}
// 	}
// 	return l;
// 	}
// select = effect("Link-To-Font-Buddy")("Menu").value;
// fontbuddytext = comp("_Font Buddy");
// const { style } = fontbuddytext;


// var l = findLayer(fontbuddytext, findIndexArray(fontbuddytext));
// l.text.sourceText




//font buddy text layer slide index expression
// posterizeTime(0);
// var sliderName = "font-buddy-index";
// var layersWithSliders = [];
// var sliderIndexArray = [];
// for(var i = 1; i <= thisComp.numLayers; i++){
// 	try{
//             if(thisComp.layer(i).effect(sliderName)("Slider")!= undefined){            
//                 layersWithSliders.push(thisComp.layer(i).name);
//             }
// 		}catch(err){}
//         }
// for(var m = 0; m < layersWithSliders.length; m++){
//             sliderIndexArray.push(thisComp.layer(layersWithSliders[m]).effect(sliderName)("Slider").value)
//         }

// const duplicates = sliderIndexArray.filter((item, index) => index !== sliderIndexArray.indexOf(item));
// duplicates.length + value