$(document).ready(function() {
  changeColor();
  
  $('#gen').click(function() {
    changeColor();
  })
});

function changeColor() {
  $('body').css('background-color', 'hsla(' + parseInt(Math.random() * 360) + ', 100%, 90%, 1)');
}