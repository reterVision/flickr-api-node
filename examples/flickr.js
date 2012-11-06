// Geo-Flickr Server

var express = require('express')
	, app = express()
	, cons = require('consolidate')
	, flickr_api = require('../lib/flickr').flickr_api
	, sys = require('sys')

// Set logger.
app.use(express.logger())

// assign the swig engine to .html files
app.engine('html', cons.swig);

// set .html as the default extension 
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public', {redirect: false}));
app.use(express.bodyParser());

app.get('/', function(req, res){
	res.render('index', {
    	title: 'Geographic Flickr'
  	})
})

app.get('/get_photos', function(req, res){
    // Structure to store retrieved photo information.
    function photo_entity(photo_url, photo_latitude, photo_longitude) {
        this.photo_url = photo_url
        this.photo_latitude = photo_latitude
        this.photo_longitude = photo_longitude
    }
    var photos = []

    // Retrieve photo content from Flickr.
    flickr_api.flickr_photos_search(
        'json',         // Indicate responded JSON stream.
        1,              // Includes the geo-data with the photo returned.
        1000,           // Return 1000 photos per page.
        ['url_m, geo'], // Set extra request content to retrieve geo-data and image-url
        function(data){
        	var photo_count = 0

	        // Parse the returned photo stream.
	        for(i=0; i<data.photos.photo.length;i++) {
	        	if(data.photos.photo[i].latitude !== 0 &&
	        		data.photos.photo[i].longitude !== 0) {
		            photos.push(new photo_entity(
		                data.photos.photo[i].url_m, 
		                data.photos.photo[i].latitude,
		                data.photos.photo[i].longitude
		            ))
		        	photo_count++
	    		}
	    		if(photo_count == 20) {
	    			break
	    		}
	        }
	        console.log("Finished extracting photos")
	        console.log(sys.inspect(photos))
    		res.json(photos)
        }
    )
})

var port = process.env.PORT || 5000
app.listen(port, function(){
	console.log("Listening on " + port)
})
