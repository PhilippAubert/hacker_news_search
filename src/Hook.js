import { useState, useEffect } from 'react';

export function useSemiPersistentState(key, initialKey) {
	const [input, setInput] = useState(localStorage.getItem(key) || initialKey);
	
	useEffect(()=>{
		localStorage.setItem(key, input);
	}, [input, key]);

 	return [input, setInput];
};