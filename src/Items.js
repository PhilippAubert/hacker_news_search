import { Item } from './Item.js';

export const List = ({ list, onRemove }) =>
	console.log('List: B') ||
	list.map(item => <Item key={item.objectID} onRemove={onRemove} item={item}/>);