import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './components/context/DataContext'
import { SearchContext } from './components/context/SearchContext'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import { Fragment } from 'react/cjs/react.production.min'

function App() {
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])
	let searchInput = useRef('')

	const API_URL = 'https://itunes.apple.com/search?term='
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		const fetchData = async () => {
			document.title = `${term} Music`
			const response = await fetch(API_URL + term)
			const resData = await response.json()
			if (resData.results.length > 0) {
				return setData(resData.results)
			} else {
				return setMessage('Not Found')
			}
		}
		fetchData()
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
								handleSearch: handleSearch
							}}>
								<SearchBar/>	
							</SearchContext.Provider>
							<DataContext.Provider value={data}>
								<Gallery/>	
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
