import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from '../../../config/store';
import { history } from '../../../config/router';
import { fetchCamps, deleteCamp, changeSearchEventDate, clearSearchCriteria } from '../logic/actions';
import CampList from './CampList';
import TableContainer from '../../../components/Containers/TableContainer';
import DeleteModal from '../../../components/DeleteModal';
import Spinner from '../../../components/Spinner';
import SearchCriteriaContainer from '../../../components/Containers/SearchCriteriaContainer';
import DateTimePicker from '../../../components/FormComponents/DateTimePicker';
import { openDeleteModal } from '../../services/logic/actions';

const Camps = () => {
  const [campIdToDelete, setCampIdToDelete] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCamps(1));

    return () => {
      dispatch(clearSearchCriteria());
    };
  }, []);

  const eventDate = useSelector(state => state.camp.searchCriteria.eventDate);

  const camps = useSelector(state => state.camp.camps);
  const pageNumber = useSelector(state => state.camp.pageNumber);
  const totalCount = useSelector(state => state.camp.totalCount);
  const openModal = useSelector(state => state.services.openDeleteModal);

  const visible = useSelector(state => state.services.progress.visible);

  const onChangeEventDate = useCallback((eventDate?: Date) => {
    dispatch(changeSearchEventDate(eventDate));
  }, []);

  const onChangePageNumber = useCallback((pageNumber: number) => {
    dispatch(fetchCamps(pageNumber));
  }, [pageNumber]);

  const onClickEditCamp = useCallback((campId: string) => {
    history.push(`/camps/edit/${campId}`);
  }, []);

  const onClickAddCamp = useCallback(() => {
    history.push('/camps/add');
  }, []);

  const onRedirectToTalks = useCallback((campId: string) => {
    history.push('/talks', { campId });
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

  const onSearchCamp = useCallback(() => {
    dispatch(fetchCamps(1));
  }, []);

  const renderActions = <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={onClickAddCamp}>Add Camp</button>;

  return (
    <>
      {visible &&
        <Spinner />
      }
      {!visible &&
        <>
          <SearchCriteriaContainer title={'Search Camps'} onSubmit={onSearchCamp}>
            <div className="col-md-4 col-xs-4">
              <DateTimePicker date={eventDate} onChangeDateTime={onChangeEventDate} placeHolder="Select Event Date" label={""} />
            </div>
          </SearchCriteriaContainer>
          <TableContainer title="Camps" actions={renderActions} pageNumber={pageNumber} totalCount={totalCount} onChangePageNumber={onChangePageNumber}>
            <CampList camps={camps} onRedirectToTalks={onRedirectToTalks} onEditClick={onClickEditCamp} onOpenDeleteModalClick={onOpenDeleteModal} />
          </TableContainer>
        </>
      }
      <DeleteModal title={'Delete Camp'} closeModel={onClickCloseDeleteModal} isOpen={openModal} onClickDelete={onClickDeleteCamp} />
    </>
  );
};

export default Camps;
