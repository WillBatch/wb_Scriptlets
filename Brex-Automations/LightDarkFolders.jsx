// var imageFolder = false;
// var qcFolder = false;
var proj = app.project;
// alert(proj.numItems);

for(var i = 1; i <= proj.numItems; i++){
    if(proj.item(i).name == "02_EXR Imports"){
        var EXRFolder = proj.item(i);
        break
    }else{
        continue
    }
}

alert(EXRFolder.numItems);
// EXRFolder.numItems
for(var i = 1; i <= EXRFolder.numItems; i++){
//     // var exr = [];
//     // for(n = 1; n <= EXRFolder.item(i).numItems; n++){
//     //     exr.push(EXRFolder.item(i).item(n));
//     // }
    var light = proj.items.addFolder("Light");
    var dark = proj.items.addFolder("Dark");
    light.parentFolder = EXRFolder.item(i);
    dark.parentFolder = EXRFolder.item(i);

}
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