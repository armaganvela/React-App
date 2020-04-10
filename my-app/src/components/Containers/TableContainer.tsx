import React from 'react';
import PaginationComponent from '../Pagination';

interface Props {
    title?: string,
    children?: React.ReactNode,
    actions?: React.ReactNode,
    totalCount?: number,
    pageNumber?: number,
    onChangePageNumber?: (pageNumber: number) => void,
}

const TableContainer = (props: Props) => {
    const { title, totalCount, pageNumber, children, actions, onChangePageNumber } = props;

    return (
        <>
            <h2>{title}</h2>
            {actions}
            {children}
            <div className="float-right">
                <PaginationComponent handlePagingChange={onChangePageNumber!} totalCount={totalCount!} pageNumber={pageNumber!} />
            </div>
        </>
    );
};

export default TableContainer;
