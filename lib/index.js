var planetary = {};

function calculate_day(year, month, day, hour){
	return 367*year - 7 * ( year + (month+9)/12 ) / 4 + 275*month/9 + day - 730530 + hour/24.0;
}

function radians(degree){
	return degree * (Math.PI/180);
}
function degrees(radians){
	return radians / (Math.PI/180);
}

function get_planet(name, d){
	
	switch (name){
		case "Sun":
			return { 
				'N' : radians(0.0),
				'i' : radians(0.0),
				'w' : radians(282.9404 + 4.70935E-5 * d),
				'a' : 1.000000,
				'e' : 0.016709 - 1.151E-9 * d,
				'M' : radians(356.0470 + 0.9856002585 * d)
			}
			break;
		case "Mercury":
			return { 
				'N' : radians(48.3313 + 3.24587E-5 * d),
				'i' : radians(7.0047 + 5.00E-8 * d),
				'w' : radians(29.1241 + 1.01444E-5 * d),
				'a' : 0.387098,
				'e' : 0.205635 + 5.59E-10 * d,
				'M' : radians(168.6562 + 4.0923344368 * d)
			};
			break;
		case "Venus":
			return { 
				'N' : radians(76.6799 + 2.46590E-5 * d),
				'i' : radians(3.3946 + 2.75E-8 * d),
				'w' : radians(54.8910 + 1.38374E-5 * d),
				'a' : 0.723330,
				'e' : 0.006773 - 1.302E-9 * d,
				'M' : radians(48.0052 + 1.6021302244 * d)
			};
			break;
		case 'Mars':			
			return {
				'N' : radians(49.5574 + 2.11081E-5 * d),
				'i' : radians(1.8497 - 1.78E-8 * d),
				'w' : radians(286.5016 + 2.92961E-5 * d),
				'a' : 1.523688,
				'e' : 0.093405 + 2.516E-9 * d,
				'M' : radians(18.6021 + 0.5240207766 * d)
			};
			break;
		case 'Jupiter':
			return { 
				'N' : radians(100.4542 + 2.76854E-5 * d),
				'i' : radians(1.3030 - 1.557E-7 * d),
				'w' : radians(273.8777 + 1.64505E-5 * d),
				'a' : 5.20256,
				'e' : 0.048498 + 4.469E-9 * d,
				'M' : radians(19.8950 + 0.0830853001 * d)
			};
			break;
		case 'Saturn':
			return { 
				'N' : radians(113.6634 + 2.38980E-5 * d),
				'i' : radians(2.4886 - 1.081E-7 * d),
				'w' : radians(339.3939 + 2.97661E-5 * d),
				'a' : 9.55475,
				'e' : 0.055546 - 9.499E-9 * d,
				'M' : radians(316.9670 + 0.0334442282 * d)
			};
			break;
		case 'Uranus':
			return { 
				'N' : radians(74.0005 + 1.3978E-5 * d),
				'i' : radians( 0.7733 + 1.9E-8 * d),
				'w' : radians(96.6612 + 3.0565E-5 * d),
				'a' : 19.18171 - 1.55E-8 * d,
				'e' : 0.047318 + 7.45E-9 * d,
				'M' : radians(142.5905 + 0.011725806 * d) 
			};
			break;
		case 'Neptune':
			return { 
				'N' : radians(131.7806 + 3.0173E-5 * d),
				'i' : radians(1.7700 - 2.55E-7 * d),
				'w' : radians(272.8461 - 6.027E-6 * d),
				'a' : 30.05826 + 3.313E-8 * d,
				'e' : 0.008606 + 2.15E-9 * d,
				'M' : radians(260.2471 + 0.005995147 * d)
			}

	}
}

function calc_orbital_elements(planet_name, d){

    planet = get_planet(planet_name, d);

    N = planet.N;
    i = planet.i;
    w = planet.w;
    a = planet.a;
    e = planet.e;
    M = planet.M;

    E = M + e* Math.sin(M) * ( 1.0 + e * Math.cos(M) );

    xv =  a * ( Math.cos(E) - e );
    yv =  a * ( Math.sqrt(1.0 - e*e) * Math.sin(E) );

    v = Math.atan2( yv, xv );
    r = Math.sqrt( xv*xv + yv*yv );

    xh = r * ( Math.cos(N) * Math.cos(v+w) - Math.sin(N) * Math.sin(v+w) * Math.cos(i) );
    yh = r * ( Math.sin(N) * Math.cos(v+w) + Math.cos(N) * Math.sin(v+w) * Math.cos(i) );
    zh = r * ( Math.sin(v+w) * Math.sin(i) );

    lonecl = Math.atan2( yh, xh );
    latecl = Math.atan2( zh, Math.sqrt(xh*xh+yh*yh) );

    return {
        'r' : r,
        'v' : v,
        'xh' : xh,
        'yh' : yh,
        'w'  :w,
        'lonecl' : lonecl,
        'latecl ': latecl
    }
}

function calc_geocentric_alignments(planet_name, d){

    sun = calc_orbital_elements('Sun', d);
    planet = calc_orbital_elements(planet_name, d);

    lonsun = sun.v + sun.w;

    xs = sun.r * Math.cos(lonsun);
    ys = sun.r * Math.sin(lonsun);

    xh = planet.xh;
    yh = planet.yh;

    xg = xh + xs;
    yg = yh + ys;

    helio_degree = degrees(Math.atan2( xh, yh ));
    geo_degree = degrees(Math.atan2( xg, yg ));


    helio_degree =  90 - helio_degree;
    geo_degree = 90 - geo_degree;

    if (helio_degree < 0)
        helio_degree = helio_degree + 360
    if (geo_degree < 0)
        geo_degree = geo_degree + 360

    return geo_degree;
}


function findAlignments(date, maxDistance){
	var now = date;
	var alignments = {};
	
	var year = now.getUTCFullYear(),
		month = now.getUTCMonth()+1,
		day = now.getUTCDate(),
		hour = now.getUTCHours();
	
    var d = calculate_day(year, month, day, hour);
        
    var planet_names = ['Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']

    var positions = {};

    planet_names.forEach( function( planet ){
    	positions[ planet ] = calc_geocentric_alignments(planet, d);
    });

    for ( var i = 0, len = planet_names.length; i < len; i++ ){
    	var root = planet_names[i],
    		rootPosition = positions[ root ];
    	for ( var j = i+1, jlen = planet_names.length; j <jlen; j++ ){
    		var check = planet_names[ j ],
    			checkPosition = positions[ check ];

    		var distance = Math.abs(rootPosition - checkPosition);
    		if ( distance < maxDistance ){
    			if ( typeof alignments[ root ] == "undefined" ){
    				alignments[ root ] = [ root ];
    			}
    			alignments[ root ].push( check );
    		}
    	}
    }

    var list = [];
    for (var prop in alignments) {
      if(alignments.hasOwnProperty(prop)){
      	var al = alignments[prop].sort();
      	var exists = false;
      	for ( var i = 0, len = list.length; i < len; i++ ){
      		var already = list[i];
      		var isSubset = al.every(function(val) { return already.indexOf(val) >= 0; });
      		if ( isSubset ){
      			exists = true;
      		}
      	}
      	if ( !exists ){
        	list.push( alignments[prop].sort() )
        } 
      }
   }
   return list;    
}

planetary.alignments = function( date, maxDistance ){
	if (typeof maxDistance === 'undefined') { maxDistance = 5; }
	return findAlignments(date, maxDistance);
}

module.exports = planetary;