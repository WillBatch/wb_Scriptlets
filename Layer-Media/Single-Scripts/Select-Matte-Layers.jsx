// Check if a composition is open
if (
  app.project.activeItem == null ||
  !(app.project.activeItem instanceof CompItem)
) {
  throw new Error("Please open a composition.");
}

var searchString = "mov";
var foundLayers = [];

for (var i = 1; i <= app.project.activeItem.numLayers; i++) {
  if (
    app.project.activeItem.layer(i).name.toLowerCase().search(searchString) !=
    -1
  ) {
    // foundLayers.push(app.project.activeItem.layer(i));
    app.project.activeItem.layer(i).selected = true;
  }
}
