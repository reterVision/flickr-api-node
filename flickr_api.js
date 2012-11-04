// Flickr API Wrapper
// Author: Gao Chao
// Created Date: 2012/11/03

var request = require('request')
	, sys = require('sys')
	, $ = require('jquery')

var flickr_url = "http://api.flickr.com/services/"

var service_type = {
	REST : "rest/",
	XMLRPC : "xmlrpc/",
	SOAP : "soap/"
}

var flickr_apikey = "&api_key={Your API_KEY}"

var urls = {
	flickr_photos_search : "?method=flickr.photos.getRecent"
}

exports.flickr_photos_search = function(format, has_geo, per_page, extras, callback) {
	var request_url = flickr_url + service_type.REST + urls.flickr_photos_search
		+ flickr_apikey + "&format=" + format + "&has_geo=" + has_geo + "&per_page=" + per_page
		+ "&extras="

	for(i=0; i<extras.length; i++) {
		request_url += extras[i]
		request_url += ","
	}

	console.log("[Request From Flickr] : " + request_url)

	$.ajax({
        url: request_url,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        success: function(data) {
            callback(data)
        }
    });
}