import FilterSelect from '../FilterSelect/FilterSelect';
import { genderOptions, statusOptions } from '../utilities/filterTypes';

interface FilterPanelProps {
	setGenderFilter: React.Dispatch<React.SetStateAction<string>>;
	setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
	setGenderFilter,
	setStatusFilter,
}) => (
	<div className="flex justify-end items-center mb-5 space-x-8">
		<FilterSelect
			label="Choose gender"
			options={genderOptions}
			onChange={(e) => setGenderFilter(e.target.value)}
		/>
		<FilterSelect
			label="Choose status"
			options={statusOptions}
			onChange={(e) => setStatusFilter(e.target.value)}
		/>
	</div>
);

export default FilterPanel;
