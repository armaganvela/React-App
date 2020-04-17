import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from '../../../config/store';
import { history } from '../../../config/router';
import TableContainer from '../../../components/Containers/TableContainer';
import Spinner from '../../../components/Spinner';
import CountryList from './CountryList';
import { fetchCountries } from '../logic/action';

const Countries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const countries = useSelector(state => state.country.countries);
  const visible = useSelector(state => state.services.progress.visible);

  const onClickEditCountry = useCallback((countryId: string) => {
    history.push(`/countries/edit/${countryId}`);
  }, []);

  const onClickAddCountry = useCallback(() => {
    history.push('/countries/add');
  }, []);

  const renderActions = <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={onClickAddCountry}>Add Country</button>;

  return (
    <>
      {visible &&
        <Spinner />
      }
      {!visible &&
        <TableContainer title="Countries" actions={renderActions} paging={false}>
          <CountryList countries={countries} onEditClick={onClickEditCountry} />
        </TableContainer>
      }
    </>
  );
};

export default Countries;
