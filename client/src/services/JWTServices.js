import axios from 'axios'

export const GenerateJWT = (header, claims, key, cb) => {
    axios.post('http://localhost:3001/api/GenerateJWT', { 
        header, claims, key
    })
    .then(res => cb(res))
    .catch(error => console.log(error))
}

export const DecodeJWT = (token, cb) => {
    axios.post('http://localhost:3001/api/DecodeJWT', {token})
        .then(res => cb(res))
        .catch(error => console.log(error))
}

export const ValidateJWT = (header, token, key, cb) => {
    axios.post('http://localhost:3001/api/ValidateJWT', {
        header, token, key
    })
    .then(res => cb(res))
    .catch(error => console.log(error))
}