"use strict";

var audioContext = new AudioContext();
var osc;
var mouseDownFlag = false;

function playkey(key) {
  osc = audioContext.createOscillator();
  osc.type = "sine";
  osc.frequency.value = Math.pow(2, (key - 49) / 12) * 440;
  osc.connect(audioContext.destination);
  osc.start(audioContext.currentTime);
}

function stopkey() {
  if (osc) {
    osc.stop(audioContext.currentTime);
  }
}

$(function() {
  $(".key").on("mousedown", function() {
    mouseDownFlag = true;
    var keyid = $(this).attr("id");
    playkey(keyid);
  });
  $(".key").on("mouseup", function() {
    mouseDownFlag = false;
    stopkey();
  });
  $(".key").on("mouseenter", function() {
    if (mouseDownFlag) {
      stopkey();
      var keyid = $(this).attr("id");
      playkey(keyid);
    }
  });
  $(".key").on("mouseout", function() {
    stopkey();
  });
  $(window).mouseup(function() {
    mouseDownFlag = false;
  });
  $(".key").on("touchstart", function(e) {
    e.preventDefault();
    var keyid = $(this).attr("id");
    playkey(keyid);
  });
  $(".key").on("touchend", function(e) {
    e.preventDefault();
    stopkey();
  });
});