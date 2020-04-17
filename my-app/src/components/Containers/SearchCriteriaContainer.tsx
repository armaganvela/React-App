import React from 'react';

interface Props {
    title: string,
    children: React.ReactNode,
    actions?: React.ReactNode,
    onSubmit: (e: any) => void,
}

const SearchCriteriaContainer = (props: Props) => {
    const { title, children, actions, onSubmit } = props;

    return <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="row">
            {children}
            <div className="col-md-2 col-xs-2" style={{ marginTop: '24px' }}>
                <button className="input-group-btn btn btn-primary" type="submit">Search</button>
            </div>
        </div>
    </form>
};

export default SearchCriteriaContainer;


