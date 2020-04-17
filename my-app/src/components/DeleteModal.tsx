import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface Props {
    title: string;
    isOpen: boolean;
    closeModel: () => void;
    onClickDelete: () => void;
}


const DeleteModal = (props: Props) => {
    return (
        <div>
            <Modal isOpen={props.isOpen} toggle={props.closeModel}>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.onClickDelete}>Delete</Button>{' '}
                    <Button color="secondary" onClick={props.closeModel}> Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteModal;