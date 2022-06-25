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
		case 'SET_STORIES': 
			return action.payload;
		case 'REMOVE_STORIES':
			return state.filter(story => action.payload.objectID !== story.objectID);
		default: 
			throw new Error();
	}
}		

export const App  = () => {

	const [value, setValue] = useSemiPersistentState('search', '');

	const [stories, dispatchStories] = useReducer(
		storiesReducer, 
		[]
	);

	const [isLoading, setIsLoading] = useState(false);

	const [isError, setIsError] = useState(false);

	useEffect (() => {
		setIsLoading(true);
		getAsyncStories().then(result => {dispatchStories({type: 'SET_STORIES', payload: result.stories});
		setIsLoading(false)}).catch(() => setIsError(true));
	}, [])

	const handleRemoveStories = (item) => 
		dispatchStories({type: 'REMOVE_STORIES', payload: item});
	
	const onHandleInput  = (event)  => setValue(event.target.value);

	const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(value.toLowerCase()));

	return (
	<div className="App">
		<Headline title="React" subtitle="a quick app" searchTerm={value}/>
		<Searchbar isFocused search={value} id="search" handleInput={onHandleInput}>
			<Label title="type something"/>
		</Searchbar>
		<div className="list" >
			{isError && <p>Something went wrong</p>}
			{isLoading ? (<p>Loading...</p>) : (<List onRemove={handleRemoveStories} list={searchedStories}/>)}
		</div>
    </div>
	);
}
