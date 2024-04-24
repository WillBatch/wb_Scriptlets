// // Sample SRT content
// var srtContent =
//   " \
// 1\n \
// 00:00:00,300 --> 00:00:01,233\n \
// (XBOX sound)\n \
// \n \
// 2\n \
// 00:00:01,450 --> 00:00:02,400\n \
// Fight I will. \
// ";
var srtFile = File.openDialog("Select an .srt file", "*.srt");
if (srtFile != null) {
  srtFile.open("r");
  var srtContent = srtFile.read();
  srtFile.close();

  // Call your function to parse the SRT content here
  parseSRT(srtContent);
} else {
  alert("No file selected.");
}

// Function to parse SRT content
function parseSRT(srtContent) {
  // Split content by line breaks
  var lines = srtContent.trim().split(/\r?\n/);
  var subtitles = [];
  var currentSubtitle = null;

  // Iterate through each line
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();

    // Check if it's the line with index and timecodes
    if (line.match(/^\d+$/)) {
      if (currentSubtitle !== null) {
        subtitles.push(currentSubtitle);
      }
      currentSubtitle = {
        index: parseInt(line),
        startTime: null,
        endTime: null,
        text: "",
      };
      i++; // Skip the line with timecodes
    } else if (
      line.match(/^\d\d:\d\d:\d\d,\d\d\d --> \d\d:\d\d:\d\d,\d\d\d$/)
    ) {
      // Parse timecodes
      var timecodes = line.split(" --> ");
      currentSubtitle.startTime = parseTimecode(timecodes[0]);
      currentSubtitle.endTime = parseTimecode(timecodes[1]);
    } else if (line !== "") {
      // Add text to current subtitle
      currentSubtitle.text += line + " ";
    }
  }
  // Push the last subtitle into subtitles array
  if (currentSubtitle !== null) {
    subtitles.push(currentSubtitle);
  }
  return subtitles;
}

// Function to parse timecode (HH:MM:SS,MMM)
function parseTimecode(timecode) {
  var parts = timecode.split(/[:,]/);
  var hours = parseInt(parts[0]);
  var minutes = parseInt(parts[1]);
  var seconds = parseInt(parts[2]);
  var milliseconds = parseInt(parts[3]);
  return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

// Usage example
var subtitles = parseSRT(srtContent);
alert(subtitles[2].text); // Output: 2
