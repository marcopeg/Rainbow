/**
 * Rainbow
 * ------------------------------
 *
 * 
 */

// jQuery Compatibility Wrapper
;(function($) {

	
	$.rainbow = {
		version: '1.0',
		defaults: {
			
			// List of CSS properties to apply color.
			// May be a string for a single property or an array of properties.
			// [ 'color', 'background' ]
			// 'color'
			//
			// You can set up an empty array to simple step into plugin's color list
			// and use colors inside callbacks.
			applyTo:	'background',
			
			// Callback thrown each color-step.
			// step: { color, colorIdx, cfg }
			stepColor:		function( step ) {},
			
			// Sub callback thrown each property step inside color-step.
			// step: { color, colorIdx, property, propertyIdx, cfg }
			stepProperty:	function( step ) {},
			
			colors:	[
				'#533B75',
				'#7167A6',
				'#9A98C7',
				'#A7027B',
				'#E2017B',
				'#EF8AB4',
				'#BD0926',
				'#E3001B',
				'#EB6B08',
				'#F8B332',
				'#97C00E',
				'#42A62A',
				'#0D8A2E',
				'#58C3ED',
				'#0093D8',
				'#0D3082',
				'#14235C'
			]
		}
	};
	
	
	
	
	/**
	 * jQuery Extension Plugin
	 *
	 * $('p').rainbow()
	 * $('a').rainbow('color');
	 * $('div').rainbow([ 'color', 'borderColor' ]);
	 */
	$.fn.rainbow = function() {
		
		// Proprietˆ di configurazione interna.
		var cfg = $.rainbow.defaults;

		// Estendo la proprietˆ di configurazione con l'oggetto di
		// configurazione contenuto nel primo parametro del plugin.
		if ( !arguments.length || $.isPlainObject(arguments[0]) ) {
		
			cfg = $.extend({}, cfg, arguments[0] );
		
		}
		
		// Legge l'input testuale che indica semplicemente a che proprietˆ
		// applicare il colore.
		if ( arguments.length && (typeof arguments[0]) == 'string' ) {
			
			cfg = $.extend({},cfg,{ applyTo:arguments[0] });
		
		}
		
		
		// An array of propery is passed to the plugin
		if ( arguments.length && (typeof arguments[0] == 'object') && arguments[0].constructor == Array ) {
			
			cfg.applyTo = arguments[0];
		
		}
		
		
		// Convert "applyTo" param to an array of properties.
		if ( (typeof cfg.applyTo) == 'string' ) cfg.applyTo = [ cfg.applyTo ];
		
		
		// Applico la logica agli elementi del contesto (DOM)
		$(this).each(function( idx ){
			
			var colorIdx 	= idx%cfg.colors.length;
			var color 		= cfg.colors[colorIdx];
			
			for ( var i=0; i<cfg.applyTo.length; i++ ) {
				
				$(this).css( cfg.applyTo[i], color );
				
				cfg.stepProperty.call( this, {
					color: 			color,
					colorIdx:		colorIdx,
					property: 		cfg.applyTo[i],
					propertyIdx:	i,
					cfg:			cfg
				});
				
			}
			
			cfg.stepColor.call( this, {
				color:			color,
				colorIdx:		colorIdx,
				cfg:			cfg
			});
			
		});
		
		// Mantengo la possibilitˆ di concatenare plugins.
		return this;
	
	}; // EndOf: "$.fn.rainbow()" ###
	
	
	
	
	

})(jQuery);