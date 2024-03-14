const infoAPICleaned = (infoApi) => infoApi.results.map((game) => {
    return {
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map((platform) => platform.platform.name),
        image: game.background_image,
        createdInDb: false
    }
})

const genresAPICleaned = (infoApi) => infoApi.map((genre) => {
    return {
        id: genre.id,
        name: genre.name,
        image: genre.image_background,
        games: genre.games.map((game) => game.name),
        createdInDb: false
    }
})

module.exports = {
    infoAPICleaned,
    genresAPICleaned
}