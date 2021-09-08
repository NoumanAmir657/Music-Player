import React, {useState, useEffect} from 'react'
import useAuth from './useAuth'
import {Container, Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios'
import env from 'react-dotenv'

// change here
const spotifyApi = new SpotifyWebApi({
    clientId: env.CLIENT_ID,
})

const Dashboard = ({code}) => {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState('')

    const chooseTrack = (track) => {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() =>{
        if (!playingTrack) return

        axios.get("http://localhost:3001/lyrics", {
            params: {
                title: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false

        spotifyApi.searchTracks(search)
        .then(res => {
            if (cancel) return
            const tracks = res.body.tracks.items 
            // console.log(tracks)

            setSearchResults(tracks.map(track => {

                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url,
                }
            }))
        })
        
        return () => cancel = true

    }, [accessToken, search])

    return (
        <div className='bg-black'>

            <Container className='d-flex flex-column py-4' style={{height: "100vh"}}>
                <Form.Control type='search' 
                placeholder="Search Songs/Artists" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                />

                <div className='flex-grow-1 my-2 text-white' style={{overflowY: 'auto'}}>
                    {searchResults.map(track => (
                        <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                    ))}

                    {searchResults.length === 0 && (
                        <div className='text-center text-white' style={{whiteSpace: 'pre'}}>
                        {lyrics}
                        </div>
                    )}
                </div>

                <div>
                    <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
                </div>
        </Container>

        </div>
    )
}

export default Dashboard
