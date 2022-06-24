import './App.css';
import { list } from './List.js';
import { List } from './Items.js';
import { Label } from './Label.js';
import { Searchbar } from './Searchbar.js';
import { Headline } from './Headline.js';
import { useState, useEffect } from 'react';

const useSemiPersistentState = (key, initialValue) =>
{
	const [value, setValue] = useState(localStorage.getItem('search')||initialValue);

	useEffect(()=>{
		localStorage.setItem('search', value);
	}, [value]);

	return ([value, setValue])
}

const getAsyncStories = () =>  
	new Promise(resolve => 
		setTimeout(
			() => resolve({ data: { stories: list }}), 
			1500
	)
);

export const App  = () => {

	const [value, setValue] = useSemiPersistentState('search', '');

	const [stories, setStories] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect (() => {
		setIsLoading(true);
		getAsyncStories().then(result => {setStories(result.data.stories);
		setIsLoading(false)})
	}, [])

	const handleRemoveStories = (item) => 
	{	
		const newStories = stories.filter(story => item.objectID !== story.objectID) 
		setStories(newStories);
	}
	
	const onHandleInput  = (event)  => setValue(event.target.value);

	const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(value.toLowerCase()));

	return (
	<div className="App">
		<Headline title="React" subtitle="a quick app" searchTerm={value}/>
		<Searchbar isFocused search={value} id="search" handleInput={onHandleInput}>
			<Label title="type something"/>
		</Searchbar>
		<div className="list" >
			{isLoading ? (<p>Loading...</p>) : (<List onRemove={handleRemoveStories} list={searchedStories}/>)}
		</div>
    </div>
	);
}
