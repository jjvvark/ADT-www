jQuery(function($) {
	$(document).ready( function() {
	
		$("#logo").backstretch( [ "images/jumbo-bg.jpg" ] , { fade: 920 });

		$(".menu-wrapper a").click( function( e ) {
			$("body").scrollTo( $(this).attr("href"), 500 , { offset: { top:-50, left: 0 } } );
			e.preventDefault();
		} );
		
// 		$('.image-popup-vertical-fit').magnificPopup({
// 			type: 'image',
// 			closeOnContentClick: true,
// 			mainClass: 'mfp-img-mobile',
// 		
// 			image: {
// 				verticalFit: true
// 			}
// 		
// 		});

$('.popup-gallery-beeldhouwen').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		}
	});

$('.popup-gallery-tekeningen').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		}
	});

$('.popup-gallery-fotografie').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		}
	});
		
// 		$(document).scroll( function() {
		
// 			varscroll = parseInt($(document).scrollTop());
// 			currentHeight = parseInt(  $(window).height() );
// 
// 			if( varscroll > currentHeight - 230 ) {
// 				
// 				$("#stick").addClass( "fixed" );
// 				
// 			} else {
// 			
// 				$("#stick").removeClass( "fixed" );
// 			
// 			}

	// 		$('.page-title h3').each(function() {
// 			
// 				var ePos = $(this).offset().top - $(window).scrollTop();
// 				var value; 
// 				
// 				if( ePos < 0 ) {
// 				
// 					value = 0.2;
// 					
// 				} else if( ePos > 140 ) {
// 				
// 					value = 1;
// 				
// 				} else {
// 				
// 					value = ( ( ( ePos - 0 ) / 140 ) * .8 ) + 0.2;
// 				
// 				}
// 				
// 				$(this).css( "opacity", value );
// 				
// 			})
			
// 			if( varscroll <= 0 ) {
// 				$(".pijl").css( "opacity", 1 );
// 			} else {
// 				$(".pijl").css( "opacity", 0 );
// 			}
			
						
// 		});

	});
  });
