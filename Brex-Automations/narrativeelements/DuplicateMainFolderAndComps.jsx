var prefix = "ChipSticker-Side_Neutral";
// var prefix = "Sticker-TopDown-Bend_Error";
// var prefix = "Sticker-TopDown-Bend_Confirm";
var proj = app.project;

var folder = proj.selection;
var mainFolder = folder[0]; //Select the subfolder "Confirmation, Neutral, Error"
var exrfolder = folder[1]; //Select the subfolder "Confirmation, Neutral, Error"

app.beginUndoGroup("test");
for(var i = 1; i <= exrfolder.numItems; i++){

    var templatecomplightalpha = mainFolder.item(1).item(2);
    // var templatecomplightfull = mainFolder.item(1).item(3);
    var templatecompdark = mainFolder.item(1).item(1);
    var newfolder = proj.items.addFolder(exrfolder.item(i).name);
    newfolder.parentFolder = mainFolder;
    // var newCompLightFull = templatecomplightfull.duplicate();
    var newCompLightAlpha = templatecomplightalpha.duplicate();
    var newCompDark = templatecompdark.duplicate();
    // newCompLightFull.name = prefix + exrfolder.item(i).name + "_LightModeFull";
    newCompLightAlpha.name = prefix + exrfolder.item(i).name + "_LightModeAlpha";
    newCompDark.name = prefix + exrfolder.item(i).name + "_DarkMode";
    // newCompLightFull.parentFolder = newfolder;
    newCompLightAlpha.parentFolder = newfolder;
    newCompDark.parentFolder = newfolder;

}
app.endUndoGroup();
