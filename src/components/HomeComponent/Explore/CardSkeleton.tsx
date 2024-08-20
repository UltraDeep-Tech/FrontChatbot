import React from 'react';

const CardSkeleton = () => {
    return (
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: '#e0e0e0', height: '20px', width: '60%', marginBottom: '10px' }}></div>
            <div style={{ backgroundColor: '#e0e0e0', height: '15px', width: '80%' }}></div>
            <div style={{ backgroundColor: '#e0e0e0', height: '15px', width: '40%' }}></div>
        </div>
    );
};

export default CardSkeleton;