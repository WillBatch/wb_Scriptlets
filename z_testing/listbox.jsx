// ScriptUI Listboxes
// var counter = 0;
var proj = app.project;
var fbCompName = "_Font Buddy"
var fontbuddycomp = getFontBuddyComp();

var window = new Window("palette", "Listbox", undefined);
window.orientation = "column";
var listBox = window.add("listbox", undefined, []);
listBox.selection = 0;
listBox.size = [100, 120];

var buttonGroup = window.add("group", undefined, "buttonGroup");
buttonGroup.orientation = "row";
var addButton = buttonGroup.add("button", undefined, "+");
addButton.size = [25, 25];
var minusButton = buttonGroup.add("button", undefined, "-");
minusButton.size = [25, 25];

addButton.onClick = function () {
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
        // listBox.add("item", "Item_"+counter.toString());
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




minusButton.onClick = function() {
        if(listBox.selection != null) {
        counter--;
        listBox.remove(listBox.selection);
            }
    }

window.center();
window.show();

function getFontBuddyComp(){
    var comp = false;
    for(var i = 1; i<= proj.numItems; i++){
        if(proj.item(i).name == fbCompName && proj.item(i) instanceof CompItem){
            var comp = proj.item(i);
            break
        }
    }
   
    comp == false ? alert("No font buddy comp found") : null;
    return comp
}