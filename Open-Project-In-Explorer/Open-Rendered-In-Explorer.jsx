var myProject = app.project;

if (myProject && myProject.file) {
  var projectFilePath = myProject.file.fsName;

  // Remove the project file name to get the directory
  var projectDirectory = projectFilePath.substring(
    0,
    projectFilePath.lastIndexOf("\\")
  );

  // Remove the current directory to step up one level
  var parentDirectory = projectDirectory.substring(
    0,
    projectDirectory.lastIndexOf("\\")
  );

  // Append the "_Rendered" folder to the parent directory
  var renderedDirectory = parentDirectory + "\\_Rendered";

  // Open the "_Rendered" directory in Explorer
  var command = 'explorer "' + renderedDirectory + '"';
  system.callSystem(command);
} else {
  alert("No project is currently open or the project is unsaved.");
}
