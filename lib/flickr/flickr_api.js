// Flickr API Wrapper
// Author: Gao Chao
// Created Date: 2012/11/03

var request = require('request'),
	sys = require('sys'),
	$ = require('jquery');


function flickr_api() {

}

flickr_api.prototype.flickr_api_url = "http://api.flickr.com/services/";
flickr_api.prototype.flickr_apikey = "&api_key={ADD_YOUR_APIKEY}";

flickr_api.prototype.service_type = {
	REST : "rest/",
	XMLRPC : "xmlrpc/",
	SOAP : "soap/"
};

flickr_api.prototype.urls = {
	// photos
	flickr_photos_getRecent: "?method=flickr.photos.getRecent",

	// Favorites
	flickr_favorites_getContext: "?method=flickr.favorites.getContext",
	flickr_favorites_getList: "?method=flickr.favorites.getList",
	flickr_favorites_getPublicList: "?method=flickr.favorites.getPublicList"
};

flickr_api.prototype.request_methods = {
	GET: "GET",
	POST: "POST"
};

flickr_api.prototype.basic_url = function(url) {

	return this.flickr_api_url + this.service_type.REST + url + this.flickr_apikey;
};

flickr_api.prototype.request_api = function(url, method, callback) {

	$.ajax({
        url: url,
        type: method,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        success: function(data) {
            callback(data);
        }
    });
};

flickr_api.prototype.flickr_photos_getRecent = function(format, has_geo, per_page, extras, callback) {

	var request_url = this.basic_url(this.urls.flickr_photos_getRecent);
	request_url += "&format=" + format + "&has_geo=" + has_geo + "&per_page=" + per_page + "&extras=";

	for(i=0; i<extras.length; i++) {
		request_url += extras[i];
		request_url += ",";
	}

	this.request_api(request_url, this.request_methods.GET, callback);
};

// Favorites APIs
flickr_api.prototype.flickr_favorites_getContext = function(format, photo_id, user_id, callback) {

	var request_url = this.basic_url(this.urls.flickr_favorites_getContext);
	request_url += "&photo_id=" + photo_id + "&user_id=" + user_id;

	this.request_api(request_url, this.request_methods.GET, callback);
};

flickr_api.prototype.flickr_favorites_getList = function(format, user_id, min_fave_date, max_fave_date, extras, per_page, page, callback) {

	var request_url = this.basic_url(this.urls.flickr_favorites_getList);
	if (min_fave_date) {
		request_url += "&min_fave_date=" + min_fave_date;
	}
	if(max_fave_date) {
		request_url += "&max_fave_date=" + max_fave_date;
	}
	for (i=0; i<extras.length; i++) {
		request_url += extras[i];
		request_url += ",";
	}
	if (per_page) {
		request_url += "&per_page=" + per_page;
	}
	if (page) {
		request_url += "&page=" + page;
	}

	this.request_api(request_url, this.request_methods.GET, callback);
};

flickr_api.prototype.flickr_favorites_getPublicList = function(format, user_id, min_fave_date, max_fave_date, extras, per_page, page, callback) {

	var request_url = this.basic_url(this.urls.flickr_favorites_getPublicList);
	if (min_fave_date) {
		request_url += "&min_fave_date=" + min_fave_date;
	}
	if(max_fave_date) {
		request_url += "&max_fave_date=" + max_fave_date;
	}
	for (i=0; i<extras.length; i++) {
		request_url += extras[i];
		request_url += ",";
	}
	if (per_page) {
		request_url += "&per_page=" + per_page;
	}
	if (page) {
		request_url += "&page=" + page;
	}

	this.request_api(request_url, this.request_methods.GET, callback);
};

exports.flickr_api = flickr_api;
