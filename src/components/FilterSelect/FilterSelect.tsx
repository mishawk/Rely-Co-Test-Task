import React from 'react';

interface FilterSelectProps {
	label: string;
	options: { value: string; label: string }[];
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
	label,
	options,
	onChange,
}) => (
	<select
		className="block px-4 py-2 bg-white shadow-sm sm:text-sm border-gray-300 rounded-md"
		onChange={onChange}
	>
		<option value="">{label}</option>
		{options.map((option) => (
			<option key={option.value} value={option.value}>
				{option.label}
			</option>
		))}
	</select>
);

export default FilterSelect;
