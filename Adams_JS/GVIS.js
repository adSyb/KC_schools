window.onload = function() {

var southWest = L.latLng(37, -96.3),
    northEast = L.latLng(40.8, -90.3),
    bounds = L.latLngBounds(southWest, northEast);
    

//initialize map
var map = L.map('base', {center: [39.0, -93.3], maxBounds: bounds, minZoom: 7, maxZoom: 13, zoom: 8});

//basemap definition
L.tileLayer( 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | <a href="http://cartodb.com/attributions" title="CartoDB" target="_blank">CartoDB</a>',
    subdomains: ['a','b','c','d','e','f']
}).addTo(map); //add to map

L.control.scale().addTo(map);



//initialize variables displayed
var stu = "student04"; var sch = "stuSch04"; var cloro = "D01"; var circle = "PT"; var year = "04"; var schFill = "PT04";
var breaks = C01; var Cbreaks = CPT;
var previousZoom = 8; var currentZoom = 8;

$( "#admin" ).val( "County Level" );

//select menu
$(function() { 
	$( "#var2" ).selectmenu({
		change: function( event, ui ) {
			cloro = $( "#var2" ).val(); //change cloropleth value
			layerHandler();
			if (cloro == "D02" || cloro == "D03" || cloro == "D05" || cloro == "D06" || cloro == "D07" || cloro == "D08" || cloro == "D09"){
				$( "#leg1" ).val( "Less than " + (Math.round(breaks[1]*1000)/10) + "%" );
				$( "#leg7" ).val( (Math.round((breaks[6] + .001)*1000)/10) + " % or more" );
				for (var i = 2; i<7; i++){
					$( "#leg" + String(i) ).val( (Math.round((breaks[i-1] + .001) * 1000)/10) + " - " + (Math.round(breaks[i]*1000)/10) + "%" );
				}
			}
			else{
				for (var i = 2; i<7; i++){
					$( "#leg" + String(i) ).val( (Math.round((breaks[i-1] + .001) * 1000)/1000) + " - " + breaks[i]);
				}
				$( "#leg7" ).val( (Math.round((breaks[6] + .001) * 1000)/1000) + " or more" );
				$( "#leg1" ).val( "Less than " + breaks[1] );
			}
		}
	}).selectmenu( "menuWidget" ).addClass( "overflow" );
 
	$( "#var1" ).selectmenu({
		change: function( event, ui ) {
			circle = $( "#var1" ).val(); //change circle value
			layerHandler();
			$( "#leg00" ).val( "No Data" );
			if (Cbreaks == CwhStu || Cbreaks == ChiStu || Cbreaks == CblStu || Cbreaks == ThiStu || Cbreaks == TblStu || Cbreaks == TwhStu || Cbreaks == Tlunch){
				$( "#leg11" ).val( "Less than " + (Math.round(Cbreaks[1]*1000)/10) + "%" );
				$( "#leg17" ).val( (Math.round((Cbreaks[6] + .001)*1000)/10) + " % or more" );
				for (var i = 2; i<7; i++){
					$( "#leg1" + String(i) ).val( (Math.round((Cbreaks[i-1] + .001) * 1000)/10) + " - " + (Math.round((Cbreaks[i]*1000)/10)) + "%" );
				}
			}
			else if (Cbreaks == DpSalary || Cbreaks == Ddrop || Cbreaks == Dlunch || Cbreaks == Dread || Cbreaks == Dmath){
				$( "#leg11" ).val( "Less than " + (Math.round(Cbreaks[1]*100)/100) + "%" );
				$( "#leg17" ).val( (Math.round((Cbreaks[6] + .001)*100)/100) + " % or more" );
				for (var i = 2; i<7; i++){
					$( "#leg1" + String(i) ).val( (Math.round((Cbreaks[i-1] + .001) * 100)/100) + " - " + (Math.round((Cbreaks[i]*100)/100)) + "%" );
				}
			}
			else if ( Cbreaks == Dsalary || Cbreaks == DtRev || Cbreaks == DlRev || Cbreaks == DsRev || Cbreaks == DfRev){
				$( "#leg11" ).val( "Less than $" + Math.round(Cbreaks[1]) );
				$( "#leg17" ).val( "$" + Math.round(Cbreaks[6] + 1) + " or more" );
				for (var i = 2; i<7; i++){
					$( "#leg1" + String(i) ).val(  "$" + Math.round(Cbreaks[i-1] + 1) + " - " + (Math.round((Cbreaks[i]*100)/100)) );
				}
			}
			else if (Cbreaks == Dpriv){
				$( "#leg11" ).val( "$" + Math.round(Cbreaks[0] + 1) + " - " + (Math.round((Cbreaks[1]))) );
				$( "#leg17" ).val( "$1,000,001 +" );
				for (var i = 1; i<7; i++){
					$( "#leg1" + String(i) ).val(  "Up to $" + (Math.round((Cbreaks[i]*100)/100)) );
				}
				$( "#leg00" ).val( "$0" );
			}
			else{
				for (var i = 2; i<7; i++){
					$( "#leg1" + String(i) ).val( (Math.round((Cbreaks[i-1] + .001) * 1000)/1000) + " - " + (Math.round(Cbreaks[i]*100)/100) );
				}
				$( "#leg11" ).val( "Less than " + Cbreaks[1] );
				$( "#leg17" ).val( (Math.round((Cbreaks[6] + .001)*1000)/1000) + " or more" );
			}
		}
	}).selectmenu( "menuWidget" ).addClass( "overflow" );
	
	for (var i = 2; i<7; i++){
		$( "#leg" + String(i) ).val( (Math.round((breaks[i-1] + .001) * 1000)/1000) + " - " + breaks[i]);
		}
	for (var i = 2; i<7; i++){
		$( "#leg1" + String(i) ).val( (Math.round((Cbreaks[i-1] + .001) * 1000)/1000) + " - " + Cbreaks[i] );
	}
	$( "#leg1" ).val( "Less than " + breaks[1] );
	$( "#leg11" ).val( "Less than " + Cbreaks[1] );
	$( "#leg7" ).val( (Math.round((breaks[6] + .001) * 1000)/1000) + " or more" );
	$( "#leg17" ).val( (Math.round((Cbreaks[6] + .001)*1000)/1000) + " or more" );
});

var Ctext = ["Percent White Students","Percent Black Students","Percent Hispanic Students"];
var Cmenu = ["whStu","blStu","hiStu"];
var Dtext = ["Percent Students Receiving Reduced or Free Lunch (KS only)","Drop-out Rate (KS only)","State Assessment Reading Score (KS only)", "State Assessment Math Score (KS only)", "Average Teacher Salary (KS only)","Percent Expenditures towards Teacher Salary", "Private Monetary Contributions","Total Revenue per Student","Local Revenue per Student","State Revenue per Student","Federal Revenue per Student","Student/Staff Ratio"];
var Dmenu = ["lunch","drop","read","math","salary","pSalary","priv","tRev","lRev","sRev","fRev","PS"];
var Ttext = ["Percent White Students","Percent Black Students","Percent Hispanic Students","Percent Students Receiving Reduced or Free Lunch"];
var Tmenu = ["whStu","blStu","hiStu","lunch"];

function menuHandler(list, text) {
	$("#var1 option").each(function(index, option) {
		$(option).remove();
	});
	var options = [];
	options.push("<option value='PT' selected = 'selected'>Student/Teacher Ratio</options>");
	for (i = 0; i < list.length; i++) {
		options.push("<option value='" + list[i] + "'>" + text[i] + "</options>");
	}
	$('#var1').append(options.join("")).selectmenu("refresh");
}

menuHandler(Cmenu, Ctext);

function getColor1(d) {
	return d < breaks[0] ? 'rgba(255,255,255,0)':
			d < breaks[1]	? '#cbe7e1' :
			d < breaks[2]	? '#aed0c8' :
			d < breaks[3]	? '#89bdb1' :
			d < breaks[4]	? '#6ba396' :
			d < breaks[5]	? '#4f877a' :
			d < breaks[6]	? '#3e7265' :
							'#265c4f' ;
}

function getColor2(x) {
	switch (circle) {
		case "title1": case "level":
			return x == Cbreaks[0]	?	'#a6d854':
				x == Cbreaks[1]	?	'#fc8d62':
				x == Cbreaks[2]	?	'#377eb8':
				x == Cbreaks[3]	?	'#e78ac3':
				'rgba(255,255,255,0)';
		break;
		case "nonpub":
			return x == 0	?	'rgba(255,255,255,0)':
				x == 1	?	'#d95f02':
				'rgba(255,255,255,0)';
		break;
		default:
			return x < Cbreaks[0] ? 'rgba(255,255,255,0)':
				x < Cbreaks[1]	? '#9add90' :
				x < Cbreaks[2]	? '#7dbd73' :
				x < Cbreaks[3]	? '#539a48' :
				x < Cbreaks[4]	? '#3a7e2f' :
				x < Cbreaks[5]	? '#2c6523' :
				x < Cbreaks[6]	? '#1d4d16' :
				'#073800';
		break;
	}
}

//define style of cloropleth
function style(feature) {	
    return {
        fillColor: getColor1(feature.properties[cloro]),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function invisible(feature) {	
    return {
        fillColor: 'white',
        weight: 4,
        opacity: 0,
        color: 'white',
        fillOpacity: 0
    };
}

function Cstyle(feature) {
	switch (circle) {
		case "level": case "title1": case "nonpub":
			return{
				fillColor: getColor2(feature.properties[circle]),
				weight: 1,
				color: 'white',
				fillOpacity: 0.7
			}
		break;
		default:
			return{
				fillColor: getColor2(feature.properties[schFill]),
				weight: 1,
				color: 'white',
				fillOpacity: 0.7
			}
		break;
	}
}

function onEachFeature(feature, layer) {
	var popup = L.popup({closeButton: false, autoPan: false, className: 'popup'});
	if (feature.properties && feature.properties.name) {
		popup.setContent(feature.properties.name + "<br/>" + feature.properties.address + "<br/>Students: " + Math.round(feature.properties[stu]));
	}
	else if (feature.properties && feature.properties.NAME10) {
		popup.setContent(feature.properties.NAME10 + "<br/>Students per School: " + Math.round(feature.properties[sch]));
	}
	else if (feature.properties && feature.properties.NAMELSAD10) {
		popup.setContent(feature.properties.NAMELSAD10 + "<br/>Students per School: " + Math.round(feature.properties[sch]));
	}
	layer.bindPopup(popup);
	layer.on('mouseover', function (e) {
		this.openPopup();
	});
	layer.on('mouseout', function (e) {
		this.closePopup();
	});
}

//initialize layers
var a = L.geoJson(tract);
var b = L.geoJson(school);	
var c = L.geoJson(district);
var d = L.geoJson(county, {style: style}).addTo(map);
var e = L.geoJson(district2);
var f = L.geoJson(county2, {pointToLayer: function (feature, latlng) {
				return L.circle(latlng, (feature.properties[sch] * 30), Cstyle(feature));
			}, onEachFeature:onEachFeature}).addTo(map);

//layer handler for zoom change, variable change
function layerHandler() {
	var temp = cloro.substr(1);
	map.removeLayer(a);
	map.removeLayer(b);
	map.removeLayer(c);
	map.removeLayer(d);
	map.removeLayer(e);
	map.removeLayer(f);
	stu = "student" + year;
	sch = "stuSch" + year;
	schFill = circle + year;
	switch (currentZoom) {
		case 7:
		case 8:
			breaks = eval("C" + temp);
			Cbreaks = eval("C" + circle);
			f = L.geoJson(county2, {pointToLayer: function (feature, latlng) {
				return L.circle(latlng, (feature.properties[sch] * 30), Cstyle(feature));
			}, onEachFeature:onEachFeature});
			d = L.geoJson(county, {style: style});
			map.addLayer(d, false);
			map.addLayer(f, false);
		break;
		case 9:
		case 10:
			breaks = eval("D" + temp);
			Cbreaks = eval("D" + circle);
			e = L.geoJson(district2, {pointToLayer: function (feature, latlng) {
				return L.circle(latlng, (feature.properties[sch] * 9), Cstyle(feature));
			}, onEachFeature:onEachFeature})
			c = L.geoJson(district, {style: style});
			map.addLayer(c, false);
			map.addLayer(e, false);
		break;
		default:
			breaks = eval("T" + temp);
			Cbreaks = eval("T" + circle);
			a = L.geoJson(tract, {style: style});
			b = L.geoJson(school,
				{pointToLayer: function (feature, latlng) {
				return L.circle(latlng, feature.properties[stu], Cstyle(feature));
			}, onEachFeature:onEachFeature});
			map.addLayer(a, false);
			map.addLayer(b, false);
		break;
	}
}

//calls layer handler on zoom
map.on('zoomend', function (e) {
	
	previousZoom = currentZoom;
	currentZoom = map.getZoom();
	
	if ((previousZoom == 8 && currentZoom == 9) || (previousZoom ==11 && currentZoom==10)){
		circle = "PT";
		menuHandler(Dmenu, Dtext);
		$( "#admin" ).val( "School District Level" );
	}
	else if ((previousZoom == 9 && currentZoom == 8)){
		circle = "PT";
		menuHandler(Cmenu, Ctext);
		$( "#admin" ).val( "County Level" );
	}
	else if ((previousZoom == 10 && currentZoom == 11)){
		circle = "PT";
		menuHandler(Tmenu, Ttext);
		$( "#admin" ).val( "Individual Schools" );
	} else{}
	layerHandler();
});


//slider
$(function() {
	$( "#slider" ).slider({
		value:2004,
		min: 2004,
		max: 2012,
		step: 1,
		slide: function( event, ui ) {
			$( "#amount" ).val( ui.value - 1 + " - " + ui.value);
		}
    }).each(function() {
		var opt = $(this).data().uiSlider.options;
		var vals = opt.max - opt.min;

		for (var i = 0; i <= vals - 1; i++) {

        // Create a new element and position it with percentages
			var el = $('<label>' + (i + opt.min) + '</label>').css('left', (i/vals*100) + '%');

        // Add the element inside #slider
			$("#slider").append(el);
		}
	});

	$( "#amount" ).val( ($( "#slider" ).slider( "value" ) - 1) + " - " + $( "#slider" ).slider( "value" ));
});

//slider handler for time change
$( "#slider" ).on( "slidechange", function( event, ui ) {
	year = String( ui.value ).substr(2);
	layerHandler();
} );

$("#slide").css("display", "initial")
$("#cover").css("display", "none");

var trythis = county[0].features.map(function(f){
    return f.properties.D01;
})
console.log(trythis.sort(function(a, b){return a-b}));
}