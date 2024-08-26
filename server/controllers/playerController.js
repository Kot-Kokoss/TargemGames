const { Player } = require('../models/models');

class PlayerController {
  async getOn(req, res, next) {
    const status = 'On';
    const playersOn = await Player.findAll({ where: { status } });

    playersOn.sort((a, b) => {
      const dateA = new Date(a.registrationDate * 1000);
      const dateB = new Date(b.registrationDate * 1000);

      return dateB - dateA;
    });

    for (let i = 0; i < playersOn.length; i++) {
      const date = new Date(playersOn[i].registrationDate * 1000);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      playersOn[i].registrationDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    return res.json(playersOn);
  }
}

module.exports = new PlayerController();
