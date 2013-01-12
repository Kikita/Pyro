/* Basic Application Scripts */

/**::::::::::[  FEATURE SLIDER  ]::::::::::**/

var bootstrapSlider = {
	init: function(slider, navigation){
		
		// initiate the carousel objects
		slider = $(slider);
		navigation = $(navigation);
		slides = $('.item', slider);
		slider.carousel();
		
		// create navigation link for each slide
		slides.each(function(index){
			var slide = $(this);
			
// 			MY EDIT HERE!!!
			navigation.append('<li class="slider-nav"><a href="#">&#8226;</a></li>');
			

// 			navigation.append('<li class="slider-nav"><a href="#">'+(index+1)+'</a></li>');			
			var myLink = $('.slider-nav', navigation).eq(index);
			// create updating nav titles for each slide
			bootstrapSlider.slideTitles[index] = slide.attr('title');
			slide.removeAttr('title');
			
			// adds click function for each corresponding slide
			myLink.bind('click', function(e){
				e.preventDefault();
				slider.carousel(index);
				$('.slider-nav').removeClass('active');
				$('.slider-nav a').removeClass('baseBg');
				$(this).addClass('active');
				$('a', this).addClass('baseBg');
			});
			// set first link to active on load
			if(!index) {
				myLink.addClass('active');
				$('a', myLink).addClass('baseBg');
				$('.slider-title').html(bootstrapSlider.slideTitles[0]);
			}
			
		});
		
		// assign 'next' api command to any object with class of 'next'
		$('.next', navigation).bind('click', function(e){
			e.preventDefault();
			slider.carousel('next');
		});

		// assign 'prev' api command to any object with class of 'prev'
		$('.prev', navigation).bind('click', function(e){
			e.preventDefault();
			slider.carousel('prev');
		});
		
		// update nav on carousel 'slid' event
		slider.bind('slid', function(e){
			var slides = $('.item', slider);
			var navies = $('.slider-nav', navigation);
			var links = $('.slider-nav a', navigation);
			var count = $('.slider-count');
			// update active navigation link
			slides.each(function(index){
				var slide = $(this);
				if(slide.hasClass('active')){
					navies.removeClass('active');
					links.removeClass('baseBg');
					navies.eq(index).addClass('active');
					links.eq(index).addClass('baseBg');
					count.html('Slide '+(index+1)+' <em>of</em> '+slides.length+':');
					$('.slider-title').html(bootstrapSlider.slideTitles[index]);
				}
			});
		});
		
	},
	slideTitles: new Array()
};

/**::::::::::[  TESTIMONIALS OBJECT  ]::::::::::**/

var testimonials = {
	init: function(transitionSpeed, animationSpeed){
		
		// set delay between testimonials (miliseconds)
		if(typeof transitionSpeed === 'undefined') transitionSpeed = 7000;
		if(typeof animationSpeed === 'undefined') animationSpeed = 250;
		
		// grab testimonial objects
		testimonials.testies = $('.testimonials .testy');
		
		// fade in first testy
		testimonials.testies.each(function(){
			if($(this).hasClass('active')) $(this).fadeIn(animationSpeed);
		});
		
		setInterval(function(){
			
			// loop testy back to begining
			var next = testimonials.current + 1;
			if(next == testimonials.testies.length) next = 0;
			
			// animate current testy out, animate current testy in
			testimonials.testies.each(function(){
				if($(this).hasClass('active')){
					$(this).fadeOut(animationSpeed, function(){
						$(this).removeClass('active');
						testimonials.testies.eq(next).addClass('active').fadeIn(animationSpeed);
					});
				}
			});	
			
			testimonials.current++;
			
			// reset count to 0
			if(testimonials.current == testimonials.testies.length) testimonials.current = 0;
			
		}, transitionSpeed);
	},
	testies: [],
	current: 0	
};

/**::::::::::[  TWITTER FEED OBJECT  ]::::::::::**/

var twitterFeed = {
	init: function(twitterUsername){
		$.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=' + twitterUsername + '&count=1&callback=?', function(data)      {
			var tweet = data[0].text;
			var timeago = twitterFeed.getTime(data[0].created_at);
			var twitterDiv = $(".twitter.widget");
			// process links and reply
			tweet = tweet.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(url) {
				return '<a href="'+url+'">'+url+'</a>';
			}).replace(/B@([_a-z0-9]+)/ig, function(reply) {
				return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
			});
			// output the results
			$(".testy", twitterDiv).html(tweet);
			$(".posted", twitterDiv).html(timeago);
			$(".twitter-follow-button", twitterDiv).load('../twitter-button.html');
		});
	},
	getTime: function(tweetTime){
		var seconds = Math.floor((new Date() - new Date(tweetTime)) / 1000);
		var interval = Math.floor(seconds / 31536000);
		if(isNaN(interval)) return false;
		var heading = 'Tweeted ';
		if (interval > 1) return heading + interval + " years ago";
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) return heading + interval + " months ago";
		interval = Math.floor(seconds / 86400);
		if (interval > 1) return heading + interval + " days ago";
		interval = Math.floor(seconds / 3600);
		if (interval > 1) return heading + interval + " hours ago";
		interval = Math.floor(seconds / 60);
		if (interval > 1) return heading + interval + " minutes ago";
		return heading + Math.floor(seconds) + " seconds ago";
	}
};

/**::::::::::[  TEXT INPUT UPDATE SCRIPT  ]::::::::::**/

var autoReplace = {
	init: function(c){
		$('input[type=text], textarea').addClass('empty').focus(function(e){
			if(this.value == this.defaultValue){
				this.value = "";
			}
			$(this).addClass('focus').removeClass('empty');
		}).blur(function(e){
			if($.trim(this.value) === ""){
				this.value = this.defaultValue;
				$(this).addClass('empty');
			}
			$(this).removeClass('focus');
		});
		return this;
	},
};

/**::::::::::[  AJAX CONTACT FORM SCRIPT  ]::::::::::**/

var contactForm = {
	init: function(form){
		$(form).live('submit', function(e){
			e.preventDefault();
			var form = $(this);
			var action = form.attr('action');
			// set bot protection form field
			var firstname = $('input[name="fname"]', form).val();
			// set each of the 4 form field values
			var nameVal = $('input[name="name"]', form).val();
			var emailVal = $('input[name="email"]', form).val();
			var subjectVal = $('input[name="subject"]', form).val();
			var messageVal = $('textarea[name="message"]', form).val();
			// prevent duplciate submissions
			form.off('submit');
			// post data to form action
			$.post(action, { 
				firstname: firstname,
				name: nameVal,
				email: emailVal,
				subject: subjectVal,
				message: messageVal
			},
				// when data is received from post action
				function(data){
					$('.response', form).html(data);
					// confirm success from contact.php (LINE 60)
					if(data.match('Success! Message Sent.') != null) {
						$('.response', form).addClass('success');
						// reset all form field values
						$('input[type=text], textarea', form).each(function(){
							$(this).val(this.defaultValue);
						});
						form.unbind('submit').removeAttr('action').removeAttr('method');
					}else{
						form.on('submit');
					}
				}
			);
			return false; 
		});
	}
};

/**::::::::::[  DOM READY SCRIPTS  ]::::::::::**/

$(document).ready(function(){

	// load contact form validation & submission
	contactForm.init('#contact-us form');
	
	// load slider object - accepts slider object and navigation object	
	bootstrapSlider.init('.carousel', '.colRight .controls');
	
	// load testimonial widget
	testimonials.init();

	// load twitter widget
	twitterFeed.init('dairien');
	
	// replace all default text input values
	autoReplace.init();

	// assigns 'next' API command to link
	$('#controls .next').bind('click', function(e){
		e.preventDefault();
		pageScroller.next();
	});
	
	// assigns 'previous' API command to link		
	$('#controls .prev').bind('click', function(e){
		e.preventDefault();
		pageScroller.prev();
	});
	
	// trigger page scroller to contact-us section
	$('a[href$="contact-us"]').bind('click', function(e){
		e.preventDefault();
		pageScroller.goTo(4);
	});

	// trigger page scroller to introduction section
	$('a[href$="top"]').bind('click', function(e){
		e.preventDefault();
		pageScroller.goTo(1);
	});

	// load pretty photo
	$('.prettyphoto').attr('rel', 'prettyPhoto[gallery2]').prettyPhoto({
		animation_speed:'fast',
		slideshow:10000,
		hideflash: true,
		deeplinking: false
	});

});