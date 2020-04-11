import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from '../../../config/store';
import { history } from '../../../config/router';
import { fetchCamps, openDeleteModal, deleteCamp } from '../logic/actions';
import CampList from './CampList';
import TableContainer from '../../../components/Containers/TableContainer';
import ModalExample from '../../../components/Modal';
import Spinner from '../../../components/Spinner';

const Camps = () => {
  const [campIdToDelete, setCampIdToDelete] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCamps(1));
  }, []);

  const camps = useSelector(state => state.camp.camps);
  const pageNumber = useSelector(state => state.camp.pageNumber);
  const totalCount = useSelector(state => state.camp.totalCount);
  const openModal = useSelector(state => state.camp.openModal);

  const visible = useSelector(state => state.services.progress.visible);

  const onChangePageNumber = useCallback((pageNumber: number) => {
    dispatch(fetchCamps(pageNumber));
  }, [pageNumber]);

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

  const renderActions = <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={onClickAddCamp}>Add Camp</button>;

  return (
    <>
    { visible &&
      <Spinner />
    }
    {  !visible &&
      <TableContainer title="Camps" actions={renderActions} pageNumber={pageNumber} totalCount={totalCount} onChangePageNumber={onChangePageNumber}>
        <CampList camps={camps} onEditClick={onClickEditCamp} onOpenDeleteModalClick={onOpenDeleteModal} />
      </TableContainer>
}
      <ModalExample closeModel={onClickCloseDeleteModal} isOpen={openModal} onClickDelete={onClickDeleteCamp} />
    </>
  );
};

export default Camps;
