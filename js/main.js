$(document).ready(function(){

  /* * * * * * * * * * * * * * *
   * Toggle nav menu content
   * * * * * * * * * * * * * * */
  $('#nav-menu-image').on("click", function() {
    $('#nav-menu-content').toggle();
  });

  $('#nav-cross').on("click", function(){
    $('#nav-menu-content').toggle();
  });

  /* * * * * * * * * * * * * * *
   * Bind hover so that it's touch friendly
   *  on mobile device
   * * * * * * * * * * * * * * */
  $('.hover').bind('touchstart touchend', function(e) {
    e.preventDefault();
    $(this).toggleClass('hover_effect');
  })

});
