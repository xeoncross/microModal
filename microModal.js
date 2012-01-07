/**
 * microModal
 *
 * A tiny jQuery modal plugin which does NOT require existing DOM elements.
 *
 * @author David Pennington <http://xeoncross.com>
 * @see http://github.com/JordanAdams/Modalite/
 * @see http://flaviusmatis.github.com/easyModal.js/
*/
(function($) {

	$.microModal = function(content, options)
	{
		var defaults = {
			title: null,
			footer: '<button class="modal-close btn">close</a>',
			theme: null,
			top: null,
			width: null,
			speed: 200,
			overlayClose: true,
			closeOnEscape: true,
			closeButtonClass: '.modal-close',
			onOpen: false,
			onClose: false
		}

		var o = $.extend(defaults, options);

		// Create overlay
		var $overlay = $('<div class="modal-overlay ' + o.theme + '"></div>').appendTo('body');

		// Create modal
		var $modal = $('<div class="modal ' + o.theme + '"></div>');

		// Custom width?
		if(o.width) $modal.width(o.width);

		// Content can be an object or a DOM string - so we must apend
		var $content = $('<div class="modal-content"></div>').append(content);

		if(o.title)
		{
			$modal.append('<div class="modal-header"><a href="#" class="modal-close">&times;</a><h3>' + o.title + '</h3></div>');
		}

		$modal.append($content);

		if(o.footer)
		{
			$modal.append('<div class="modal-footer">' + o.footer + '</div>');
		}

		// Now append it to the body
		$modal.appendTo('body');

		$modal.css({
			'display': 'none',
			'position' : 'fixed',
			'z-index': 2001,
			'left' : 50 + '%',
			'top' : parseInt(o.top) > -1 ? o.top + 'px' : 50 + '%',
			'margin-left' : -($modal.outerWidth()/2) + 'px',
			'margin-top' : (parseInt(o.top) > -1 ? 0 : -($modal.outerHeight()/2)) + 'px'
		});


		// Open the modal and run the callback
		$modal.bind('openModal', function(e)
		{
			$(this).css('display', 'block');
			$overlay.fadeIn(o.speed, function()
			{
				if (o.onOpen && typeof(o.onOpen) === 'function')
				{
					// onOpen callback receives as argument the modal window
					o.onOpen($modal[0]);
				}
			});
		}).trigger('openModal');

		// close the modal and run the callback
		$modal.bind('closeModal', function(e)
		{
			$(this).css('display', 'none').remove();
			$overlay.fadeOut(o.speed, function()
			{
				$overlay.remove();
				if (o.onClose && typeof(o.onClose) === 'function')
				{
					// onClose callback receives as argument the modal window
					o.onClose($modal[0]);
				}
			});
		});

		// Close on overlay click
		$overlay.click(function()
		{
			if (o.overlayClose) $modal.trigger('closeModal');
		});

		// Close on ESCAPE key press
		$(document).keydown(function(e)
		{
			if (o.closeOnEscape && e.keyCode == 27) $modal.trigger('closeModal');
		});

		// Close when button pressed
		$modal.find(o.closeButtonClass).click(function(e)
		{
			$modal.trigger('closeModal');
			e.preventDefault();
		});
	}

})(jQuery);
