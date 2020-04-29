import React from "react";
import { Speaker } from "../../talks/logic/types";

interface Props {
    speakers: Speaker[],
    onEditClick: (speakerId: string) => void;
}

const SpeakerList = (props: Props) => {
    const { speakers, onEditClick } = props;

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Company</th>
                        <th>Image</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {speakers.map(speaker => {
                        return (
                            <tr key={speaker.speakerId}>
                                <td>{speaker.firstName}</td>
                                <td>{speaker.middleName}</td>
                                <td>{speaker.lastName}</td>
                                <td>{speaker.company}</td>
                                <td>
                                    <img src={`data:image/png;base64,${speaker.attachmentContent}`} style={{ height: '50px', width: '50px' }} />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => onEditClick(speaker.speakerId)}
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

export default SpeakerList;