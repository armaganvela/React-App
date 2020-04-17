import React from "react";
import { Camp } from "../logic/types";
import moment from "moment";

interface Props {
    camps: Camp[],
    onEditClick: (campId: string) => void;
    onOpenDeleteModalClick: (campId: string) => void;
    onRedirectToTalks: (campId: string) => void;
}

const CampList = (props: Props) => {
    const { camps, onEditClick, onOpenDeleteModalClick, onRedirectToTalks } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Moniker Name</th>
                    <th>Country</th>
                    <th>Event Date</th>
                    <th />
                    <th />
                </tr>
            </thead>
            <tbody>
                {camps.map(camp => {
                    return (
                        <tr key={camp.id}>
                            <td>
                                <a href='#' onClick={(e: any) => { e.preventDefault(); onRedirectToTalks(camp.id)}}>
                                    {camp.name}
                                </a>
                            </td>
                            <td>{camp.moniker}</td>
                            <td>{camp.country?.name}</td>
                            <td>{camp.eventDate ? moment(camp.eventDate).format('L') : ''}</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onOpenDeleteModalClick(camp.id)}
                                >
                                    Delete
                                 </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => onEditClick(camp.id)}
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

export default CampList;