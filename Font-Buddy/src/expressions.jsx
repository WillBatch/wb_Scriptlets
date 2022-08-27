var textControllerExpression = "comp(\"_Font Buddy\").layer(\"Style-";

var linkControllersToDropDown = "select = effect(\"Link-To-Font-Buddy\")(\"Menu\").value;\
fontbuddytext = comp(\"_Font Buddy\").layer(select).text.sourceText;\
const { style } = fontbuddytext;\
try{var m = thisLayer.marker.key(\"Font Buddy Control Layer\")}catch(err){m = null}\
if(m != null){\
style.setText(fontbuddytext + \" Controller\")\
}else{\
	\"Do not delete this marker\"\
}";



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