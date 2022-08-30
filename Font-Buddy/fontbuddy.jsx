$.evalFile("src/expressions.jsx");
$.evalFile("src/imagebinaries.jsx");

//Get psuedo effect file
// first get the Folder Path
var scriptFolderPath = (File($.fileName)).parent.absoluteURI;
// create the preset File
var pseudoEffectFile = new File(scriptFolderPath+"/src/"+"fontbuddystylecontrols.ffx");
if(pseudoEffectFile.exists){
null;
}else{
    alert("can't find preset");
};


var alignButtonSize = [20,20];

//ICONS - Buttons Top Row
var newFontBuddyButton = {a:File("./img/newFontBuddy_default.png"), b:File("./img/newFontBuddy_hover.png"), c:File("./img/newFontBuddy_hover.png"), d:File("./img/newFontBuddy_hover.png")}
var scriptIconsNewFontBuddy = ScriptUI.newImage(newFontBuddyButton.a, newFontBuddyButton.b, newFontBuddyButton.c, newFontBuddyButton.d);
var refreshFontBuddyButton = {a:File("./img/refreshFontBuddy_default.png"), b:File("./img/refreshFontBuddy_hover.png"), c:File("./img/refreshFontBuddy_hover.png"), d:File("./img/refreshFontBuddy_hover.png")}
var scriptIconsRefreshFontBuddy = ScriptUI.newImage(refreshFontBuddyButton.a, refreshFontBuddyButton.b, refreshFontBuddyButton.c, refreshFontBuddyButton.d);
var newTextControlLayersButton = {a:File("./img/newTextControlLayers_default.png"), b:File("./img/newTextControlLayers_hover.png"), c:File("./img/newTextControlLayers_hover.png"), d:File("./img/newTextControlLayers_hover.png")}
var scriptIconsnewTextControlLayers = ScriptUI.newImage(newTextControlLayersButton.a, newTextControlLayersButton.b, newTextControlLayersButton.c, newTextControlLayersButton.d);
var newLinkToFontBuddyImg = {a:File("./img/newFontBuddyLink_default.png"), b:File("./img/newFontBuddyLink_hover.png"), c:File("./img/newFontBuddyLink_hover.png"), d:File("./img/newFontBuddyLink_hover.png")}
var newLinkToFontBuddyButtonArray = ScriptUI.newImage(newLinkToFontBuddyImg.a, newLinkToFontBuddyImg.b, newLinkToFontBuddyImg.c, newLinkToFontBuddyImg.d);

// ICONS - Align
var iconsLeftAlign = {a:File("./img/alignLeft_default.png"), b:File("./img/alignLeft_default.png"), c:File("./img/alignLeft_enable.png"), d:File("./img/alignLeft_enable.png")}
var scriptIconsLeftAlign = ScriptUI.newImage(iconsLeftAlign.a, iconsLeftAlign.b, iconsLeftAlign.c, iconsLeftAlign.d);
var iconsCenterAlign = {a:File("./img/alignCenter_default.png"), b:File("./img/alignCenter_default.png"), c:File("./img/alignCenter_enable.png"), d:File("./img/alignCenter_enable.png")}
var scriptIconsCenterAlign = ScriptUI.newImage(iconsCenterAlign.a, iconsCenterAlign.b, iconsCenterAlign.c, iconsCenterAlign.d);
var iconsRightAlign = {a:File("./img/alignRight_default.png"), b:File("./img/alignRight_default.png"), c:File("./img/alignRight_enable.png"), d:File("./img/alignRight_enable.png")}
var scriptIconsRightAlign = ScriptUI.newImage(iconsRightAlign.a, iconsRightAlign.b, iconsRightAlign.c, iconsRightAlign.d);


//Building the UI
var mainWindow = new Window("palette", "Font Buddy", undefined);
// mainWindow.orientation = "column";


var imageGroup = mainWindow.add("group", undefined, "imageGroup");
imageGroup.orientation = "row"
var listBox = imageGroup.add("listbox", undefined, []);
listBox.selection = 0;
listBox.size = [140, 120];
var newFontBuddy = imageGroup.add("iconbutton", undefined, scriptIconsNewFontBuddy,{style:"toolbutton"});
newFontBuddy.size = [20,20];
newFontBuddy.helpTip = "Create a new Font Buddy composition";
var refreshFontBuddy = imageGroup.add("iconbutton", undefined, scriptIconsRefreshFontBuddy,{style:"toolbutton"});
refreshFontBuddy.size = [20,20];
refreshFontBuddy.helpTip = "Refresh";
var newTextControlLayers = imageGroup.add("iconbutton", undefined, scriptIconsnewTextControlLayers,{style:"toolbutton"});
newTextControlLayers.size = [100,31];
var newLinkToFontBuddyButton = imageGroup.add("iconbutton", undefined, newLinkToFontBuddyButtonArray,{style:"toolbutton"});
newLinkToFontBuddyButton.size = [100,31];

var imageGroupTwo = mainWindow.add("group", undefined, "imageGroup");
imageGroupTwo.orientation = "row"
var addtext = imageGroupTwo.add("button", undefined, "Add Text");
addtext.size = [70,20];
var unlink = imageGroupTwo.add("button", undefined, "Bake Font");
unlink.size = [70,20];
var relink = imageGroupTwo.add("button", undefined, "Link");
relink.size = [70,20];
var fbcompbutton = imageGroupTwo.add("button", undefined, "InsertFBCOMP");
fbcompbutton.size = [70,20];
// fbcompbutton.value = 1;
fbcompbutton.helpTip = "Adds Font Buddy to Comp";
var updatedropdownsButton = imageGroupTwo.add("button", undefined, "Update");
updatedropdownsButton.size = [70,20];
// fbcompbutton.value = 1;
updatedropdownsButton.helpTip = "Updates Controllers if changes are made to Font Buddy comp";

var statictext = imageGroup.add("statictext", undefined, "");

var groupThree = mainWindow.add("group", undefined, groupThree);
groupThree.orientation = "row";
var iconLeftAlignButton = groupThree.add("iconbutton", undefined, scriptIconsLeftAlign,{style:"toolbutton", toggle:true});
iconLeftAlignButton.size = alignButtonSize;
iconLeftAlignButton.value = 1;
var iconCenterAlignButton = groupThree.add("iconbutton", undefined, scriptIconsCenterAlign,{style:"toolbutton", toggle:true});
iconCenterAlignButton.size = alignButtonSize;
iconCenterAlignButton.value = 0;
var iconRightAlignButton = groupThree.add("iconbutton", undefined, scriptIconsRightAlign,{style:"toolbutton", toggle:true});
iconRightAlignButton.size = alignButtonSize;
iconRightAlignButton.value = 0;

var closeButton = groupThree.add("button", undefined, "Close");

var groupFour = mainWindow.add("group", undefined, groupFour);
groupFour.orientation = "row";
var propsToPsuedoButton = groupFour.add("button", undefined, "Psuedo Props");
var renameTextControllersButton = groupFour.add("button", undefined, "Rename Controllers");
var connectTextToControlLayerButton = groupFour.add("button", undefined, "Connect Text To Controller");

mainWindow.center();
mainWindow.show();

//Button Functions
newFontBuddy.onClick = function(){
            
      var fontBuddyComp = checkFontBuddyComp();
      fontBuddyComp != undefined ? null() : addFontBuddyCompAndFolder();



}
refreshFontBuddy.onClick = function(){
    
    refreshListItemBoxContents();

}
listBox.onDoubleClick = function () {
    var fontbuddycomp = getFontBuddyComp();
    var textlayer = this.selection.text;
    var selLayers = [];
    fontbuddycomp.openInViewer();
    if(fontbuddycomp.layer(textlayer)!= undefined){
        for(var i = 0; i < fontbuddycomp.selectedLayers.length; i++){
            selLayers.push(fontbuddycomp.selectedLayers[i]);
        }
        for(var n = 0; n < selLayers.length; n++){
            selLayers[n].selected = false;
        }
        fontbuddycomp.layer(textlayer).selected = true;
    }
    
}
newTextControlLayers.onClick = function(){
    app.beginUndoGroup("Create Text Controllers");
    var curComp = proj.activeItem;
    if(curComp.name != fbCompName){
    var comp = getFontBuddyComp();
    createTextControllers(comp, curComp);
    app.endUndoGroup();
    }else{
        alert("Can't add control layers to Font Buddy Comp!");
    }

}
addtext.onClick = function(){
    var curComp = proj.activeItem;
    app.beginUndoGroup("");
    addTextLayersLinkedToControllers(curComp);
    app.endUndoGroup();
}
unlink.onClick = function(){
    //alert();
    var curComp = proj.activeItem;
    app.beginUndoGroup("");
    unlinkTextControllers(curComp);
    app.endUndoGroup();
}
relink.onClick = function(){
    //alert();
    var curComp = proj.activeItem;
    app.beginUndoGroup("relink");
    relinkTextControllers(curComp);
    app.endUndoGroup();
}
closeButton.onClick = function() {
    mainWindow.hide();
}
fbcompbutton.onClick = function(){
    
    addFontBuddyCompToComp(proj.activeItem, getFontBuddyComp());
    
}
updatedropdownsButton.onClick = function(){
    app.beginUndoGroup("update");
    updateDropDownsOnControllers(proj.activeItem, getFontBuddyComp());
    app.endUndoGroup();
}
propsToPsuedoButton.onClick = function(){
    // var comp = getFontBuddyComp();
    // var layers = getFontBuddyLayerNames(comp);
    convertTextPropsToPsuedoEffect(proj.activeItem);
    
    // addIndexSliderForFontBuddyComp(comp, layers);
}
renameTextControllersButton.onClick = function(){
    renameTextControllers(proj.activeItem);
}
connectTextToControlLayerButton.onClick = function(){
    app.beginUndoGroup("Connect Text To Control");
    connectTextToControlLayer(proj.activeItem);
    app.endUndoGroup();
}


//Globals
var proj = app.project;
var fbCompName = "_Font Buddy";
var fbFolderName = "_Font Buddy";
var numberOfTextLayers = 4;
var textNames = ["Title-Font 1", "Title-Font 2", "Body-Font 1", "Body-Font 2"];
var commentName = "Font Buddy Control Layer";

//var numberOfTextLayers = editNames.text.split(",").length;



try{
    var compProps = [fbCompName,curComp.width, curComp.height,1, curComp.duration, curComp.frameRate];
    }catch(err){
    var compProps = [fbCompName, 1920, 1080, 1, 10, 30];
    }

//Functions
function copy(){
    //app.beginUndoGroup("Refresh");

    var a = curComp.selectedLayers[0].name;
    statictext.text = a;

    //app.endUndoGroup();
}

function paste(){
    var copiedLayer = curComp.layer(statictext.text);
    var copiedLayerProps = copiedLayer.property("Source Text").value;
    for(var i = 0; i < curComp.selectedLayers.length; i++){
        var pasteLayer = curComp.selectedLayers[i];
        var pasteLayername = pasteLayer.name;
   
        var pasteLayerProps = pasteLayer.property("Source Text");
        var pasteLayerString = pasteLayerProps.value.text;
        pasteLayerProps.setValue(copiedLayerProps);
        pasteLayerProps.setValue(pasteLayerString);
        pasteLayer.name = pasteLayername;


    }
    //alert(statictext.text);
}

function createTextControllers(comp, curComp){
    
    //checks for list items. if none, will refresh first
    if(listBox.items.length == 0){
        refreshListItemBoxContents();
    }
    //converts listitems into string array
    var textNames = listBoxItemString();

    //Gets selection from drown down. If none, forces the first one
    if(listBox.selection != null){
    
        var listSelection = listBox.selection.index;
        // alert(textNames[listSelection]);
    }else{
        
        var listSelection = listBox.selection = [0];
        // alert(textNames[listSelection]);
    }
    //Adds and formats ONE text controller
    

        var text = curComp.layers.addText(textNames[listSelection] + " Controller");
        text.guideLayer = true;
        text.label = 2;
        //Markers
        var addMarker = new MarkerValue(commentName);
        text.marker.setValueAtTime(0, addMarker);
        var textProp = text.property("Source Text");
        var textDocument = textProp.value;
        //Gets Font Buddy corresponding layer and font information
        var fontbuddylayers = getFontBuddyLayers(getFontBuddyComp());
        var selectedfontbuddylayer = fontbuddylayers[listSelection];  
        //  alert(selectedfontbuddylayer.name);  
        textDocument.font = getFonts(selectedfontbuddylayer.name, comp);
        textProp.setValue(textDocument);

        linkToFontBuddyDropDown(listSelection, text);
        text.moveToBeginning();
        
        var sourceText = text.property("ADBE Text Properties").property("ADBE Text Document");

        sourceText.expression = linkControllersToDropDown;
        

}

function addFontBuddyCompAndFolder(){
//checks for active comp and adds one if not active

//checks for folder
var folderExists = false;
for(var n = 1; n <= proj.numItems; n++){
    
    if((proj.item(n).name == fbFolderName) && (proj.item(n) instanceof FolderItem)){
        var folderExists = true;
        var folder = proj.item(n);
        break        
    }
}
//adds folder
if(folderExists != true){
var folder = proj.items.addFolder(fbFolderName);
}

//adds composition
var comp = proj.items.addComp(compProps[0], compProps[1], compProps[2], compProps[3], compProps[4], compProps[5]);
comp.parentFolder = folder;

//creates text layers
for(var i = 1; i<=numberOfTextLayers; i++){
    var positionOffset = [compProps[1]/2, compProps[2]/2 - 300];
    var textLayer = comp.layers.addText(textNames[i-1]);
    textLayer.property("Source Text").expression = fontBuddyTextLayerExpression;
    textLayer.moveToEnd();
    textLayer.property("ADBE Transform Group").property("ADBE Position").setValue([-300, i * 100] + positionOffset);
}

//adds fontbuddy comp to current composition
addFontBuddyCompToComp();
refreshListItemBoxContents();


return comp;

}

function checkFontBuddyComp(){
    var comp = false;
    for(var i = 1; i<= proj.numItems; i++){
        if(proj.item(i).name == fbCompName && proj.item(i) instanceof CompItem){
            var comp = proj.item(i);
            break
        }
    }

    
    if(comp == false){
        var comp = addFontBuddyCompAndFolder();
    }else{
        var p = confirm("Font Buddy is already in your project \n Would you like to delete it and create a new one?");
        if(p == true){
            comp.remove();
            addFontBuddyCompAndFolder();
        }
    }
    return comp;
}

function getFonts(layer, fbcomp){
    var textProp = fbcomp.layer(layer).property("Source Text");
    var textDocument = textProp.value;
    var font = textDocument.font;
    return font
}

function getStyle(layer, fbcomp){
    var textProp = fbcomp.layer(layer).property("Source Text");
    var textDocument = textProp.value;
    return textDocument
}

function refreshSelectedTextLayerFonts(fbcomp){
    if(comp.selectedLayers.length == 0){
        alert("Please select a text layer controller");
    }else{
        for(var i = 0; i < comp.selectedLayers.length; i++){
            layer = comp.selectedLayers[i];
            var layername = layer.name;
            matchname = layer.name.split(" ")[0];
            var font = getFonts(matchname, fbcomp);
            var allStyle = getStyle(matchname, fbcomp);
            var textProp = layer.property("Source Text");
            var textDocument = textProp.value;
            // textDocument.font = font;
            textDocument.value = font;
            textProp.setValue(allStyle);
            layer.name = layername;

        }

    }
}

function getFontBuddyComp(){
    var comp = false;
    for(var i = 1; i<= proj.numItems; i++){
        if(proj.item(i).name == fbCompName && proj.item(i) instanceof CompItem){
            var comp = proj.item(i);
            break
        }
    }
   
    // comp == false ? alert("No font buddy comp found") : null;
    return comp
}

function linkToFontBuddyDropDown(select, activeLayer){
    
    //converts listitems into string array for drop down menu
    var layerArray = [];
    for(var i = 0; i < listBox.items.length; i++){
        layerArray.push(listBox.items[i].text.toString());
    }
    //Adds drop down effect
        var boxLayerDropdown = activeLayer.Effects.addProperty("ADBE Dropdown Control");
        var temp = boxLayerDropdown.property(1).setPropertyParameters(layerArray);
        temp.propertyGroup(1).name = "Link-To-Font-Buddy";
        temp.setValue(select + 1);
}

function addTextLayersLinkedToControllers(curComp){
    
    var leftAlignSelect = iconLeftAlignButton.value;
    var centerAlignSelect = iconCenterAlignButton.value;
    var rightAlignSelect = iconRightAlignButton.value;
    if(curComp.selectedLayers.length == 0){
        alert("Please select a text layer controller");
    }else{
        var leftTextArray = [];
        var centerTextArray = [];
        var rightTextArray = [];
        for(var i = 0; i < curComp.selectedLayers.length; i++){
            var controlLayer = curComp.selectedLayers[i];
            

            
            if(leftAlignSelect == 1){
                
                leftTextArray.push(controlLayer.name);    
                             
            }
            
            if(centerAlignSelect == 1){
                centerTextArray.push(controlLayer.name);
        
            }
            if(rightAlignSelect == 1){
                rightTextArray.push(controlLayer.name);
   
            }

        }
        var maxArrayLength = Math.max(Math.max(leftTextArray.length, centerTextArray.length), rightTextArray.length);
        if(maxArrayLength <= 0){
            alert("Please select a controller layer");
        }else{
            for(var m = 0; m < maxArrayLength; m++){
                addLeftAlignText(leftTextArray[m], curComp);
                addCenterAlignText(centerTextArray[m], curComp);
                addRightAlignText(rightTextArray[m], curComp);                
            }
        }
        // addLeftAlignText(leftTextArray);
        // addCenterAlignText(centerTextArray);
        // addRightAlignText(rightTextArray);

    }
}
function addLeftAlignText(array, curComp){
        if(array != undefined){
        var layername = array;
        leftTextLayer = curComp.layers.addText(layername + " Left");
        leftTextProps = leftTextLayer.property("Source Text");
        lefttextDocument = leftTextProps.value;
        lefttextDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
        leftTextProps.setValue(lefttextDocument);
        leftTextProps.expression = "var parentLayer = thisComp.layer(\"" + layername + "\").text.sourceText;parentLayer.style.setText(parentLayer)";
        }
    }
function addCenterAlignText(array, curComp){
        if(array != undefined){
        var layername = array;
        var centerTextLayer = curComp.layers.addText(layername + " Center");
        centerTextProps = centerTextLayer.property("Source Text");
        centertextDocument = centerTextProps.value;
        centertextDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
        centerTextProps.setValue(centertextDocument);
        centerTextProps.expression = "var parentLayer = thisComp.layer(\"" + layername + "\").text.sourceText;parentLayer.style.setText(parentLayer)";
    }
}
function addRightAlignText(array, curComp){
        if(array != undefined){
        var layername = array;
        var rightTextLayer = curComp.layers.addText(layername + " Right");
        rightTextProps = rightTextLayer.property("Source Text");
        righttextDocument = rightTextProps.value;
        righttextDocument.justification = ParagraphJustification.RIGHT_JUSTIFY;
        rightTextProps.setValue(righttextDocument);
        rightTextProps.expression = "var parentLayer = thisComp.layer(\"" + layername + "\").text.sourceText;parentLayer.style.setText(parentLayer)";
    }
}

//unlinks a text controller from FontBuddy Comp and removes dropdown effect and expression
function unlinkTextControllers(curComp){
    refreshListItemBoxContents();
    var dropdownstring = listBoxItemString();

    for(var i = 0; i < curComp.selectedLayers.length; i ++){
        var activelayer = curComp.selectedLayers[i];
        var name = activelayer.name;
        var textProp = activelayer.property("Source Text");
        var textDocument = textProp.value;

        //Checks for Essential-Graphics-Controls. If it exists, leaves expression. If it doesn't, deletes expression
        var check = checkForEssentialGraphicsController(activelayer);
        if(check == false){
            textProp.expression = "";
        }
        
        textProp.setValue(textDocument);
        if(activelayer.property("Effects").property("Link-To-Font-Buddy") != undefined){
            var dropdownvalue = activelayer.property("Effects").property("Link-To-Font-Buddy").property("Menu").value - 1;
            var newname = dropdownstring[dropdownvalue] + " Controller";
            activelayer.property("Effects").property("Link-To-Font-Buddy").remove();
            activelayer.name = newname;
            proj.autoFixExpressions(name, newname);
        }
        
    }

       
}

//relinks a text controller to a different listbox item
function relinkTextControllers(curComp){
    //Relinks selected controller layer to selected listbox item selection

    //Checks for existing drop down controller. If found, will update it.

    //Gets selection from drown down. If none, forces the first one
    if(listBox.selection != null){

        var listSelection = listBox.selection.index;
        // alert(textNames[listSelection]);
    }else{
        
        var listSelection = listBox.selection = [0];
        // alert(textNames[listSelection]);
    }

        //converts listitems into string array for drop down menu
        refreshListItemBoxContents();
        var styles = listBoxItemString();

        for(var a = 0; a < curComp.selectedLayers.length; a ++){
            //Builds array of all selected Layers
            if((curComp.selectedLayers[a] instanceof TextLayer) && (curComp.selectedLayers[a].marker.numKeys > 0)){
                if(curComp.selectedLayers[a].property('Marker').keyValue(1).comment == commentName){
                relinkSelectedTextControlleLayers(curComp.selectedLayers[a]);
                }else{
                    relinkSelectedTextLayers(curComp.selectedLayers[a]);
                }
            }else{
                relinkSelectedTextLayers(curComp.selectedLayers[a]);
            }
                
            }


            
            function relinkSelectedTextControlleLayers(layer){
                var oldLayerName = layer.name;
                if(layer.Effects.property("Link-To-Font-Buddy") == undefined){
               
                    var boxLayerDropdown = layer.Effects.addProperty("ADBE Dropdown Control");
        
                    }else{
                        layer.property("Effects").property("Link-To-Font-Buddy").remove();
                        var boxLayerDropdown = layer.Effects.addProperty("ADBE Dropdown Control");
                    }
        
                    var temp = boxLayerDropdown.property(1).setPropertyParameters(styles);
                    temp.propertyGroup(1).name = "Link-To-Font-Buddy";
                    temp.setValue(listSelection + 1);
                    var sourceText = layer.property("ADBE Text Properties").property("ADBE Text Document");
                    var check = checkForEssentialGraphicsController(layer);
                    if(check == false){
                        sourceText.expression = linkControllersToDropDown;
                    }

                    var newLayerName = styles[listSelection] + " Controller";
                    layer.name = newLayerName;
        
                    fixExpressions(oldLayerName, newLayerName);
            }
            function relinkSelectedTextLayers(layer){
                if(layer.Effects.property("Link-To-Font-Buddy") == undefined){
               
                    var boxLayerDropdown = layer.Effects.addProperty("ADBE Dropdown Control");
        
                    }else{
        
                        layer.property("Effects").property("Link-To-Font-Buddy").remove();
                    var boxLayerDropdown = layer.Effects.addProperty("ADBE Dropdown Control");
        
                    }
                    var temp = boxLayerDropdown.property(1).setPropertyParameters(styles);
                    temp.propertyGroup(1).name = "Link-To-Font-Buddy";
                    temp.setValue(listSelection + 1);
                    var sourceText = layer.property("ADBE Text Properties").property("ADBE Text Document");

                    var check = checkForEssentialGraphicsController(layer);
                    if(check == false){
                        sourceText.expression = linkControllersToDropDown;
                    }

            }

       
}
function addFontBuddyCompToComp(){
    app.beginUndoGroup("addfbcomptocomp");
    var comp = getFontBuddyComp();
    var curComp = proj.activeItem;
    var checkComp = false;
    for(var i = 1; i <= curComp.numLayers; i++){
        
        if((curComp.layer(i).name == fbCompName) && !(curComp.layer(i) instanceof TextLayer)  && !(curComp.layer(i) instanceof ShapeLayer) && !(curComp.layer(i) instanceof SolidSource)){
            alert("Font Buddy is already in your composition");
            var checkComp = true;
            break
        }
    }
    if(checkComp == false){
        // alert("false");
        var compprops = curComp.layers.add(comp);     
        compprops.enabled = false;
        compprops.shy = true;
        compprops.moveToEnd();
        
        compprops.label = 11; 
        compprops.locked = true; 
        
    }
    app.endUndoGroup();
}
function updateDropDownsOnControllers(curComp){
    //refreshes list items
    refreshListItemBoxContents();

    //converts listitems into string array for drop down menu
    var styles = [];

        for(var i = 0; i < listBox.items.length; i++){
        styles.push(listBox.items[i].text.toString());
    }
    
    //Find all text layers with drop down effect and refreshes effect

    for(var n = 1; n <= curComp.numLayers; n++){
        if((curComp.layer(n) instanceof TextLayer) && curComp.layer(n).property("Effects").property("Link-To-Font-Buddy") != undefined){
           var l = curComp.layer(n);
           var oldValue = l.property("Effects").property("Link-To-Font-Buddy").property("Menu").value;
           if(listBox.items[oldValue - 1] != undefined){
                var oldListBoxItemName = listBox.items[oldValue - 1];
           }else{
                var oldListBoxItemName = "null";
           }
           
           for(var a = 0; a < styles.length; a++){
            if(styles[a] == oldListBoxItemName.toString()){

                var newValue = listBox.items[a].index + 1;
                break;
                
            }else{

                var newValue = 1;
            }
           }
           l.property("Effects").property("Link-To-Font-Buddy").remove();
            var boxLayerDropdown = l.Effects.addProperty("ADBE Dropdown Control");
            var temp = boxLayerDropdown.property(1).setPropertyParameters(styles);
            temp.propertyGroup(1).name = "Link-To-Font-Buddy";
            temp.setValue(newValue);

        }else{
            continue
        }
    }


    // //If there are layers added to font buddy or the same amount
    // if(listBox.items.length >= controllers.length){
    //     for(var m = 0; m < listBox.items.length; m++){
            
    //         var currentController = curComp.layer(controllers[m]);
             
    //         if(currentController != undefined){
                
    //             var name = currentController.name;
    //             var textProp = currentController.property("Source Text");
    //             var textDocument = textProp.value;
    //             textProp.expression = "";
    //             textProp.setValue(textDocument);
    //             //Checks for drop down and adds if missing
    //             if(currentController.property("Effects").property("Link-To-Font-Buddy") != undefined){
    //                 currentController.property("Effects").property("Link-To-Font-Buddy").remove();  
    //             }

    //             currentController.name = name;
    //             var boxLayerDropdown = currentController.Effects.addProperty("ADBE Dropdown Control");
    //             var temp = boxLayerDropdown.property(1).setPropertyParameters(styles);
    //             temp.propertyGroup(1).name = "Link-To-Font-Buddy";
    //             temp.setValue(m+1);
    //             var sourceText = currentController.property("ADBE Text Properties").property("ADBE Text Document");
    //             sourceText.expression = linkControllersToDropDown
                
    //         }else{
                
    //             var text = curComp.layers.addText(styles[m] + " Controller");
    //             var boxLayerDropdown = text.Effects.addProperty("ADBE Dropdown Control");
    //             var temp = boxLayerDropdown.property(1).setPropertyParameters(styles);
    //             temp.propertyGroup(1).name = "Link-To-Font-Buddy";
    //             temp.setValue(m+1);
    //             text.guideLayer = true;
    //             text.label = 2;
    //             //Markers
    //             var addMarker = new MarkerValue(commentName);
    //             text.marker.setValueAtTime(0, addMarker);
    //             text.moveAfter(curComp.layer(m+1));
    //             var sourceText = text.property("ADBE Text Properties").property("ADBE Text Document");
    //             sourceText.expression = linkControllersToDropDown;
    //         }
    //     }
    // }

    // if(listBox.items.length < controllers.length){
    //     var recommendedSelections = listBox.items.length;
    //     if(curComp.selectedLayers.length == recommendedSelections){

    //         selArray = [];

    //         for(var b = 0; b < curComp.selectedLayers.length; b++){
    //             selArray.push(curComp.selectedLayers[b].name);
    //         }

    //          deleteArray = [];

    //             for(d = 0; d < controllers.length; d++){
    //                 if(curComp.layer(controllers[d]).selected == false){
    //                     deleteArray.push(controllers[d]);
    //                 }
    //             }
    //             for(c = 0; c < deleteArray.length; c++){
    //                 curComp.layer(deleteArray[c]).remove();
    //             }


    //     }else{
            
    //         alert("Found more Text Control Layers than Font Buddy Layers.\n\nSelect " + recommendedSelections + " Text Control Layers to keep.\n\nThe rest will be deleted.");

    //     }
    // }
}

function getFontBuddyLayerNames(comp){
    var layers = [];
    for(var i = 1; i <= comp.numLayers; i++){
        layers.push(comp.layer(i).name);
    }
    return layers;
}
function getFontBuddyLayers(comp){
    var layers = [];
    for(var i = 1; i <= comp.numLayers; i++){
        layers.push(comp.layer(i));
    }
    return layers;
}
function refreshListItemBoxContents(){
    var fontbuddycomp = getFontBuddyComp();
    //removes all items first
    
    // alert(listboxitems[1]);
    if(listBox.items.length != 0){
        // var listboxitems = listBox.items;
        for(n = listBox.items.length - 1; n >= 0; n--){
            // alert(listBox.items[n]);
            listBox.remove(listBox.items[n]);
        }
    }
       
    
    for(var i = 1; i <= fontbuddycomp.numLayers; i++){
        var t = fontbuddycomp.layer(i).name;
        
        listBox.add("item", t);
    }
        
    


}

//converts listitems into string array for drop down menu
function listBoxItemString(){
        var styles = [];

        for(var i = 0; i < listBox.items.length; i++){
        styles.push(listBox.items[i].text.toString());
    }
    return styles
}

//fixes expressions when layer names change
function fixExpressions(oldText, newText){
    app.project.autoFixExpressions(oldText,newText);
}

//converts text properties on text controller layers to an effect for mogrt building
function convertTextPropsToPsuedoEffect(curComp){
    app.beginUndoGroup("convertextprops")
    var selLayers = [];
    var selTextControllers = [];
    var selNonControllers = [];

    if(curComp.selectedLayers.length == 0){
        alert("Please select a Text Controller Layer");
    }else{
        for(var i = 0; i < curComp.selectedLayers.length; i ++){
        //Checks for active psuedo effect. If found, will not add to array
            if(checkForEssentialGraphicsController(curComp.selectedLayers[i]) == false){
                //Builds array of all selected Layers
                selLayers.push(curComp.selectedLayers[i].name);
            }else{
                continue
            }
            
                
        }
        //Builds array of all Text Control selected layers
        for(var n = 0; n < selLayers.length; n++){
            if((curComp.layer(selLayers[n]) instanceof TextLayer) && (curComp.layer(selLayers[n]).marker.numKeys > 0)){
                if(curComp.layer(selLayers[n]).property('Marker').keyValue(1).comment == commentName){
                    selTextControllers.push(curComp.layer(selLayers[n]).name);
                }else{
                    selNonControllers.push(curComp.layer(selLayers[n]).name);
                }
            }else{
                selNonControllers.push(curComp.layer(selLayers[n]).name);
            }
        }
        //Deselects all layers before adding the psuedo effect
        for(var b = 1; b <= curComp.numLayers; b++){
            curComp.layer(b).selected = false;
        }
        
        //Applies psuedo effect to selected Text Control layers

        for(var a = 0; a < selTextControllers.length; a++){
            curComp.layer(selTextControllers[a]).selected = true;
            curComp.selectedLayers[0].applyPreset(pseudoEffectFile);
            copyAndPasteTextProps(selTextControllers[a], curComp);
            curComp.layer(selTextControllers[a]).selected = false;
            
        }
        //Applies Expression to selected Text Control Layers
        for(var c = 0; c < selTextControllers.length; c++){
            curComp.layer(selTextControllers[c]).property("Source Text").expression = textControllersSourceTextExpression;
        }
    }

    if(selNonControllers.length > 0){
        for(var e = 0; e < selNonControllers.length; e++){
            psuedoEffectsOnNonControllerTextLayers(curComp.layer(selNonControllers[e]));
        }
    }

    function psuedoEffectsOnNonControllerTextLayers(layer){
        var l = layer;
                //Deselects all layers before adding the psuedo effect
                for(var b = 1; b <= curComp.numLayers; b++){
                    curComp.layer(b).selected = false;
                }
                
                //Applies psuedo effect to selected Text Control layers
                    layer.selected = true;
                    layer.applyPreset(pseudoEffectFile);
                    copyAndPasteTextProps(l.name, app.project.activeItem);
                    layer.selected = false;
                    
                
                //Applies Expression to selected Text Control Layers
                for(var c = 0; c < selTextControllers.length; c++){
                    layer.property("Source Text").expression = textControllersSourceTextExpression;
                }

    }
    app.endUndoGroup();
}

//copy and pastes current text controller properties to the new psuedo effect
function copyAndPasteTextProps(layer, comp){

    var pseudoEffect = comp.layer(layer).property("ADBE Effect Parade").property("Pseudo/886802");

    var textProp = comp.layer(layer).property("Source Text");
    var textDocument = textProp.value;
    //Font Size
    pseudoEffect.property("Pseudo/886802-0002").setValue(textDocument.fontSize);
    //Auto Leading
    pseudoEffect.property("Pseudo/886802-0003").setValue(textDocument.autoLeading);
    //Leading
    pseudoEffect.property("Pseudo/886802-0004").setValue(textDocument.leading);
    //Tracking
    pseudoEffect.property("Pseudo/886802-0005").setValue(textDocument.tracking);
    //Fill Color
    pseudoEffect.property("Pseudo/886802-0006").setValue(textDocument.fillColor);
}

//renames text control layers to match their drop down effect name
function renameTextControllers(curComp){
    //converts listitems into string array for drop down menu
    refreshListItemBoxContents();
    var dropdownstring = listBoxItemString();
    app.beginUndoGroup("rename text controllers");
    for(var i = 0; i < curComp.selectedLayers.length; i ++){
        var activelayer = curComp.selectedLayers[i];
        var oldname = activelayer.name;
        if(activelayer.property("Effects").property("Link-To-Font-Buddy") != undefined){
            var dropdownvalue = activelayer.property("Effects").property("Link-To-Font-Buddy").property("Menu").value - 1;
            var newname = dropdownstring[dropdownvalue] + " Controller";
            activelayer.name = newname;
            proj.autoFixExpressions(oldname, newname);
        }
    }
    app.endUndoGroup();
}

//connects text to control layer
function connectTextToControlLayer(curComp){
    var textLayers = [];
    var textController;
    if(curComp.selectedLayers.length > 0){
            for(var a = 0; a < curComp.selectedLayers.length; a ++){
            //Builds array of all selected Layers
            if((curComp.selectedLayers[a] instanceof TextLayer) && (curComp.selectedLayers[a].marker.numKeys > 0)){
                if(curComp.selectedLayers[a].property('Marker').keyValue(1).comment == commentName){
                var textController = curComp.selectedLayers[a];
                }else{
                    textLayers.push(curComp.selectedLayers[a].index);
                }
            }else{
               textLayers.push(curComp.selectedLayers[a].index);
            }
                
            }

    }
    if(textController != null){
        for(var i = 0; i < textLayers.length; i++){
            //  alert(textController.name);
            curComp.layer(textLayers[i]).property("Source Text").expression = "var parentLayer = thisComp.layer(\"" + textController.name + "\").text.sourceText;parentLayer.style.setText(parentLayer)";
        }
    }
    

}

//checks layer for essential-graphics-control effect layer
function checkForEssentialGraphicsController(layer){
    if(layer.property("ADBE Effect Parade").property("Pseudo/886802") == undefined){
        var check = false;
    }else{
        var check = true;
    }
    return check
}