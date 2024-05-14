interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<Props> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => (
	<div className="flex justify-center mt-6">
		<button
			className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
			onClick={() => onPageChange(currentPage - 1)}
		>
			Previous Page
		</button>

		<div className="py-2.5 px-5 mb-2 text-sm text-gray-900">
			Page {currentPage} of {totalPages}
		</div>

		<button
			className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
			onClick={() => onPageChange(currentPage + 1)}
		>
			Next Page
		</button>
	</div>
);

export default PaginationControls;
