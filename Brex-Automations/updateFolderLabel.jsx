// var imageFolder = false;
// var qcFolder = false;
var proj = app.project;
// alert(proj.numItems);

for(var i = 1; i <= proj.numItems; i++){
    if(proj.item(i).name == "02_EXR Imports"){
        folder = proj.item(i);
        break
    }else{
        continue
    }
}

app.beginUndoGroup("test");
for(var i = 1; i <= folder.numItems; i++){
//     // var exr = [];
//     // for(n = 1; n <= EXRFolder.item(i).numItems; n++){
//     //     exr.push(EXRFolder.item(i).item(n));
//     // }
    var currentFolder = folder.item(i);

    var dark = currentFolder.item(1);
    if(dark.numItems != 0){
        dark.label = 9;
    }else{
        null;
    }

}
for(var i = 1; i <= folder.numItems; i++){
    var currentFolder = folder.item(i);
    var folder1 = currentFolder.item(1);
    var folder2 = currentFolder.item(2);

    if((folder1.label == 9) && folder2.label == 9){
        currentFolder.label = 9;
    }

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