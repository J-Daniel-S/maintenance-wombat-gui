import React from 'react';

const Description = (props) => {
    return(
        <React.Fragment>
            <blockquote>
                {props.task}
            </blockquote>
        </React.Fragment>
    );
}

export default Description;