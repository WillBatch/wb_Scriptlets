//Global Folder Names
var f1 = "01_Render";
var f2 = "02_Builds/Templates";
var f3 = "03_Comps";
var f3_1 = "z_Precomps";
var f4 = "04_Prerender";
var f5 = "05_Playback/QC";
var f10 = "10_Assets";
var f10_1 = "PNG";
var f10_2 = "Stock";
var f10_3 = "Plates";
var f10_4 = "PSD";
var f10_array = [f10_1, f10_2, f10_3, f10_4];
var f90 = "90_Project Import";
var f98 = "98_Reference";
var f99 = "99_Old";
var f999 = "999_Trash";

var proj = app.project;
// var selectedFolder = app.project.selection[0];
var selectedFolder = getSelectedFolder(proj);

app.beginUndoGroup("add folders");

//Builds parent Folders
var folder1 = proj.items.addFolder(f1);
var folder2 = proj.items.addFolder(f2);
var folder3 = proj.items.addFolder(f3);
var folder3_1 = proj.items.addFolder(f3_1);
folder3_1.parentFolder = folder3;
var folder4 = proj.items.addFolder(f4);
var folder5 = proj.items.addFolder(f5);
var folder10 = proj.items.addFolder(f10);
var folder90 = proj.items.addFolder(f90);
var folder98 = proj.items.addFolder(f98);
var folder99 = proj.items.addFolder(f99);
var folder999 = proj.items.addFolder(f999);

//Parents Folder to Selected Folder
if (selectedFolder != false) {
  folder1.parentFolder = selectedFolder;
  folder2.parentFolder = selectedFolder;
  folder3.parentFolder = selectedFolder;
  folder4.parentFolder = selectedFolder;
  folder5.parentFolder = selectedFolder;
  folder10.parentFolder = selectedFolder;
  folder98.parentFolder = selectedFolder;
  folder99.parentFolder = selectedFolder;
  folder999.parentFolder = selectedFolder;
}

//Adds Subfolders
for (var i = 0; i < f10_array.length; i++) {
  var subFolder10 = proj.items.addFolder(f10_array[i]);
  subFolder10.parentFolder = folder10;
}
app.endUndoGroup;

function getSelectedFolder(p) {
  return p.selection.length == 0 ? false : p.selection[0];
}
