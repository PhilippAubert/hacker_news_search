export const SortButton = ({onClick, name}) => 
{
    return (
       	<span className="listItem_">
	        <button className="button" onClick={onClick}>
                {name}
            </button>
    	</span>
    )
}