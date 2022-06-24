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

export const App  = () => {
 	const stories = list;

	const [value, setValue] = useSemiPersistentState('search', 'React');

 	const onHandleInput  = (event)  => setValue(event.target.value);
	
	const searchedStories = stories.filter((story) => {
		return story.title.toLowerCase().includes(value.toLowerCase());
	});

	return (
	<div className="App">
		<Headline title="React" subtitle="a quick app" searchTerm={value}/>
		<Searchbar isFocused search={value} id="search" handleInput={onHandleInput}>
			<Label title="TYPE SOMETHING"/>
		</Searchbar>
		<div className="list" >
			<List list={searchedStories}/>
		</div>
    </div>
  );
}
