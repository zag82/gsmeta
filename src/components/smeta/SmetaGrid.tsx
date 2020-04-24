import React from 'react';

interface Props {}

const SmetaGrid = (props: Props) => {
  return (
    <div className='card bg-secondary text-white mt-1'>
      <div className='card-header bg-dark'>Смета</div>
      <div className='card-body'>
        <p className='text-center'>Нет данных для отображения</p>
      </div>
    </div>
  );
};

export default SmetaGrid;
