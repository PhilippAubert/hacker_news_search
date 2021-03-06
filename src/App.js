import './App.css';
import { List } from './Items.js';
import { SearchForm } from './SearchTerm';
import { Headline } from './Headline.js';
import { useState, useEffect, useRef, useReducer, useMemo, useCallback } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (key, initialValue) =>
{
	const isMounted = useRef(false);

	const [value, setValue] = useState(localStorage.getItem('search')||initialValue);

	useEffect(() => {
		if (!isMounted.current)
			isMounted.current = true;
		else {
			console.log('A');
			localStorage.setItem('search', value);
		}
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

const getSumComments = (stories) => {
	console.log('C');
	return stories.data.reduce((result, value) => result + value.num_comments, 0);
}

export const App  = () => {

	const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');

	const [stories, dispatchStories] = useReducer(storiesReducer, {data : [], isLoading: false, isError: false});

	const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
	
	const handleFetchStories = useCallback(async () => {
	dispatchStories({ type: 'STORIES_FETCH_INIT' });
	try {
		const result = await axios.get(url);
		dispatchStories({
		type: 'STORIES_FETCH_SUCCESS',
		payload: result.data.hits,
	});
	}
	catch {
		dispatchStories({ type: 'STORIES_FETCH_FAILURE'});
	}
	}, [url]);


	useEffect(() => {
		handleFetchStories();
  	}, [handleFetchStories]);

	const handleRemoveStories = (item) => 
		dispatchStories({type: 'REMOVE_STORIES', payload: item});

	const handleSearchInput  = (event)  => setSearchTerm(event.target.value);

	const handleSearchSubmit = (event) => {
		setUrl(`${API_ENDPOINT}${searchTerm}`);
		event.preventDefault();
	}

	const sumComments = useMemo (() => getSumComments(stories), [stories]);
	console.log(sumComments);

	console.log('B: App');

	return (
	<div className="App">
		<Headline title="HACKER NEWS" subtitle={`with ${sumComments} comments`} />
		<SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit} />
		<div className="list" >
			{stories.isError && <p>Something went wrong</p>}
			{stories.isLoading ? (<p>Loading...</p>) : (<List onRemove={handleRemoveStories} list={stories.data}/>)}
		</div>
    </div>
	);
}
