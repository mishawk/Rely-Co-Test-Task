import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import SearchBar from '../SearchBar/SearchBar';
import PaginationControls from '../PaginationControls/PaginationControls';
import CharactersList from '../CharactersList/CharactersList';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { Character } from '../../types/character';
import nothing from '../../../public/giphy.gif';
import {
	ApiError,
	CharactersResponse,
	SortConfig,
	SortDirection,
} from '../../types/general';
import { ColorRing } from 'react-loader-spinner';
import FilterPanel from '../FilterPanel/FilterPanel';

const fetchCharacters = async (queryParams = '') => {
	const response = await fetch(
		`https://rickandmortyapi.com/api/character/?${queryParams}`,
	);
	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.error || 'Network response was not ok');
	}
	return response.json();
};

const CharactersTable = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [genderFilter, setGenderFilter] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
	const debouncedSetTerm = debounce(setDebouncedTerm, 300);

	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: null,
		direction: SortDirection.NONE,
	});

	const toggleSortDirection = (key: string, direction: SortDirection) => {
		setSortConfig({ key, direction });
	};

	const sortData = (data: Character[]): Character[] => {
		if (!sortConfig.key || sortConfig.direction === null) return data;

		return [...data].sort((a, b) => {
			const key = sortConfig.key as unknown as keyof Character;
			const aValue = a[key];
			const bValue = b[key];

			if (aValue < bValue) {
				return sortConfig.direction === 'asc' ? -1 : 1;
			}
			if (aValue > bValue) {
				return sortConfig.direction === 'asc' ? 1 : -1;
			}
			return 0;
		});
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		debouncedSetTerm(searchTerm);

		return () => {
			debouncedSetTerm.cancel();
		};
	}, [debouncedSetTerm, searchTerm]);

	const buildQueryParams = () => {
		const params = new URLSearchParams();
		if (searchTerm) params.append('name', searchTerm);
		if (statusFilter) params.append('status', statusFilter);
		if (genderFilter) params.append('gender', genderFilter);
		if (currentPage > 1) params.append('page', String(currentPage));
		return params.toString();
	};

	const { data, status, isFetching, error } = useQuery<
		CharactersResponse,
		ApiError
	>(
		['characters', debouncedTerm, statusFilter, genderFilter, currentPage],
		() => fetchCharacters(buildQueryParams()),
		{
			keepPreviousData: true,
			retry: false,
			onError: (err) => {
				console.error('Fetching characters failed:', err);
			},
		},
	);

	const totalPages = data?.info?.pages || 0;

	const handlePageChange = (page: number) => {
		if (page < 1) {
			page = 1;
		} else if (page > totalPages) {
			page = totalPages;
		}
		setCurrentPage(page);
	};

	const sortedData = sortData(data?.results || []);

	return (
		<div className="container mx-auto px-4 sm:px-8">
			<div className="py-8">
				<div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
					<h2 className="text-2xl leading-tight mb-4">
						The Rick and Morty characters
					</h2>
				</div>

				<div className="mx-auto w-full md:w-4/5 h-auto md:h-96">
					<div className="flex justify-center mb-3 mt-8">
						<SearchBar onSearchChange={handleSearchChange} />
					</div>

					<FilterPanel
						setGenderFilter={setGenderFilter}
						setStatusFilter={setStatusFilter}
					/>

					{isFetching ? (
						<div className="flex justify-center items-center mt-20">
							<ColorRing
								visible={true}
								height="80"
								width="80"
								ariaLabel="color-ring-loading"
								wrapperStyle={{}}
								wrapperClass="color-ring-wrapper"
								colors={[
									'#808080',
									'#808080',
									'#808080',
									'#808080',
									'#808080',
								]}
							/>
						</div>
					) : data ? (
						<CharactersList
							characters={sortedData}
							toggleSortDirection={toggleSortDirection}
							sortConfig={sortConfig}
						/>
					) : null}

					{status !== 'error' && !isFetching && (
						<PaginationControls
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}

					{status === 'error' && (
						<div className="flex justify-center items-center">
							<img
								src={nothing}
								alt="Error loading data"
								className="w-128 h-128"
							/>
						</div>
					)}

					{status === 'error' && (
						<div className="mt-10">
							<ErrorAlert message={error.message} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CharactersTable;
