var strokeShapeSize = "var x = add(effect('MatteMate')('xSize'), effect('MatteMate')('xPad'));\
var y = add(effect('MatteMate')('ySize'), effect('MatteMate')('yPad'));\
[x,y]";

var xSizeExpression = "switch(effect('MatteMate')('Maintain Dimensions').value){\
	case 1: value;\
	break;\
	case 2: value;\
	break;\
	case 3: var ratio = effect('MatteMate')('xLocked') / effect('MatteMate')('yLocked');\
			effect('MatteMate')('ySize') * ratio;\
	break;\
	}";


var ySizeExpression = "switch(effect('MatteMate')('Maintain Dimensions').value){\
	case 1: value;\
	break;\
	case 2: var ratio = effect('MatteMate')('yLocked') / effect('MatteMate')('xLocked');\
			effect('MatteMate')('xSize') * ratio;\
	break;\
	case 3: value;\
	break;\
	}";
