
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Money Bills/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Stickers_TopDown/Error/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Chip Stickers_TopDown/Confirmation/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Chip Stickers_TopDown/Neutral/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Chip Stickers_TopDown/Error/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Chip Stickers_Perspective/Front/Error/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Chip Stickers_Perspective/Front/Neutral/";
var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Chip Stickers_Perspective/Side/Neutral/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Looking Glass/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Money Chips/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Card/";
// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Chip Blank/";

// var outputPath = "D:/Brex/Rendered GFX/Narrative Elements/Stickers_TopDown_Bend01/Neutral/";

var proj = app.project;
var folder = proj.activeItem;
var render = proj.renderQueue;
// var png = "PNG Still LowRes";
// var jpg = "JPG Still LowRes";
var png = "PNG Still";
var jpg = "JPG Still";

renderAllFolders();
// renderSingleFolder();

function renderAllFolders(){

    if(folder != undefined){

        for (var i = 1; i <= folder.numItems; i++){
            renderFolderItems(folder.item(i))
        }

        function renderFolderItems(f){
            var dark = f.item(1);
            var lightAlpha = f.item(2);
            // var lightFull = f.item(3);

            render.items.add(dark);
            render.items.add(lightAlpha);
            // render.items.add(lightFull);

            render.item(render.numItems -1).outputModule(1).file = File(outputPath + "/" +  dark.name);
            render.item(render.numItems - 1).outputModule(1).applyTemplate(png);
            
            render.item(render.numItems ).outputModule(1).file = File(outputPath + "/" +  lightAlpha.name);
            render.item(render.numItems ).outputModule(1).applyTemplate(png);

            // render.item(render.numItems).outputModule(1).file = File(outputPath  + "/" + lightFull.name);
            // render.item(render.numItems).outputModule(1).applyTemplate(jpg);


        }
    }
}

function renderSingleFolder(){

    if(folder != undefined){
        renderFolderItems(folder)

    }
}

function renderFolderItems(f){
    var dark = f.item(1);
    var lightAlpha = f.item(2);
    // var lightFull = f.item(3);

    render.items.add(dark);
    render.items.add(lightAlpha);
    // render.items.add(lightFull);

    render.item(render.numItems - 1).outputModule(1).file = File(outputPath + "/" +  dark.name);
    render.item(render.numItems - 1).outputModule(1).applyTemplate(png);
    
    render.item(render.numItems ).outputModule(1).file = File(outputPath + "/" +  lightAlpha.name);
    render.item(render.numItems ).outputModule(1).applyTemplate(png);

    // render.item(render.numItems).outputModule(1).file = File(outputPath  + "/" + lightFull.name);
    // render.item(render.numItems).outputModule(1).applyTemplate(jpg);


}






// var imageFolder = false;
// var qcFolder = false;
// var filePath = app.project.file.fsName;
// var filePath = filePath.replace(/\\/g, "/");
// alert(filePath);
// // Get parent folder of file in extendscript
// var pathToFile = filePath;
// var fileObj = File(pathToFile);
// var parentFolder = fileObj.parent.parent.fsName; // >> /path/to
// var parentFolder = parentFolder.replace(/\\/g, "\/");

// var renderFolder = Folder(parentFolder + "/Rendered GFX");
// alert(renderFolder.fsName.replace(/\\/g, "\/"));