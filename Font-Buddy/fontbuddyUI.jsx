var panelGlobal = this;
$.evalFile("fontbuddy.jsx");
$.evalFile("src/expressions.jsx");
$.evalFile("src/imagebinaries.jsx");

// ICONS - Align
var iconsLeftAlign = {a:File("./img/alignLeft_default.png"), b:File("./img/alignLeft_default.png"), c:File("./img/alignLeft_enable.png"), d:File("./img/alignLeft_enable.png")}
var scriptIconsLeftAlign = ScriptUI.newImage(iconsLeftAlign.a, iconsLeftAlign.b, iconsLeftAlign.c, iconsLeftAlign.d);
var iconsCenterAlign = {a:File("./img/alignCenter_default.png"), b:File("./img/alignCenter_default.png"), c:File("./img/alignCenter_enable.png"), d:File("./img/alignCenter_enable.png")}
var scriptIconsCenterAlign = ScriptUI.newImage(iconsCenterAlign.a, iconsCenterAlign.b, iconsCenterAlign.c, iconsCenterAlign.d);
var iconsRightAlign = {a:File("./img/alignRight_default.png"), b:File("./img/alignRight_default.png"), c:File("./img/alignRight_enable.png"), d:File("./img/alignRight_enable.png")}
var scriptIconsRightAlign = ScriptUI.newImage(iconsRightAlign.a, iconsRightAlign.b, iconsRightAlign.c, iconsRightAlign.d);

  // FONTBUDDY
  // =========
  var FontBuddy = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette"); 
      if ( !(panelGlobal instanceof Panel) ) FontBuddy.text = "Font Buddy"; 
      FontBuddy.orientation = "column"; 
      FontBuddy.alignChildren = ["center","top"]; 
      FontBuddy.spacing = 0; 
      FontBuddy.margins = 0; 

  // MAINPANEL1
  // ==========
  var mainPanel1 = FontBuddy.add("panel", undefined, undefined, {name: "mainPanel1"}); 
      mainPanel1.orientation = "column"; 
      mainPanel1.alignChildren = ["left","top"]; 
      mainPanel1.spacing = 0; 
      mainPanel1.margins = 7; 

  // LISTANDBUTTONS
  // ==============
  var listAndButtons = mainPanel1.add("group", undefined, {name: "listAndButtons"}); 
      listAndButtons.preferredSize.height = 147; 
      listAndButtons.orientation = "row"; 
      listAndButtons.alignChildren = ["center","center"]; 
      listAndButtons.spacing = 0; 
      listAndButtons.margins = 0; 

  // LEFTBUTTON
  // ==========
  var leftButton = listAndButtons.add("group", undefined, {name: "leftButton"}); 
      leftButton.preferredSize.height = 120; 
      leftButton.orientation = "column"; 
      leftButton.alignChildren = ["center","top"]; 
      leftButton.spacing = 0; 
      leftButton.margins = 0; 

  // GROUP1ROW1
  // ==========
  var group1row1 = leftButton.add("group", undefined, {name: "group1row1"}); 
      group1row1.orientation = "row"; 
      group1row1.alignChildren = ["center","center"]; 
      group1row1.spacing = 1; 
      group1row1.margins = 0; 

  var newFontBuddyButton = group1row1.add("iconbutton", undefined, File.decode(newFontBuddy_d), {name: "iconbutton1", style: "toolbutton"}); 

  var insertFontBuddyButton = group1row1.add("button", undefined, undefined, {name: "insertFontBuddyButton"}); 
      insertFontBuddyButton.text = "Insert"; 

  var refreshListButton = group1row1.add("button", undefined, undefined, {name: "refreshListButton"}); 
      refreshListButton.text = "@"; 

  // GROUP1ROW2
  // ==========
  var group1row2 = leftButton.add("group", undefined, {name: "group1row2"}); 
      group1row2.orientation = "row"; 
      group1row2.alignChildren = ["left","center"]; 
      group1row2.spacing = 10; 
      group1row2.margins = 0; 

  var addTextControlButton = group1row2.add("button", undefined, undefined, {name: "addTextControlButton"}); 
      addTextControlButton.text = "Add Text CTRL"; 

  // GROUP1ROW3
  // ==========
  var group1row3 = leftButton.add("group", undefined, {name: "group1row3"}); 
      group1row3.orientation = "row"; 
      group1row3.alignChildren = ["center","top"]; 
      group1row3.spacing = 4; 
      group1row3.margins = 0; 

  var linkButton = group1row3.add("button", undefined, undefined, {name: "linkButton"}); 
      linkButton.text = "Link"; 

  var unlinkButton = group1row3.add("button", undefined, undefined, {name: "unlinkButton"}); 
      unlinkButton.text = "Unlink"; 

  // GROUP1ROW4
  // ==========
  var group1row4 = leftButton.add("group", undefined, {name: "group1row4"}); 
      group1row4.orientation = "row"; 
      group1row4.alignChildren = ["left","center"]; 
      group1row4.spacing = 0; 
      group1row4.margins = 0; 

  var renameButton = group1row4.add("button", undefined, undefined, {name: "renameButton"}); 
      renameButton.text = "Rename"; 

  var updateButton = group1row4.add("button", undefined, undefined, {name: "updateButton"}); 
      updateButton.text = "Update"; 

  // GROUP1ROW5
  // ==========
  var group1row5 = leftButton.add("group", undefined, {name: "group1row5"}); 
      group1row5.orientation = "row"; 
      group1row5.alignChildren = ["left","center"]; 
      group1row5.spacing = 10; 
      group1row5.margins = 0; 

  var button1 = group1row5.add("button", undefined, undefined, {name: "button1"}); 
      button1.text = "Essential Graphics Controls"; 

  // LISTANDBUTTONS
  // ==============
  var ListBox_array = ["Item 1","Item 2","Item 3","Item 4"]; 
  var ListBox = listAndButtons.add("listbox", undefined, undefined, {name: "ListBox", items: ListBox_array, multiselect: true, columnWidths: 10}); 
      ListBox.selection = [0,1]; 
      ListBox.preferredSize.width = 121; 
      ListBox.preferredSize.height = 120; 

  // MAINGROUP2
  // ==========
  var mainGroup2 = FontBuddy.add("group", undefined, {name: "mainGroup2"}); 
      mainGroup2.preferredSize.width = 300; 
      mainGroup2.orientation = "row"; 
      mainGroup2.alignChildren = ["left","top"]; 
      mainGroup2.spacing = 10; 
      mainGroup2.margins = 0; 

  // PANEL1
  // ======
  var panel1 = mainGroup2.add("panel", undefined, undefined, {name: "panel1"}); 
      panel1.preferredSize.height = 90; 
      panel1.orientation = "column"; 
      panel1.alignChildren = ["center","top"]; 
      panel1.spacing = 0; 
      panel1.margins = 10; 

  var addTextLayersButton = panel1.add("button", undefined, undefined, {name: "addTextLayersButton"}); 
      addTextLayersButton.text = "Add Text Layers"; 

  // TEXTPARAGRAPH
  // =============
  var textParagraph = panel1.add("group", undefined, {name: "textParagraph"}); 
      textParagraph.orientation = "row"; 
      textParagraph.alignChildren = ["left","center"]; 
      textParagraph.spacing = 0; 
      textParagraph.margins = 0; 

    var paragraphSize = [20,20];
  var paragraphLeft_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%06%00%00%00V%C3%8E%C2%8EW%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%00%01sRGB%00%C2%AE%C3%8E%1C%C3%A9%00%00%00%04gAMA%00%00%C2%B1%C2%8F%0B%C3%BCa%05%00%00%00%5EIDATx%01%C3%AD%C2%91%C2%B1%0D%C2%80%20%10E%3F%C2%9AX%C2%BB%C2%8F%C3%8B%C3%A8%08Nb%C3%9C%C3%80e%C2%A4f%14%16%C2%80%C2%A3%22%C2%81%C3%A4(.%01B%C3%81%C3%AB~%C3%AE~%C3%B1%C3%B3%C2%80%C3%91Pip%C3%9F%C3%B1%10h%2F%3D%7B%C3%82%C2%BB%5D%C3%9Ap%C2%B7%05%02%1C%C2%BCEkD%C3%93%C3%B2%C2%A2%C2%B2%C3%AB%C3%B9%C3%9F1%C2%8B%C2%A6uaZ%C3%A3%C2%8A%C3%93%1AG%17k%C3%95%08%C3%8D%261%C3%91U%7B%C2%B3%C3%97%00%00%00%00IEND%C2%AEB%60%C2%82"; 
  var paragraphLeft = textParagraph.add("iconbutton", undefined, scriptIconsLeftAlign, {name: "paragraphLeft", style: "toolbutton", toggle:true}); 
        paragraphLeft.size = paragraphSize;
  var paragraphCenter_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%06%00%00%00V%C3%8E%C2%8EW%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%00%01sRGB%00%C2%AE%C3%8E%1C%C3%A9%00%00%00%04gAMA%00%00%C2%B1%C2%8F%0B%C3%BCa%05%00%00%00kIDATx%01%C3%AD%C2%91%C2%B1%09%C2%800%10E%C3%BF%25%60%C3%AD%08%C3%AEa%C3%A3(%3AB%26p%04G%C3%90Ql%C3%9C%C3%A7%C3%8A%20%C2%84%C2%B3%12TBL%C2%91%40%C2%8A%C2%BC%C3%AE%3E%C3%B79%C2%8E%07%C2%94%06%7D%03Y%C2%87%C3%8E%C3%919%C2%87JZ%1AC%C3%93%C3%8E%C3%8FLy%C3%B6%18%3FX%C3%98%16%C2%B9x%C2%BD%C3%A6%C2%B6~%11H%C3%945%02%C2%B1%1E%0Fs%C3%8F%0A%C2%A5Q%C2%AD%C3%B9%C2%8A%C3%95Z%C2%88%C2%AC%C3%96%C2%92q%01wr.%C3%A0er%1A%C2%AA%00%00%00%00IEND%C2%AEB%60%C2%82"; 
  var paragraphCenter = textParagraph.add("iconbutton", undefined, scriptIconsCenterAlign, {name: "paragraphCenter", style: "toolbutton", toggle:true}); 
      //var paragraphRight = textParagraph.add("iconbutton", undefined, File.decode(paragraphRight_imgString), {name: "paragraphRight", style: "toolbutton"}); 

        paragraphCenter.size = paragraphSize;
  var paragraphRight_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%06%00%00%00V%C3%8E%C2%8EW%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%00%01sRGB%00%C2%AE%C3%8E%1C%C3%A9%00%00%00%04gAMA%00%00%C2%B1%C2%8F%0B%C3%BCa%05%00%00%00%5EIDATx%01%C3%AD%C2%91%C2%B1%0D%C3%80%20%0C%04%C3%9F%C3%89%02%19!%7B%C2%A4%C3%89(Y!%13d%C2%84%C2%8C%00%C3%8B%C2%B0%0F5%08%C2%99%C2%8A%02%09K%14H%C2%A6%C3%A0%3A%C3%8B~%C3%89%C2%AF%03f%C2%83%C2%A4%05%C2%9B%C3%BBL%14%3E9H~%7F%C3%9C%5B%C3%A6M%3A%C2%8C%08%074%C2%A8%C2%AA%25%7B%C3%BD%0C%C3%AE%C3%BA%C2%A4%C2%BB%C2%9A%1A%C3%8BZ%2B%C2%B8%C2%AC%C2%A9Y%1BF%06%C3%94-)%1F!tA%C2%9B%00%00%00%00IEND%C2%AEB%60%C2%82"; 
  var paragraphRight = textParagraph.add("iconbutton", undefined, scriptIconsRightAlign, {name: "paragraphRight", style: "toolbutton", toggle:true}); 
        paragraphRight.size = paragraphSize;

  // PANEL2
  // ======
  var panel2 = mainGroup2.add("panel", undefined, undefined, {name: "panel2"}); 
      panel2.orientation = "row"; 
      panel2.alignChildren = ["left","center"]; 
      panel2.spacing = 7; 
      panel2.margins = 10; 

  // GROUP1
  // ======
  var group1 = panel2.add("group", undefined, {name: "group1"}); 
      group1.orientation = "column"; 
      group1.alignChildren = ["left","center"]; 
      group1.spacing = 10; 
      group1.margins = 0; 

  var copyButton = group1.add("button", undefined, undefined, {name: "copyButton"}); 
      copyButton.text = "Copy"; 

  var pasteButton = group1.add("button", undefined, undefined, {name: "pasteButton"}); 
      pasteButton.text = "Paste"; 

  // GROUP2
  // ======
  var group2 = panel2.add("group", undefined, {name: "group2"}); 
      group2.orientation = "column"; 
      group2.alignChildren = ["left","center"]; 
      group2.spacing = 10; 
      group2.margins = 0; 

  var styleRadioButton = group2.add("radiobutton", undefined, undefined, {name: "styleRadioButton"}); 
      styleRadioButton.text = "Style"; 
      styleRadioButton.value = true; 

  var fontRadioButton = group2.add("radiobutton", undefined, undefined, {name: "fontRadioButton"}); 
      fontRadioButton.text = "Font"; 

  // MAINPANEL3
  // ==========
  var mainPanel3 = FontBuddy.add("panel", undefined, undefined, {name: "mainPanel3"}); 
      mainPanel3.orientation = "row"; 
      mainPanel3.alignChildren = ["center","center"]; 
      mainPanel3.spacing = 10; 
      mainPanel3.margins = 10; 

  var connectButton = mainPanel3.add("button", undefined, undefined, {name: "connectButton"}); 
      connectButton.text = "Connect To Controller"; 

  var convertButton = mainPanel3.add("button", undefined, undefined, {name: "convertButton"}); 
      convertButton.text = "Convert To Controller"; 

  // MAINPANEL4
  // ==========
  var mainPanel4 = FontBuddy.add("panel", undefined, undefined, {name: "mainPanel4"}); 
      mainPanel4.orientation = "column"; 
      mainPanel4.alignChildren = ["center","top"]; 
      mainPanel4.spacing = 10; 
      mainPanel4.margins = 10; 

  var group1 = mainPanel4.add("button", undefined, undefined, {name: "group1"}); 
      group1.text = "Copy/Paste Animator Properties"; 

  // GROUP2
  // ======
  var group2 = mainPanel4.add("group", undefined, {name: "group2"}); 
      group2.orientation = "row"; 
      group2.alignChildren = ["left","center"]; 
      group2.spacing = 10; 
      group2.margins = 0; 

  var applyAnimatorButton = group2.add("button", undefined, undefined, {name: "applyAnimatorButton"}); 
      applyAnimatorButton.text = "Apply Animator Properties"; 

  var keyframeOffsetButton = group2.add("button", undefined, undefined, {name: "keyframeOffsetButton"}); 
      keyframeOffsetButton.text = "Keyframe Offset"; 

  // MAINPANEL5
  // ==========
  var mainPanel5 = FontBuddy.add("panel", undefined, undefined, {name: "mainPanel5"}); 
      mainPanel5.orientation = "column"; 
      mainPanel5.alignChildren = ["left","top"]; 
      mainPanel5.spacing = 10; 
      mainPanel5.margins = 10; 

  // UNITS
  // =====
  var Units = mainPanel5.add("group", undefined, {name: "Units"}); 
      Units.orientation = "row"; 
      Units.alignChildren = ["left","center"]; 
      Units.spacing = 10; 
      Units.margins = 0; 

  var statictext1 = Units.add("statictext", undefined, undefined, {name: "statictext1"}); 
      statictext1.text = "Units"; 

  var dropdown1_array = ["Percentage","Index"]; 
  var dropdown1 = Units.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
      dropdown1.selection = 0; 

  // BASEDON
  // =======
  var BasedOn = mainPanel5.add("group", undefined, {name: "BasedOn"}); 
      BasedOn.orientation = "row"; 
      BasedOn.alignChildren = ["left","center"]; 
      BasedOn.spacing = 10; 
      BasedOn.margins = 0; 

  var statictext2 = BasedOn.add("statictext", undefined, undefined, {name: "statictext2"}); 
      statictext2.text = "Based On"; 

  var dropdown2_array = ["Characters","Characters Excluding Spaces","Words","Lines"]; 
  var dropdown2 = BasedOn.add("dropdownlist", undefined, undefined, {name: "dropdown2", items: dropdown2_array}); 
      dropdown2.selection = 0; 

  // MODE
  // ====
  var Mode = mainPanel5.add("group", undefined, {name: "Mode"}); 
      Mode.orientation = "row"; 
      Mode.alignChildren = ["left","center"]; 
      Mode.spacing = 10; 
      Mode.margins = 0; 

  var statictext3 = Mode.add("statictext", undefined, undefined, {name: "statictext3"}); 
      statictext3.text = "Mode"; 

  var dropdown3_array = ["Add","Subtract","Min","Max","Difference"]; 
  var dropdown3 = Mode.add("dropdownlist", undefined, undefined, {name: "dropdown3", items: dropdown3_array}); 
      dropdown3.selection = 0; 

  // AMOUNT
  // ======
  var Amount = mainPanel5.add("group", undefined, {name: "Amount"}); 
      Amount.orientation = "row"; 
      Amount.alignChildren = ["left","center"]; 
      Amount.spacing = 10; 
      Amount.margins = 0; 

  var statictext4 = Amount.add("statictext", undefined, undefined, {name: "statictext4"}); 
      statictext4.text = "Amount"; 

  // GROUP3
  // ======
  var group3 = Amount.add("group", undefined, {name: "group3"}); 
      group3.orientation = "row"; 
      group3.alignChildren = ["left","center"]; 
      group3.spacing = 0; 
      group3.margins = 0; 

  var edittext1 = group3.add('edittext {properties: {name: "edittext1"}}'); 
      edittext1.text = "100"; 

  var statictext5 = group3.add("statictext", undefined, undefined, {name: "statictext5"}); 
      statictext5.text = "%"; 

  // GRPSHAPE
  // ========
  var grpShape = mainPanel5.add("group", undefined, {name: "grpShape"}); 
      grpShape.orientation = "row"; 
      grpShape.alignChildren = ["left","center"]; 
      grpShape.spacing = 10; 
      grpShape.margins = 0; 

  var statictext6 = grpShape.add("statictext", undefined, undefined, {name: "statictext6"}); 
      statictext6.text = "Shape"; 

  var dropdown4_array = ["Square","Ramp Up","Ramp Down","Triangle","Round","Smooth"]; 
  var dropdown4 = grpShape.add("dropdownlist", undefined, undefined, {name: "dropdown4", items: dropdown4_array}); 
      dropdown4.selection = 0; 

  // EASEHIGHEASELOW
  // ===============
  var EaseHighEaseLow = mainPanel5.add("group", undefined, {name: "EaseHighEaseLow"}); 
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

  var statictext7 = EaseHigh.add("statictext", undefined, undefined, {name: "statictext7"}); 
      statictext7.text = "Ease High"; 

  // GROUP4
  // ======
  var group4 = EaseHigh.add("group", undefined, {name: "group4"}); 
      group4.orientation = "row"; 
      group4.alignChildren = ["left","center"]; 
      group4.spacing = 0; 
      group4.margins = 0; 

  var edittext2 = group4.add('edittext {properties: {name: "edittext2"}}'); 
      edittext2.text = "0"; 
      edittext2.preferredSize.width = 36; 

  var statictext8 = group4.add("statictext", undefined, undefined, {name: "statictext8"}); 
      statictext8.text = "%"; 

  // EASELOW
  // =======
  var EaseLow = EaseHighEaseLow.add("group", undefined, {name: "EaseLow"}); 
      EaseLow.orientation = "row"; 
      EaseLow.alignChildren = ["left","center"]; 
      EaseLow.spacing = 5; 
      EaseLow.margins = 0; 

  var statictext9 = EaseLow.add("statictext", undefined, undefined, {name: "statictext9"}); 
      statictext9.text = "Ease Low"; 

  // GROUP5
  // ======
  var group5 = EaseLow.add("group", undefined, {name: "group5"}); 
      group5.orientation = "row"; 
      group5.alignChildren = ["left","center"]; 
      group5.spacing = 0; 
      group5.margins = 0; 

  var edittext3 = group5.add('edittext {properties: {name: "edittext3"}}'); 
      edittext3.text = "0"; 
      edittext3.preferredSize.width = 36; 

  var statictext10 = group5.add("statictext", undefined, undefined, {name: "statictext10"}); 
      statictext10.text = "%"; 

  // RANDOMIZEORDER
  // ==============
  var RandomizeOrder = mainPanel5.add("group", undefined, {name: "RandomizeOrder"}); 
      RandomizeOrder.orientation = "row"; 
      RandomizeOrder.alignChildren = ["left","center"]; 
      RandomizeOrder.spacing = 10; 
      RandomizeOrder.margins = 0; 

  var statictext11 = RandomizeOrder.add("statictext", undefined, undefined, {name: "statictext11"}); 
      statictext11.text = "Randomize Order"; 

  var checkbox1 = RandomizeOrder.add("checkbox", undefined, undefined, {name: "checkbox1"}); 

  var seed = RandomizeOrder.add('edittext {properties: {name: "seed"}}'); 
      seed.text = "12345"; 

  FontBuddy.layout.layout(true);
  FontBuddy.layout.resize();
  FontBuddy.onResizing = FontBuddy.onResize = function () { this.layout.resize(); }

  if ( FontBuddy instanceof Window ) FontBuddy.show();



newFontBuddyButton.onClick = function(){
var fontBuddyComp = checkFontBuddyComp();
      fontBuddyComp != undefined ? null() : addFontBuddyCompAndFolder();
}
