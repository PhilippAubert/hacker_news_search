import { useEffect, useRef } from 'react';

export const Searchbar = ({ onInputChange, value,disabled, id, children, isFocused, typeButton, typeForm}) => 
{ 
	const inputRef = useRef();

	useEffect(()=> {
		if (isFocused && inputRef.current)
		inputRef.current.focus();
	}, [isFocused])

	return (
		<>
			<label htmlFor={id}>{children}</label>
			<input id={id} ref={inputRef} type={typeForm} value={value} autoFocus={isFocused} onChange={onInputChange}/>
			<button className="button" disabled={disabled} type={typeButton}>Submit!</button>
		</>
	)
}
