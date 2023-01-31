// var imageFolder = false;
// var qcFolder = false;
var proj = app.project;
var folder = proj.selection;
var mainFolder = folder[0];//Select the subfolder "Confirmation, Neutral, Error"
var exrfolder = folder[1];//Select the subfolder "Confirmation, Neutral, Error"


app.beginUndoGroup("test");
for(var i = 1; i <= exrfolder.numItems; i++){
    var mainexr = exrfolder.item(i).item(1);
    var crypto = exrfolder.item(i).item(2);
    var shadow = exrfolder.item(i).item(3);
    replaceSourceEXR(1, i);
    replaceSourceEXR(2, i);
    // replaceSourceEXR(3, i);
}
app.endUndoGroup();

function replaceSourceEXR(val, i){
    if(val == 1){
        var comp = mainFolder.item(i).item(1);
        // comp.layer(3).replaceSource(crypto, true);
        comp.layer(4).replaceSource(mainexr, true);
    }
    if(val == 3){
        var comp = mainFolder.item(i).item(3);
        // comp.layer(3).replaceSource(crypto, true);
        comp.layer(4).replaceSource(mainexr, true);
        comp.layer(5).replaceSource(mainexr, true);
        comp.layer(6).replaceSource(shadow, true);
        comp.layer(7).replaceSource(mainexr, true);

    }
    if(val == 2){
        var comp = mainFolder.item(i).item(2);
        // comp.layer(3).replaceSource(crypto, true);
        comp.layer(4).replaceSource(mainexr, true);
        comp.layer(5).replaceSource(mainexr, true);
        comp.layer(6).replaceSource(shadow, true);
        comp.layer(7).replaceSource(mainexr, true);
    }
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