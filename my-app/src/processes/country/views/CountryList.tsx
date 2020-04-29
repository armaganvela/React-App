import React from "react";
import { Country } from "../../camps/logic/types";

interface Props {
    countries: Country[],
    onEditClick: (countryId: string) => void;
}

const CountryList = (props: Props) => {
    const { countries, onEditClick } = props;

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {countries.map(country => {
                        return (
                            <tr key={country.id}>
                                <td>{country.name}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => onEditClick(country.id)}
                                    >
                                        Update
                                 </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CountryList;