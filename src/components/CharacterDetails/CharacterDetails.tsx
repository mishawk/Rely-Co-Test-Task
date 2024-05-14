import { Character } from '../../types/character';

interface Props {
	character: Character | null;
	show: boolean;
	onClose: () => void;
}

export const CharacterDetails: React.FC<Props> = ({
	character,
	show,
	onClose,
}) => {
	if (!show || character === null) return null;

	return (
		<div
			className={`${
				show ? 'flex' : 'hidden'
			} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50`}
			aria-hidden={!show}
		>
			<div className="relative p-4 w-full max-w-2xl max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Character Deatils
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide="static-modal"
							onClick={onClose}
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>

					<div className="p-4 md:p-5 space-y-4 bg-white dark:bg-gray-700 rounded-lg shadow">
						<div className="flex items-center space-x-3">
							<img
								src={character?.image}
								alt={character?.name}
								className="w-10 h-10 rounded-full"
							/>
							<h2 className="text-xl font-bold text-gray-900 dark:text-white">
								{character?.name}
							</h2>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex items-center space-x-2">
								<svg
									className="w-5 h-5 text-red-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.828a4 4 0 010-5.656z"
										clipRule="evenodd"
									/>
								</svg>
								<p className="text-gray-600 dark:text-gray-300">
									Status: {character?.status}
								</p>
							</div>

							<div className="flex items-center space-x-2">
								<svg
									className="w-5 h-5 text-green-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
								<p className="text-gray-600 dark:text-gray-300">
									Species: {character?.species}
								</p>
							</div>

							<div className="flex items-center space-x-2">
								<p className="text-gray-600 dark:text-gray-300">
									Type: {character?.type || 'N/A'}
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-600 dark:text-gray-300">
									Gender: {character?.gender}
								</p>
							</div>

							<div className="flex items-center space-x-2">
								<a
									href={character?.origin.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									Origin: {character?.origin.name}
								</a>
							</div>

							<div className="flex items-center space-x-2">
								<a
									href={character?.location.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									Location: {character?.location.name}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
