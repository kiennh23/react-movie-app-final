import React from "react";

const CastList = (props) => {
    const casts = props.item.cast;
    return (
        <div className='casts'>
            {casts &&
                casts.map((cast, index) => (
                    <div key={index} className='casts__item'>
                        <div
                            className='casts__item__img'
                            style={{
                                backgroundImage: `url(${cast.image.url})`,
                            }}
                        ></div>
                        <p className='casts__item__name'>{cast.name}</p>
                    </div>
                ))}
        </div>
    );
};

export default CastList;
