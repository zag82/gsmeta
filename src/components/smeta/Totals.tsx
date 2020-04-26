import React, { useContext } from 'react';
import { SmetaContext } from '../../context/smetaContext';

interface Props {}

const Totals = (props: Props) => {
  const { smeta, gssChangeQuantity, gssCopyItem } = useContext(SmetaContext);

  const onChangeQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    gssChangeQuantity();
  };

  const onCopyItem = (e: React.MouseEvent) => {
    e.preventDefault();
    gssCopyItem();
  };

  return (
    <div className='card bg-secondary text-white mt-3'>
      <div className='card-body'>
        <div className='row'>
          <div className='col pt-2'>
            <strong>Итого по смете: {smeta.total} руб.</strong>
          </div>
          <div className='col pt-2'>
            <strong>Позиций: {smeta.positions}</strong>
          </div>
          <ul className='nav'>
            <li className='nav-item'>
              <a
                role='button'
                className='nav-link btn btn-outline-warning'
                href='#!'
                onClick={onChangeQuantity}
                title='Увеличивает количество текущей позиции в 2 раза'
              >
                Количество
              </a>
            </li>
            <li className='nav-item mx-2'>
              {' '}
              <a
                role='button'
                className='nav-link btn btn-outline-warning'
                href='#!'
                onClick={onCopyItem}
                title='Копирует текущую позицию и вставляет сразу за ней'
              >
                Копия
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Totals;
