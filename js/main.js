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
			if (regex.test($('#mce-EMAIL').val())) {register($form);}
		});
	}

	function register($form) {
		console.log("submitiing");
		$.ajax({
			type: 'GET',
			url: mailChimpURL,
			data: $form.serialize(),
			cache       : false,
			dataType    : 'jsonp',
			contentType: "application/json; charset=utf-8",
			error       : function(err) { console.log(err); },
			success     : function(data) {
				if (data.result != "success") {
					$('.subscribe-message').text("Something went wrong");
				} else {
					$('.subscribe-message').text("Thanks for subscribing.");
				}
			}
		});
	}

	/*---------------------------------------------------- */
	/* Map
	------------------------------------------------------ */
	var latitude = 14.549072,
		 longitude = 121.046958,
		 map_zoom = 15,		 
		 main_color = '#d8ac00',
		 saturation_value= -30,
		 brightness_value= 5,
		 winWidth = $(window).width();		 

   // marker url
	if ( winWidth > 480 ) {
		marker_url = 'images/icon-location-b.png';                    
   } else {
      marker_url = 'images/icon-location.png';            
   }	 

	// map style
	var style = [ 
		{
			// set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{ saturation: saturation_value }
			]
		},  
	   {	// poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			// don't show highways lables on the map
	      featureType: 'road.highway',
	      elementType: 'labels',
	      stylers: [
	         { visibility: "off" }
	      ]
	   }, 
		{ 	
			// don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{ visibility: "off" } 
			] 
		},
		{ 
			// don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{ visibility: "off" }
			] 
		},
		{
			// don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{ visibility: "off" }
			]
		}, 
		// style different elements on the map
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}
	];
		
	// map options
	var map_options = {

      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: 15,
      	panControl: false,
      	zoomControl: false,
        	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style

    	};

   // inizialize the map
	var map = new google.maps.Map(document.getElementById('map-container'), map_options);

	// add a custom marker to the map				
	var marker = new google.maps.Marker({

		 	position: new google.maps.LatLng(latitude, longitude),
		 	map: map,
		 	visible: true,
		 	icon: marker_url
		 
		});

	// add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
	
		// grap the zoom elements from the DOM and insert them in the map 
	 	var controlUIzoomIn= document.getElementById('map-zoom-in'),
		  	 controlUIzoomOut= document.getElementById('map-zoom-out');

		controlDiv.appendChild(controlUIzoomIn);
		controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
			map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
			map.setZoom(map.getZoom()-1)
		});
			
	}

	var zoomControlDiv = document.createElement('div');
	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

	// insert the zoom div on the top right of the map
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);	



})(jQuery);