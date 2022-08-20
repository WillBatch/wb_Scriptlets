var activeComp = app.project.activeItem;
app.beginUndoGroup("Adds Controls Null Layer");

var nullLayer = activeComp.layers.addNull(activeComp.duration);
nullLayer.label = 2;
nullLayer.guideLayer = true;
nullLayer.enabled = false;
var customNameLabel = prompt("Controls Name" + "\r" + "Essential Graphics, Data, Animation", "Essential Graphics");
if(customNameLabel != null)
nullLayer.name = "Controls: " + customNameLabel;
else
nullLayer.name = "Controls";

app.endUndoGroup();