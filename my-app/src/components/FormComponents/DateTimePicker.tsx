import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    date?: Date,
    onChangeDateTime: (date: Date) => void
}

const DateTimePicker = (props: Props) => {
    return (
        <div className="form-group">
            <label>Date</label>
            <div className="field">
                <DatePicker
                    selected={props.date ? moment(props.date).toDate() : undefined}
                    onChange={props.onChangeDateTime}
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
