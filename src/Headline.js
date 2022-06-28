import "./Headline.css"

export const Headline = ({ title, subtitle }) =>
(
	<div className="headline">
		<h1>{title}</h1>
		<h2>{subtitle}</h2>
	</div>
)
	