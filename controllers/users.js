// curl -H "Content-Type: application/json" -X POST -d '{"id":2, "name":"Almeida", "age":21}' http://localhost:PORT/users
// curl -H "Content-Type: application/json" -X PUT -d '{"id":1, "name":"MAT1", "age":21}' http://localhost:PORT/users/1
// curl -H "Content-Type: application/json" -X DELETE -d '{"id":2, "name":"Almeida", "age":21}' http://localhost:PORT/users/2

const express = require('express');
const router = express.Router();

global.users = [
	{
		id: 1,
		name: 'Matheus',
		age: 22,
	},
];

router.get('/', (req, res) => {
	return res.json({
		users: global.users,
	});
});

router.post('/', (req, res) => {

	if(global.users.some(user => user.id === req.body.id))
		return res.json({
			message: `An user with the id "${req.body.id}" already exists.`,
			success: false,
		});

	global.users.push(req.body);
	return res.json({
		message: `User ${req.body.name} added with success.`,
		success: true,
	});
});

router.get('/:userid', (req, res) => {

	global.users.some(user => {
		if (user.id == req.params.userid)
			return res.json({
				user: user,
				success: true,
			});
	});
	
	return res.json({
		message: `User with the id ${req.params.userid} doesnt exists.`,
		success: false,
	});
});

router.put('/:userid', (req, res) => {
	
	global.users.some(user => {
		if (user.id == req.params.userid) {
			user.name = req.body.name;
			user.age = req.body.age;
			return res.json({
				user: user,
				success: true,
			});
		}
	});
	
	return res.json({
		message: `User with the id ${req.params.userid} doesnt exists.`,
		success: false,
	});
});

router.delete('/:userid', (req, res) => {
	
	let len = global.users.length;

	global.users = global.users.filter(user => user.id != req.params.userid);

	if (len == global.users.length)
		return res.json({
			message: `User with the id ${req.params.userid} doesnt exists.`,
			success: false,
		});
	else
		return res.json({
			user: `User with id ${req.body.id} removed.`,
			success: true,
		});
});

module.exports = router;