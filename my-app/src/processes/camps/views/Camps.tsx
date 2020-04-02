import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Edit, Delete, AddCircle } from '@material-ui/icons';
import CustomTable from '../../../components/Table';
import Modal from '../../../components/Modal';
import { useSelector, useDispatch } from '../../../config/store';
import { history } from '../../../config/router';
import { fetchCamps, openDeleteModal, deleteCamp } from '../logic/actions';
import { TableBody, TableRow, TableCell, TableHead, IconButton } from '@material-ui/core';

const Camps = () => {
  const [campIdToDelete, setCampIdToDelete] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCamps(0, pageSize));
  }, []);

  const camps = useSelector(state => state.camp.camps);
  const pageNumber = useSelector(state => state.camp.pageNumber);
  const pageSize = useSelector(state => state.camp.pageSize);
  const totalCount = useSelector(state => state.camp.totalCount);
  const openModal = useSelector(state => state.camp.openModal);

  const onChangePageNumber = useCallback((pageNumber: number) => {
    dispatch(fetchCamps(pageNumber, pageSize));
  }, [pageSize, pageSize]);

  const onChangePageSize = useCallback((pageSize: number) => {
    dispatch(fetchCamps(0, pageSize));
  }, [pageSize]);

  const onClickEditCamp = useCallback((campId: string) => {
    history.push(`/camps/edit/${campId}`);
  }, []);

  const onClickAddCamp = useCallback(() => {
    history.push(`/camps/add`);
  }, []);

  const onClickCloseDeleteModal = useCallback(() => {
    dispatch(openDeleteModal(false));
  }, []);

  const onOpenDeleteModal = useCallback((campId: string) => {
    setCampIdToDelete(campId);
    dispatch(openDeleteModal(true));
  }, []);

  const onClickDeleteCamp = useCallback(() => {
     dispatch(deleteCamp(campIdToDelete));
  }, [campIdToDelete]);

  const renderCamps = useMemo(() => (
    totalCount > 0 &&
    <>
      <TableBody>
        {camps.map((camp) => (
          <TableRow key={camp.id}>
            <TableCell component="th" scope="row">
              {camp.name}
            </TableCell>
            <TableCell component="th" scope="row">
              {camp.moniker}
            </TableCell>
            <TableCell component="th" scope="row">
              {camp.eventDate}
            </TableCell>
            <TableCell>
              <IconButton onClick={() => onClickEditCamp(camp.id)}>
                <Edit color="primary" />
              </IconButton>
              <IconButton onClick={() => onOpenDeleteModal(camp.id)}>
                <Delete color="primary" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  ), [camps]);

  return (
    <>
      <IconButton onClick={onClickAddCamp}>
        <AddCircle color="primary" />
      </IconButton>
      <CustomTable
        titles={['Name', 'Moniker','Event Date', 'Options']}
        count={totalCount}
        pageNumber={pageNumber}
        pageSize={pageSize}
        onChangePageNumber={onChangePageNumber}
        onChangePageSize={onChangePageSize}>
        {renderCamps}
      </CustomTable>
      <Modal openModal={openModal} onClickCloseModal={onClickCloseDeleteModal} onClickDelete={onClickDeleteCamp} />
    </>
  );
};

export default Camps;
