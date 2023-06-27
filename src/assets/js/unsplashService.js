import API_KEY from './apiKey.js'
const API_URL = 'https://api.codetabs.com/v1/proxy?quest=https://api.unsplash.com/photos/random'
// user that I picked because I like their pictures
const username = 'codioful'
// const url = `${API_URL}?client_id=${API_KEY}%26username=${username}`
const url = 'https://dog.ceo/api/breeds/image/random'

export async function fetchUnsplashImage() {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const data = await response.json()
    // return data.urls.small
    return data
  } catch (error) {
    console.error("Couldn't fetch image: " + error.message)
  }
}

export default { fetchUnsplashImage }
