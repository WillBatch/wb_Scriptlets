var anchorPointDropDownRectangleExpression = "var posterizeCheckbox = effect(\"Shape Anchor\")(\"Freeze Calculations\");\
posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;\
posterizeTime(posterizeTimeValue);\
var size = content(\"Rectangle 1\").content(\"Rectangle Path 1\").size;\
var select = effect(\"Shape Anchor\")(\"Anchor Position\").value;\
if(select % 3 == 0)x = size[0]/-2;if(select % 3 == 1)x = size[0]/2;if(select % 3 == 2)x = 0;if(select <= 3)y = 0;if(select > 3 && select <= 6)y = size[1]/2;if(select > 6)y = size[1]/-2;\
[x, y]";

var anchorPointDropDownEllipseExpression = "var posterizeCheckbox = effect(\"Shape Anchor\")(\"Freeze Calculations\");\
posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;posterizeTime(posterizeTimeValue);\
var size = content(\"Ellipse 1\").content(\"Ellipse Path 1\").size;\
var select = effect(\"Shape Anchor\")(\"Anchor Position\").value;\
if(select % 3 == 0)x = size[0]/-2;if(select % 3 == 1)x = size[0]/2;if(select % 3 == 2)x = 0;if(select <= 3)y = 0;if(select > 3 && select <= 6)y = size[1]/2;if(select > 6)y = size[1]/-2;\
[x, y]";

var centerXPositionRectangleExpression = "var posterizeCheckbox = effect(\"Shape Anchor\")(\"Freeze Calculations\");posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;posterizeTime(posterizeTimeValue);var centerCheck = effect(\"Shape Anchor\")(\"Force Center Position\");var xPos = content(\"Rectangle 1\").content(\"Rectangle Path 1\").position[0];centerCheck == 0 ? value : value - xPos;";
var centerYPositionRectangleExpression = "var posterizeCheckbox = effect(\"Shape Anchor\")(\"Freeze Calculations\");posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;posterizeTime(posterizeTimeValue);var centerCheck = effect(\"Shape Anchor\")(\"Force Center Position\");var yPos = content(\"Rectangle 1\").content(\"Rectangle Path 1\").position[1];centerCheck == 0 ? value : value - yPos;";

var centerXPositionEllipseExpression = "var posterizeCheckbox = effect(\"Shape Anchor\")(\"Freeze Calculations\");posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;posterizeTime(posterizeTimeValue);var centerCheck = effect(\"Shape Anchor\")(\"Force Center Position\");var xPos = content(\"Ellipse 1\").content(\"Ellipse Path 1\").position[0];centerCheck == 0 ? value : value - xPos;";
var centerYPositionEllipseExpression = "var posterizeCheckbox = effect(\"Shape Anchor\")(\"Freeze Calculations\");posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;posterizeTime(posterizeTimeValue);var centerCheck = effect(\"Shape Anchor\")(\"Force Center Position\");var yPos = content(\"Ellipse 1\").content(\"Ellipse Path 1\").position[1];centerCheck == 0 ? value : value - yPos;";

var strokeExpression = "";

var positionExpression = "var posterizeCheckbox = effect(\"Shape Anchor\")(\"Freeze Calculations\");\
posterizeCheckbox == 1 ? posterizeTimeValue = 0 : posterizeTimeValue = 1.0 / thisComp.frameDuration;\
posterizeTime(posterizeTimeValue);\
var strokeSelect = sub(effect(\"Shape Anchor\")(\"Stroke Position\").value, 1);\
var strokeModifier = [.5, 1, 0];\
var stroke = mul(content(\"Rectangle 1\").content(\"Stroke 1\").strokeWidth, strokeModifier[strokeSelect]);\
var size = content(\"Rectangle 1\").content(\"Rectangle Path 1\").size + [stroke, stroke];\
var select = effect(\"Shape Anchor\")(\"Anchor Position\").value;\
if(select % 3 == 0)x = size[0]/-2;\
if(select % 3 == 1)x = size[0]/2;\
if(select % 3 == 2)x = 0;\
if(select <= 3)y = 0;\
if(select > 3 && select <= 6)y = size[1]/2;\
if(select > 6)y = size[1]/-2;\
[x, y]";