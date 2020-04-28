import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
    title?: string;
    attachmentContent?: string;
    onDrop: (file?: File) => void;
}

function DropZone(props: Props) {
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length !== 0){
            alert('File Type must be jpeg');
            return;
        }

        props.onDrop(acceptedFiles[0]);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: [".jpg"]})

    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Image (.jpg)</label>
                    <div className="field">
                        <div className='file-uploader-container'>
                            <div {...getRootProps()} className='file-uploader' >
                                <input {...getInputProps()} />
                                {isDragActive ?
                                    <p>Drop the files here ...'</p> :
                                    <p>{props.title || 'Drag or click to select image'}</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    {props.attachmentContent &&
                        <img src={`data:image/png;base64,${props.attachmentContent}`} style={{ height: '200px', width: '200px', marginTop: '10px', marginBottom: '15px' }} />
                    }
                </div>
            </div>
        </div>
    )
}

export default DropZone;