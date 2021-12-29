"use strict";

const output = document.createElement( "output" ),

	seconds2Timestring = total_seconds => {
  	let remaining_seconds = total_seconds % 60,
      m = ( total_seconds - remaining_seconds ) / 60,
      minutes = m % 60,
      hours = ( m - minutes ) / 60;
  	return [
    	( hours ? `${hours}`.padStart( 2, "0" ) : "" ),
    	`${minutes}`.padStart( 2, "0" ),
    	`${Math.floor( remaining_seconds )}`.padStart( 2, "0" )
  	].filter( i => i ).join( ":" );
	},

	timestringArray2Seconds = arr => {
  	return arr.reduce( ( a, timestring ) => {
    	let ts = timestring.split( ":" ),
        lo = 0, siah = 0;
    	if ( ts.length === 3 ) {
      	siah = parseInt( ts[ 0 ] ) * 3600;
      	lo = 1;
    	}
    	return a + siah + ( parseInt( ts[ lo + 0 ] ) * 60 ) + parseInt( ts[ lo + 1 ] );
  	}, 0 );
	},

	timestringArray2Timestring = arr => seconds2Timestring( timestringArray2Seconds( arr ) );

let stats, playlist, cplt, plt, interval = window.setInterval( () => {
	if ( stats = document.querySelector( "#stats" ) ) {
		window.clearInterval( interval );
		output.title = "Playlist may not be fully displayed; scroll to end for true total";
		output.style.marginBottom = "0.5em";
		output.style.fontSize = "120%";
		output.style.display = "block";
		stats.prepend( output );
		console.log( "YouTubePlaylistLength: Initialized." );
		interval = window.setInterval( () => {
			if ( playlist = document.querySelectorAll( 'ytd-browse.ytd-page-manager[page-subtype="playlist"] span.ytd-thumbnail-overlay-time-status-renderer' ) ) {
				cplt = timestringArray2Timestring( Array.from( playlist ).map( t => t.textContent.trim() ) );
				if ( cplt !== plt ) {
					output.textContent = `Total time: ${plt = cplt}`;
				}
			}
		}, 250 );
	}
}, 250 );
