$(document).ready(function() {
  var classList = ['slide1', 'slide1', 'slide1'];
  var imgSlider = new Swiper('.slide-container .swiper-container', {
    loop: false,
    autoplay:true,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    on: {
      init: function() {
        var index = this.activeIndex; // current slide index
        $('.slide-container')
          .removeClass(classList)
          .addClass(classList[index]);

        $('.slide-container .img-wrapper')
          .removeClass('active')
          .eq(index)
          .addClass('active');
      }
    }
  }).on('slideChange', function() {
    var index = this.activeIndex; // current slide index
    $('.slide-container')
      .removeClass(classList)
      .addClass(classList[index]);
    $('.slide-container .img-wrapper')
      .removeClass('active')
      .eq(index)
      .addClass('active');
  });
  $(window).on('resize', function() {
    imgSlider.update();
  });
});
