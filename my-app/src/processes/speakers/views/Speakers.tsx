import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from '../../../config/store';
import { history } from '../../../config/router';
import { fetchSpeakers, changeSearchFirstName, clearSearchCriteriaSpeaker } from '../logic/actions';
import SpeakerList from './SpeakerList';
import TableContainer from '../../../components/Containers/TableContainer';
import ModalExample from '../../../components/DeleteModal';
import Spinner from '../../../components/Spinner';
import TextInput from '../../../components/FormComponents/TextInput';
import SearchCriteriaContainer from '../../../components/Containers/SearchCriteriaContainer';

const Speakers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpeakers(1));

    return () => {
      dispatch(clearSearchCriteriaSpeaker());
    };
  }, []);

  const speakers = useSelector(state => state.speaker.speakers);
  const totalCount = useSelector(state => state.speaker.totalCount);
  const pageNumber = useSelector(state => state.speaker.pageNumber);
  const visible = useSelector(state => state.services.progress.visible);

  const firstName = useSelector(state => state.speaker.searchCriteria.firstName);

  const onClickEditSpeaker = useCallback((speakerId: string) => {
    history.push(`/speakers/edit/${speakerId}`);
  }, []);

  const onClickAddSpeaker = useCallback(() => {
    history.push('/speakers/add');
  }, []);

  const onChangePageNumber = useCallback((pageNumber: number) => {
    dispatch(fetchSpeakers(pageNumber));
  }, [pageNumber]);

  const onSearchSpeaker = useCallback(() => {
    dispatch(fetchSpeakers(1));
  }, []);

  const onChangeSearchFirstName = useCallback((e: any) => {
    dispatch(changeSearchFirstName(e.target.value));
  }, [pageNumber]);

  const renderActions = <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={onClickAddSpeaker}>Add Speaker</button>;

  return (
    <>
      {visible &&
        <Spinner />
      }
      {!visible &&
        <>
          <SearchCriteriaContainer title={'Search Speaker'} onSubmit={onSearchSpeaker}>
            <div className="col-md-4 col-xs-4">
              <TextInput
                label=""
                value={firstName}
                onChange={onChangeSearchFirstName}
                placeholder="First Name"
              />
            </div>
          </SearchCriteriaContainer>
          <TableContainer title="Speakers" actions={renderActions} pageNumber={pageNumber} totalCount={totalCount} onChangePageNumber={onChangePageNumber}>
            <SpeakerList speakers={speakers} onEditClick={onClickEditSpeaker} />
          </TableContainer>
        </>
      }
    </>
  );
};

export default Speakers;
