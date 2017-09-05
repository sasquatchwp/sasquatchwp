// import Flickity from 'flickity';
// import magnificPopup from 'magnific-popup';
export default {
  init() {
    // JavaScript to be fired on all pages
    $(document).foundation();

    // Flickity
    /*
      var flickity = new Flickity( '.photo-slider', {
        cellAlign: 'center',
        contain: true,
        wrapAround: true,
        pageDots: false,
        autoPlay: true,
        arrowShape: {
          x0: 10,
          x1: 60, y1: 50,
          x2: 60, y2: 45,
          x3: 15
        }
      });
    */

    // Magnific Popup
    /* $('.product-link').magnificPopup({
      type: 'image'
    }); */
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
