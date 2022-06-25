import './App.css';
import { list } from './List.js';
import { List } from './Items.js';
import { Label } from './Label.js';
import { Searchbar } from './Searchbar.js';
import { Headline } from './Headline.js';
import { useState, useEffect, useReducer } from 'react';

const useSemiPersistentState = (key, initialValue) =>
{
	const [value, setValue] = useState(localStorage.getItem('search')||initialValue);

	useEffect(() => {
		localStorage.setItem('search', value);
	}, [value]);

	return ([value, setValue])
}

const getAsyncStories = () =>  
	new Promise((resolve, reject) => setTimeout(reject, 2000))/* resolve => 
		setTimeout(
			() => resolve({ stories: list }), 
			1500
	) */


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
				data : state.filter(story => action.payload.objectID !== story.objectID)
			}
		default: 
			throw new Error();
	}
}		

export const App  = () => {

	const [value, setValue] = useSemiPersistentState('search', '');

	const [stories, dispatchStories] = useReducer(
		storiesReducer, 
		{data : [], isLoading: false, isError: false}
	);


  	useEffect(() => {
    	dispatchStories({ type: 'STORIES_FETCH_INIT' });
    	getAsyncStories().then(result => {dispatchStories({type: 'STORIES_FETCH_SUCCESS', payload: result.data.stories,})})
		.catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  	}, []);

	const handleRemoveStories = (item) => 
		dispatchStories({type: 'REMOVE_STORIES', payload: item});
	
	const onHandleInput  = (event)  => setValue(event.target.value);

	const searchedStories = stories.data.filter((story) => story.title.toLowerCase().includes(value.toLowerCase()));

	return (
	<div className="App">
		<Headline title="React" subtitle="a quick app" searchTerm={value}/>
		<Searchbar isFocused search={value} id="search" handleInput={onHandleInput}>
			<Label title="type something"/>
		</Searchbar>
		<div className="list" >
			{stories.isError && <p>Something went wrong</p>}
			{stories.isLoading ? (<p>Loading...</p>) : (<List onRemove={handleRemoveStories} list={searchedStories}/>)}
		</div>
    </div>
	);
}
