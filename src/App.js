import './App.css';
import { List } from './Items.js';
import { Label } from './Label.js';
import { Searchbar } from './Searchbar.js';
import { Headline } from './Headline.js';
import { useState, useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query';

const useSemiPersistentState = (key, initialValue) =>
{
	const [value, setValue] = useState(localStorage.getItem('search')||initialValue);

	useEffect(() => {
		localStorage.setItem('search', value);
	}, [value]);

	return ([value, setValue])
}
 
const storiesReducer = (state, action) => 
{
	switch (action.type) 
	{
		case 'STORIES_FETCH_INIT': 
			return {
				...state,
				isLoading: true, 
				isError: false
			}
		case 'STORIES_FETCH_SUCCESS': 
			return {
				...state,
				isLoading: false,
				isError: false, 
				data: action.payload
			}
		case 'STORIES_FETCH_FAILURE': 
			return {
				...state,
				isLoading:false, 
				isError: true
			}
		case 'REMOVE_STORIES':
			return {
				...state, 
				data : state.data.filter(story => action.payload.objectID !== story.objectID)
			}
		default: 
			throw new Error();
	}
}		

export const App  = () => {

	const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');

	const [stories, dispatchStories] = useReducer(storiesReducer, {data : [], isLoading: false, isError: false});

	const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
	
	const handleFetchStories = useCallback(async () => {
	dispatchStories({ type: 'STORIES_FETCH_INIT' });
	
	const result = await axios.get(url);
	dispatchStories({
		type: 'STORIES_FETCH_SUCCESS',
		payload: result.data.hits,
	});
	}, [url]);

	useEffect(() => {
		handleFetchStories();
  	}, [handleFetchStories]);

	const handleRemoveStories = (item) => 
		dispatchStories({type: 'REMOVE_STORIES', payload: item});

	const handleSearchInput  = (event)  => setSearchTerm(event.target.value);

	const handleSearchSubmit = () => setUrl(`${API_ENDPOINT}${searchTerm}`);

	return (
	<div className="App">
		<Headline title="HACKER NEWS" subtitle="search the database" />
		<Searchbar isFocused disabled={!searchTerm} onHandleSearchSubmit={handleSearchSubmit} value={searchTerm} onInputChange={handleSearchInput} id="search" >
			<Label title="search for topic:"/>			
		</Searchbar>
		<div className="list" >
			{stories.isError && <p>Something went wrong</p>}
			{stories.isLoading ? (<p>Loading...</p>) : (<List onRemove={handleRemoveStories} list={stories.data}/>)}
		</div>
    </div>
	);
}
