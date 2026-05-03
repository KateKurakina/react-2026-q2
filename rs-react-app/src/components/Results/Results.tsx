import React from 'react';

type Props = {
    search: string;
}

class Results extends React.Component<Props> {
    render() {
        return (
            <div className='results'>
                <p>Search value: {this.props.search}</p>
            </div>
        );
    }
}

export default Results;