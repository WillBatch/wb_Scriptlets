//Global Folder Names
var f1 = "_DELIVER";
var f2 = "COMPS";
var f3 = "Source";
var f4 = "zOld";

var proj = app.project;
// var selectedFolder = app.project.selection[0];
var selectedFolder = getSelectedFolder(proj);

app.beginUndoGroup("add folders");

//Builds parent Folders
var folder1 = proj.items.addFolder(f1);
var folder2 = proj.items.addFolder(f2);
var folder3 = proj.items.addFolder(f3);
var folder4 = proj.items.addFolder(f4);

//Parents Folder to Selected Folder
if (selectedFolder != false) {
  folder1.parentFolder = selectedFolder;
  folder2.parentFolder = selectedFolder;
  folder3.parentFolder = selectedFolder;
  folder4.parentFolder = selectedFolder;
}

//Adds Subfolders
// for (var i = 0; i < f10_array.length; i++) {
//   var subFolder10 = proj.items.addFolder(f10_array[i]);
//   subFolder10.parentFolder = folder10;
// }
app.endUndoGroup;

function getSelectedFolder(p) {
  return p.selection.length == 0 ? false : p.selection[0];
}
