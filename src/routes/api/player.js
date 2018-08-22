const Boom = require('boom');
const { jwtsecret } = require('../../config');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Player } = require('../../models');

const router = new Router();

/* router.delete('/:_id', (req, res, next) => {
  const player = new Player(req.body);
  player._id = req.params._id;
  player
    .delete()
    .then(() => {
      res.status(200).send({
        success: true,
        player
      });
    }).catch(next);
}); */

router.put('/:_id', (req, res, next) => {
  const player = new Player(req.body);
  player._id = req.params._id;
  player
    .update()
    .then(() => {
      res.status(200).send({
        success: true,
        player
      });
    }).catch(next);
});

router.post('/', (req, res, next) => {
  const player = new Player(req.body);
  player
    .save()
    .then(() => {
      res.status(200).send({
        success: true,
        player
      });
      console.log("Player :" + player._id);
    }).catch(next);
});

router.get('/', (req, res, next) => {
  if (!req.headers.authorization) 
  {
    res.status(403).send({
      success: true
    });
  }

  const player = new Player();
  if (req.headers.authorization) {
    console.log("PLAYER GET LIST: WITH AURHORIZATION TOKEN" );
  player
    .find({}, {_id:0, first_name:1}, function (err, players) {
      res.json(players);})
    .then(() => {
      res.status(200).send({
        success: true,
        player
      });
    }).catch(next);}
});

const getToken = player => jwt.sign({ playerId: player._id }, jwtsecret);

module.exports = router;
