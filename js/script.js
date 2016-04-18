var col;
var hex;
var clip;

$(document).ready(function() {
  
  //setup copy
  clip = new Clipboard('#text');
  
  changeColor();
  
  $('#gen').click(function() {
    changeColor();
  });
  
  clip.on('success', function(e) {
    $('#text').html(hex + ' - copied');
  });
});

function changeColor() {
  col = parseInt(Math.random() * 360); //randomize color

  $('body').css('background-color', 'hsla(' + col + ', 100%, 90%, 1)'); //set color
  
  hex = '#' + tinycolor('hsl(' + col + ', 100%, 90%)').toHex(); //translate to hex
  $('#text').html(hex); //set text
}