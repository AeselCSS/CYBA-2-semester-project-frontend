import { useState } from 'react';

const usePagination = (pageSize: number, totalCount: number) => {
	const [currentPage, setCurrentPage] = useState(1);

	const calculatePageCount = () => {
		return Math.ceil(totalCount / pageSize);
	};

	const paginationSettings = {
		pageCount: calculatePageCount(),
		onPageChange: (event: { selected: number }) => setCurrentPage(event.selected + 1),
		pageRangeDisplayed: 3,
		breakLabel: '...',
		nextLabel: 'Næste',
		previousLabel: 'Forrige',
		renderOnZeroPageCount: null,
		forcePage: currentPage - 1,
		containerClassName: 'pagination',
		pageLinkClassName: 'page-num',
		previousLinkClassName: 'page-num',
		nextLinkClassName: 'page-num',
		activeLinkClassName: 'active',
	};

	return { currentPage, setCurrentPage, paginationSettings };
};

export default usePagination;
