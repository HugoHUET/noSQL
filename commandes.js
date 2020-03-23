db.createCollection("sports")
db.sports.insertOne({"description" : "sport de raquette", "type" : "sol"})
db.sports.insertOne({"description" : "ce pratique dans l'eau", "type" : "eau"})
db.sports.insertOne({"description" : "avec une cape", "type" : "air"})
db.sports.updateMany({}, {$set : {titre : "title", equipeNecessaire: false}}, {upsert: true})
db.sports.updateOne({_id : ObjectId("5e78871006b87bec15cfdf20")}, {$set : {titre : "wingsuit"}})
db.sports.updateOne({_id : ObjectId("5e7886fc06b87bec15cfdf1f")}, {$set : {titre : "natation", equipeNecessaire : true}})
db.sports.updateOne({_id : ObjectId("5e7886d506b87bec15cfdf1e")}, {$set : {titre : "badminton", equipeNecessaire : true}})
db.sports.updateMany({equipeNecessaire : true}, {$set : {joueursMinimum : 4}}, {upsert: true})
db.sports.updateMany({equipeNecessaire : true}, {$inc : {joueursMinimum : 2}})
db.sports.updateMany({}, {$set : {players : [] }}, {upsert: true})
db.sports.updateMany({_id : ObjectId("5e7886d506b87bec15cfdf1e")}, {$push : {"players" : { $each: [ {nom : "BigG"}, {nom : "Paul"}, {nom : "Samy"} ] } } })
db.sports.updateMany({_id : ObjectId("5e7886fc06b87bec15cfdf1f")}, {$push : {"players" : { $each: [ {nom : "Marie"}, {nom : "Robert"}, {nom : "Michel"} ] } } })
db.sports.updateMany({equipeNecessaire : true}, {$set: { "players.$.titulaire": true }}, {upsert: true})