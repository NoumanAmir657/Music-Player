import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({accessToken, trackUri}) => {

    if (!accessToken) return null
    return (
        <SpotifyPlayer
        token={accessToken}
        showSaveIcon={true}
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
