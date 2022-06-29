import { Item } from './Item.js';
import { useState } from 'react';
import { sortBy } from 'lodash';

export const List = ({ list, onRemove }) => {

	const SORTS = {
		NONE: list => list,
		TITLE: list => sortBy(list, 'title'),
		AUTHOR: list => sortBy(list, 'author'),
		COMMENTS: list => sortBy(list, 'num_comments').reverse(),
		POINTS: list => sortBy(list, 'points').reverse(),
	};

	const [sort, setSort] = useState('NONE');

	const sortFunction = SORTS[sort];

	const sortedList = sortFunction(list);

	const handleSort = (sortKey) => 
	{
		setSort(sortKey);
	}

	return (
	<div>
    <div className="listItem" >
		<span className="listItem_" style={{ width: '40%' }}>
			<button className="button" onClick={() => handleSort('TITLE')}>Title</button>
		</span>
		<span className="listItem_" style={{ width: '30%' }}>
			<button className="button" onClick={() => handleSort('AUTHOR')}>Author</button>
		</span>
		<span className="listItem_" style={{ width: '10%' }}>
			<button className="button" onClick={() => handleSort('COMMENTS')}>Comments</button>
		</span>
		<span className="listItem_" style={{ width: '10%' }}>
				<button className="button" onClick={() => handleSort('POINTS')}>Points</button>
		</span>
		<span >Actions</span>
    </div>
		{sortedList.map(item => (<Item key={item.objectID} onRemove={onRemove} item={item}/>))}
	</div>);
}
