import { useEffect, useRef } from 'react';

export const Searchbar = ({ handleInput, value, id, children, isFocused, type="text"}) => 
{ 
	const inputRef = useRef();

	useEffect(()=> {
		if (isFocused && inputRef.current)
		inputRef.current.focus();
	}, [isFocused])

	return (
		<>
			<label htmlFor={id}>{children}</label>
			<input id={id} ref={inputRef} type={type} value={value} autoFocus={isFocused} onChange={handleInput}/>
		</>
	)
}
