this.myLatitude = 0;
this.myLongitude = 0;

function searchGroceryStoreHere(arealat, arealong, areaname){

  var output = document.getElementById("output-pre-maps");
  var outputLatitude = document.getElementById("latitude");
  var outputLocation = document.getElementById("locationname");
  var outputLongitude = document.getElementById("longitude");
  var inputlocation = document.getElementById("yourlocation");

  var latitude  = arealat;
  var longitude = arealong;

  globalLat = arealat;
  globalLong = arealong;

  outputLatitude.innerHTML = latitude;
  outputLongitude.innerHTML = longitude;

  window.mylat = latitude;
  output.innerHTML = "";

        /**     GOOGLE MAPS THING
       *
       */
      
    var mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 13
    };
    map = new google.maps.Map(document.getElementById("maps"),  mapOptions);
    
    // ADDING THE MARKER ON THE CENTER
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    // To add the marker to the map, use the 'map' property
    
    

    var myPosition = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: areaname
    });

    //displaying thing
    console.log("Saya di bagian searchGroceryStoreHere()  masih dijalankan....");
    
    getMapDekatSaya(latitude, longitude, placesType,DEFAULT_RADIUS,"1", "maps");  


    //infowindow marker lokasi
    var infowindow = new google.maps.InfoWindow({maxWidth:350});
    infowindow.setContent("<strong>You Are Here</strong><br />"+areaname+" <br/> Lat : " + arealat.toFixed(5) + " |  Long : " + arealong.toFixed(5) + "<br/>" +' </a>');
    infowindow.open(map, myPosition);

    var textbooklocation = document.getElementById("yourlocation");
    textbooklocation.value = areaname;

}


function myCurrentLocation() {
  var output = document.getElementById("output-pre-maps");
  var outputLatitude = document.getElementById("latitude");
  var outputLocation = document.getElementById("locationname");
  var outputLongitude = document.getElementById("longitude");
  var outputAltitude = document.getElementById("altitude");
  var outputAccuracy = document.getElementById("accuracy");
  var inputlocation = document.getElementById("yourlocation");


  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    globalLat = position.coords.latitude;
    globalLong = position.coords.longitude;

   
    
    outputLatitude.innerHTML = latitude;
    outputLongitude.innerHTML = longitude;
    outputAltitude.innerHTML = position.coords.altitude;
    outputAccuracy.innerHTML = position.coords.accuracy;

    window.mylat = latitude;
    output.innerHTML = "";

    //output.innerHTML = '<p>Latitude is ' + latitude + 'Â° <br>Longitude is ' + longitude + 'Â°</p>';
    

        /**     GOOGLE MAPS THING
         *
         */
        
      var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 13
      };
      map = new google.maps.Map(document.getElementById("maps"),  mapOptions);
      
      // ADDING THE MARKER ON THE CENTER
      var myLatlng = new google.maps.LatLng(latitude,longitude);
      // To add the marker to the map, use the 'map' property
      
      

      var myPosition = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title:"YOU ARE HERE!!!"
      });

      //displaying thing
      console.log("Saya di bagian success()  masih dijalankan....");
      
      getMapDekatSaya(latitude, longitude, placesType,DEFAULT_RADIUS,"1", "maps");


      
      // GEOCODER IS USED TO GET THE LOCATION NAME FROM AN COORDINATES
        var geocoder;
        var marker;
        var infowindow = new google.maps.InfoWindow({maxWidth:350});
        
        var accuracyStatus;
        if(position.coords.accuracy<100){
           accuracyStatus = "<strong style=\"color:green;\"><span class=\"glyphicon glyphicon-ok\"></span>Accuracy : "+position.coords.accuracy.toFixed(0)+" (Good)</strong>";
        }
        else{
           accuracyStatus = "<strong style=\"color:red;\"><span class=\"glyphicon glyphicon-warning-sign\"></span>Accuracy : "+position.coords.accuracy.toFixed(0)+" m (Poor)</strong>";
        }
        
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': myLatlng}, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
           if (results[1]) {
             map.setZoom(13);
             marker = new google.maps.Marker({
                 position: myLatlng,
                 map: map
             }); //end marker
             
             
             infowindow.setContent("<strong>You Are Here</strong><br />"+results[1].formatted_address+" <br/> Lat : " + latitude.toFixed(5) + " |  Long : " + longitude.toFixed(5) + "<br/>" + accuracyStatus+""+' </a>');
             infowindow.open(map, marker);
             outputLocation.innerHTML = results[1].formatted_address;
             var textbooklocation = document.getElementById("yourlocation");
             textbooklocation.value = results[1].formatted_address;
             
           }
         } else {
           alert("Couldn't determine your location name due to: " + status);
         } //end else
         
       }); //end geocoder
        
       if(position.coords.accuracy > 1000){
          outputAccuracy.style.color = "red";
          outputAccuracy.style.fontWeight = "900";
       }
       else{
          outputAccuracy.style.color = "green";
          outputAccuracy.style.fontWeight = "900";
          //alert("This is our best estimates of your location...");
          //navigator.geolocation.clearWatch(watchid);
          return;
       }




       
      
  };  //end function success

  function error() {
    output.innerHTML = '<div class="alert alert-danger"><h4>Sorry, we are Unable to retrieve your location yet. <br />If you use smartphone, please Turn on your GPS and Refresh This page.</h4></div>';
     $("#pleasewait").hide(500);
     $("#pleasewaitmaps").hide(500);
    //var myip = document.getElementById("ipNumber").innerHTML;
    
    }

  
  var geo_options = {
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 27000
    };

  output.innerHTML = '<p>Please wait, we are detecting your location...</p>';

  navigator.geolocation.getCurrentPosition(success, error, geo_options);
  //var watchid = navigator.geolocation.watchPosition(success, error, geo_options);
  //alert("wpid : " + wpid);
}


function calculateDistance(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d; // meters
}


function getMapDekatSaya(mylat, mylong, jenis,radius,status, mapsId, iconMarker) {
   
    //$("#lister").html("mari me-list ada apa aja disini <br/>");
    console.log("sekarang ada di bagian getMapDekatSaya");

    var lat = mylat;
    var lng = mylong;    
    var iterator = 0;
    var markers = [];
    var markerLatLng = [];
    var contentString = [];

    //clearMarkers();
    //markers = [];
    //define for ajax
    var $url = "tempatasearch.php";
    var data = "lat="+lat+"&lng="+lng+"&jenis="+jenis+"&radius="+radius+"&status="+status;

    
    console.log($url+'?'+data);
    var nexttoken;


   
    //=================================
    //   DOING THE AJAX CALLS HERE
    //=================================
    $.getJSON($url,data,function(results){

      console.log("AJAX calls...yuhuuu");


      var placesResults = null;
      placesResults = results.results;
      
      showOnList(placesResults, "#lister");


      $("#pleasewait").hide(500);
      $("#pleasewaitmaps").hide(500);

      //console.log("AWAL " + new Date());
      //setTimeout(getNextPage(results.next_page_token),2000);

      if(results.next_page_token != ""){
      
        //showing the next button if there is still next 
        $("#showNextTokenMaps").show(500);
        $("#showNextToken").show(500);

        globalToken = results.next_page_token;
        console.log("token = " + globalToken);
      }
      else{
        //hiding the next button after loaded if no more token
        $("#showNextTokenMaps").hide(500);
        $("#showNextToken").hide(500);
      }
      
     
    });
    
   
}


//============================================
//  GET NEXT PAGE TOKEN - menampilkan next places list lalu menambahkannya ke lister
//============================================

function getNextPage(nexttoken){
        // ========= IF THERE IS NEXT PAGE (NEXT 20 ITEMS) =========
      //here come the again, if the next page token still available
      // ===================================  
      if(nexttoken != ""){
        var nexturl = "tempatanext.php";
        var nextdata = "token="+nexttoken;  
        console.log("DALAM FUNGSI nexttoken " + nextdata + " pada " + new Date());        

        //$("#consolelog").append(nexturl+"?"+nextdata);

        //jQuery.ajaxSetup({async:false});


        $.getJSON(nexturl,nextdata,function(nextresults){

            console.log("ini DALAM FUNGSI nexttoken " + new Date());
            var newPlacesResults = nextresults.results;
            console.log(newPlacesResults);
            //alert akan dipanggil jika berhasil next token.. 

            // alert(newPlacesResults[0].name);
            // console.log(newPlacesResults[0]);
            showOnList(newPlacesResults, "#lister");

            $("#pleasewait").hide(500);
            $("#pleasewaitmaps").hide(500);

            if(nextresults.next_page_token != ""){
          
                globalToken = nextresults.next_page_token;
                console.log("NEW Token = " + globalToken);
                //showing the next button if there is still next 
                $("#showNextTokenMaps").show(500);
                $("#showNextToken").show(500);
            }
            else{
              //hiding the next button after loaded
              $("#showNextTokenMaps").hide(500);
              $("#showNextToken").hide(500);
            }

            if (globalCountLoadMore >= 2){
              $("#showNextTokenMaps").hide(500);
              $("#showNextToken").hide(500); 
            }

        });
        
      }
}

//===============================================
// MENAMPILKAN MARKER KE DALAM PETA GOOGLE MAPS
//===============================================

function addMarker(mapsId, theLat,theLong, thePlacesName, thePlacesId, markerIcon){
    // ADDING THE MARKER ON THE CENTER
      var myLatlng = new google.maps.LatLng(theLat,theLong);
      // To add the marker to the map, use the 'map' property      

      
      var tempataPlaces = new google.maps.Marker({
        position: myLatlng,
        map: mapsId,
        icon:markerIcon,
        animation: google.maps.Animation.DROP,
        title:thePlacesName
      });

      var teksku="<div class=\"scrollFix\">";
      teksku += "<a href=\"detail/"+thePlacesId+"/"+globalLat+"/"+globalLong+"/"+thePlacesName+"\" target=\"_blank\">";
      teksku += "<strong>"+thePlacesName+"</strong><br/>Click for Details</a></div>";

      tempataPlaces.content = teksku;

      

      google.maps.event.addListener(tempataPlaces, 'click', function() {
          infoWindowMarker.setContent(this.content);
          infoWindowMarker.open(this.getMap(),this);
      });

}

// ===============================================
//MENAMPILKAN HASIL DARI API KE DALAM LISTER TABLE
//================================================
function showOnList(placesResults, targetId){
    var i = 0;
    
    for(i=0; i<placesResults.length;i++){
      
      // SHOW PLACES IN LIST SECTION
      var teksLister = '<tr><td width="50">';
      
      numberList++;
      teksLister += numberList;
      teksLister += '</td><td>';

      //get photos.... and display it.. 
      if(placesResults[i].photos != null){
        teksLister += '<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=50&photoreference='+placesResults[i].photos[0].photo_reference+'&key=AIzaSyDR_8y6SHg6EhFVV7q4cs7t8yeRiQ5RSjo" width="50">'; 
      }

      teksLister += '</td><td>';

      var placeslat = placesResults[i].geometry.location.lat;
      var placeslong = placesResults[i].geometry.location.lng;
      
      var distance = calculateDistance(placeslat, placeslong, globalLat, globalLong);

      //kilometer to mile 
      distance = distance * 0.62137;

  
      teksLister += '<h3>' + placesResults[i].name +" </h3>";
      teksLister += "<span>" + "(" + distance.toFixed(1) + " Miles)" + placesResults[i].vicinity + "</span>";
      teksLister += '</td><td width="100">';        

      //get the button linking to detail
      teksLister += '<a target="_blank" href="detail/'+placesResults[i].place_id+'/'+globalLat+'/'+globalLong+'/'+placesResults[i].name+'" class="btn btn-primary">Detail</a>';

      

      teksLister += "</td></tr>";


      $(targetId).append(teksLister);
        
      // === GENERATING THE MARKER ON MAPS...
      //preparing
      var theLat = placesResults[i].geometry.location.lat;
      var theLong = placesResults[i].geometry.location.lng;
      var thePlacesName = placesResults[i].name;
      var thePlacesId = placesResults[i].place_id;

      
      //compiling marker icon
      var myiconMarker = "";
      var thePlacesType = placesResults[i].types;
      var getMarker = defineIcon(thePlacesType[0]);
      console.log("lagi di icon nih" + PATH_TO_ICON + "/"+getMarker);
      myiconMarker = PATH_TO_ICON + "/"+getMarker;

      //adding marker to maps
      //addMarker(map, theLat,theLong, placesResults[i].name, placesResults[i].place_id, myiconMarker);
      

      
      addMarker(map, theLat,theLong, placesResults[i].name, placesResults[i].place_id, myiconMarker)
      
    }
}


function donothing(){
  //it just do nothing
  console.log(Date());
}

// =================================================
//   MENENTUKAN FILE ICON BERDASARKAN TIPE TEMPAT
//  ICON tributes to https://mapicons.mapsmarker.com/
// ==================================================
function defineIcon(placesType){
    var iconMarker = "";

    switch(placesType){

    // ============ ICON PENGINAPAN
      case "lodging"      : 
          iconMarker = "hotel_0star.png"; 
          break;
      case "establishment"      : 
          iconMarker = "lodging_0star.png"; 
          break;
    
    // =========== ICON MAKANAN
     case "food" : 
          iconMarker = "cafetaria.png";
          break;
     case "bakery" : 
          iconMarker = "bread.png";
          break;
     case "cafe" : 
          iconMarker = "fastfood.png";
          break;
     case "restaurant" : 
          iconMarker = "restaurant.png";
          break;
    case "meal_delivery" : 
          iconMarker = "fooddeliveryservice.png";
          break;
    case "meal_takeaway" : 
          iconMarker = "takeaway.png";
          break;
    case "bar" : 
          iconMarker = "bar_coktail.png";
          break;

    // =========== ICON MEDIS
    case "hospital"   : 
          iconMarker = "hospital-building.png";
          break;
    case "doctor"   : 
          iconMarker = "firstaid.png";
          break;
    case "pharmacy"   : 
          iconMarker = "medicine.png";
          break;
    case "dentist"   : 
          iconMarker = "dentist.png";
          break;
  
    
    // =========== ATM ==========
    case "atm"   : 
          iconMarker = "atm-2.png";
          break;

    // =========== BANK ==========
    case "bank"   : 
          iconMarker = "bank.png";
          break;

    // =========== PUBLIC SERVICE ==========    
    case "post_office"   : 
          iconMarker = "postal.png";
          break;
    case "school"   : 
          iconMarker = "school.png";
          break;
    case "library"   : 
          iconMarker = "book.png";
          break;
    case "stadium"   : 
          iconMarker = "stadium.png";
          break;
    case "museum"   : 
          iconMarker = "arch.png";
          break;
    case "city_hall"   : 
          iconMarker = "congress.png";
          break;
    case "university"   : 
          iconMarker = "university.png";
          break;
    case "cemetery"   : 
          iconMarker = "memorial.png";
          break;
    case "funeral_home"   : 
          iconMarker = "bank.png";
          break;


    // =========== GOVERNMENT ==========    
    case "local_government_office"   : 
          iconMarker = "conference.png";
          break;
    case "courthouse"   : 
          iconMarker = "court.png";
          break;
    case "lawyer"   : 
          iconMarker = "court.png";
          break;
    case "embassy"   : 
          iconMarker = "embassy.png";
          break;


    // =========== EMERGENCY ==========    
    case "fire_station"   : 
          iconMarker = "firemen.png";
          break;
    case "police"   : 
          iconMarker = "police.png";
          break;
    case "electrician"   : 
          iconMarker = "expert.png";
          break;
    case "health"   : 
          iconMarker = "firstaid.png";
          break;


    // =========== TRANSPORTATION ==========
    case "subway_station"   : 
          iconMarker = "underground.png";
          break;
    case "taxi_stand"   : 
          iconMarker = "taxi.png";
          break;
    case "bus_station"   : 
          iconMarker = "busstop.png";
          break;
    case "train_station"   : 
          iconMarker = "train.png";
          break;
    case "travel_agency"   : 
          iconMarker = "bank.png";
          break;
    case "airport"   : 
          iconMarker = "airport.png";
          break;
    case "gas_station"   : 
          iconMarker = "fillingstation.png";
          break;
    case "park"   : 
          iconMarker = "parkinggarage.png";
          break;
    case "parking"   : 
          iconMarker = "parking.png";
          break;
    case "rv_park"   : 
          iconMarker = "van.png";
          break;
    // =========== CAR ==========
    case "car_repair"   : 
          iconMarker = "repair.png";
          break;
    case "car_wash"   : 
          iconMarker = "carwash.png";
          break;
    case "car_rental"   : 
          iconMarker = "carrental.png";
          break;
    case "car_dealer"   : 
          iconMarker = "car.png";
          break;

    //============== TEMPAT IBADAH ===================
    // =========== MASJID =============
    case "mosque"   : 
          iconMarker = "mosquee.png";
          break;
    // =========== LAINNYA =============
    case "place_of_worship"   : 
          iconMarker = "prayer.png";
          break;
    case "hindu_temple"   : 
          iconMarker = "templehindu.png";
          break;
    case "church"   : 
          iconMarker = "church-2.png";
          break;
    case "synagogue"   : 
          iconMarker = "synagogue-2.png";
          break;


    // =========== SHOP AND STORE ==========
    case "shoe_store"   : 
          iconMarker = "shoes.png";
          break;
    case "shopping_mall"   : 
          iconMarker = "mall.png";
          break;
    case "store"   : 
          iconMarker = "market.png";
          break;
    case "clothing_store"   : 
          iconMarker = "clothers_male.png";
          break;
    case "convenience_store"   : 
          iconMarker = "conveniencestore.png";
          break;
    case "grocery_or_supermarket"   : 
          iconMarker = "supermarket.png";
          break;

   // =========== BODY AND BEAUTY ==========
    case "hair_care"   : 
          iconMarker = "barber.png";
          break;
    case "gym"   : 
          iconMarker = "weights.png";
          break;
    case "spa"   : 
          iconMarker = "spa.png";
          break;
    case "beauty_salon"   : 
          iconMarker = "beautysalon.png";
          break;

   // =========== ENTERTAINMENT ==========
    case "aquarium"   : 
          iconMarker = "aquarium.png";
          break;
    case "amusement_park"   : 
          iconMarker = "themepark.png";
          break;
    case "art_gallery"   : 
          iconMarker = "museum_art.png";
          break;
    case "zoo"   : 
          iconMarker = "zoo.png";
          break;
    case "movie_rental"   : 
          iconMarker = "cinema.png";
          break;
    case "movie_theater"   : 
          iconMarker = "cinema.png";
          break;
    case "bowling_alley"   : 
          iconMarker = "bowling.png";
          break;
    case "night_club"   : 
          iconMarker = "music_classical.png";
          break;
    case "campground"   : 
          iconMarker = "hiking.png";
          break;


    default : 
          iconMarker = "pin-export.png";
    }

    return iconMarker;

}
 