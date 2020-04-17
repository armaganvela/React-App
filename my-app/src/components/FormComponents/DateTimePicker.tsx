import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    date?: Date,
    onChangeDateTime: (date: Date) => void,
    label: string,
    placeHolder: string,
}

const DateTimePicker = (props: Props) => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <div className="field">
                <DatePicker
                    selected={props.date ? moment(props.date).toDate() : undefined}
                    onChange={props.onChangeDateTime}
                    placeholderText={props.placeHolder}
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
