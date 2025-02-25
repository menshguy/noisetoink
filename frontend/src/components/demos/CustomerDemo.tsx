import React from 'react';

const CustomerDemo:React.FC = () => {
  return (
    <div>
      <h1>Customer Demo</h1>
      <div
        style={{
          width: 500,
          height: 500,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, .25)',
          position: 'relative',
          borderRadius: 8,
          background: 'linearGradient(135deg, #8964e8 0, #25a6e9 100%)',
          inset: -5,
          transform: 'translate(0)',
          opacity: .5,
        }}
      >

      </div>
    </div>
  );
};

export default CustomerDemo;