/// <reference types="vite-plugin-svgr/client"/>
import { Character } from '../../types/character';
import ArrowUp from '../../../public/sort-up.svg?react';
import ArrowDown from '../../../public/ArrowDown.svg?react';
import { SortConfig, SortDirection } from '../../types/general';
import { useState } from 'react';
import { CharacterDetails } from '../CharacterDetails/CharacterDetails';

interface Props {
	characters: Character[];
	toggleSortDirection: (key: string, forcedDirection: SortDirection) => void;
	sortConfig: SortConfig;
}

const columns = [
	{ key: 'name', label: 'Name' },
	{ key: 'status', label: 'Status' },
	{ key: 'species', label: 'Race' },
	{ key: 'type', label: 'Type' },
	{ key: 'gender', label: 'Gender' },
];

const CharactersList: React.FC<Props> = ({
	characters,
	toggleSortDirection,
	sortConfig,
}) => {
	const [selectedCharacter, setSelectedCharacter] =
		useState<Character | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchCharacterDetails = async (id: number) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`https://rickandmortyapi.com/api/character/${id}`,
			);
			const data = await response.json();
			setSelectedCharacter(data);
		} catch (error) {
			console.error('Failed to fetch character details:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const getSortIcon = (columnKey: string) => {
		return (
			<div>
				<ArrowUp
					className={`w-3 h-2 ml-2 ${sortConfig.key === columnKey && sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-gray-500'} hover:scale-110`}
					onClick={() =>
						toggleSortDirection(columnKey, SortDirection.ASC)
					}
				/>
				<ArrowDown
					className={`w-3 h-2 ml-2 ${sortConfig.key === columnKey && sortConfig.direction === 'desc' ? 'text-blue-500' : 'text-gray-500'} hover:scale-110`}
					onClick={() =>
						toggleSortDirection(columnKey, SortDirection.DESC)
					}
				/>
			</div>
		);
	};

	return (
		<>
			<div className="relative overflow-y-auto shadow-md sm:rounded-lg h-96">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									className="w-64 px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-bold text-gray-800 uppercase tracking-wider"
								>
									<span className="flex items-center justify-center">
										{column.label} {getSortIcon(column.key)}
									</span>
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{characters.map((character: Character) => (
							<tr
								key={character.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								onClick={() =>
									fetchCharacterDetails(character.id)
								}
							>
								<th
									scope="row"
									className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
								>
									<img
										className="w-10 h-10 rounded-full"
										src={character.image}
										alt="character image"
									/>
									<div className="ps-3">
										<div className="text-base font-semibold">
											{character.name}
										</div>
									</div>
								</th>

								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
									{character.status}
								</td>

								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
									{character.species}
								</td>

								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
									{character.type}
								</td>

								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
									{character.gender}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{isLoading ? (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<button
						disabled
						type="button"
						className="inline-flex items-center py-4 px-8 text-base font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
					>
						<svg
							aria-hidden="true"
							role="status"
							className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="#1C64F2"
							/>
						</svg>
						Loading...
					</button>
				</div>
			) : (
				selectedCharacter && (
					<CharacterDetails
						character={selectedCharacter}
						show={selectedCharacter !== null}
						onClose={() => setSelectedCharacter(null)}
					/>
				)
			)}
		</>
	);
};

export default CharactersList;
