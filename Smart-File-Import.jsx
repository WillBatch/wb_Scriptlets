// Import media only if it doesn't already exist in the project
(function () {
  var project = app.project;

  if (!project) return;

  // Get the selected folder or default to the root of the project
  var selectedFolder = project.rootFolder;
  if (
    project.selection.length > 0 &&
    project.selection[0] instanceof FolderItem
  ) {
    selectedFolder = project.selection[0];
  }

  // Helper function to check if a file already exists in the project
  function isFileAlreadyImported(filePath) {
    for (var i = 1; i <= project.numItems; i++) {
      var item = project.item(i);
      if (
        item instanceof FootageItem &&
        item.file &&
        item.file.fsName === filePath
      ) {
        return true;
      }
    }
    return false;
  }

  // Import files
  function importFiles() {
    var importOptions = new ImportOptions();

    // Open file dialog to select files
    var files = File.openDialog("Select files to import", undefined, true);
    if (!files) return; // Cancel if no files selected

    app.beginUndoGroup("Import Media");

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // Check if the file is already in the project
      if (!isFileAlreadyImported(file.fsName)) {
        importOptions.file = file;
        var importedItem = project.importFile(importOptions);

        // Move to the selected folder if applicable
        if (selectedFolder !== project.rootFolder) {
          importedItem.parentFolder = selectedFolder;
        }
      }
    }

    app.endUndoGroup();
  }

  importFiles();
})();
