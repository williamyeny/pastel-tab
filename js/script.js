var col;
var hex;

$(document).ready(function() {
  changeColor();
  
  $('#gen').click(function() {
    changeColor();
  });
});

function changeColor() {
  col = parseInt(Math.random() * 360);

  $('body').css('background-color', 'hsla(' + col + ', 100%, 90%, 1)');
  
  hex = '#' + tinycolor('hsl(' + col + ', 100%, 90%)').toHex();
  $('#text').html(hex);
}