import React from 'react';

function ButtonLogDel({ taskId, jobId }) {
  const handleClick = () => {
    console.log('Task ID:', taskId);
    console.log('Job ID:', jobId);
    // Здесь вы можете выполнить необходимые действия с taskId и jobId
  };
  return (
    <button type="button" className="btn btn-outline-danger btn-sm " onClick={handleClick}>
      <i className="bi bi-trash" />
    </button>
  );
}

export default ButtonLogDel;
