const Boom = require('boom');
const { jwtsecret } = require('../../config');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../../models');

const router = new Router();

router.put('/:_id', (req, res, next) => {
  const user = new User(req.body);
  user._id = req.params._id;
  console.log("PUT UPDATE: " + user._id);
  user
    .update()
    .then(() => {
      res.status(200).send({
        success: true,
        user
      });
    }).catch(next);
});

router.post('/', (req, res, next) => {
  const { password, confirm_password } = req.body;
  if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send({
        success: true,
        token: getToken(user),
        user
      });
    }).catch(next);
});

const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;
