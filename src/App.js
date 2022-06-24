import './App.css';
import { list } from './List.js';
import {useState, useEffect} from 'react';

export const App  = () => {
 	const stories = list;

	const [value, setValue] = useState(localStorage.getItem('search')||'react');

	useEffect(()=>{
		localStorage.setItem('search', value);
	}, [value]);

 	const onHandleInput  = (event)  => {
		setValue(event.target.value);
		localStorage.setItem('search', event.target.value);
	}
		
  	const headline = {
	title : 'REACT',
	subtitle : 'a small interface'
	};

const searchedStories = stories.filter((story) => {
		return story.title.toLowerCase().includes(value.toLowerCase());
	}); 

	return (
	<div className="App">
		<Headline text={headline} searchTerm={value}/>
		<Searchbar isFocused search={value} id="search" handleInput={onHandleInput}>
			<Label title="TYPE SOMETHING"/>
		</Searchbar>
		<div className="list" >
			<List list={searchedStories}/>
		</div>
    </div>
  );
}

const List = ({ list }) =>
	list.map(item => <Item key={item.objectID} item={item}/>);

 const Item = ({ item }) => (
  <div className="listItem">
    <span className="listItem_">
      <a  href={item.url}>{item.title}</a>
    </span>
    <span className="listItem_">{item.author}</span>
    <span className="listItem_">{item.num_comments}</span>
    <span className="listItem_">{item.points}</span>
  </div>
);



const Label = ({title}) => (<strong>{title}</strong>)

const Searchbar = ({ handleInput, search, id, children, type="text"}) => 
{
 
	return (
		<>
			<label htmlFor={id}>{children}</label>
	    	<input id={id} type={type} value={search} onChange={handleInput}/>
		</>
	)
}

const Headline = ({ text }) =>
(
	<>
		<h1>{text.title}</h1>
		<h2>{text.subtitle}</h2>
	</>
)
	

