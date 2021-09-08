import React from 'react'
import {Container} from 'react-bootstrap'
import env from 'react-dotenv'

// change here
const AUTH_URL = env.AUTH_URL


const Login = () => {
    return (
        <div className='bg-black'>
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login With Spotify
            </a>
        </Container>
        </div>
    )
}

export default Login
