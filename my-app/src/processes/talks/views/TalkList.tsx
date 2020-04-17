import React from "react";
import { Talk } from "../logic/types";

interface Props {
    talks: Talk[],
    onEditClick: (talkId: string) => void;
    onOpenDeleteModalClick: (talkId: string) => void;
}

const TalkList = (props: Props) => {
    const { talks, onEditClick, onOpenDeleteModalClick } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Abstract</th>
                    <th>Speaker Name</th>
                    <th>Camp</th>
                    <th />
                    <th />
                </tr>
            </thead>
            <tbody>
                {talks.map(talk => {
                    return (
                        <tr key={talk.talkId}>
                            <td>{talk.title}</td>
                            <td>{talk.abstract}</td>
                            <td>{talk.speaker!.firstName}</td>
                            <td>{talk.camp!.name}</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onOpenDeleteModalClick(talk.talkId)}
                                >
                                    Delete
                                 </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => onEditClick(talk.talkId)}
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

export default TalkList;