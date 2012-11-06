var geocoder
    , map
    , currentStreet

function retrieveStreetView(x,y) {    
    geocoder = new google.maps.Geocoder()
    currentStreet = new google.maps.LatLng(x,y)
    var mapOptions = {
        scrollwheel: true,
        zoomControl: true,
        streetViewControl: false,
        center: currentStreet,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions)

    var marker = []
    $.ajax({
        type: 'GET',
        url: '/get_photos',
        dataType: 'json',
        success: function(data) {
            for(i=0; i<data.length; i++) {
                marker.push(new google.maps.Marker({
                    position: new google.maps.LatLng(
                        data[i].photo_latitude,
                        data[i].photo_longitude),
                    map: map,
                    icon: new google.maps.MarkerImage(
                        data[i].photo_url, null, null, null, new google.maps.Size(42, 42))
                }))
            }
        }
    });
}