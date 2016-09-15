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
});
