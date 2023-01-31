var proj = app.project;
var outputFolder = new Folder().selectDlg("Please select a folder to render to.");
// var outputFolder = "/D/IGN Lower Thirds Automate/Rendered GFX";
var renderFolder = proj.item(12);
var testRenderFile = proj.item(14);

app.beginUndoGroup("render");

for(var i = 1; i <= renderFolder.numItems; i++){
    var currentFolder = renderFolder.item(i);
    for(var n = 1; n <= currentFolder.numItems; n++){
        var currentComp = currentFolder.item(n);
        var folderName = getFolderNameFromComp(currentComp);
        var item = addToRenderQueue(currentComp);
        customOutputFolder(folderName, currentComp);
    }

}

app.endUndoGroup();



function getFolderNameFromComp(comp){
    return comp.name.split("_")[0].toString();
}

function addToRenderQueue(comp){
    return proj.renderQueue.items.add(comp);
    
}

function customOutputFolder(folder, currentComp){
    var currentItem = app.project.renderQueue.numItems;
    var om1 = app.project.renderQueue.item(currentItem).outputModule(1);
    sequenceFolder = new Folder("\\D\\IGN Lower Thirds Automate\\Rendered GFX\\" + folder);

    //Check If sequence folder doesnt exist, create it.
    if (!sequenceFolder.exists){
        sequenceFolder.create();
    }

    //Define Output File Directories with folder
    var sequenceOutput = {
        "Output File Info": {
            "Base Path":   sequenceFolder.fsName,
            // "Subfolder Path":  "test",
            "File Name":  currentComp.name + ".mov"
        }

    }
om1.setSettings( sequenceOutput );
}
