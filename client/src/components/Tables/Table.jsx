import React from 'react';

function TableTask() {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Тип завдання</th>
          <th scope="col">Завдання</th>
          <th scope="col">Час ост. виконання</th>
          <th scope="col">Статутс</th>
          <th scope="col">Операция</th>
        </tr>
      </thead>
      <tbody>{}</tbody>
    </table>
  );
}

export default TableTask;
