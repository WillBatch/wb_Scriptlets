var mainWindow = new Window("palette", "Mouse", undefined);
var button = mainWindow.add("button", undefined, "GO");




mainWindow.center();
mainWindow.show();

button.addEventListener("keydown", alertKey);

function alertKey(){
    var keyState = ScriptUI.environment.keyboardState;
    if(keyState.altKey){
        return true
    }
}

button.onClick = function (){
    if(alertKey() == true){
        alert("Yay");
    }
}