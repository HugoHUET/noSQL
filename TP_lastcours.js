// 1. Prendre trois point (3 longitudes et latitudes)
	longitude, latitude
	48.871120, 2.360154
	48.837490, 2.364986
	48.873803, 2.295047

// 2. Choisir un point aléatoire et trouver le point le plus proche de celui-ci parmis les 3 premiers
	48.858898, 2.294330

// 3. Faire une zone comprenant 2 points MAXIMUM à l'intérieur parmis les 3 premiers points

// 4. Trouver le nombre de point dans un rayon autour du points choisis
	48.858898, 2.294330

// 1.
db.places.insertMany(
	[{name : "Bistrot Lucien", location : {type : "Point", coordinates : [2.360154, 48.871120]}},
	{name : "Hopital", location : {type : "Point", coordinates : [2.364986, 48.837490]}},
	{name : "Arc de Triomphe", location : {type : "Point", coordinates : [2.295047, 48.873803]}}])
db.places.createIndex( { location : "2dsphere" } )

// 2.
db.places.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [2.294330, 48.858898] },
            spherical: true,
            distanceField: "calcDistance"
        }
    },
    { $limit: 1 }
])
db.places.find(
    {
        location:
        {
            $near:
            {
                $geometry: { type: "Point", coordinates: [2.294330, 48.858898] },
            }
        }
    }
).limit(1)
db.places.findOne(
   {
     location: {
        $nearSphere: {
           $geometry: {
              type : "Point",
              coordinates : [ 2.294330, 48.858898 ]
           }
        }
     }
   }
).pretty()

// 3. 
db.places.find({
	location: {
		$geoWithin: { 
			$geometry: {
				type: "Polygon", 
				coordinates: [
					[ 
						[2.295047, 48.873803],
						[2.286377, 48.850835],
						[2.392769, 48.862931],
						[2.376634, 48.895090],
						[2.295047, 48.873803]
					]
				] 
			} 
		}
	} 
}).pretty()

// 4.
db.places.find(
    {
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [48.858898, 2.294330]
                },
                $maxDistance: 4000
            }
        }
    }
).pretty()