import axios from 'axios'

// should be in a env config
const BASE_URL = 'https://offspringdigital-c9ee7-default-rtdb.asia-southeast1.firebasedatabase.app'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})
