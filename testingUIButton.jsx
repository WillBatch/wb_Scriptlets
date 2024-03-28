// Temporary value for Image Binary Data
var imageOne =
  "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01ZIDAT8\u008D\u00A5\u0094\u00C1u\u00C20\x10D?y\u00B9SB\u00D2\x01N\x05Y:\u00A0\x03\u009C\x0E\u00E8 \u00D0\u0081;\u00C0\u00E9\u0080T\u00C0P\x01\u00A4\u0082\u00C4\x1D\u0084\n\u009C\u0083%\u00B3\u00D8F\u00C0\u00CB\u009C\u00EC\u00D5\u00EAk$\u00EDjT\u00D75]IZ\x009P\u0098Y\u00D9KH\u00E8\u00E1B|\x06L\u0080\u00B5\x1A\u00D9\x7F\u0081^\u00AF\u00C0VR)\u00E9\u00F9Z\u00F2\u00A8\u00BBeI\x19\u00B0\u00BF\u0090\x7F\u00A49\u0086\u00E5M\x0E\x03L\t\x03c\u00E0=\u00E5\u00B0\x05:\u00D885\x01\u00F8psf\u00DDc\u00F0\x0E\u008B+\u00B0\x1D\u00F0bf\u00B9\u008B-\u0081oI\u008A\u0081Q]\u00D7\u0084[\u00DC\u00BA\u00C4\u00A3\u0083W\u00C0\u00C2\u00CC6\u00DD\x15$\u00F9\x0B\u0098\u009A\u0099\u00A2C\u00BF\u00EAgX\u00B9\x02V@6\x04s\u00AE\u00A3r\u0080\u00C7\u00F0\u0093\u00B9\u00812\x00\u008A\x0B\x10\u00AF\u0082\u00A6\u00ACZFt8qI\u00BA\x014\u0094;\u00F1\u00C0Vf\u00F6{\x07\u00B0\u00A7\b\u00AC\u00DA%\u00EFh3\u00CE\u008F\u00AA\u00F2\u00C0\u0083\x1B\u00C8\u00EF\x00\u00FA\\y\u00A0\u00BF\u00C5y(\u00F2\u00A4B\u00CE\u00DC\u00856\u00E0zY\u00D2\x0F\u00F0\x14\x06\u008F\u0080\u0099\u0099w\u00DE\u0085\u0089S\u00AD~\u0099Y\x06\u00A7\u00B2\u0089\u00F6cq\u008F\u0081\u00BD\u00A4\x15\u00B0\u0089\u00E0\x00\u009A\u00D1\u00EF\u00E7<~\u009C\u00BD6\u0092r`\u009D\u00DA\u00EA\u0080\u00DE\u00FC#|V6a`\u008A\u00BB\u00F5\u0084*\u009Av+}\u00B0\u00F7\x1EF\x05\u00B79\u00A7N\u0088\u00DA\u00D1tS\u00C9\u0080\u00FE\x00\u00C7\u00AB\u008A\x01\u00C5\u00C5\u00C7\u00B8\x00\x00\x00\x00IEND\u00AEB`\u0082";

// Function to create and show the UI
function createUI() {
  var win = new Window("palette", "My Script UI", undefined);

  // Create a panel to hold the button
  var panel = win.add("panel", undefined);

  // Create a button
  var btn = panel.add("iconbutton", undefined, imageOne);

  // Set the size of the button
  btn.size = [20, 20]; // Adjust size as needed
  btn.style = "button";

  // Set the button's background image using the binary data

  // btn.image = new File("F:/icons/01.png");

  // Add a click event listener to the button
  btn.onClick = function () {
    alert("Button clicked!");
  };

  // Show the window
  win.show();
}

// Call the function to create and show the UI
createUI();
