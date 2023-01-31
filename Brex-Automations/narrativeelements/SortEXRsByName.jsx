function createDockableUI(thisObj) {
    var dialog =
        thisObj instanceof Panel
            ? thisObj
            : new Window("window", undefined, undefined, { resizeable: true });
    dialog.onResizing = dialog.onResize = function() {
        this.layout.resize();
    };
    return dialog;
}

function showWindow(myWindow) {
    if (myWindow instanceof Window) {
        myWindow.center();
        myWindow.show();
    }
    if (myWindow instanceof Panel) {
        myWindow.layout.layout(true);
        myWindow.layout.resize();
    }
}

var win = createDockableUI(this);
win.text = "SmartSort";
win.orientation = "column";
win.alignChildren = ["center", "top"];
win.spacing = 10;
win.margins = 16;

var group1 = win.add("group", undefined, { name: "group1" });
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

var button = group1.add("button", undefined, "Sort EXRs");

showWindow(win);


button.onClick = function(){
    var proj = app.project;
    if(proj.selection.length != 0){
        var select = app.project.selection;
        var sortedfolder = select[0];
        sortMyShit(proj, sortedfolder);
    }else{
        alert("Select a folder to send exrs to.");
    }

}

function sortMyShit(proj, folder){


    for(var i = 1; i <= proj.numItems; i++){
        if(proj.item(i).name == "06_EXR Imports"){
            var importfolder = proj.item(i);
            break
        }else{
            continue
        }
    }

    var totalEXR = importfolder.numItems;
    app.beginUndoGroup("move");
    for(var i = totalEXR; i > 0 ; i--){
        var exr = importfolder.item(i);
        var split_array = exr.name.split("_");

        if(split_array.length == 5){
            if(split_array[4] == "Shadows.exr"){
                var newfolder = proj.items.addFolder(split_array[3]);        
                newfolder.parentFolder = folder;
                exr.parentFolder = newfolder;
                
            }
            if(split_array[4] == "Cryptomatte.exr"){
                exr.parentFolder = newfolder;
            }

        }
        if(split_array.length == 4){
        
            exr.parentFolder = newfolder;

        }

    }
    alert("Sorted");
    app.endUndoGroup();
}


