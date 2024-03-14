const { Router } = require('express');

const genresRouter = Router();

const { getGenresHandler } = require('../handlers/genresHandlers');

genresRouter.get("/", getGenresHandler)

module.exports = genresRouter