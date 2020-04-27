import React from 'react';
import PaginationComponent from '../Pagination';

interface Props {
    title?: string,
    children?: React.ReactNode,
    actions?: React.ReactNode,
    totalCount?: number,
    pageNumber?: number,
    onChangePageNumber?: (pageNumber: number) => void,
    paging?: boolean
}

const TableContainer = (props: Props) => {
    const { title, totalCount, pageNumber, children, actions, onChangePageNumber, paging = true } = props;

    return (
        <>
            <h2 style={{marginTop: '20px'}}>{title}</h2>
            {actions}
            {children}
            {paging &&
                <div className="float-right">
                    <PaginationComponent handlePagingChange={onChangePageNumber!} totalCount={totalCount!} pageNumber={pageNumber!} />
                </div>
            }
        </>
    );
};

export default TableContainer;
