"use strict";

console.log( '%cThe browser extension "YouTube Playlist Length", from https://github.com/FredGandt/YouTubePlaylistLength, is installed and enabled.', "color:#088" );

const seconds2Timestring = total_seconds => {
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

	outputOutput = ( op, pl ) => {
		let optc = op.textContent,
			pltt = timestringArray2Timestring( Array.from( pl.querySelectorAll( "span#text" ) ).map( t => t.textContent.trim() ) );
		if ( optc !== pltt ) {
			op.textContent = `Total time: ${pltt}`;
		}
	},

	timestringArray2Timestring = arr => seconds2Timestring( timestringArray2Seconds( arr ) ),

	output = document.createElement( "output" );

output.title = "limitation: the total time is calculated from the times of only the displayed videos and it is possible that not all playlisted videos are displayed";
output.style.color = "var(--yt-spec-text-secondary)";
output.style.display = "block";

let playlist, stats, playlist_output,
	watch, publisher, watch_output,
	pltt, npltt, ph,
	interval = window.setInterval( () => {

		watch = watch || document.querySelector( "#page-manager ytd-playlist-panel-renderer" );
		playlist = playlist || document.querySelector( "#page-manager ytd-browse" );
		publisher = publisher || watch?.querySelector( "#publisher-container" );
		stats = stats || playlist?.querySelector( "#stats" );

		if ( !playlist_output && stats ) {
			playlist_output = output.cloneNode();
			playlist_output.style.marginBottom = "0.5em";
			playlist_output.style.fontSize = "120%";
			stats.prepend( playlist_output );
		}

		if ( !watch_output && publisher ) {
			watch_output = output.cloneNode();
			watch_output.style.fontSize = "150%";
			publisher.before( watch_output );
		}

		if ( playlist_output && playlist && !playlist.hidden ) {
			outputOutput( playlist_output, playlist );
		}

		if ( watch_output && watch && ( !playlist || playlist.hidden ) ) {
			outputOutput( watch_output, watch );
		}

	}, 250 );
