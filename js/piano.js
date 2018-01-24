"use strict";

var audioContext = new AudioContext();
var osc;

function playkey(key)
{
  osc = audioContext.createOscillator();
  osc.type = "sine";
  osc.frequency.value = Math.pow(2, (key-49)/12)*440;
  osc.connect(audioContext.destination);
  osc.start(audioContext.currentTime);
}

function stopkey()
{
  osc.stop(audioContext.currentTime);
}

$(function() {
  $(".key").on("mousedown", function() {
    var keyid = $(this).attr("id");
    playkey(keyid);
  });
  $(".key").on("touchstart", function() {
    var keyid = $(this).attr("id");
    playkey(keyid);
  });
  $(".key").on("mouseup", function() {
    stopkey();
  });
  $(".key").on("touchend", function() {
    stopkey();
  });
});