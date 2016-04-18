var col;
var hex;
var clip;
var auto;
var speed;
var looping = false;

$(document).ready(function() {
  
  //setup copy
  clip = new Clipboard('#text');
  
  changeColor();
  
  //default values
  auto = false;
  speed = 3;
  
  //setup stored variables
  chrome.storage.sync.get('auto', function(data) {
    auto = data.auto || auto;
    console.log(auto);
    updateButtons();
  });

  chrome.storage.sync.get('speed', function(data) {
    speed = data.speed || speed;
    updateButtons();
  })
  
  $('#gen').click(function(e) {
    e.preventDefault();
    if (!auto) {
      if (!looping) {
        changeColor(); //if it's on manual, just change
      }
    } else {
      if (speed == 5) { //max speed value
        speed = 0;
      }
      speed++;
      $('#gen').html('speed: ' + speed);
      setValues();
    }
  });

  $('#tog').click(function(e) {
    e.preventDefault();
    auto = !auto; //invert auto 
    setValues(); //save values to Chrome
    updateButtons();
  });
  
  clip.on('success', function(e) { //on finish copy
    $('#text').addClass('copied');
  });
});

function updateButtons() {
  if (!auto) {
    $('#tog').html('auto');
    $('#gen').html('generate');
  } else {
    $('#tog').html('manual');
    $('#gen').html('speed: ' + speed);
    
    //start loop
    if (!looping) {
      looping = true;
      changeColor();
    } 
  }
}

function setValues() {
  chrome.storage.sync.set({'auto': auto });
  chrome.storage.sync.set({'speed': speed });
}

function changeColor() {
  col = parseInt(Math.random() * 360); //randomize color

  $('body').css('background-color', 'hsla(' + col + ', 100%, 90%, 1)'); //set color
  
  hex = '#' + tinycolor('hsl(' + col + ', 100%, 90%)').toHex(); //translate to hex
  $('#text').html(hex); //set text
  $('#text').removeClass('copied'); //clear ' - copied'
  
  //auto-generate colors is option is enabled
  if (auto) { 
    setTimeout(function() {
      
      if (auto) {
        changeColor(); 
      } else {
        looping = false;
      }
      
    }, speed*1000);
  } else {
    looping = false;
  }
}