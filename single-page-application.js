jQuery(function($) {
  
  //Watch all ajax activity
  $(document).ajaxStop(function() {
    
    clearInterval(_lb.interval);
    $("#loading-bar")[_lb.direction]("101%");

    /**
     * Waits until css transition is finished and removes element from the DOM
     */
    setTimeout( function() {
      $("#loading-bar").fadeOut(300, function() {
        $(this).remove();
      $(".loadingOverlay").css("display", "none");
      });
    }, 300);

  });

});

/**
 * Main object
 */
var _lb = {}

//Default loading bar position
_lb.position  = 'top';
_lb.direction = 'width'

/**
 * Ajax call
 * accepts callback( response )
 */
_lb.get = function(url, callback) {

  _lb.loading = true;

  jQuery.ajax({
    url: url, // Replace with the actual URL you want to load
    success: function(response) {
      _lb.loading = false;
      if (typeof(callback) === 'function') {
        callback(response);
      }
    }
  });
}

jQuery(function($) {

  $(document).on('click', 'a', function(event) {
    event.preventDefault();
    
    var clickedAnchor = $(this); // Store the value of $(this)

    if ($(this).data('action') === 'load') {


      if ($('#loading-bar').length === 0) {

      $('body').append( $('<div/>').attr('id', 'loading-bar').addClass(_lb.position) );
      $(".loadingOverlay").css("display", "block");

      /**
       * Random loading bar initial percentage
       */
      _lb.percentage = Math.random() * 30 + 30;
      $("#loading-bar")[_lb.direction](_lb.percentage + "%");

      /**
       * Bump loading percentage between current and 99%
       */
      _lb.interval = setInterval(function() {
        
        _lb.percentage = Math.random() * ( (100-_lb.percentage) / 2 ) + _lb.percentage;
        
        $("#loading-bar")[_lb.direction](_lb.percentage + "%");
        
      }, 500);

    }

    setTimeout(function() {
  _lb.get(clickedAnchor.attr('href'), function(response) {
    document.write(response);
    document.close();
    window.history.pushState(
      { additionalInformation: 'Updated the URL with JS' },
      "",
      clickedAnchor.attr('href') // Use the stored value
    );
  });
}, 1000);


    } else {

      if ($('#loading-bar').length === 0) {

      $('body').append( $('<div/>').attr('id', 'loading-bar').addClass(_lb.position) );
      $(".loadingOverlay").css("display", "block");

      /**
       * Random loading bar initial percentage
       */
      _lb.percentage = Math.random() * 30 + 30;
      $("#loading-bar")[_lb.direction](_lb.percentage + "%");

      /**
       * Bump loading percentage between current and 99%
       */
      _lb.interval = setInterval(function() {
        
        _lb.percentage = Math.random() * ( (100-_lb.percentage) / 2 ) + _lb.percentage;
        
        $("#loading-bar")[_lb.direction](_lb.percentage + "%");
        
      }, 500);

    }
      
      // Handle the case where data-action is not 'load'
      setTimeout(function() {
  _lb.get(clickedAnchor.attr('href'), function(response) {
    document.write(response);
    document.close();
    window.history.pushState(
      { additionalInformation: 'Updated the URL with JS' },
      "",
      clickedAnchor.attr('href') // Use the stored value
    );
  });
}, 1000);
    }
  });

});