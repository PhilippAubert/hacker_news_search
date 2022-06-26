import './App.css';
import { List } from './Items.js';
import { Label } from './Label.js';
import { Searchbar } from './Searchbar.js';
import { Headline } from './Headline.js';
import { useState, useEffect, useReducer } from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

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

	useEffect(() => {
		if (!searchTerm)
			return;
		dispatchStories({ type: 'STORIES_FETCH_INIT' });
		fetch(`${API_ENDPOINT}${searchTerm}`).then(response => response.json())
		.then(result => {dispatchStories({type: 'STORIES_FETCH_SUCCESS', payload: result.hits})})
		.catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  	}, [searchTerm]);

	const handleRemoveStories = (item) => 
		dispatchStories({type: 'REMOVE_STORIES', payload: item});

	const onHandleInput  = (event)  => setSearchTerm(event.target.value);


	return (
	<div className="App">
		<Headline title="React" subtitle="a quick app" searchTerm={searchTerm}/>
		<Searchbar isFocused value={searchTerm} id="search" handleInput={onHandleInput}>
			<Label title="type something"/>
		</Searchbar>
		<div className="list" >
			{stories.isError && <p>Something went wrong</p>}
			{stories.isLoading ? (<p>Loading...</p>) : (<List onRemove={handleRemoveStories} list={stories.data}/>)}
		</div>
    </div>
	);
}
