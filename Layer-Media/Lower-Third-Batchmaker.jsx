var lineToStartOn = 3;
var textSearchOne = "Line 1";
var textSearchTwo = "Line 2";
var compNamePrefix = "NW-ToA";

(function (thisObj) {
  scriptBuildUI(thisObj);
  function scriptBuildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Lower Thirds From CSV", undefined, {
            resizeable: true,
          });
    win.spacing = 3;
    win.orientation = "column";
    win.alignChildren = "left";

    // Create the tab control
    var tabControl = win.add("tabbedpanel");
    tabControl.alignChildren = "fill";

    // Create the tabs
    var tab1 = tabControl.add("tab", undefined, "Main");
    tab1.alignChildren = "left";
    var tab2 = tabControl.add("tab", undefined, "Settings");
    tab2.alignChildren = "left";

    //Tab One Button Groups
    var group1 = tab1.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    group1.spacing = 5;
    var group2 = tab1.add("group"); // Create a group for the first row
    group2.orientation = "row"; // Set the group orientation to "row"
    group2.spacing = 5;
    //Tab Two Button Groups
    var group3 = tab2.add("group"); // Create a group for the first row
    group1.orientation = "row"; // Set the group orientation to "row"
    group1.spacing = 5;
    var group4 = tab2.add("group"); // Create a group for the first row
    group2.orientation = "row"; // Set the group orientation to "row"
    group2.spacing = 5;
    var group5 = tab2.add("group"); // Create a group for the first row
    group2.orientation = "row"; // Set the group orientation to "row"
    group2.spacing = 5;

    // Add a button to run the script
    var button_runMainScript = group1.add(
      "button",
      undefined,
      "Make Lower Thirds"
    );
    button_runMainScript.onClick = function () {
      if (
        app.project.selection[0] !== null &&
        app.project.selection[0] instanceof CompItem
      ) {
        //check for valid input from csv path
        if (filePathText.text !== "") {
          csvFile = new File(filePathText.text);
          runMainScript(app.project.selection[0], parseCSV(csvFile));
        } else {
          alert("Please browse for CSV File");
        }
      } else {
        alert("Please select lower thirds template comp");
      }
    };

    // Add a button to browse for a .csv file
    var browseButton = group1.add("button", undefined, "Browse CSV");
    browseButton.onClick = function () {
      var csvFile = File.openDialog("Select a .csv file", "*.csv");
      if (csvFile != null) {
        // Check if the file extension is .csv
        if (csvFile.name.slice(-4).toLowerCase() === ".csv") {
          filePathText.text = csvFile.fsName; // Display the file path
        } else {
          alert("Please select a valid .csv File");
        }
      }
    };

    // Add a text field to display the selected file path
    var filePathText = group2.add("edittext", undefined, "", {
      multiline: false,
    });

    // Add a text field for Line Count Variable
    var startingLineLabel = group3.add(
      "statictext",
      undefined,
      "CSV Row Start:"
    );
    var startingLineTextInput = group3.add("edittext", undefined, "1", {
      multiline: false,
    });
    // Add a text field for Prefix variable
    var prefixLabel = group3.add("statictext", undefined, "Prefix");
    var prefixTextInput = group3.add("edittext", undefined, "", {
      multiline: false,
    });
    // Add a text field for Text Line One variable
    var textOneSearchNameLabel = group4.add(
      "statictext",
      undefined,
      "Column 1 Search Text"
    );
    var textOneSearchNameTextInput = group4.add(
      "edittext",
      undefined,
      "Line 1",
      {
        multiline: false,
      }
    );
    // Add a text field for Prefix variable
    var textTwoSearchNameLabel = group5.add(
      "statictext",
      undefined,
      "Column 2 Search Text"
    );
    var textTwoSearchNameTextInput = group5.add(
      "edittext",
      undefined,
      "Line 2",
      {
        multiline: false,
      }
    );

    //Button Sizing
    button_runMainScript.size = [120, 20];
    browseButton.size = [85, 20];
    filePathText.size = [205, 20];
    startingLineTextInput.size = [30, 20];
    prefixTextInput.size = [100, 20];
    textOneSearchNameTextInput.size = [100, 20];
    textTwoSearchNameTextInput.size = [100, 20];

    win.onResizing = win.onResize = function () {
      this.layout.resize();
    };

    win instanceof Window
      ? (win.center(), win.show())
      : (win.layout.layout(true), win.layout.resize());
  }
})(this);

// Function to parse CSV data
function parseCSV(csvFile) {
  //   alert("Here");
  if (csvFile.exists) {
    csvFile.open("r");
    var csvData = csvFile.read();
    csvFile.close();

    // Parse CSV data (this is a basic example)
    var lines = csvData.split("\n");
  } else {
    alert("File not found.");
  }
  return lines;
}

function runMainScript(comp, lines) {
  app.beginUndoGroup("Make Lower Thirds");
  for (var i = lineToStartOn - 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    var textInputOne = values[0]; // Assuming first column
    var textInputTwo = values[1]; // Assuming second column
    make_lower_third(comp, textInputOne, textInputTwo);
  }
  app.endUndoGroup();
}
function make_lower_third(comp, textInputOne, textInputTwo) {
  var newComp = comp.duplicate();
  var textOne = search_layer_by_name(newComp, textSearchOne);
  var textTwo = search_layer_by_name(newComp, textSearchTwo);

  textOne.property("Text").property("Source Text").setValue(textInputOne);
  textTwo.property("Text").property("Source Text").setValue(textInputTwo);

  var newCompName =
    compNamePrefix + "_" + "L3_" + textInputOne + "" + textInputTwo;
  var newCompNameFormatted = newCompName.replace(/[<>:"\/\\|?*\s]/g, "");

  newComp.name = newCompNameFormatted;
}
function search_layer_by_name(comp, name) {
  var matchedLayer;
  for (var i = 1; i <= comp.numLayers; i++) {
    if (comp.layer(i).name === name) {
      matchedLayer = comp.layer(i);
      break;
    }
  }
  return matchedLayer;
}
