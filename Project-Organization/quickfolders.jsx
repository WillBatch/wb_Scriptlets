{
  // Ensure something is selected
  if (app.project) {
    app.beginUndoGroup("Create Folders Inside Selected Folder");

    // Get the currently selected item
    var selectedItems = app.project.selection;

    if (selectedItems.length === 1 && selectedItems[0] instanceof FolderItem) {
      var parentFolder = selectedItems[0];

      // Folder names
      var folderNames = ["A_RENDER", "B_COMPS", "C_PRECOMPS", "Z_OLD"];

      // Create folders
      for (var i = 0; i < folderNames.length; i++) {
        var newFolder = app.project.items.addFolder(folderNames[i]);
        newFolder.parentFolder = parentFolder; // Set parent folder
      }
    } else {
      alert("Please select a single folder to create subfolders inside.");
    }

    app.endUndoGroup();
  } else {
    alert("No project is open. Please open a project and try again.");
  }
}
