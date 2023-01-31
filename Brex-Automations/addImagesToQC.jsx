// var imageFolder = false;
// var qcFolder = false;
var proj = app.project;
// alert(proj.numItems);

for(var i = 1; i <= proj.numItems; i++){
    if(proj.item(i).name == "04_Deliverables"){
        var imageFolder = proj.item(i);
        break
    }else{
        continue
    }
}
for(var i = 1; i <= proj.numItems; i++){
    if(proj.item(i).name == "03_QC"){
        qcFolder = proj.item(i);
        break
    }else{
        continue
    }
}

app.beginUndoGroup("test");
for(var i = 1; i <= qcFolder.numItems; i++){
//     // var exr = [];
//     // for(n = 1; n <= EXRFolder.item(i).numItems; n++){
//     //     exr.push(EXRFolder.item(i).item(n));
//     // }
    var qccomp = qcFolder.item(i);
    var image = imageFolder.item(i);
    qccomp.layers.add(image);

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