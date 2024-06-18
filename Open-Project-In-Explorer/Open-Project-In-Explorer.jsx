var myProject = app.project;

if (myProject && myProject.file) {
  var projectFilePath = myProject.file.fsName;

  // Remove the project file name to get the directory
  var projectDirectory = projectFilePath.substring(
    0,
    projectFilePath.lastIndexOf("\\")
  );

  // Open the directory in Explorer
  var command = 'explorer "' + projectDirectory + '"';
  system.callSystem(command);
} else {
  alert("No project is currently open or the project is unsaved.");
}
