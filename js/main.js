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
    e.preventDefault;
    $(this).toggleClass('hover_effect');
  });

  // $('#nav-menu-content li').on('click', function(){
  //   if ($(this).children('ul').css('display') == 'block') {
  //     $(this).children('ul').css('display', 'none');
  //   }
  //   else {
  //     $(this).children('ul').css('display', 'none');
  //   }
  // });

});
