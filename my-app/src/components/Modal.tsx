import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface Props {
    isOpen: boolean;
    closeModel: () => void;
    onClickDelete: () => void;
}


const ModalExample = (props: Props) => {
    return (
        <div>
            <Modal isOpen={props.isOpen} toggle={props.closeModel}>
                <ModalHeader>Modal title</ModalHeader>
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

export default ModalExample;