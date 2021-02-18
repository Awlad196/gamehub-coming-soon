/*-----------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/  

(function($) {

   /*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
   $(window).load(function() {

      // will first fade out the loading animation
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });

  	})

   /*----------------------------------------------------*/
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input').placeholder()


   /*----------------------------------------------------- */
   /* Modals
   ------------------------------------------------------- */
   $('.modal-toggles ul').on('click', 'a', function(e) {

   	var html = $('html'),
   		 main = $('main, footer'),
   		 footer = $('footer'),
          curMod = $(this).attr('href'),
          modal = $(curMod),
          modClose = modal.find('#modal-close');

		main.fadeOut(500, function(){
			$('html,body').scrollTop(0);
        	modal.addClass('is-visible');
      });

      e.preventDefault();

      // for old ie
      if (html.hasClass('oldie')) {

      	$(document).on('click', "#modal-close", function(evt) {
	      	$('html,body').scrollTop(0);
	      	modal.removeClass('is-visible');
	      	setTimeout(function() {
	        		main.fadeIn(500);
	        	}, 500);

	        	evt.preventDefault();
      	});

      }
      // other browsers
      else {

      	modClose.on('click', function(evt) {
	      	$('html,body').scrollTop(0);
	      	modal.removeClass('is-visible');
	      	setTimeout(function() {
	        		main.fadeIn(500);
	        	}, 500);

	        	evt.preventDefault();
	      });

      }

   });

   /*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        items: 4,
        navigationText: false
    });


   /*----------------------------------------------------*/
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	  $('main h1, #mod-about h1').fitText(1.1, { minFontSize: '28px', maxFontSize: '38px' });

  	}, 100);


   /*---------------------------------------------------- */
   /* ajaxchimp
	------------------------------------------------------ */

	// Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
	var mailChimpURL = 'https://augnitive.us1.list-manage.com/subscribe/post-json?u=e2d00cff2bad38f7f490de594&id=5d0bccaf01'


		// I only have one form on the page but you can be more specific if need be.
		var $form = $('form');

	if ( $form.length > 0 ) {
		$('form input[type="submit"]').bind('click', function ( event ) {
			if ( event ) event.preventDefault();
			// validate_input() is a validation function I wrote, you'll have to substitute this with your own.
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (regex.test($('#mce-EMAIL').val())) {
				$('.subscribe-message').text("");
				register($form);
			} else {
				$('.subscribe-message').text("Please enter valid email address");
			}
		});
	}

	function register($form) {
		$.ajax({
			type: 'GET',
			url: mailChimpURL,
			data: $form.serialize(),
			cache       : false,
			dataType    : 'jsonp',
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				$('.subscribe-message').text("Submitting ...");
			},
			error       : function(err) { $('.subscribe-message').text("Thanks for subscribing."); },
			success     : function(data) {
				$('.subscribe-message').text("Thanks for subscribing.");
			}
		});
	}
})(jQuery);
