# YouTubePlaylistLength
Displays the total length of YouTube playlists on their pages (e.g. https://www.youtube.com/playlist?list=PLeMK2ffi7KQV3EWSzuMI4j-KbGG7JfJKd (Prostrate at the Feet of Giants by Fred Gandt)) and on their sidebar when playing them (e.g. https://www.youtube.com/watch?v=ylRkDv4ofqQ&list=PLeMK2ffi7KQV3EWSzuMI4j-KbGG7JfJKd (Why Can't I Touch Carolyn's Rock Steady Puppet Fingers? by Fred Gandt))

The total time is calculated from the lengths of the videos listed in the HTML which, for **long playlists, may require scrolling** to load them all before the true total is displayed. In some cases, **very long playlists may never be entirely displayed** and in those cases, the script will not be able show the correct total time.

YouTube's HTML holds to no common standards (literally hundreds of identical `#id`s for example) so reading the page as is shifts about is quite fiddly. There almost certainly are better ways to go about this and someone else may have done that; **if you can find a nicer script, I recommend you use it** instead of this kludgy mess ;)
