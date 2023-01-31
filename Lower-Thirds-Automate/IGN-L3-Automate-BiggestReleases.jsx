var proj = app.project;
var fileNameEdit = "MissingImages";
var templateFolderName = "001_Templates";
var renderFolderName = "002_Render";
var imageCompFolderName = "003_Image Comps";
var imageAssetFolderName = "004_Image Files";
var tempMedia = "Temp Logo";
var imageFileImport = new Folder().selectDlg("Please select the folder with images.");
// var pos_array = ["L", "R"];
// var res_array = ["HD", "4K"];
// var fr_array = ["30", "60"];

//Searches project for folders. Creates if missing.
var templateFolder = addTemplateFolder();
var renderFolder = addRenderFolder();
var avatarImageFolder = addAvatarFolder();
var avatarCompImageFolder = addAvatarCompFolder();

function addTemplateFolder(){
    //checks for active comp and adds one if not active

    //checks for folder
    var folderExists = false;
    for(var n = 1; n <= proj.numItems; n++){
        
        if((proj.item(n).name == templateFolderName) && (proj.item(n) instanceof FolderItem)){
            var folderExists = true;
            var folder = proj.item(n);
            break        
        }else{
            continue
        }
    }
    //adds folder
    if(folderExists != true){
        var folder = proj.items.addFolder(templateFolderName);
    }
    return folder;
}
function addRenderFolder(){
    //checks for active comp and adds one if not active

    //checks for folder
    var folderExists = false;
    for(var n = 1; n <= proj.numItems; n++){
        
        if((proj.item(n).name == renderFolderName) && (proj.item(n) instanceof FolderItem)){
            var folderExists = true;
            var folder = proj.item(n);
            break        
        }else{
            continue
        }
    }
    //adds folder
    if(folderExists != true){
        var folder = proj.items.addFolder(renderFolderName);
    }
    return folder;
}
function addAvatarFolder(){
    //checks for active comp and adds one if not active

    //checks for folder
    var folderExists = false;
    for(var n = 1; n <= proj.numItems; n++){
        
        if((proj.item(n).name == imageAssetFolderName) && (proj.item(n) instanceof FolderItem)){
            var folderExists = true;
            var folder = proj.item(n);
            break        
        }else{
            continue
        }
    }
    //adds folder
    if(folderExists != true){
        var folder = proj.items.addFolder(imageAssetFolderName);
    }
    return folder;
}
function addAvatarCompFolder(){
    //checks for active comp and adds one if not active

    //checks for folder
    var folderExists = false;
    for(var n = 1; n <= proj.numItems; n++){
        
        if((proj.item(n).name == imageCompFolderName) && (proj.item(n) instanceof FolderItem)){
            var folderExists = true;
            var folder = proj.item(n);
            break        
        }else{
            continue
        }
    }
    //adds folder
    if(folderExists != true){
        var folder = proj.items.addFolder(imageCompFolderName);
    }
    return folder;
}
//Checks Templates Comp for items. If missing, prompts user to select the Templates. Will move templates into template folder.
function findTemplates(){

    var myAlert = "Could not find any compositions in the Templates folder. Please select the composition(s) to be used as the template, or move them into the folder: " + "\n\n" + templateFolder.name;
    var compinstances_array = [];

    if(templateFolder.numItems == 0){

        if(proj.selection.length == 0){
            alert(myAlert);
            return false
        }
        if(proj.selection.length > 0){
            
            for(var i = 0; i < proj.selection.length; i++){
                if(proj.selection[i] instanceof CompItem){
                    checkExistingParentFolder(proj.selection[i]);
                    // proj.selection[i].parentFolder = templateFolder;
                    compinstances_array.push(proj.selection[i].name);
                }
            }
            if(compinstances_array.length < 1){
                alert(myAlert);
                return false
            }
        }
        
    }else{
        return true
    }
    function checkExistingParentFolder(select){
        if(select.parentFolder.name != "Root"){
            var currentParentFolder = select.parentFolder;
            currentParentFolder.parentFolder = templateFolder;
        }else{
            select.parentFolder = templateFolder;
        }
    }
};


if(findTemplates() != false){
//Imports images and puts them into avatar folder
var imageFiles = imageFileImport.getFiles();
var templateComps = (function grabTemplateComps(folder, array){
    var template_array = array;
    for(var i = 1; i <= folder.numItems; i++){
        if(folder.item(i) instanceof CompItem){
            template_array.push(folder.item(i).name);
            
        }
        if(folder.item(i) instanceof FolderItem){
            grabTemplateComps(folder.item(i), template_array);
        }
    }
    return template_array;
    }(templateFolder, []));
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
if(csvFile != null){
    var csvData = [];

    csvFile.open("r");
    do {
        csvData.push(csvFile.readln());
        } while(!csvFile.eof);

    csvFile.close();

    app.beginUndoGroup("Read and process CSV File");

    var thisCSVRow;


    for(var i = 1; i < csvData.length; i++) {
        thisCSVRow = csvData[i].split(",");
        makeLowerThirdComp(thisCSVRow, 1);
        makeLowerThirdComp(thisCSVRow, 2);
        }
        alertMissingImages();
        alert("Done");

    app.endUndoGroup();

}
}

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
function makeLowerThirdComp(row, c){
    var name = row[0];

    if(c == 1){
        var compName = name;
        var exists = checkForDuplicates(compName);
        if(exists != true){
        makeLowerThird(compName, 1);
        }
    }
        if(c == 2){
        var compName = name  + "_LogoOnly";
        var exists = checkForDuplicates(compName);
        if(exists != true){
        makeLowerThird(compName, 2);
        }
    }

    function makeLowerThird(compName, c){

        // var templateCompFolder = templateFolder.item(c);

        var comp = app.project.item(1).item(c);
        var nameFolder = addNameRenderFolder(proj, name);
        var avatarComp = addAvatarComp(app.project, name, nameFolder);
        addImageToAvatarComp(avatarComp, name);

        var newComp = comp.duplicate();

        newComp.name = compName;
        
        newComp.parentFolder = nameFolder;
        // changeTextName(name, newComp);
        // changeTextSocial(social, newComp);
        // changeTextCredit(credit, newComp);
        if(newComp.layer(tempMedia) != undefined){
        newComp.layer(tempMedia).replaceSource(avatarComp, true);
        }
        
    }
    // 
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
            folder.parentFolder = renderFolder;
        }
        return folder;
    }
    function addAvatarComp(project, name, folder){
        var avatarComps_array = [];
        var avatarCompName = name + " Logo Image";
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
            var avatarComp = project.items.addComp(avatarCompName, 200, 105, 1, 10, 60);
            avatarComps_array.push(avatarComp.name);
            for(var i = 1; i <= project.numItems; i++){
                if(project.item(i).name == folder.name){
                    var folderparent = project.item(i);
                    break
                }
            }
            avatarComp.parentFolder = avatarCompImageFolder;
        }
        return avatarComp;
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

                // var imageW = parseInt(comp.layer(1).sourceRectAtTime(0, false).width);
                // var imageH = parseInt(comp.layer(1).sourceRectAtTime(0, false).height);

                // if(imageW < imageH){
                //     // cmdID = app.findMenuCommandId('Fit to Comp Width');
                //     cmdID = 2732;
                // }
                // if(imageW >= imageH){
                //     cmdID = 2733; 
                // }

                // comp.openInViewer().setActive();
                // comp.layer(1).selected = true;
                // app.executeCommand(cmdID);
                // comp.layer(1).property("Transform").property("Anchor Point").setValue([2000,0]);
                // comp.layer(1).property("ADBE Transform Group").property("ADBE Position").setValue([128,0]);
                // comp.layer(1).property("ADBE Transform Group").property("ADBE Scale").setValue([8,8]);

            }
           
        }

        return

    }
    function changeTextName(name, newComp){
        if(newComp.layer("Name") != undefined){
        var textProp = newComp.layer("Name").property("Source Text");
        textDocument = textProp.value;
        textDocument.text = name;
        textProp.setValue(textDocument);
        }
        
        return
    }
    function changeTextSocial(social, newComp){
        if(newComp.layer("Social") != undefined){
        var textProp = newComp.layer("Social").property("Source Text");
        textDocument = textProp.value;
        textDocument.text = social;
        textProp.setValue(textDocument);
        }

        return
    }
    function changeTextCredit(credit, newComp){
        if(newComp.layer("Credit") != undefined){
        var textProp = newComp.layer("Credit").property("Source Text");
        textDocument = textProp.value;
        textDocument.text = credit;
        textProp.setValue(textDocument);
        }

        return
    }
}
function alertMissingImages(){
    var imagename_array = [];
    var imagesFolder;
    for(var i = 1; i <= app.project.numItems; i++){
        if(app.project.item(i).name == imageCompFolderName){
            var imagesFolder = app.project.item(i);
            break
        }
    }
    for(var i = 1; i <= imagesFolder.numItems; i++){
        if(imagesFolder.item(i).numLayers < 1){
            
            imagename_array.push(imagesFolder.item(i).name);
        }
    }
    var str = "";
    for(var i = 0; i < imagename_array.length; i ++){
 
        str +=  "\n" + imagename_array[i];
    }

    var textToAlert = "Could not find matching images for the following:" + "\n" + str + "\n\n" + "Make sure the image file name matches the name on the talent ID.";
    if(imagename_array.length > 0){
    alertToText(textToAlert);
    alert(textToAlert);
    }
 
}
function alertToText(text){

    var scriptFolderPath = File($.fileName).path; // the URI of the folder that contains the script file    
    // var TimerFolderPath = scriptFolderPath + encodeURI("/src"); // the URI of the folder for your script resources
    var JFile = new File(encodeURI(fileNameEdit + ".txt"));

    // var content = text;
    // alert(content);

    if (!canWriteFiles()) return null;

    writeFile(JFile, text);

    function writeFile(fileObj, fileContent, encoding) {

    encoding = encoding || "utf-8";

    fileObj = (fileObj instanceof File) ? fileObj : new File(fileObj);

    var parentFolder = fileObj.parent;

    if (!parentFolder.exists && !parentFolder.create())

        throw new Error("Cannot create file in path " + fileObj.fsName);

    fileObj.encoding = encoding;

    fileObj.open("w");

    fileObj.write(fileContent);

    fileObj.close();

    return fileObj;

}

    function canWriteFiles() {

    if (isSecurityPrefSet()) return true;

    alert(script.name + " requires access to write files.\n" +

        "Go to the \"General\" panel of the application preferences and make sure " +

        "\"Allow Scripts to Write Files and Access Network\" is checked.");

    app.executeCommand(2359);

    return isSecurityPrefSet();

    function isSecurityPrefSet() {

        return app.preferences.getPrefAsLong(

            "Main Pref Section",

            "Pref_SCRIPTING_FILE_NETWORK_SECURITY"

        ) === 1;

    }

}
}
