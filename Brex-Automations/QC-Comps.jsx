// var imageFolder = false;
// var qcFolder = false;
var proj = app.project;
alert(proj.numItems);

for(var i = 1; i <= proj.numItems; i++){
    if(proj.item(i).name == "04_Deliverables"){
        var imageFolder = proj.item(i);
        break
    }else{
        continue
    }
}
// alert(imageFolder.name);

for(var i = 1; i <= proj.numItems; i++){
    if(proj.item(i).name == "03_QC"){
        qcFolder = proj.item(i);
        break
    }else{
        continue
    }
}
// alert(qcFolder.name)
for(var i = 1; i <= imageFolder.numItems; i++){
    var newComp = qcFolder.item(1).duplicate();
    newComp.parentFolder = qcFolder;
    var n = imageFolder.item(i).name.split("_")[0];
    newComp.name = n + "_QC";
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