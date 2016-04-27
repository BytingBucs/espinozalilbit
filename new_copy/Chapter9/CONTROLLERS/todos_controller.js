var 	ToDo = require("../models/todo.js"),
		User = require("../models/user.js"),
		ToDosController = {};
		
ToDosController.index = function(req, res) {
	var username = req.params.username || null,
		respondWithToDos;
	
	// Find todo helper function
	respondWithToDos = function(query) {
		ToDo.find(query, function(err, toDos) {
			if(err !== null) {
				res.json(500, err);
			} else {
				res.json(200, toDos);
			}
		});
	};
	
	if(username !== null) {
		User.find({"username": username}, function(err, result) {
			if(err !== null) {
				res.json(500, err);
			} else if(result.length === 0) {
				// User was not found
				res.send(404);
			} else {
				respondWithToDos({"owner": result[0].id });
			}
		});
	} else {
		// Respond with all todos
		respondWithToDos({});
	}
};

ToDosController.create = function(req, res) {
	var username = req.params.username || null;
	
	var $desc = req.body.description;
	var $tags = req.body.tags;
	//Remove these so we can foreach through the body.
	delete req.body.description;
	delete req.body.tags;
	
	//Array of custom tags
	var $customTags = [];
	
	var keys = Object.keys(req.body);
	for(var i = 0; i < keys.length; i++) {
		var key = keys[i];
		$customTags.push({ "key": key, "value": req.body[key] });
	}
	
	console.log($desc);
	console.log($tags);
	console.log($customTags);
	
	var newToDo = new ToDo({	"description": 	$desc,
								"tags":			$tags,
								"custom":       $customTags});
	
	User.find({"username": username}, function(err, result) {
		if(err) {
			res.send(500);
		} else {
			if(result.length === 0) {
				//User not found -- userless todo
				newToDo.owner = null;
			} else {
				//User found
				newToDo.owner = result[0]._id;
			}
			
			newToDo.save(function(err, result) {
				if(err !== null) {
					// ToDo not saved.
					res.json(200, err);
					//res.json(500, err);
				} else {
					res.json(200, result);
				}
			});
		}
	});
};

ToDosController.show = function(req, res) {
	// Show ID specified in URL
	var id = req.params.id;
	
	// Find specified item.
	ToDo.find({"_id": id}, function(err, todo) {
		if(err !== null) {
			res.json(500, err);
		} else {
			if(todo.length > 0) {
				res.json(200, todo[0]);
			} else {
				res.send(404);
			}
		}
	});
};

ToDosController.destroy = function(req, res) {
	console.log("Destroy");
	console.log(req.params.id);
	
	ToDo.remove({"_id": req.params.id }, function(err, result) {
		if(err) {
			// Did not get deleted
			console.log(err);
			res.send(500);
		}
	});
	
	//Do the thing to destroy and then res.send 200.
	res.send(200);
}

module.exports = ToDosController;