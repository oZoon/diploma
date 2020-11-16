import React from 'react';

function Background(props) {
    const style = !props.show ? {opacity: '0.2'} : {opacity: '1'};
    if(props.imgUrl){
        style.backgroundImage = `url(${props.imgUrl})`;
    }
    return (
        <div className="wrapper-root back-root" style={style} />
    )
}

export default Background;
