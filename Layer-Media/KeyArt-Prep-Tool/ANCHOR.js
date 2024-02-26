ANCHOR;

const origAnchorX = transform.anchorPoint[0];
const origAnchorY = transform.anchorPoint[1];
var origPosition = transform.position.valueAtTime(-20);
var x = origAnchorX - (origPosition[0] - thisComp.width / 2);
var y = origAnchorY - (origPosition[1] - thisComp.height / 2);
[x, y, 0];

POSITION;

time <= -10
  ? value
  : [thisComp.width / 2, thisComp.height / 2, transform.position[2]];

SCALE;

var camera = thisComp.layer("Camera 1");
var zoom = camera.cameraOption.zoom;
transform.scale * (1 + transform.position[2] / zoom);
