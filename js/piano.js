"use strict";

var audioContext = new AudioContext();
var osc;
var mouseDownFlag = false;
var touchKeysPlaying = new Map();

function setupOscillator(key) {
  var localOsc = audioContext.createOscillator();
  localOsc.type = "sine";
  localOsc.frequency.value = Math.pow(2, (key - 49) / 12) * 440;
  localOsc.connect(audioContext.destination);
  localOsc.start(audioContext.currentTime);
  return localOsc;
}

function playkey(key) {
  osc = setupOscillator(key);
}

function stopkey() {
  if (osc) {
    osc.stop(audioContext.currentTime);
  }
}

function reconcileTouches(currentTouches) {
  // stop playing any keys not currently pressed
  touchKeysPlaying.forEach(function(value, key) {
    var found = false;
    currentTouches.forEach(function(item, index, array) {
      if(Number(item.target.id) == key) {
        found = true;
      }
    });
    if(!found) {
      value.stop(audioContext.currentTime);
      touchKeysPlaying.delete(key);
    }
  });
  // start playing new pressed keys
  currentTouches.forEach(function(item, index, array) {
    var keyid = Number(item.target.id);
    if(!touchKeysPlaying.has(keyid)) {
      var newOsc = setupOscillator(keyid);
      touchKeysPlaying.set(keyid, newOsc);
    }
  });
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
    reconcileTouches(e.touches);
  });
  $(".key").on("touchmove", function(e) {
    e.preventDefault();
    reconcileTouches(e.touches);
  })
  $(".key").on("touchend", function(e) {
    e.preventDefault();
    reconcileTouches(e.touches);
  });
});