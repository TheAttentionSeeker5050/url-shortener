var randomString = require('random-string')

const getRandomURL = () => {
    const domain = "https://zu-gros.herokuapp.com/url/"
    const makeRandomString = randomString({
        length: 10,
        numeric: true,
        letters: true,
        special: false,
    })

    const newURL = makeRandomString

    return newURL
}

exports.getRandomURL = getRandomURL