export const Item = ({ item }) => (
  <div className="listItem">
    <span className="listItem_">
      <a  href={item.url}>{item.title}</a>
    </span>
    <span className="listItem_">{item.author}</span>
    <span className="listItem_">{item.num_comments}</span>
    <span className="listItem_">{item.points}</span>
  </div>
);
