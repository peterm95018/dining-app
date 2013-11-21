UCSC Mobile Dining App
======================

1. Get setup with yo, grunt, bower. http://yeoman.io/gettingstarted.html
2. Get git installed on your local machine. You may need to get Homebrew installed first. http://brew.sh
3. Clone this repo to your local machine. <code>git clone https://github.com/peterm95018/dining-app.git</code>
4. Run the commands:
<code>npm install</code>
 then run
 <code>bower update</code>
5. You should now have all the files and dependencies we'll need to run a dev copy.
6. Run <code>grunt server</code> to get a local copy running.
7. Make changes to our html files and commit your changes.

I see that we don't have a compiled leaflet.js file. cd into app/bower_components/leaflet/dist and run the commands <code>npm install -g jake</code>
then run
<code>npm install</code>

This creates the compiled leaflet.js file. The bower folks are working on this. Alternatively, we could hard code the leaflet zip file from their download pages.

Peter
