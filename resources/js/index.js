
( function ( mw, netw ) {
	"use strict"

	mw.hook( 'wikipage.content' ).add( function( $content ) {
		$content.find( 'div.network-visualization' ).each( function() {
			let $this = $( this );

			let network = new netw.Network(
				$this.attr('id'),
				new netw.ApiPageConnectionRepo(),
				new netw.PageBlacklist($this.data('exclude'))
			);

			network.showPages($this.data('pages'));
		} );
	} );

}( window.mediaWiki, module ) );

window.NetworkExtension = module;
