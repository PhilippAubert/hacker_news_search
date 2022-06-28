
export const Item = ({ item, onRemove }) => (
	<div className="listItem">
		<span style={{width: '40%'}} className="listItem_">
		<a  href={item.url}>{item.title}</a>
		</span>
		<span style={{width: '30%'}} className="listItem_">{item.author}</span>
		<span style={{width: '10%'}} className="listItem_">{item.num_comments}</span>
		<span style={{width: '10%'}} className="listItem_">{item.points}</span>
		<button className="button" onClick={()=>onRemove(item)}>Dismiss</button>
	</div>
)

  