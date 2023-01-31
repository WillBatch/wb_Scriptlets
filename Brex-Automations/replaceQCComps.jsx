// var imageFolder = false;
// var qcFolder = false;
var proj = app.project;
// alert(proj.numItems);

for(var i = 1; i <= proj.numItems; i++){
    if(proj.item(i).name == "01_MainComps"){
        var mainFolder = proj.item(i);
        break
    }else{
        continue
    }
}

alert(mainFolder.numItems);
app.beginUndoGroup("test");
for(var i = 3; i <= mainFolder.numItems; i++){
//     // var exr = [];
//     // for(n = 1; n <= EXRFolder.item(i).numItems; n++){
//     //     exr.push(EXRFolder.item(i).item(n));
//     // }
    var newComp = mainFolder.item(i).item(1).duplicate();
    newComp.name = mainFolder.item(i).item(1).name + "_DarkMode";

}
app.endUndoGroup();
    // var folderExists = false;
    // for(var n = 1; n <= proj.numItems; n++){
        
    //     if((proj.item(n).name == templateFolderName) && (proj.item(n) instanceof FolderItem)){
    //         var folderExists = true;
    //         var folder = proj.item(n);
    //         break        
    //     }else{
    //         continue
    //     }
    // }