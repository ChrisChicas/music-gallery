import { useState, useRef, Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './components/context/DataContext'
import { SearchContext } from './components/context/SearchContext'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import {createResource as fetchData} from "./components/helper.js"
import Spinner from './components/Spinner'

function App() {
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState(null)
	let searchInput = useRef('')

	const handleSearch = (e, term) => {
		e.preventDefault()
		setData(fetchData(term))
	}

	const renderGallery = () => {
		if(data){
			return(
				<Suspense fallback={<Spinner/>}>
					<Gallery/>
				</Suspense>	
			)
			
		}
	}

	return (
		<div>
			{message}
			<Router>
				<Routes>
					<Route path="/" element={
						<Fragment>
							<SearchContext.Provider value={{
								term: searchInput,
								handleSearch: handleSearch,
							}}>
								<SearchBar/>	
							</SearchContext.Provider>
							<DataContext.Provider value={data}>
								{renderGallery()}
							</DataContext.Provider>
						</Fragment>
					}/>
					<Route path="/artist/:id" element={<ArtistView/>}/>
					<Route path="/album/:id" element={<AlbumView/>}/>
				</Routes>
			</Router>
		</div>
  	);
}

export default App;
