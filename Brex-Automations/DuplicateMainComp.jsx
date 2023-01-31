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
    var maincomp = mainFolder.item(i);
    var maincomplight = maincomp.item(1);
    var maincompdark = maincomp.item(2);
    qccomp.layer(1).replaceSource(maincompdark, true);
    qccomp.layer(2).replaceSource(maincomplight, true);

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