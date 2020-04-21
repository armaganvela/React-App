import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from '../../../config/store';
import { history } from '../../../config/router';
import TableContainer from '../../../components/Containers/TableContainer';
import Spinner from '../../../components/Spinner';
import CityList from './CityList';
import { fetchCities, changeSearchCriteriaCountry, fetchCountries, deleteCity } from '../logic/actions';
import SearchCriteriaContainer from '../../../components/Containers/SearchCriteriaContainer';
import SelectInput from '../../../components/FormComponents/SelectInput';
import { openDeleteModal } from '../../services/logic/actions';
import DeleteModal from '../../../components/DeleteModal';

const Cities = () => {
  const [cityIdToDelete, setCityIdToDelete] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCities(1));
  }, []);

  const cities = useSelector(state => state.city.cities);
  const totalCount = useSelector(state => state.city.totalCount);
  const pageNumber = useSelector(state => state.city.pageNumber);
  const country = useSelector(state => state.city.searchCriteria.country);
  const countries = useSelector(state => state.city.countries);
  const visible = useSelector(state => state.services.progress.visible);
  const openModal = useSelector(state => state.services.openDeleteModal);

  const onClickEditCity = useCallback((cityId: string) => {
    history.push(`/city/edit/${cityId}`);
  }, []);

  const onClickAddCity = useCallback(() => {
    history.push('/city/add');
  }, []);

  const onChangePageNumber = useCallback((pageNumber: number) => {
    dispatch(fetchCities(pageNumber));
  }, [pageNumber]);

  const onClickTalkSearch = useCallback(() => {
    dispatch(fetchCities(1));
}, [country]);

const onCountryChange = useCallback((event: any) => {
  const country = countries.find(x => x.id.toString() === event.currentTarget.value);
  dispatch(changeSearchCriteriaCountry(country));
}, [countries]);

const onClickCloseDeleteModal = useCallback(() => {
  dispatch(openDeleteModal(false));
}, []);

const onOpenDeleteModal = useCallback((cityId: string) => {
  setCityIdToDelete(cityId);
  dispatch(openDeleteModal(true));
}, []);

const onClickDeleteCity = useCallback(() => {
  dispatch(deleteCity(cityIdToDelete));
}, [cityIdToDelete]);


  const renderActions = <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={onClickAddCity}>Add City</button>;

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
                options={countries.map(country => ({
                  value: country.id,
                  text: country.name
                }))}
                label=""
                value={country ? country.id : ''}
                onChange={onCountryChange}
                defaultOption="-Select Country-"
              />
            </div>
          </SearchCriteriaContainer>
          <TableContainer title="Cities" actions={renderActions} pageNumber={pageNumber} totalCount={totalCount} onChangePageNumber={onChangePageNumber}>
            <CityList cities={cities} onEditClick={onClickEditCity} onOpenDeleteModalClick={onOpenDeleteModal} />
          </TableContainer>
          <DeleteModal title={'Delete City'} closeModel={onClickCloseDeleteModal} isOpen={openModal} onClickDelete={onClickDeleteCity} />
        </>
      }
    </>
  );
};

export default Cities;
