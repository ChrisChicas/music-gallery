import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AlbumView(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === "track")

    const renderSongs = justSongs.map((song, i) => {
        return(
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    const navButtons = () => {
        return(
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate("/")}>Home</button>
            </div>
        )
    }

    return (
        <div>
            {albumData.length > 0 ? <h2>{albumData[0].collectionName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderSongs}
        </div>
    )
}