import React from "react";
import { Camp } from "../logic/types";
import moment from "moment";

interface Props {
    camps: Camp[],
    onEditClick: (campId: string) => void;
    onOpenDeleteModalClick: (campId: string) => void;
    onRedirectToTalks: (monikerName: string) => void;
}

const CampList = (props: Props) => {
    const { camps, onEditClick, onOpenDeleteModalClick, onRedirectToTalks } = props;

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Moniker Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Event Date</th>
                        <th>Coordinates(lat, lng)</th>
                        <th>Image</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {camps.map(camp => {
                        return (
                            <tr key={camp.id}>
                                <td>
                                    <a href='#' onClick={(e: any) => { e.preventDefault(); onRedirectToTalks(camp.moniker) }}>
                                        {camp.name}
                                    </a>
                                </td>
                                <td>{camp.moniker}</td>
                                <td>{camp.country?.name}</td>
                                <td>{camp.city?.name}</td>
                                <td>{camp.eventDate ? moment(camp.eventDate).format('L') : ''}</td>
                                <td>{camp.location?.lat.toFixed(3) + ',' + camp.location?.lng.toFixed(3)}</td>
                                <td>
                                    <img src={`data:image/png;base64,${camp.attachmentContent}`} style={{ height: '50px', width: '50px' }} />
                                </td>
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
        </div>
    );
}

export default CampList;