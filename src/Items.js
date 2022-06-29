import { Item } from './Item.js';
import { SortButton } from './SortButton.js';
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

	const [reverse, setReverse] = useState(false);

	const sortFunction = SORTS[sort];

	const sortedList = sortFunction(list);

	const handleSort = (sortKey) =>
	{
		setSort(sortKey);
		setReverse(!reverse);
	}
		

	return (
	<div>
    <div className="sort_bar">
		<h2>Sort by :</h2>
		<SortButton name="Title" onClick={()=> handleSort('TITLE')} />
		<SortButton name="Author" onClick={()=> handleSort('AUTHOR')} />
		<SortButton name="Comments" onClick={()=> handleSort('COMMENTS')}/>
		<SortButton name="Points" onClick={()=> handleSort('POINTS')} />
    </div>
		{sortedList.map(item => (<Item key={item.objectID} onRemove={onRemove} item={item}/>))}
	</div>);
}
