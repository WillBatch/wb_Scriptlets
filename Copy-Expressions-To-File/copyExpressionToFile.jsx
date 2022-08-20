//$.evalFile("src/NewExpressions.jsx");
var fileNameEdit = "copiedExpressions.jsx";
var comp = app.project.activeItem;
var compLayers = comp.numLayers;
var nullArray = [];


for(i = 1; i <= numberOfNulls; i++){
    var nullLayer = comp.layer(i);
    
    nullArray.push(nullLayer);
    
    }
expressionRefresh(nullArray);
expressionsToText();

function expressionRefresh(nul){
    for(i = 0; i < nul.length; i++){
        var nulLayer = nul[i];
        var nulPropsGroup = nulLayer.property("ADBE Effect Parade");
        var nulPropsCount = nulPropsGroup.numProperties;
        
        for(n = 1; n <= nulPropsCount; n++){
            var nulPropsTarget = nulPropsGroup.property(n).property(1);
           if(nulPropsTarget.expressionEnabled == true){
            //alert(nulPropsTarget.name);
            nulPropsTarget.expressionEnabled = false;
            nulPropsTarget.expressionEnabled = true;
           }
        }
        
        
    }
    
}

function expressionsToText(){

    var scriptFolderPath = File($.fileName).path; // the URI of the folder that contains the script file    
    var TimerFolderPath = scriptFolderPath + encodeURI("/src"); // the URI of the folder for your script resources
    var JFile = new File(TimerFolderPath + encodeURI("/"+ fileNameEdit));
    //var content = "That is a text file";
    var content = expressionText(nullArray);

    //alert(content.join(""));

    if (!canWriteFiles()) return null;

    writeFile(JFile, content.join(""));

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

function expressionText(nul){
    var expressionArray = [];
    for(i = 0; i < nul.length; i++){
        var nulLayer = nul[i];
        
        var nulPropsGroup = nulLayer.property("ADBE Effect Parade");
        var nulPropsCount = nulPropsGroup.numProperties;
        
        for(n = 1; n <= nulPropsCount; n++){
            var nulPropsTarget = nulPropsGroup.property(n).property(1);
           if(nulPropsTarget.expressionEnabled == true){
                //var controlsString = JSON.stringify(nulPropsGroup.property(n).name);
                var controlsRenamed = nulPropsGroup.property(n).name.replace(/ /g, "");
                //alert(controlsRenamed);
                var expressionLineBreaks = nulPropsTarget.expression.replace(/\n/g, "\\" + "\n");
                alert(JSON.stringify(expressionLineBreaks));
            expressionArray.push("var " + controlsRenamed + " = \"" + expressionLineBreaks.replace(/\"/g, "\\" + "\"") + "\";"  + "\n\n\n");
           }
        }
        
        
    }
    
    return expressionArray;
}