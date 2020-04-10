import React from "react";

const Uploader = () => {
    const onFileChange = (event: any) => {
        console.log(event.target.files, '*******************');
    };

    return (
        <div className="form-group">
            <input type="file" onChange={onFileChange} />
        </div>
    );
};

export default Uploader;
