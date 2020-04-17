import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../../config/store';
import { history } from '../../../config/router';
import { getTalksByCamp, getAllCamps, changeSearchCamp, deleteTalk, clearSearchCriteriaTalk } from '../logic/actions';
import TableContainer from '../../../components/Containers/TableContainer';
import Spinner from '../../../components/Spinner';
import TalkList from './TalkList';
import SearchCriteriaContainer from '../../../components/Containers/SearchCriteriaContainer';
import SelectInput from '../../../components/FormComponents/SelectInput';
import DeleteModal from '../../../components/DeleteModal';
import { openDeleteModal } from '../../services/logic/actions';

const Talks = () => {
    const [talkIdToDelete, setTalkIdToDelete] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTalksByCamp(1));
        dispatch(getAllCamps());

        return () => {
            dispatch(clearSearchCriteriaTalk());
        };
    }, []);

    const talks = useSelector(state => state.talk.talks);
    const camps = useSelector(state => state.talk.camps);
    const camp = useSelector(state => state.talk.searchCriteria.camp);
    const pageNumber = useSelector(state => state.talk.pageNumber);
    const totalCount = useSelector(state => state.talk.totalCount);

    const visible = useSelector(state => state.services.progress.visible);
    const openModal = useSelector(state => state.services.openDeleteModal);

    const onClickEditCamp = useCallback((talkId: string) => {
        history.push(`/talks/edit/${talkId}`);
    }, []);

    const onClickAddTalk = useCallback(() => {
        history.push(`/talks/add`);
    }, []);

    const onCampChange = useCallback((event: any) => {
        const camp = camps.find(x => x.id.toString() === event.currentTarget.value);
        dispatch(changeSearchCamp(camp));
    }, [camps]);

    const onChangePageNumber = useCallback((pageNumber: number) => {
        dispatch(getTalksByCamp(pageNumber));
    }, [pageNumber]);

    const onClickTalkSearch = useCallback(() => {
        dispatch(getTalksByCamp(1));
    }, [camp]);

    const onClickCloseDeleteModal = useCallback(() => {
        dispatch(openDeleteModal(false));
    }, []);

    const onOpenDeleteModal = useCallback((talkId: string) => {
        setTalkIdToDelete(talkId);
        dispatch(openDeleteModal(true));
    }, []);

    const onClickDeleteTalk = useCallback(() => {
        dispatch(deleteTalk(talkIdToDelete));
    }, [talkIdToDelete]);

    const renderActions = <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={onClickAddTalk}>Add Talk</button>;

    return (
        <>
            {visible &&
                <Spinner />
            }
            {!visible &&
                <>
                    <SearchCriteriaContainer title={'Search Talk'} onSubmit={onClickTalkSearch}>
                        <div className="col-md-4 col-xs-4">
                            <SelectInput
                                options={camps.map(camp => ({
                                    value: camp.id,
                                    text: camp.name
                                }))}
                                label=""
                                value={camp ? camp.id : ''}
                                onChange={onCampChange}
                                defaultOption="-Select Camp-"
                            />
                        </div>
                    </SearchCriteriaContainer>
                    <TableContainer title="Talks" actions={renderActions} pageNumber={pageNumber} totalCount={totalCount} onChangePageNumber={onChangePageNumber}>
                        <TalkList talks={talks} onEditClick={onClickEditCamp} onOpenDeleteModalClick={onOpenDeleteModal} />
                    </TableContainer>
                </>
            }
            <DeleteModal title={'Delete Talk'} closeModel={onClickCloseDeleteModal} isOpen={openModal} onClickDelete={onClickDeleteTalk} />
        </>
    );
};

export default Talks;
