var col;
var hex;
var clip;
var auto;
var speed;
var looping = false;
var lightness = "95%";

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
      setSpeedBars();
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

  $('#clock-tog').click(function(e) {
    e.preventDefault();
    $('#clock').toggleClass('hide');
  });

  clock();
});

function clock() {
  $('#clock').html(moment().format('h:mm A'));
  setTimeout(function() { clock(); }, 500);
}

function updateButtons() {
  if (!auto) {
    $('#auto-check').html('');
    $('#gen').html('generate');
  } else {
    $('#auto-check').html('check');

    setSpeedBars();

    //start loop
    if (!looping) {
      looping = true;
      changeColor();
    }
  }
}

function setSpeedBars() {
  var sbars = "|";
  sbars = sbars.repeat(speed);
  $('#gen').html('speed: ' + sbars);
}

function setValues() {
  chrome.storage.sync.set({'auto': auto });
  chrome.storage.sync.set({'speed': speed });
}

function changeColor() {
  col = parseInt(Math.random() * 360); //randomize color

  $('body').css('background-color', 'hsl(' + col + ', 100%, ' + lightness + ')'); //set color

  hex = '#' + tinycolor('hsl(' + col + ', 100%, ' + lightness + ')').toHex(); //translate to hex
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

    }, (6 - speed)*1000);
  } else {
    looping = false;
  }
}
