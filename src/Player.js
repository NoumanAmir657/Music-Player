import React, {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({accessToken, trackUri}) => {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null
    return (
        <SpotifyPlayer
        token={accessToken}
        showSaveIcon={true}
        callback={state => {
            if(!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}

        styles={{
            activeColor: '#000',
            bgColor: '#00d13f',
            color: '#000',
            loaderColor: '#000',
            sliderColor: '#fff',
            trackArtistColor: '#000',
            trackNameColor: '#000',
            sliderTrackColor: '#868f8f',
            height: 80,
            sliderHandleColor: '#fff'
        }}
        />
    )
}
// 07691e
export default Player
