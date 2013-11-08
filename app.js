var express = require('express'),
    fs = require('fs'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/skillsdb');

//errorHandler
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {});

var Schema = mongoose.Schema;
var usersSchema = new Schema({
	name: String,
	email: String,
	pass: String
}),
skillsSchema = new Schema({
	name: String,
	type: String,
	level: Number
}),
User = mongoose.model('User', usersSchema),
Skill = mongoose.model('Skill', skillsSchema);

var buf = fs.readFileSync('index.html');
var string = buf.toString();

var app = express();

app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.send(string);
});

// List of users
app.get('/users', function(req, res) {
	return User.find(function(err, users) {
		if (!err) {
			return res.send(users);
		} else {
			return console.log(err);
		}
	});
});

// Get spesific user
app.get('/user/:id', function(req, res) {
	return User.findById(req.params.id, function(err, user) {
		if (!err) {
			return res.send(user);
		} else {
			return console.log(err);
		}
	});
});

// Create user
app.post('/users', function(req, res) {
	console.log('POST:');
	console.log(req.body);
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		pass: req.body.pass
	});
	user.save(function(err) {
		if (!err) {
			return console.log("created");
		} else {
			return console.log(err);
		}
	});
	return res.send(user);
});

// Update user
app.put('/user/:id', function(req, res) {
	return User.findById(req.params.id, function(err, user) {
		user.name = req.body.name;
		user.email = req.body.email;
		user.pass = req.body.pass;
		return user.save(function(err) {
			if (!err) {
				return res.send(user);
			} else {
				return console.log(err);
			}
		});
	});
});

// Delete user
app.delete('/user/:id', function(req, res) {
	return User.findById(req.params.id, function(err, user) {
		return user.remove(function(err) {
			if (!err) {
				console.log("removed");
				return res.send('removed');
			} else {
				console.log(err);
			}
		});
	});
});



app.listen(3000, function() {
	console.log('Listening on 3000 port');
});
