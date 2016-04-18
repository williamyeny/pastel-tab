var col;
var hex;
var clip;
var auto;
var speed;

$(document).ready(function() {
  
  //setup copy
  clip = new Clipboard('#text');
  
  //setup auto 
  auto = false;
  speed = 1;
  
  changeColor();
  
  $('#gen').click(function(e) {
    e.preventDefault();
    if (!auto) {
      changeColor(); //if it's on manual, just change
    } else {
      if (speed == 5) { //max speed value
        speed = 0;
      }
      speed++;
      $('#gen').html('speed: ' + speed);
    }
  });

  $('#tog').click(function(e) {
    e.preventDefault();
    if (auto) {
      $('#tog').html('auto');
      $('#gen').html('generate');
      auto = false;
    } else {
      $('#tog').html('manual');
      $('#gen').html('speed: '+ speed);
      auto = true;
      changeColor();
    }
  });
  
  clip.on('success', function(e) {
    $('#text').addClass('copied');
  });
});

function changeColor() {
  col = parseInt(Math.random() * 360); //randomize color

  $('body').css('background-color', 'hsla(' + col + ', 100%, 90%, 1)'); //set color
  
  hex = '#' + tinycolor('hsl(' + col + ', 100%, 90%)').toHex(); //translate to hex
  $('#text').html(hex); //set text
  $('#text').removeClass('copied'); //clear ' - copied'
  
  //auto-generate colors
  setTimeout(function() {
    if (auto) {
      changeColor();
    }
  }, speed*1000);
}