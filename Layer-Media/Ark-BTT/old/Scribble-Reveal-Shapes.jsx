app.beginUndoGroup("Scribble Matte");

// Run the main function
runCreateScribbleMatte();
app.endUndoGroup();
// Main function to loop through all compositions in the project
function runCreateScribbleMatte() {
  // Create a new shape layer
  var shapeLayer = app.project.activeItem.layers.addShape();
  shapeLayer.name = "New Shape Layer";

  // Create two points for the shape layer
  var startPoint = [0, 0];
  var endPoint = [startPoint[0] + 200, startPoint[1]]; // 200 pixels apart vertically

  // Create a shape group with a path containing the two points
  var shapeGroup = shapeLayer
    .property("Contents")
    .addProperty("ADBE Vector Group");
  var shapePath = shapeGroup
    .property("Contents")
    .addProperty("ADBE Vector Shape - Group");
  var pathData = new Shape();
  pathData.vertices = [startPoint, endPoint];
  pathData.closed = false;
  shapePath.property("Path").setValue(pathData);

  // Add stroke to the shape layer
  var stroke = shapeLayer
    .property("Contents")
    .property("Group 1")
    .property("Contents")
    .addProperty("ADBE Vector Graphic - Stroke");
  stroke.property("Color").setValue([0, 1, 0]); // Bright green color
  stroke.property("Stroke Width").setValue(50); // Stroke width of 50 pixels

  //Add trim path to the shape layer
  var trimpath = shapeLayer
    .property("Contents")
    .property("Group 1")
    .property("Contents")
    .addProperty("ADBE Vector Filter - Trim");

  // Set keyframes for the "end" parameter
  var endProperty = trimpath.property("End");
  var currentTime = app.project.activeItem.time;
  endProperty.setValuesAtTimes([currentTime, currentTime + 1.5], [0, 100]);
  endProperty.expression = "posterizeTime(15); value";
  // Add easing to the keyframes
  var key1 = endProperty.keyTime(1);
  var key2 = endProperty.keyTime(2);
  var easeInkey1 = new KeyframeEase(0, 10); // Ease in value and influence
  var easeOutkey1 = new KeyframeEase(0.1, 30); // Ease out value and influence
  var easeInkey2 = new KeyframeEase(0.1, 55); // Ease in value and influence
  var easeOutkey2 = new KeyframeEase(0, 50); // Ease out value and influence
  endProperty.setTemporalEaseAtKey(1, [easeInkey1], [easeOutkey1]);
  endProperty.setTemporalEaseAtKey(2, [easeInkey2], [easeOutkey2]);

  // Adjust the position of the shape layer if needed
  shapeLayer.position.setValue([
    app.project.activeItem.width / 2,
    app.project.activeItem.height / 2,
  ]);

  // Select the shape layer
  shapeLayer.selected = true;
}
