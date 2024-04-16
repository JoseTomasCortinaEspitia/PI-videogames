const infoAPICleaned = (infoApi) =>  {
    return {
        id: infoApi.id,
        name: infoApi.name,
        description: infoApi.description_raw,
        released: infoApi.released,
        rating: infoApi.rating,
        platforms: infoApi.platforms.map((platform) => platform.platform.name),
        genres: infoApi.genres.map((genre) => genre.name),
        image: infoApi.background_image,
        createdInDb: false
    }
}

const infoByIdAPICleaned = (infoApi) => {
    return {
        id: infoApi.id,
        name: infoApi.name,
        description: infoApi.description_raw,
        released: infoApi.released,
        rating: infoApi.rating,
        platforms: infoApi.platforms.map((platform) => platform.platform.name),
        genres: infoApi.genres.map((genre) => genre.name),
        image: infoApi.background_image,
        createdInDb: false
    }
}

const genresAPICleaned = (infoApi) => infoApi.map((genre) => {
    return {
        id: genre.id,
        name: genre.name,
        // image: genre.image_background,
        // games: genre.games.map((game) => game.name),
        createdInDb: false
    }
})

module.exports = {
    infoAPICleaned,
    genresAPICleaned,
    infoByIdAPICleaned
}