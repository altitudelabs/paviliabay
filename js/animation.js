$(document).ready(function() {

var $animation_elements = $('.animation-element');
var $window = $(window);

// check if element is in view and then apply animation
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
      $element.find('.clubhouse-text').removeClass('fade');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');



// MODAL
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

// CLUBHOUSE SECTION
$('.clubhouse-blue-box').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  function(e) {

  $('.clubhouse-text').addClass('fade');
  $('.clubhouse-image-container').addClass('fade');

});

var changeClubhouseContent = function (currentSection) {
  // $.ajax({
  //   url : ajax_object.ajax_url,
  //   type : 'GET',
  //   data: { 
  //     action: "my_action_callback",
  //     current: currentSection
  //   },
  //   success : function(response) {
  //     $('.club-title-text').html(response.titleText);
  //     $('.club-description-text').text(response.contentText);
  //     // $('.clubhouse-image-container').css('background-image', 'url(response.image)');
  //     // $('#clubImage').attr('src','images/clubhouse-section/6_facade1.jpg');
  //     $('.link-text').text(response.linkText);
  //     $('#clubhouse-section').data('id', response.titleText)
  //   },
  //   error: function(error){
  //       alert(error);
  //   }
  // });
  var clubhouseText = ['Blue Pavilion - Hong Kong\'s first residential clubhouse ',
    'embodied with distinctive superyacht features. The pioneering Blue Pavilia is designed ',
    'by the international renowned superyacht designer Philippe Briand. ',
    'It features a swimming pool, a kids pool, three jacuzzis, three saunas, ',
    'a Multi- Intelligence Playscape, a gym, a Billiard room and two function rooms.'].join('');
  var facadeText = ['Inspired by the optimal proportion of hull and superstructure of superyacht ',
    'the two buildings are embodied with curtain walls and constructed with sleek and clean outlines. ',
    'The distinctive design idea of the buidling\'s roof comes from the mainsail of a sailing yacht ',
    'during its wind propulsion, creating a prominent figure among the others.'].join('');
  var interiorText = ['THE PAVILIA BAY comprises 983 units of residences and features a range ',
    'of layouts to suit residents\' needs, varying from studio to 4-bedroom units. Exquisite residences ',
    'range in saleable area from 306 sq. ft. to 1,366 sq. ft.. The bathrooms and kitchens are well-equipped ',
    'with a selection of international renowned appliances to provide the bespoke settings with ',
    'contempporary design '].join('');

  if (currentSection == 'clubhouse') {
  	$('.club-title-text').html('the <br> facade');
  	$('.club-description-text').text(facadeText);
    // $('.clubhouse-image-container').css('background-image', 'url(images/clubhouse-section/6_facade1.jpg)');
  	// $('#clubImage').attr('src','images/clubhouse-section/6_facade1.jpg');
  	$('.link-text').text('The Interior >');
    $('#clubhouse-section').data('id', 'facade')
  } else if (currentSection == 'facade') {
    $('.club-title-text').html('the <br> interior');
    $('.club-description-text').text(interiorText);
    // $('.clubhouse-image-container').css('background-image', 'url(images/clubhouse-section/9_interior2.jpg)');
    // $('#clubImage').attr('src','images/clubhouse-section/9_interior2.jpg');
    $('.link-text').text('The Clubhouse >');
    $('#clubhouse-section').data('id', 'interior')
  } else {
    $('.club-title-text').html('the <br> clubhouse');
    $('.club-description-text').text(clubhouseText);
    // $('.clubhouse-image-container').css('background-image', 'url(images/clubhouse-section/club1.jpg)');
    // $('#clubImage').attr('src','images/clubhouse-section/club1.jpg');
    $('.link-text').text('The Facade >');
    $('#clubhouse-section').data('id', 'clubhouse')
  }
}

// On click, change section title, text, image and link
$('.link-text').on('click', function() {
  $animation_elements.removeClass('in-view');
  $animation_elements.removeClass('fade');
  setTimeout(function() {
    changeClubhouseContent($('#clubhouse-section').data('id'));
      $window.trigger('scroll');
  }, 700);
});

});
