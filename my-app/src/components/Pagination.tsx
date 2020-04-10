import React from 'react';
import Pagination from 'react-js-pagination';
import "./Pagination.css";

interface Props {
	pageNumber: number;
	totalCount: number;

	handlePagingChange: (pageNumber: number) => void
}

const PaginationComponent = (props: Props) => {
	const { pageNumber, totalCount, handlePagingChange } = props;

	return (
		<div>
			<Pagination
				itemsCountPerPage={5}
				activePage={pageNumber}
				totalItemsCount={totalCount}
				onChange={handlePagingChange}
			/>
		</div>
	);
};

export default PaginationComponent;
