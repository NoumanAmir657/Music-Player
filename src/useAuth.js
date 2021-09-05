import React, {useState, useEffect} from 'react'
import axios from 'axios'


const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        console.log(code)
        axios.post('http://localhost:3001/login', {
          code: code,  
        })
        .then(res => {
            console.log(res.data)
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')
        })
        .catch(() => {
            window.location = '/'
        })
    }, [code])

    return accessToken
}

export default useAuth
