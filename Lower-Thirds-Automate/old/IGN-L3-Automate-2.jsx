//var csvFile = File("~/Documents/comps.csv");
var proj = app.project;

//Creates folder for avatar images
var avatarImageFolder = addAvatarFolder();
function addAvatarFolder(){
    //checks for active comp and adds one if not active

    //checks for folder
    var folderExists = false;
    for(var n = 1; n <= proj.numItems; n++){
        
        if((proj.item(n).name == "Avatar Image Assets") && (proj.item(n) instanceof FolderItem)){
            var folderExists = true;
            var folder = proj.item(n);
            break        
        }else{
            continue
        }
    }
    //adds folder
    if(folderExists != true){
        var folder = proj.items.addFolder("Avatar Image Assets");
    }
    return folder;
}

//Imports images and puts them into avatar folder
var imageFiles = Folder("./Avatar Images").getFiles();

for(var i = 0; i< imageFiles.length; i++){
    var exists = checkImageExists(imageFiles[i], proj);
    if(exists != true){
    image = app.project.importFile(new ImportOptions(imageFiles[i]));
    image.parentFolder = avatarImageFolder;
    }

}

function checkImageExists(file, project){

    for(var i = 1; i <= project.numItems; i++){
        var fileString = decodeURI(file.name);
        // var fileString = decode.replace(/\s/g, '');
        //     alert(fileString);
        if(proj.item(i).name == fileString){
            return true
        }
    }
}


var csvFile = File.openDialog("Please select a CSV file");

var csvData = [];

csvFile.open("r");
do {
    csvData.push(csvFile.readln());
    } while(!csvFile.eof);

csvFile.close();

//~ alert(csvData);
//~ alert(csvData[0]);

app.beginUndoGroup("Read and process CSV File");

var thisCSVRow;

for(var i = 1; i < csvData.length; i++) {
    thisCSVRow = csvData[i].split(",");
     makeLowerThirdComp(thisCSVRow);
    }

app.endUndoGroup();

function checkForDuplicates(name){

    //checks for active comp and adds one if not active

    //checks for folder
    var compExists = false;
    for(var n = 1; n <= app.project.numItems; n++){
        
        if((proj.item(n).name == name) && (proj.item(n) instanceof CompItem)){
            var compExists = true;
            break        
        }else{
            continue
        }
    }

    return compExists;

}
function makeLowerThirdComp(row){
    var name = row[0];
    var social = row[1];
    var credit = row[2];
    var position = row[3];
    var res = row[4];

    if(credit == ""){
        var compName = name + "_2Line_" + position + "_" + res;
        var exists = checkForDuplicates(compName);
        if(exists != true){
        make2LineLowerThird();
        }
    }else{
        var compName = name + "_3Line_" + credit + "_" + position + "_" + res;
        var exists = checkForDuplicates(compName);
        if(exists != true){
        make3LineLowerThird();
        }
    }

    function make2LineLowerThird(){
        var templateCompFolder = proj.item(2);
        if(position == "L"){
            if(res == "HD"){
                var comp = templateCompFolder.item(2);
            }else{
                var comp = templateCompFolder.item(1);
            }
        }else{
            if(res == "HD"){
                var comp = templateCompFolder.item(4);
            }else{
                var comp = templateCompFolder.item(3);
            }
        }
        var nameFolder = addNameRenderFolder(proj, name);
        var avatarCompFunc = addAvatarComp(app.project, name, nameFolder);
        var avatarComp = avatarCompFunc.avatarComp;
        var missingImages = addImageToAvatarComp(avatarComp, name);
        var newComp = comp.duplicate();
        newComp.name = name + "_2Line_" + position + "_" + res;
        newComp.parentFolder = nameFolder;
        changeTextName(name, newComp);
        changeTextSocial(social, newComp);
        newComp.layer("AvatarPlaceholder").replaceSource(avatarComp, true);

        alert(missingImages[0]);        
        
    }
    function make3LineLowerThird(){
        var templateCompFolder = proj.item(7);
        if(position == "L"){
            if(res == "HD"){
                var comp = templateCompFolder.item(2);
            }else{
                var comp = templateCompFolder.item(1);
            }
        }else{
            if(res == "HD"){
                var comp = templateCompFolder.item(4);
            }else{
                var comp = templateCompFolder.item(3);
            }
        }
        var nameFolder = addNameRenderFolder(proj, name);
        var avatarCompFunc = addAvatarComp(app.project, name, nameFolder);
        var avatarComp = avatarCompFunc.avatarComp;
        var avatarArray = avatarCompFunc.avatarComps_array;

        var missingImages = addImageToAvatarComp(avatarComp, name);

        var newComp = comp.duplicate();
        newComp.name = name + "_3Line_" + credit + "_" + position + "_" + res;
        newComp.parentFolder = nameFolder;
        changeTextName(name, newComp);
        changeTextSocial(social, newComp);
        changeTextCredit(credit, newComp);
        newComp.layer("AvatarPlaceholder").replaceSource(avatarComp, true);

        
        alert(missingImages[0]);        

    }
    function addNameRenderFolder(project, name){
        //checks for active comp and adds one if not active

        //checks for folder
        var folderExists = false;
        for(var n = 1; n <= project.numItems; n++){
            
            if((project.item(n).name == name) && (project.item(n) instanceof FolderItem)){
                var folderExists = true;
                var folder = project.item(n);
                break        
            }else{
                continue
            }
        }
        //adds folder


        if(folderExists != true){
            var folder = project.items.addFolder(name);
            folder.parentFolder = project.item(12);
        }
        return folder;
    }
    function addAvatarComp(project, name, folder){
        var avatarComps_array = [];
        var avatarCompName = name + " Avatar Image";
        //checks for comp
        var compExists = false;
        for(var n = 1; n <= project.numItems; n++){
            
            if((project.item(n).name == avatarCompName) && (project.item(n) instanceof CompItem)){
                var compExists = true;
                var avatarComp = project.item(n);
                avatarComps_array.push(avatarComp.name);
                break        
            }else{
                continue
            }
        }
        //adds comp
        if(compExists != true){
            var avatarComp = project.items.addComp(avatarCompName, 256, 256, 1, 10, 60);
            avatarComps_array.push(avatarComp.name);
            for(var i = 1; i <= project.numItems; i++){
                if(project.item(i).name == folder.name){
                    var folderparent = project.item(i);
                    break
                }
            }
            avatarComp.parentFolder = folderparent;
        }

        return {
            'avatarComp' : avatarComp,
            'avatarComps_array' : avatarComps_array
        }
    }
    function addImageToAvatarComp(comp, image){
        var missingImages = [];
        if(comp.numLayers == 0){
            var nameStr = name.replace(/\s/g, '');
            // alert(nameStr);
            for(var i = 1; i <= avatarImageFolder.numItems; i++){
                var strSpaced = avatarImageFolder.item(i).name.replace(/\s/g, '');
                var strSliced = strSpaced.slice(0, strSpaced.length - 4);
                // alert(strSliced);
                if(strSliced == nameStr){
                    var keyImage = avatarImageFolder.item(i);
                    break
                }else{
                    // alert("Could not find matching image for" + name);
                    continue
                }
            }

            if(keyImage != undefined){
                comp.layers.add(keyImage);

                var imageW = parseInt(comp.layer(1).sourceRectAtTime(0, false).width);
                var imageH = parseInt(comp.layer(1).sourceRectAtTime(0, false).height);

                if(imageW < imageH){
                    // cmdID = app.findMenuCommandId('Fit to Comp Width');
                    cmdID = 2732;
                }
                if(imageW >= imageH){
                    cmdID = 2733; 
                }

                comp.openInViewer().setActive();
                comp.layer(1).selected = true;
                app.executeCommand(cmdID);

            }
            // if(keyImage == undefined){
            //     missingImages.push(name);
            // }

        }

        return missingImages

    }
    function changeTextName(name, newComp){
        var textProp = newComp.layer("Name").property("Source Text");
        textDocument = textProp.value;
        textDocument.text = name;
        textProp.setValue(textDocument);
    }
    function changeTextSocial(social, newComp){
        var textProp = newComp.layer("Social").property("Source Text");
        textDocument = textProp.value;
        textDocument.text = social;
        textProp.setValue(textDocument);
    }
    function changeTextCredit(credit, newComp){
        var textProp = newComp.layer("Credit").property("Source Text");
        textDocument = textProp.value;
        textDocument.text = credit;
        textProp.setValue(textDocument);
    }
    
}