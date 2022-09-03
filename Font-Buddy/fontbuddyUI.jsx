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

// ICONS - Align
var iconsLeftAlign = {a:File("./img/alignLeft_d.png"), b:File("./img/alignLeft_d.png"), c:File("./img/alignLeft_d.png"), d:File("./img/alignLeft_d.png")}
var scriptIconsLeftAlign = ScriptUI.newImage(iconsLeftAlign.a, iconsLeftAlign.b, iconsLeftAlign.c, iconsLeftAlign.d);
var iconsCenterAlign = {a:File("./img/alignCenter_d.png"), b:File("./img/alignCenter_d.png"), c:File("./img/alignCenter_d.png"), d:File("./img/alignCenter_d.png")}
var scriptIconsCenterAlign = ScriptUI.newImage(iconsCenterAlign.a, iconsCenterAlign.b, iconsCenterAlign.c, iconsCenterAlign.d);
var iconsRightAlign = {a:File("./img/alignRight_d.png"), b:File("./img/alignRight_d.png"), c:File("./img/alignRight_d.png"), d:File("./img/alignRight_d.png")}
var scriptIconsRightAlign = ScriptUI.newImage(iconsRightAlign.a, iconsRightAlign.b, iconsRightAlign.c, iconsRightAlign.d);

var panelGlobal = this;
// var FontBuddy = (function () {
// FONTBUDDY
// =========
var FontBuddy = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette"); 
  if ( !(panelGlobal instanceof Panel) ) FontBuddy.text = "Font Buddy"; 
  FontBuddy.orientation = "column"; 
  FontBuddy.alignChildren = ["center","top"]; 
  FontBuddy.spacing = 0; 
  FontBuddy.margins = 0; 

//  var FontBuddy = new Window("palette", "Font Buddy", undefined);
// // mainWindow.orientation = "column";

// TPANEL1
// =======
var tpanel1 = FontBuddy.add("tabbedpanel", undefined, undefined, {name: "tpanel1"}); 
  tpanel1.alignChildren = "fill"; 
  tpanel1.preferredSize.width = 339; 
  tpanel1.margins = 0; 

// TAB1
// ====
var tab1 = tpanel1.add("tab", undefined, undefined, {name: "tab1"}); 
  tab1.text = "Setup"; 
  tab1.orientation = "row"; 
  tab1.alignChildren = ["left","top"]; 
  tab1.spacing = 10; 
  tab1.margins = 10; 

// MAINGROUP1
// ==========
var mainGroup1 = tab1.add("group", undefined, {name: "mainGroup1"}); 
//   mainGroup1.preferredSize.width = 300; 
//   mainGroup1.preferredSize.height = 147; 
  mainGroup1.orientation = "column"; 
  mainGroup1.alignChildren = ["left","top"]; 
  mainGroup1.spacing = 0; 
  mainGroup1.margins = 0; 

// SUBGROUP1
// =========
var subGroup1 = mainGroup1.add("group", undefined, {name: "subGroup1"}); 
  subGroup1.orientation = "row"; 
  subGroup1.alignChildren = ["left","top"]; 
  subGroup1.spacing = 1; 
  subGroup1.margins = 1;

// GROUP1BUTTONS
// =============
var group1Buttons = subGroup1.add("group", undefined, {name: "group1Buttons"}); 
//   group1Buttons.preferredSize.height = 150; 
  group1Buttons.orientation = "column"; 
  group1Buttons.alignChildren = ["left","top"]; 
  group1Buttons.spacing = 1; 
  group1Buttons.margins = 1; 

// GROUP1ROW1
// ==========
var group1row1buttonsize = [28,25];
var group1row1 = group1Buttons.add("group", undefined, {name: "group1row1"}); 
  group1row1.orientation = "row"; 
  group1row1.alignChildren = ["left","center"]; 
  group1row1.spacing = 1; 
  group1row1.margins = 1; 

var newFontBuddyButton = group1row1.add("iconbutton", undefined, File.decode(newFontBuddy_d), {name: "iconbutton1", style: "toolbutton"}); 
newFontBuddyButton.size = group1row1buttonsize;
var insertFontBuddyButton = group1row1.add("iconbutton", undefined, File.decode(insertFontBuddy_d), {name: "insertFontBuddyButton", style: "toolbutton"}); 
insertFontBuddyButton.size = group1row1buttonsize;
var refreshListButton = group1row1.add("iconbutton", undefined, File.decode(refreshListItems_d), {name: "refreshListButton", style: "toolbutton"}); 
refreshListButton.size = group1row1buttonsize;


// GROUP1ROW2
// ==========
var group1row2buttonsize = [28,25];
var group1row2 = group1Buttons.add("group", undefined, {name: "group1row2"}); 
  group1row2.orientation = "row"; 
  group1row2.alignChildren = ["left","center"]; 
  group1row2.spacing = 1; 
  group1row2.margins = 1; 

var linkButton = group1row2.add("iconbutton", undefined, File.decode(link_d), {name: "linkbutton", style: "toolbutton"}); 
  linkButton.size = group1row2buttonsize;
var addTextControlButton = group1row2.add("iconbutton", undefined, File.decode(newTextController_d), {name: "addTextControlButton", style: "toolbutton"}); 
  addTextControlButton.size = group1row2buttonsize;
  var unlinkButton = group1row2.add("iconbutton", undefined, File.decode(unlink_d), {name: "unlinkbutton", style: "toolbutton"}); 
  unlinkButton.size = group1row2buttonsize;

// var ListBox_array = ["Item"]; 
// var listBox = subGroup1.add("listbox", undefined, []);  

var listBox = subGroup1.add("listbox", [0,0,120,80], [], {multiselect: false});  

var group2Buttons = mainGroup1.add("group", undefined, {name: "group2Buttons"}); 

  group2Buttons.orientation = "row"; 
  group2Buttons.alignChildren = ["left","center"]; 
  group2Buttons.spacing = 1; 
  group2Buttons.margins = 1; 

var updateRenameButton = group2Buttons.add("iconbutton", undefined, File.decode(updateDropDown_d), {name: "update", style: "toolbutton"}); 
  updateRenameButton.size = [59,25];
var addStyleControlsButton = group2Buttons.add("iconbutton", undefined, File.decode(addStyleControls_d), {name: "addstylecontrols", style: "toolbutton"}); 
  addStyleControlsButton.size = [59,25];

// SUBGROUP2
// =========
var subGroup2 = mainGroup1.add("group", undefined, {name: "subGroup2"}); 
  subGroup2.orientation = "row"; 
  subGroup2.alignChildren = ["left","top"]; 
  subGroup2.spacing = 10; 
  subGroup2.margins = 10; 

// GROUP1
// ======
var group1 = subGroup2.add("group", undefined, {name: "group1"}); 
  group1.orientation = "column"; 
  group1.alignChildren = ["center","top"]; 
  group1.spacing = 10; 
  group1.margins = 0; 

var addTextLayersButton = group1.add("iconbutton", undefined, File.decode(addTextLayers_d), {name: "addtext", style: "toolbutton"});
  addTextLayersButton.size = [85,22]; 

// TEXTPARAGRAPH
// =============
var textParagraphSize = [18,18];
var textParagraph = group1.add("group", undefined, {name: "textParagraph"}); 
  textParagraph.orientation = "row"; 
  textParagraph.alignChildren = ["center","top"]; 
  textParagraph.spacing = 10; 
  textParagraph.margins = 0; 

var paragraphLeft = textParagraph.add("iconbutton", undefined, scriptIconsLeftAlign, {name: "paragraphLeft", style: "toolbutton", toggle:true}); 
paragraphLeft.size = textParagraphSize;
var paragraphCenter = textParagraph.add("iconbutton", undefined, scriptIconsCenterAlign, {name: "paragraphCenter", style: "toolbutton", toggle:true}); 
  paragraphCenter.size = textParagraphSize; 

var paragraphRight = textParagraph.add("iconbutton", undefined,scriptIconsRightAlign, {name: "paragraphRight", style: "toolbutton", toggle:true}); 
  paragraphRight.size = textParagraphSize; 

// GROUP2
// ======
var group2 = subGroup2.add("group", undefined, {name: "group2"}); 
  group2.orientation = "row"; 
  group2.alignChildren = ["left","center"]; 
  group2.spacing = 10; 
  group2.margins = 0; 

// GROUP3
// ======
var group3 = group2.add("group", undefined, {name: "group3"}); 
  group3.orientation = "column"; 
  group3.alignChildren = ["left","top"]; 
  group3.spacing = 8; 
  group3.margins = 0; 

var copyButton = group3.add("iconbutton", undefined, File.decode(copy_d), {name: "copy", style: "toolbutton"});
  copyButton.size = [45,18];

var pasteButton = group3.add("iconbutton", undefined, File.decode(paste_d), {name: "paste", style: "toolbutton"});
  pasteButton.size = [45,18];

// GROUP4
// ======
var group4 = group2.add("group", undefined, {name: "group4"}); 
  group4.orientation = "column"; 
  group4.alignChildren = ["left","top"]; 
  group4.spacing = 3; 
  group4.margins = 0; 

var styleRadioButton = group4.add("radiobutton", undefined, undefined, {name: "styleRadioButton"}); 
  styleRadioButton.text = "Style"; 
  styleRadioButton.value = true; 

var fontRadioButton = group4.add("radiobutton", undefined, undefined, {name: "fontRadioButton"}); 
  fontRadioButton.text = "Font"; 
var statictext = group4.add("statictext", undefined, "");
// GROUP5
// ======
var group5 = mainGroup1.add("group", undefined, {name: "group5"}); 
  group5.orientation = "row"; 
  group5.alignChildren = ["left","center"]; 
  group5.spacing = 10; 
  group5.margins = 0; 

var connectButton = group5.add("iconbutton", undefined, File.decode(connectToController_d), {name: "connect", style: "toolbutton"});
  connectButton.size = [85,27];

var convertButton = group5.add("iconbutton", undefined, File.decode(convertToController_d), {name: "convert", style: "toolbutton"});
  convertButton.size = [85,27];

// TAB2
// ====
var tab2 = tpanel1.add("tab", undefined, undefined, {name: "tab2"}); 
  tab2.text = "Animators"; 
  tab2.orientation = "column"; 
  tab2.alignChildren = ["left","top"]; 
  tab2.spacing = 10; 
  tab2.margins = 10; 

// TPANEL1
// =======
tpanel1.selection = tab1; 

// GROUP6
// ======
var group6 = tab2.add("group", undefined, {name: "group6"}); 
  group6.orientation = "row"; 
  group6.alignChildren = ["left","center"]; 
  group6.spacing = 10; 
  group6.margins = 0; 

var copypasteanimatorButton = group6.add("button", undefined, undefined, {name: "copypasteanimator"}); 
  copypasteanimatorButton.text = "CopyPaste"; 

var keyframeOffsetButton = group6.add("button", undefined, undefined, {name: "keyframeOffsetButton"}); 
  keyframeOffsetButton.text = "Offset"; 

// GROUP7
// ======
var group7 = tab2.add("group", undefined, {name: "group7"}); 
  group7.orientation = "column"; 
  group7.alignChildren = ["left","center"]; 
  group7.spacing = 10; 
  group7.margins = 0; 

// UNITS
// =====
var Units = group7.add("group", undefined, {name: "Units"}); 
  Units.orientation = "row"; 
  Units.alignChildren = ["left","center"]; 
  Units.spacing = 10; 
  Units.margins = 0; 

var unitsStaticText = Units.add("statictext", undefined,"Units"); 
var unitsDropDown_array = ["Percentage","Index"]; 
var unitsDropDown = Units.add("dropdownlist", undefined, undefined, {name: "unitsDropDown", items: unitsDropDown_array}); 
  unitsDropDown.selection = 0; 

// BASEDON
// =======
var BasedOn = group7.add("group", undefined, {name: "BasedOn"}); 
  BasedOn.orientation = "row"; 
  BasedOn.alignChildren = ["left","center"]; 
  BasedOn.spacing = 10; 
  BasedOn.margins = 0; 

var basedOnStaticText = BasedOn.add("statictext", undefined, "Based On");  
var basedOnDropDown_array = ["Characters","Characters No Spaces","Words","Lines"]; 
var basedOnDropDown = BasedOn.add("dropdownlist", undefined, undefined, {name: "basedOnDropDown", items: basedOnDropDown_array}); 
  basedOnDropDown.selection = 0; 

// MODE
// ====
var Mode = group7.add("group", undefined, {name: "Mode"}); 
  Mode.orientation = "row"; 
  Mode.alignChildren = ["left","center"]; 
  Mode.spacing = 10; 
  Mode.margins = 0; 

var modeStaticText = Mode.add("statictext", undefined, "Mode"); 
var modeDropDown_array = ["Add","Subtract","Min","Max","Difference"]; 
var modeDropDown = Mode.add("dropdownlist", undefined, undefined, {name: "modeDropDown", items: modeDropDown_array}); 
  modeDropDown.selection = 0; 

// AMOUNT
// ======
var Amount = group7.add("group", undefined, {name: "Amount"}); 
  Amount.orientation = "row"; 
  Amount.alignChildren = ["left","center"]; 
  Amount.spacing = 10; 
  Amount.margins = 0; 

var amountStaticText = Amount.add("statictext", undefined,"Amount"); 
// GROUP8
// ======
var group8 = Amount.add("group", undefined, {name: "group8"}); 
  group8.orientation = "row"; 
  group8.alignChildren = ["left","center"]; 
  group8.spacing = 0; 
  group8.margins = 0; 

var amountEditText = group8.add('edittext {properties: {name: "amountEditText"}}'); 
  amountEditText.text = "100"; 
var amountPercentageStaticText = group8.add("statictext", undefined,"%"); 
// GRPSHAPE
// ========
var grpShape = group7.add("group", undefined, {name: "grpShape"}); 
  grpShape.orientation = "row"; 
  grpShape.alignChildren = ["left","center"]; 
  grpShape.spacing = 10; 
  grpShape.margins = 0; 

var shapeStaticText = grpShape.add("statictext", undefined, "Shape"); 
var shapeDropDown_array = ["Square","Ramp Up","Ramp Down","Triangle","Round","Smooth"]; 
var shapeDropDown = grpShape.add("dropdownlist", undefined, undefined, {name: "shapeDropDown", items: shapeDropDown_array}); 
  shapeDropDown.selection = 1; 
// EASEHIGHEASELOW
// ===============
var EaseHighEaseLow = group7.add("group", undefined, {name: "EaseHighEaseLow"}); 
  EaseHighEaseLow.orientation = "row"; 
  EaseHighEaseLow.alignChildren = ["left","center"]; 
  EaseHighEaseLow.spacing = 17; 
  EaseHighEaseLow.margins = 0; 

// EASEHIGH
// ========
var EaseHigh = EaseHighEaseLow.add("group", undefined, {name: "EaseHigh"}); 
  EaseHigh.orientation = "row"; 
  EaseHigh.alignChildren = ["left","center"]; 
  EaseHigh.spacing = 5; 
  EaseHigh.margins = 0; 

var easeHighStaticText = EaseHigh.add("statictext", undefined, "Ease High"); 
// GROUP9
// ======
var group9 = EaseHigh.add("group", undefined, {name: "group9"}); 
  group9.orientation = "row"; 
  group9.alignChildren = ["left","center"]; 
  group9.spacing = 0; 
  group9.margins = 0; 

var easeHighEditText = group9.add('edittext {properties: {name: "easeHighEditText"}}'); 
  easeHighEditText.text = "0"; 
  easeHighEditText.preferredSize.width = 36; 
var easeHighPercentStaticText = group9.add("statictext", undefined, "%"); 
// EASELOW
// =======
var EaseLow = EaseHighEaseLow.add("group", undefined, {name: "EaseLow"}); 
  EaseLow.orientation = "row"; 
  EaseLow.alignChildren = ["left","center"]; 
  EaseLow.spacing = 5; 
  EaseLow.margins = 0; 

var easeLowStaticText = EaseLow.add("statictext", undefined, "EaseLow"); 
// GROUP10
// =======
var group10 = EaseLow.add("group", undefined, {name: "group10"}); 
  group10.orientation = "row"; 
  group10.alignChildren = ["left","center"]; 
  group10.spacing = 0; 
  group10.margins = 0; 

var easeLowEditText = group10.add('edittext {properties: {name: "easeLowEditText"}}'); 
  easeLowEditText.text = "0"; 
  easeLowEditText.preferredSize.width = 36; 

var easeLowPercentStaticText = group10.add("statictext", undefined, "%"); 
// RANDOMIZEORDER
// ==============
var RandomizeOrder = group7.add("group", undefined, {name: "RandomizeOrder"}); 
  RandomizeOrder.orientation = "row"; 
  RandomizeOrder.alignChildren = ["left","center"]; 
  RandomizeOrder.spacing = 10; 
  RandomizeOrder.margins = 0; 

var randomizeOrderStaticText = RandomizeOrder.add("statictext", undefined, "Randomize Order"); 
var randomizeOrderCheckbox = RandomizeOrder.add("checkbox", undefined, undefined, {name: "randomizeOrderCheckbox"}); 

var randomSeedEditText = RandomizeOrder.add('edittext {properties: {name: "randomSeedEditText"}}'); 
  randomSeedEditText.text = "12345"; 
  randomSeedEditText.preferredSize.width = 50;

// GROUP2
// ======
var group2 = tab2.add("group", undefined, {name: "group2"}); 
  group2.orientation = "row"; 
  group2.alignChildren = ["left","center"]; 
  group2.spacing = 10; 
  group2.margins = 0; 

var readAnimatorPropsButton = group2.add("button", undefined, undefined, {name: "readAnimatorProps"}); 
  readAnimatorPropsButton.text = "Read"; 
var applyAnimatorButton = group2.add("button", undefined, undefined, {name: "applyAnimatorButton"}); 
  applyAnimatorButton.text = "Apply"; 

var animatorDropDown_array = ["Animator 1"]; 
var animatorDropDown = group2.add("dropdownlist", undefined, undefined, {name: "animatorDropDown", items: animatorDropDown_array}); 
    animatorDropDown.selection = 0; 

// TAB3
// ====
var tab3 = tpanel1.add("tab", undefined, undefined, {name: "tab3"}); 
tab3.text = "Settings"; 
tab3.orientation = "column"; 
tab3.alignChildren = ["left","top"]; 
tab3.spacing = 10; 
tab3.margins = 10; 

// TPANEL1
// =======
tpanel1.selection = tab3; 

var statictext12 = tab3.add("statictext", undefined, undefined, {name: "statictext12"}); 
statictext12.text = "Font Buddy Comp Name"; 

var fontBuddyCompNameEditText = tab3.add('edittext', undefined, "_Font Buddy"); 
    fontBuddyCompNameEditText.text = "_Font Buddy"; 


var statictext13 = tab3.add("statictext", undefined, undefined, {name: "statictext13"}); 
statictext13.text = "Text Controller Marker Name"; 

var edittext5 = tab3.add('edittext {properties: {name: "edittext5"}}'); 
edittext5.text = "Font Buddy Control Layer"; 

var statictext14 = tab3.add("statictext", undefined, undefined, {name: "statictext14"}); 
statictext14.text = "Number of Font Styles"; 

var edittext6 = tab3.add('edittext {properties: {name: "edittext6"}}'); 
edittext6.text = "4"; 

var statictext15 = tab3.add("statictext", undefined, undefined, {name: "statictext15"}); 
statictext15.text = "Custom Style Names"; 

var edittext7 = tab3.add('edittext {properties: {name: "edittext7"}}'); 
    edittext7.text = "Title-Font, Body-Font"; 

FontBuddy.layout.layout(true);
FontBuddy.layout.resize();
FontBuddy.tpanel1.selection = tab1;
FontBuddy.onResizing = FontBuddy.onResize = function () { this.layout.resize(); }
if ( FontBuddy instanceof Window ) FontBuddy.show();

// return FontBuddy;

// }());

//Button Functions
newFontBuddyButton.onClick = function(){
            
      var fontBuddyComp = checkFontBuddyComp();
      fontBuddyComp != undefined ? null() : addFontBuddyCompAndFolder();

}
refreshListButton.onClick = function(){
    
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
addTextControlButton.onClick = function(){
    app.beginUndoGroup("Add Text Control Layers");
    var curComp = proj.activeItem;
    if(curComp.name != fbCompName){
    var comp = getFontBuddyComp();
    createTextControllers(comp, curComp);
    app.endUndoGroup();
    }else{
        alert("Can't add control layers to Font Buddy Comp!");
    }

}
addTextLayersButton.onClick = function(){
    alert("here");
    var curComp = proj.activeItem;
    app.beginUndoGroup("add text layers linked to controllers");
    addTextLayersLinkedToControllers(curComp);
    app.endUndoGroup();
}
unlinkButton.onClick = function(){
    //alert();
    var curComp = proj.activeItem;
    app.beginUndoGroup("");
    unlinkTextControllers(curComp);
    app.endUndoGroup();
}
linkButton.onClick = function(){
    //alert();
    var curComp = proj.activeItem;
    app.beginUndoGroup("relink");
    relinkTextControllers(curComp);
    app.endUndoGroup();
}
insertFontBuddyButton.onClick = function(){
    
    addFontBuddyCompToComp(proj.activeItem, getFontBuddyComp());
    
}
updateRenameButton.addEventListener("keydown", alertKey);
function alertKey(){
    var keyState = ScriptUI.environment.keyboardState;
    if(keyState.altKey){
        return true
    }
}
updateRenameButton.onClick = function (){
    if(alertKey() == true){
        app.beginUndoGroup("rename");
       renameTextControllers(proj.activeItem);
    //    updateDropDownsOnControllers(proj.activeItem);
       app.endUndoGroup();
    }else{
        app.beginUndoGroup("update");
       updateDropDownsOnControllers(proj.activeItem);
       app.endUndoGroup();
    }
}
addStyleControlsButton.onClick = function(){
    convertTextPropsToPsuedoEffect(proj.activeItem);   
}
connectButton.onClick = function(){
    app.beginUndoGroup("Connect Text To Control");
    connectTextToControlLayer(proj.activeItem);
    app.endUndoGroup();
}
copyButton.onClick = function(){
    copy(proj.activeItem);
}
pasteButton.onClick = function(){
    app.beginUndoGroup("Paste Text Props");
    paste(proj.activeItem);
    app.endUndoGroup();
}
convertButton.onClick = function(){
    app.beginUndoGroup("Convert Text To Controller");
    convertTextToController(proj.activeItem);
    app.endUndoGroup();
}
copypasteanimatorButton.onClick = function(){
    app.beginUndoGroup("Copy Animator Props");
    copyAnimatorProperties(proj.activeItem);
    app.endUndoGroup();
}
keyframeOffsetButton.onClick = function(){

    app.beginUndoGroup("animator and offsets");
    createAnimatorAndKeyframeOffset(proj.activeItem);
    app.endUndoGroup();
}
readAnimatorPropsButton.onClick = function(){
    app.beginUndoGroup("read animator props");
    readAnimatorProps(proj.activeItem);
    app.endUndoGroup();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS
//Globals
var proj = app.project;

// fontBuddyCompNameEditText.addEventListener("change", getFBCompNameEditText);
// function getFBCompNameEditText(){
//     return fontBuddyCompNameEditText.text;
// }
var fbCompName = "_Font Buddy";
var fbFolderName = "_Font Buddy";
var numberOfTextLayers = 4;
var textNames = ["Title-Font 1", "Title-Font 2", "Body-Font 1", "Body-Font 2"];
var commentName = "Font Buddy Control Layer";


if(getFontBuddyComp() != undefined){
    refreshListItemBoxContents()
}


try{
    var compProps = [fbCompName,curComp.width, curComp.height,1, curComp.duration, curComp.frameRate];
    }catch(err){
    var compProps = [fbCompName, 1920, 1080, 1, 10, 30];
}


//Functions

function copy(curComp){
    var a = curComp.selectedLayers[0].name;
    statictext.text = a;

}
function paste(curComp){
    var copiedLayer = curComp.layer(statictext.text);

    
    for(var i = 0; i < curComp.selectedLayers.length; i++){
        var pasteLayer = curComp.selectedLayers[i];
        var pasteLayername = pasteLayer.name;
   
        var pasteLayerProps = pasteLayer.property("Source Text");
        var pasteLayerString = pasteLayerProps.value.text;

            if(styleRadioButton.value == true){
                var copiedLayerProps = copiedLayer.property("Source Text").value;
                //pastes all properties
                pasteLayerProps.setValue(copiedLayerProps);
                //pastes back original text
                pasteLayerProps.setValue(pasteLayerString);
                //sets name back to original
                pasteLayer.name = pasteLayername;
            }else{
                var copytextProps = copiedLayer.property("Source Text");
                var copytextDocument = copytextProps.value;
                var copiedFont = copytextDocument.font;

                var pasteTextDocument = pasteLayerProps.value;
                pasteTextDocument.font = copiedFont;
                pasteLayerProps.setValue(pasteTextDocument);
                }

    }

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
        //Gets all previous text controllers and adds 1 to label
        var currentTextLayers = getAllTextControllers(curComp);
        text.label = currentTextLayers.length + 1;
        //Markers
        var addMarker = new MarkerValue(commentName);
        text.marker.setValueAtTime(0, addMarker);
        var textProp = text.property("Source Text");
        var textDocument = textProp.value;
        //Gets Font Buddy corresponding layer and font information
        var fontbuddylayers = getFontBuddyLayers(getFontBuddyComp());
        var selectedfontbuddylayer = fontbuddylayers[listSelection];  
        textDocument.font = getFonts(selectedfontbuddylayer.name, comp);
        textProp.setValue(textDocument);

        linkToFontBuddyDropDown(listSelection, text);
        text.moveToBeginning();
        
        var sourceText = text.property("ADBE Text Properties").property("ADBE Text Document");
        sourceText.expression = linkControllersToDropDown;
        var width = text.sourceRectAtTime(0, false).width.toFixed(0);

        text.property("Transform").property("Position").setValue([curComp.width/2 - width / 2, curComp.height/2 - 300, 0]);


        //Adjust position to add controllers underneath the y position of the lowest controller
        var allTextControllers = getAllTextControllers(curComp);
        if(allTextControllers.length > 1){
        var controllerPositions = [];
        for(var i = 0; i < allTextControllers.length; i++){
            controllerPositions.push(curComp.layer(allTextControllers[i]).property("Transform").property("Position").value[1]);
        }
        var yMaxPos = controllerPositions.reduce(function (a, b) {
                return Math.max(a, b);
                    }, -Infinity);
        text.property("Transform").property("Position").setValue([curComp.width/2 - width/2, yMaxPos + 100, 0]);
        }

        

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
        var textLayer = comp.layers.addText(textNames[i-1]);
        textLayer.property("Source Text").expression = fontBuddyTextLayerExpression;
        textLayer.moveToEnd();
        var width = textLayer.sourceRectAtTime(0, false).width.toFixed(0);
        var height = textLayer.sourceRectAtTime(0, false).height.toFixed(0);
        if(i <=2){
        var w1 = 400;
        textLayer.property("ADBE Transform Group").property("ADBE Position").setValue([w1,  400 + ((i-1) * height * 2)]);
        textLayer.label = 2;
        }
        if(i >2){
        var w2 = 400;
        textLayer.property("ADBE Transform Group").property("ADBE Position").setValue([w2,  550 + ((i-2) * height * 2)]);
        textLayer.label = 3;
        }

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
    
    var leftAlignSelect = paragraphLeft.value;
    var centerAlignSelect = paragraphCenter.value;
    var rightAlignSelect = paragraphRight.value;
    if(curComp.selectedLayers.length == 0){
        alert("Please select a text layer controller");
    }else{
        var leftTextArray = [];
        var centerTextArray = [];
        var rightTextArray = [];
        for(var i = 0; i < curComp.selectedLayers.length; i++){
            var controlLayer = curComp.selectedLayers[i];           
            if(leftAlignSelect == 1){
                
                leftTextArray.push(controlLayer.index);    
                             
            }
            
            if(centerAlignSelect == 1){
                centerTextArray.push(controlLayer.index);
        
            }
            if(rightAlignSelect == 1){
                rightTextArray.push(controlLayer.index);
   
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

    }

    function addLeftAlignText(array, curComp){
        if(array != undefined){
        var layername = curComp.layer(array).name;
        leftTextLayer = curComp.layers.addText(layername + " Left");
        leftTextLayer.moveToEnd();
        leftTextLayer.label = curComp.layer(array).label;
        leftTextProps = leftTextLayer.property("Source Text");
        lefttextDocument = leftTextProps.value;
        lefttextDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
        leftTextProps.setValue(lefttextDocument);
        leftTextProps.expression = "var parentLayer = thisComp.layer(\"" + layername + "\").text.sourceText;parentLayer.style.setText(parentLayer)";
        leftTextLayer.property("ADBE Transform Group").property("ADBE Position").setValue([200,curComp.height - 200]);
        leftTextLayer.property("ADBE Transform Group").property("ADBE Opacity").expression = leftTextOpacityExpression;
        }
    }
    function addCenterAlignText(array, curComp){
        if(array != undefined){
        var layername = curComp.layer(array).name;
        var centerTextLayer = curComp.layers.addText(layername + " Center");
        centerTextLayer.moveToEnd();
        centerTextLayer.label = curComp.layer(array).label;
        centerTextProps = centerTextLayer.property("Source Text");
        centertextDocument = centerTextProps.value;
        centertextDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
        centerTextProps.setValue(centertextDocument);
        centerTextProps.expression = "var parentLayer = thisComp.layer(\"" + layername + "\").text.sourceText;parentLayer.style.setText(parentLayer)";
        centerTextLayer.property("ADBE Transform Group").property("ADBE Position").setValue([curComp.width/2 ,curComp.height - 200]);
        centerTextLayer.property("ADBE Transform Group").property("ADBE Opacity").expression = centerTextOpacityExpression;
    }
    }
    function addRightAlignText(array, curComp){
        if(array != undefined){
        var layername = curComp.layer(array).name;
        var rightTextLayer = curComp.layers.addText(layername + " Right");
        rightTextLayer.moveToEnd();
        rightTextLayer.label = curComp.layer(array).label;
        rightTextProps = rightTextLayer.property("Source Text");
        righttextDocument = rightTextProps.value;
        righttextDocument.justification = ParagraphJustification.RIGHT_JUSTIFY;
        rightTextProps.setValue(righttextDocument);
        rightTextProps.expression = "var parentLayer = thisComp.layer(\"" + layername + "\").text.sourceText;parentLayer.style.setText(parentLayer)";
        rightTextLayer.property("ADBE Transform Group").property("ADBE Position").setValue([curComp.width - 200 ,curComp.height - 200]);
        rightTextLayer.property("ADBE Transform Group").property("ADBE Opacity").expression = rightTextOpacityExpression;
    }
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
//relinks a text controller to a different listBox item
function relinkTextControllers(curComp){
    //Relinks selected controller layer to selected listBox item selection

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
//Inserts font buddy comp to active comp if not already in it
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
        var checkbox = compprops.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
        checkbox.name = "Show Selected";
        var boxLayerDropdown = compprops.Effects.addProperty("ADBE Dropdown Control");
        var temp = boxLayerDropdown.property(1).setPropertyParameters(["Left", "Center", "Right"]);
        temp.propertyGroup(1).name = "Text Justification";
        compprops.label = 11; 
        // compprops.locked = true; 
        
    }
    app.endUndoGroup();
}
//Updates the drop down items with new list box items
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
}
//Refreshes or updates the list box items
function refreshListItemBoxContents(){

    var fontbuddycomp = getFontBuddyComp();
    //removes all items first
    
    // alert(ListBoxitems[1]);
    if(listBox.items.length != 0){
        // var listBoxitems = listBox.items;
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
    var selectedTextControllers = [];

        if(curComp.selectedLayers.length > 0){
            for(var a = 0; a < curComp.selectedLayers.length; a ++){
            //Builds array of all selected Layers
            if((curComp.selectedLayers[a] instanceof TextLayer) && (curComp.selectedLayers[a].marker.numKeys > 0)){
                if(curComp.selectedLayers[a].property('Marker').keyValue(1).comment == commentName){
                var textController = curComp.selectedLayers[a];
                selectedTextControllers.push(curComp.selectedLayers[a]);
                }else{
                    textLayers.push(curComp.selectedLayers[a].index);
                }
            }else{
               textLayers.push(curComp.selectedLayers[a].index);
            }
                
            }

    }
    
        if((selectedTextControllers.length > 1) || (selectedTextControllers.length == 0) || (textLayers.length == 0)){
            alert("Please only select only one Text Control Layer.\n\nText Control Layers are defined as having \"Font Buddy Control Layer\" markers.\n\nPlease select text layers to connect to a Text Control Layer.");
        }else{
            for(var i = 0; i < textLayers.length; i++){
                curComp.layer(textLayers[i]).label = textController.label;
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
function convertTextToController(curComp){
    var currentControlLayers = getAllTextControllers(curComp);
    for(var i = 0; i < curComp.selectedLayers.length; i++){
        var selLayer = curComp.selectedLayers[i];
        var check = [];
        for(var n = 0; n < currentControlLayers.length; n++){
            if(selLayer.index == curComp.layer(currentControlLayers[n]).index){
               check.push(1);
            }else{
                continue
            }
        }
        if(check.length < 1){
            var text = curComp.layer(selLayer.index);
            //checks for list items. if none, will refresh first
            if(listBox.items.length == 0){
                refreshListItemBoxContents();
            }
            //converts listitems into string array
            var textNames = listBoxItemString();

            //Gets selection from drown down. If none, forces the first one
            if(listBox.selection != null){
            
                var listSelection = listBox.selection.index;
            }else{
                
                var listSelection = listBox.selection = [0];

            }
            text.guideLayer = true;
            //Gets all previous text controllers and adds 1 to label
            text.label = currentControlLayers.length + 1;
            //Markers
            var addMarker = new MarkerValue(commentName);
            text.marker.setValueAtTime(0, addMarker);
            var textProp = text.property("Source Text");
            var textDocument = textProp.value;
            //Gets Font Buddy corresponding layer and font information
            var fontbuddylayers = getFontBuddyLayers(getFontBuddyComp());
            var selectedfontbuddylayer = fontbuddylayers[listSelection];  
 
            // textDocument.font = getFonts(selectedfontbuddylayer.name, getFontBuddyComp());
            // textProp.setValue(textDocument);

            linkToFontBuddyDropDown(listSelection, text);
            
            var sourceText = text.property("ADBE Text Properties").property("ADBE Text Document");

            sourceText.expression = linkControllersToDropDown;



        }
    }
}
//Returns the layer index of all text controllers
function getAllTextControllers(curComp){
    var layers = [];
    for(var i = 1; i <= curComp.numLayers; i++){
                
        //Builds array of all Text Control Layers
        if((curComp.layer(i) instanceof TextLayer) && (curComp.layer(i).marker.numKeys > 0)){
            if(curComp.layer(i).property('Marker').keyValue(1).comment == commentName){
            layers.push(curComp.layer(i).index);
            }else{
                continue
            }
        }else{
            continue
        }
            
            
    }
    return layers
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
//Scans font buddy comp and returns all layer names
function getFontBuddyLayerNames(comp){
    var layers = [];
    for(var i = 1; i <= comp.numLayers; i++){
        layers.push(comp.layer(i).name);
    }
    return layers;
}
//Scans font buddy comp and returns all layers
function getFontBuddyLayers(comp){
    var layers = [];
    for(var i = 1; i <= comp.numLayers; i++){
        layers.push(comp.layer(i));
    }
    return layers;
}
//returns font buddy comp name
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
function copyAnimatorProperties(curComp){
    var textLayers = [];
    var textController;
    var selectedTextControllers = [];

        if(curComp.selectedLayers.length > 0){
            for(var a = 0; a < curComp.selectedLayers.length; a ++){
            //Builds array of all selected Layers
            if((curComp.selectedLayers[a] instanceof TextLayer) && (curComp.selectedLayers[a].marker.numKeys > 0)){
                if(curComp.selectedLayers[a].property('Marker').keyValue(1).comment == commentName){
                var textController = curComp.selectedLayers[a];
                selectedTextControllers.push(curComp.selectedLayers[a]);
                }else{
                    textLayers.push(curComp.selectedLayers[a].index);
                }
            }else{
               textLayers.push(curComp.selectedLayers[a].index);
            }
                
            }
        }
    
        if((selectedTextControllers.length > 1) || (selectedTextControllers.length == 0) || (textLayers.length == 0)){
            alert("Please only select only one Text Control Layer.\n\nText Control Layers are defined as having \"Font Buddy Control Layer\" markers.\n\nPlease select text layers to copy animation from a Text Control Layer.");
        }else{
                var animatorNumProps = textController.property("ADBE Text Properties").property("ADBE Text Animators").numProperties;
                var animatorIndexArray = [];
                //finds the text control animator properties to copy
                if(animatorNumProps > 0){

                    var textAnimators = textController.property("ADBE Text Properties").property("ADBE Text Animators");

                    //Builds array of all text control animators based on property index
                    for(var d = 1; d <= animatorNumProps; d++){
                        animatorIndexArray.push(textAnimators.property(d).propertyIndex);
                    }

                    //Finds and removes all current animators on text layers
                    var textLayerAnimatorIndexArray = [];
                    for(var f = 0; f < textLayers.length; f++){
                            if(curComp.layer(textLayers[f]).property("ADBE Text Properties").property("ADBE Text Animators").numProperties > 0){
                                var textlayertoremoveprops = curComp.layer(textLayers[f]);
                                var textlayernumprops = textlayertoremoveprops.property("ADBE Text Properties").property("ADBE Text Animators").numProperties;
                                for(var g = textlayernumprops ; g > 0 ; g--){
                                    textlayertoremoveprops.property("ADBE Text Properties").property("ADBE Text Animators").property(g).remove();
                                }
                            }
                    }

                    //loops through all selected text layers to apply animators and properties
                    for(var p = 0; p < textLayers.length; p ++){
                        var currentLayer = curComp.layer(textLayers[p]).index;
                        copyAnimators(currentLayer);
                    }

                        function copyAnimators(layer){
                            //creates variables for animator group properties
                            //runs master loop for each animator group
                            for(var e = 1; e <= animatorIndexArray.length; e++){

                                //Defines current TEXT CONTROL animator group
                                var animator = textAnimators.property(e);

                                //Total number of Range Selectors to Add
                                var totalRangeSelectors = animator.property("ADBE Text Selectors").numProperties;
                                //adds animator group to text layer
                                var newAnimator = curComp.layer(layer).property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
                                //adds range selector group - might need multiple
                                for(var z = 1; z <= totalRangeSelectors; z++){
                                    var newRangeSelector = newAnimator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
                                }
                                
                                copyPasteModifedProps(animator);
                                copyPasteRangeSelectors(animator, newAnimator, textController);

                                //copies the animator modified properties. call it later after range selectors have been added to avoid error.
                                function copyPasteModifedProps(animator){

                                    //Builds array of all modifed animator properties names and values
                                    var animatorPropsArrayMatchName = [];
                                    var animatorPropsArrayValues = [];

                                    for(var i = 1; i <= animator.property("ADBE Text Animator Properties").numProperties; i++){
                                        if(animator.property("ADBE Text Animator Properties").property(i).isModified == true){
                                            animatorPropsArrayMatchName.push(animator.property("ADBE Text Animator Properties").property(i).matchName);
                                            animatorPropsArrayValues.push(animator.property("ADBE Text Animator Properties").property(i).value);
                                        }
                                    }
                                        //adds copied modified properties
                                        for(var c = 0; c < animatorPropsArrayMatchName.length; c++){

                                            var copiedProps = newAnimator.property("ADBE Text Animator Properties").addProperty(animatorPropsArrayMatchName[c]);
                                            copiedProps.setValue(animatorPropsArrayValues[c]);
                                            
                                        }                    

                                }
                                //copies and pastes the range selector properties
                                function copyPasteRangeSelectors(animator, newAnimator, textController){
                                    //all range selectors on current TEXT CONTROL animator group
                                    var totalRangeSelectors = animator.property("ADBE Text Selectors").numProperties;
                                    for(var i = 1; i <= totalRangeSelectors; i++){

                                        var rangeSelector = animator.property("ADBE Text Selectors").property(i);          
                                        var rangeSelectorOffset = rangeSelector.property("ADBE Text Percent Offset");
                                        var advancedRangeSelector = rangeSelector.property("ADBE Text Range Advanced");
                                        var advancedRangeSelectorArray = [];

                                        //Builds array for all advanced range selector properties
                                        for(var n = 1; n <= advancedRangeSelector.numProperties; n++){
                                            advancedRangeSelectorArray.push(advancedRangeSelector.property(n).value);
                                        }

                                        var newRangeSelector = newAnimator.property("ADBE Text Selectors").property(i);
                                        var rangeSelectorOffsetLinked = newRangeSelector.property("ADBE Text Percent Offset");
                                        //Adds expression to link Offsets
                                        rangeSelectorOffsetLinked.expression = "thisComp.layer(\"" + textController.name + "\").text.animator(\""+ animator.name + "\").selector(\""+ rangeSelector.name +"\").offset";

                                        var newAdvancedRangeSelector = newRangeSelector.property("ADBE Text Range Advanced");

                                        //copies all advanced range properties                                                
                                        //sets shape and random since those are weird
                                        var shape = advancedRangeSelector.property("ADBE Text Range Shape").value;
                                        newAdvancedRangeSelector.property("ADBE Text Range Shape").setValue(shape);
                                        var random = advancedRangeSelector.property("ADBE Text Randomize Order").value;
                                        newAdvancedRangeSelector.property("ADBE Text Randomize Order").setValue(random);
                                        if(shape == 1){
                                            var smoothness = advancedRangeSelector.property("ADBE Text Selector Smoothness").value;
                                            newAdvancedRangeSelector.property("ADBE Text Selector Smoothness").setValue(smoothness);
                                        }
                                        if(random == 1){
                                            var randomSeed = advancedRangeSelector.property("ADBE Text Random Seed").value;
                                            newAdvancedRangeSelector.property("ADBE Text Random Seed").setValue(randomSeed);
                                        }
                                        //copies range selector properties via an array
                                        for(var k = 1; k < advancedRangeSelectorArray.length; k++){
                                            if((k == 6) || (k == 10)){
                                                continue
                                            }else{
                                            newAdvancedRangeSelector.property(k).setValue(advancedRangeSelectorArray[k - 1]);
                                            }                
                                        }

                                    }

                                }
                                    
                            }

                        }
                    
                }
                

        }

}
function createAnimatorAndKeyframeOffset(curComp){

    for(var i = 0; i < curComp.selectedLayers.length; i++){
        var selLayer = curComp.selectedLayers[i];

        var animator = selLayer.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
        for(a = 1; a <= 2; a++){
            var rangeSelector = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
            var offset = rangeSelector.property("ADBE Text Percent Offset");
            var advancedRangeSelectorShape = rangeSelector.property("ADBE Text Range Advanced").property("ADBE Text Range Shape");
            var advancedRangeSelectorBasedOn = rangeSelector.property("ADBE Text Range Advanced").property("ADBE Text Range Type2");
            advancedRangeSelectorBasedOn.setValue(3);
            if(a == 1){
                advancedRangeSelectorShape.setValue(2);
                for(var n = 0; n < 2; n++){
                    offset.addKey(n);
                    if(n == 0 ){
                        offset.setValueAtKey(1, -100);
                    }else{
                        offset.setValueAtKey(2, 100);
                    }
                
                }
            }else{
                advancedRangeSelectorShape.setValue(3);
                for(var n = 0; n < 2; n++){
                    offset.addKey(n+2);
                    if(n == 0 ){
                        offset.setValueAtKey(1, -100);
                    }else{
                        offset.setValueAtKey(2, 100);
                    }
                
                }
            }
            

        }

        var animatorProps = animator.property("ADBE Text Animator Properties");
        var position = animatorProps.addProperty("ADBE Text Position 3D");
        position.setValue([0, 50]);
        var opacity = animatorProps.addProperty("ADBE Text Opacity");
        opacity.setValue(0);


    }
}
function readAnimatorProps(curComp){
    var selLayer = curComp.selectedLayers[0];

    var animatorNumProps = selLayer.property("ADBE Text Properties").property("ADBE Text Animators").numProperties;
        var animatorIndexArray = [];
        //finds the text control animator properties to copy
        if(animatorNumProps > 0){

            var textAnimators = selLayer.property("ADBE Text Properties").property("ADBE Text Animators");

            //Builds array of all text control animators based on property index
            for(var d = 1; d <= animatorNumProps; d++){
                animatorIndexArray.push(textAnimators.property(d).propertyIndex);
            }

            //creates variables for animator group properties
            //runs master loop for each animator group
            var propertyArray = [];
            for(var e = 1; e <= animatorIndexArray.length; e++){

                //Defines current TEXT CONTROL animator group
                var animator = textAnimators.property(e);

                //Total number of Range Selectors to Read
                var totalRangeSelectors = animator.property("ADBE Text Selectors").numProperties;

                //all range selectors on current TEXT CONTROL animator group
                //Currently ignoring and just reading the first one
                // var rangeSelectorCount = animator.property("ADBE Text Selectors").numProperties;
                var rangeSelector = animator.property("ADBE Text Selectors").property(1);          
                var rangeSelectorOffset = rangeSelector.property("ADBE Text Percent Offset");
                var advancedRangeSelector = rangeSelector.property("ADBE Text Range Advanced");
                
                //Define values
                var units = advancedRangeSelector.property("ADBE Text Range Units").value;
                var basedOn = advancedRangeSelector.property("ADBE Text Range Type2").value;
                var mode = advancedRangeSelector.property("ADBE Text Selector Mode").value;
                var amount = advancedRangeSelector.property("ADBE Text Selector Max Amount").value;
                var shape = advancedRangeSelector.property("ADBE Text Range Shape").value;
                var easeHigh = advancedRangeSelector.property("ADBE Text Levels Max Ease").value;
                var easeLow = advancedRangeSelector.property("ADBE Text Levels Min Ease").value;
                var randomizeOrder = advancedRangeSelector.property("ADBE Text Randomize Order").value;
                var randomSeed = advancedRangeSelector.property(10).value;

                // propertyArray.push([units,basedOn, mode, amount, shape, easeHigh, easeLow, randomizeOrder, randomSeed]);
                // return propertyArray;

            }

        }

        alert();

        unitsDropDown.selection = units - 1;
        basedOnDropDown.selection = basedOn - 1;
        modeDropDown.selection = mode - 1;
        amountEditText.text = amount;
        shapeDropDown.selection = shape - 1;
        easeHighEditText.text = easeHigh;
        easeLowEditText.text = easeLow;
        randomizeOrderCheckbox.value = randomizeOrder;
        randomSeedEditText.text = randomSeed;

        //Remove all items from drop down first
        for(var i = animatorIndexArray.length - 1; i >= 0; i--){
            animatorDropDown.remove(animatorDropDown.items[i]);
        }
        //Adds all items from drop down
        for(var i = 1; i <= animatorIndexArray.length; i++){
            animatorDropDown.add("item", textAnimators.property(i).name);
        }
        //Sets selection back to first
        animatorDropDown.selection = 0;

}