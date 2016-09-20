$(document).ready(function() {

var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
      $element.find('.text').removeClass('fade');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

$('.slide-left').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
  function(e) {

  $('.text').addClass('fade');
  $('.clubhouse-image-container').addClass('fade');

});

// Get the modal
var modal = document.getElementById('imageModal');

// Get the image and insert it inside the modal
var img = $('.image');
var modalImg = document.getElementById("modalContent");
img.on('click', function(){
  modal.style.display = "block";
  modalImg.src = this.src;
});

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on <span> (x), close the modal
// span.on('click', function() { 
//   modal.style.display = "none";
// });

var changeClubhouseContent = function (currentSection) {
  if (currentSection == 'clubhouse') {
  	$('.clubTitle').html('the <br> facade');
  	$('.clubText').text('TESTING');
  	$('.clubImage').attr('src','images/clubhouse-section/6_facade1.jpg');
  	$('.clubLink').text('The Interior');
    $('#clubhouse-section').data('id', 'facade')
  } else if (currentSection == 'facade') {
    $('.clubTitle').html('the <br> interior');
    $('.clubText').text('TESTING2');
    $('.clubImage').attr('src','images/clubhouse-section/9_interior2.jpg');
    $('.clubLink').text('The Clubhouse');
    $('#clubhouse-section').data('id', 'interior')
  } else {
    $('.clubTitle').html('the <br> clubhouse');
    $('.clubText').text('TESTING1');
    $('.clubImage').attr('src','images/clubhouse-section/club1.jpg');
    $('.clubLink').text('The Facade');
    $('#clubhouse-section').data('id', 'clubhouse')   
  }
}

$('.section-change').on('click', function() { 
  $('.animation-element').removeClass('in-view');
  $('.animation-element').removeClass('fade');
  changeClubhouseContent($('#clubhouse-section').data('id'));
  $window.trigger('scroll');
});

});
