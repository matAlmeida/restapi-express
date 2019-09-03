// curl -H "Content-Type: application/json" -X POST -d '{"id":2, "name":"Almeida", "age":21}' http://localhost:PORT/users
// curl -H "Content-Type: application/json" -X PUT -d '{"id":1, "name":"MAT1", "age":21}' http://localhost:PORT/users/1
// curl -H "Content-Type: application/json" -X DELETE -d '{"id":2, "name":"Almeida", "age":21}' http://localhost:PORT/users/2

import express from 'express';
const router = express.Router();

global.users = [
  {
    id: 1,
    name: 'Matheus',
    age: 22
  }
];

/**
 * @api [get] /users
 * summary: Get all users
 * tags: [Users]
 * responses:
 *  "200":
 *      description: "got users"
 *  "204":
 *      description: "users not found"
 *  "500":
 *      description: "internal server error"
 */
router.get('/', (req, res) => {
  return res.json({
    users: global.users
  });
});

/**
 * @api [post] /users
 * summary: Add a new user
 * tags: [Users]
 * parameters: [
 *  {
 *      name: "body",
 *      in: body,
 *      value: {"id": "id", "name": "name", "age": "age"}
 *  }
 * ]
 * responses:
 *  "200":
 *      description: "User added"
 *  "400":
 *      description: "bad request"
 *  "500":
 *      description: "internal server error"
 */
router.post('/', (req, res) => {
  if (global.users.some((user) => user.id === req.body.id))
    return res.sendStatus(400);

  global.users.push(req.body);
  return res.send(`User ${req.body.name} added with success.`);
});

/**
 * @api [get] /users/{id}
 * summary: Get user with the given id
 * tags: [Users]
 * parameters: [
 *   {
 *      name: "id",
 *      type: "string",
 *      in: "path",
 *      required: true
 *  }
 * ]
 * responses:
 *  "200":
 *      description: "got user"
 *  "400":
 *      description: "bad request"
 *  "204":
 *      description: "user not found"
 *  "500":
 *      description: "internal server error"
 */
router.get('/:userid', (req, res) => {
  const user = global.users.filter((user) => user.id == req.params.userid);
  if (user.length > 0) return res.send(user[0]);
  else return res.sendStatus(204);
});

router.put('/:userid', (req, res) => {
  global.users.some((user) => {
    if (user.id == req.params.userid) {
      user.name = req.body.name;
      user.age = req.body.age;
      return res.json({
        user: user,
        success: true
      });
    }
  });

  return res.json({
    message: `User with the id ${req.params.userid} doesnt exists.`,
    success: false
  });
});

router.delete('/:userid', (req, res) => {
  let len = global.users.length;

  global.users = global.users.filter((user) => user.id != req.params.userid);

  if (len == global.users.length)
    return res.json({
      message: `User with the id ${req.params.userid} doesnt exists.`,
      success: false
    });
  else
    return res.json({
      user: `User with id ${req.body.id} removed.`,
      success: true
    });
});

export default router;
