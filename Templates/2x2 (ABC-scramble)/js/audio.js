var audioButton = $(".replaybutton span svg");

for (var i = 0; i < audioButton.length; i++) {
  if (audioButton[i].parentNode.parentNode.parentNode.className === "speaker amefile fa fa-volume-up") {
    audioButton[i].style.fill = "#4693db";
  }else if (audioButton[i].parentNode.parentNode.parentNode.className === "speaker brefile fa fa-volume-up") {
    audioButton[i].style.fill = "#fa6360";
  }
}