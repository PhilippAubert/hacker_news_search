import "./SearchForm.css"
import { Searchbar } from "./Searchbar"
import { Label } from "./Label"

export const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => 
(
		<form  onSubmit={onSearchSubmit}>
			<div className="search">
				<Searchbar isFocused disabled={!searchTerm} typeButton="submit" typeForm="text" value={searchTerm} onInputChange={onSearchInput} id="search" >
					<Label title="search for topic:"/>			
				</Searchbar>
			</div>
		</form>
)