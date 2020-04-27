import React from 'react';

interface Props {
    title: string,
    children: React.ReactNode,
    actions?: React.ReactNode,
    onSubmit: (e: any) => void,
}

const FormContainer = (props: Props) => {
    const { title, children, actions, onSubmit } = props;

    return <form onSubmit={onSubmit}>
        <h2 style={{marginTop: '20px'}}>{title}</h2>
        {children}
        {actions || <button type="submit" className="btn btn-primary">Save</button>}
    </form>
};

export default FormContainer;
