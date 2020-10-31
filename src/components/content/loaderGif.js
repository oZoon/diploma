import React from 'react';

function Gif(props) {
    const style = props.state.includes(true) ? {display: 'block'} : {display: 'none'};

    // const style = props.state ? {display: 'block'} : {display: 'none'};
    return (
        <img style={style} src="./build/loading3.gif" className="content-gif" />
    )
}

export default Gif;
