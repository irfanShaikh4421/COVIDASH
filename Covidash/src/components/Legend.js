import React from 'react';

const Legend = ({ legendItems }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
            {legendItems.map((item, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: item.color,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:
                            item.textColor != null ? item.textColor : 'black',
                        height: '7vh',
                        fontWeight: 'bolder',
                        fontSize: '1em',
                    }}
                >
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend;
