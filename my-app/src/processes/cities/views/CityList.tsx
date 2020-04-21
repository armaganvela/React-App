import React from "react";
import { City } from "../../camps/logic/types";

interface Props {
    cities: City[],
    onEditClick: (cityId: string) => void;
    onOpenDeleteModalClick: (cityId: string) => void;
}

const CountryList = (props: Props) => {
    const { cities, onEditClick, onOpenDeleteModalClick } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country Name</th>
                    <th />
                    <th />
                </tr>
            </thead>
            <tbody>
                {cities.map(city => {
                    return (
                        <tr key={city.id}>
                            <td>{city.name}</td>
                            <td>{city.country?.name}</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onOpenDeleteModalClick(city.id)}
                                >
                                    Delete
                                 </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => onEditClick(city.id)}
                                >
                                    Update
                                 </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default CountryList;