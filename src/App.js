import {useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Carousel from "react-elastic-carousel"
import Slider from './Carousel'


function App() {
const CLIENT_ID = "9e9c4c789e1e4f548710c4f701fa416f"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const [token, setToken] = useState("")
const [searchKey, setSearchKey] = useState("")
const [artists, setArtists] = useState([])

//this hook will split and save the token
useEffect(() => {
  const hash = window.location.hash
  let token = window.localStorage.getItem("token")

  if (!token && hash) {
    token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

    window.location.hash= ""
    window.localStorage.setItem("token", token)
    
  }
    setToken(token)

}, [])

//this function will remove the saved token
const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

//this function will search for artists using spotify API as long as they are logged in with a token
const searchArtists = async (e) => {
  e.preventDefault()
  const { data } = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      q: searchKey,
      type: 'artist'
    }
  })

  setArtists(data.artists.items)
  console.log(data.artists.items)
}


// const renderArtists = () => {
//   return artists.map(artist => (

//     <div className="artist-image" key={artists.id}>
//       <h1>{artist.name}</h1>
//       {artist.images.length ? 
//       <>
//       <img width={"75%"}src={artist.images[0].url} alt="" onClick={() => window.open(artist.external_urls.spotify)}/>
//       <ul>
//         <li>Followers: {artist.followers.total.toLocaleString('en')}</li>
//       </ul> 
//       </>
//       : <div>No Image</div>}
//     </div> 

//   ))
// }

//this function will render the artists into a paper, it open the artist url, show their name, their image and their followers
const altRenderArtist = () => {
  return (
    <Slider>
 
  {artists.map((artist, i) =>  
  <Box className="artist-image" key={i}>
  <Paper elevation={3}  onClick={() => window.open(artist.external_urls.spotify)}>

    <h1>{artist.name}</h1>
    {artist.images.length ?
    <>
    <img width={"75%"} src={artist.images[0].url} alt="No Image" />
    <h3>Followers: {artist.followers.total.toLocaleString('en')}</h3>
    </>
    : <div>No Image</div>}
  </Paper>
  </Box>
  )}
</Slider>
  )
}


  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Search</h1>

        {!token ? 
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login 
        to Spotify</a>
         : 
         <Stack direction="row" spacing={2} className="log-out-button">
         <Button variant="contained" onClick={logout}>Log Out</Button>
         </Stack> }
         
  
        {token ? 
        <form className="search-box" onSubmit={searchArtists}>
          <Box sx={{ width: 500, maxWidth: '100%', padding: 3, borderRadius: 12 }}>
            <TextField className="search-bar" fullWidth label="" id="fullWidth" type="text" onChange={e => setSearchKey(e.target.value)} />
          </Box>

          <Stack direction="row" spacing={2}>
          <Button variant="contained" type={"submit"}>Search</Button>
          </Stack>
        </form>

        : <h2>Please Log In</h2>
      
      }

      {altRenderArtist()}

      </header>
    </div>
  );
}

export default App;


