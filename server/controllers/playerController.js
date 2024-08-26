const { Player } = require('../models/models');

class PlayerController {
  async getOn(req, res, next) {
    const status = 'On';
    const playersOn = await Player.findAll({ where: { status } });
    return res.json(playersOn);
  }
}

module.exports = new PlayerController();
