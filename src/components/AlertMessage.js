import React from 'react';

const AlertMessage = ({ type, message }) => (
  <div style={{
    padding: '10px',
    margin: '10px 0',
    color: type === 'success' ? 'green' : 'red'
  }}>
    {message}
  </div>
);

export default AlertMessage;
