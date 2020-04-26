import React, { useContext } from 'react';
import { SmetaContext } from '../../context/smetaContext';
import { GRecord } from '../../context/gss.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusSquare,
  faMinusSquare,
} from '@fortawesome/free-regular-svg-icons';

interface Props {}

const SmetaGrid = (props: Props) => {
  const {
    smeta,
    getRecordStatus,
    toggleRecordStatus,
    curRecID,
    selectRec,
  } = useContext(SmetaContext);

  const noData = <p className='text-center'>Нет данных для отображения</p>;

  const drawRes = (res: GRecord) => {
    return;
  };
  const drawCostHeader = (cost: GRecord, status: number) => {
    return (
      <div
        className={
          'row grid-cost-header' + (cost.id === curRecID ? ' selected' : '')
        }
        key={cost.id}
        onClick={() => selectRec(cost.id)}
      >
        <div className='col-1'>
          <a
            role='button'
            href='#!'
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              toggleRecordStatus(1);
            }}
            className='black-plus'
          >
            <FontAwesomeIcon
              icon={(status & 1) !== 1 ? faPlusSquare : faMinusSquare}
            />
          </a>
          <a
            role='button'
            href='#!'
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              toggleRecordStatus(2);
            }}
            className='blue-plus'
          >
            <FontAwesomeIcon
              icon={(status & 2) !== 2 ? faPlusSquare : faMinusSquare}
            />
          </a>
          {cost.fields.get('Шифр')}
        </div>
        <div className='col-3'>{cost.fields.get('Наименование')}</div>
        <div className='col-1'>{cost.fields.get('ЕдИзм')}</div>
        <div className='col-1'>{cost.fields.get('Количество')}</div>
        <div className='col-1'>{cost.fields.get('сПЗ')}</div>
        <div className='col-1'>{cost.fields.get('сОТ')}</div>
        <div className='col-1'>{cost.fields.get('сЭМ')}</div>
        <div className='col-1'>{cost.fields.get('сМР')}</div>
        <div className='col-1'>{cost.fields.get('сОБ')}</div>
        <div className='col-1'>{cost.fields.get('Итого')}</div>
      </div>
    );
  };
  const drawCostDetails = (cost: GRecord) => {};
  const drawCost = (cost: GRecord) => {
    const status = getRecordStatus(cost.id);
    switch (status) {
      case 1:
        return (
          <React.Fragment key={cost.id}>
            {drawCostHeader(cost, status)}
            {cost.children?.map((res) => drawRes(res))}
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment key={cost.id}>
            {drawCostHeader(cost, status)}
            {drawCostDetails(cost)}
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment key={cost.id}>
            {drawCostHeader(cost, status)}
            {drawCostDetails(cost)}
            {cost.children?.map((res) => drawRes(res))}
          </React.Fragment>
        );
      default:
        return drawCostHeader(cost, status);
    }
  };
  const drawPartHeader = (part: GRecord, status: number) => {
    return (
      <div
        className={
          'row grid-part-header' + (part.id === curRecID ? ' selected' : '')
        }
        key={part.id}
        onClick={() => selectRec(part.id)}
      >
        <div className='col-11'>
          <a
            role='button'
            href='#!'
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              toggleRecordStatus(1);
            }}
            className='black-plus'
          >
            <FontAwesomeIcon
              icon={status === 1 ? faPlusSquare : faMinusSquare}
            />
          </a>
          {part.fields.get('Наименование')}
        </div>
        <div className='col-1'>{part.fields.get('Итого')}</div>
      </div>
    );
  };
  const drawPart = (part: GRecord) => {
    const status = getRecordStatus(part.id);
    if (status === 0) {
      return (
        <React.Fragment key={part.id}>
          {drawPartHeader(part, status)}
          {part.children?.map((cost) => drawCost(cost))}
        </React.Fragment>
      );
    } else {
      return drawPartHeader(part, status);
    }
  };

  return (
    <div className='card bg-secondary text-white mt-1'>
      <div className='card-header bg-dark'>Смета</div>
      <div className='card-body'>
        <div className='row grid-edit-line'>
          <div className='col'>Смета.Раздел1.Расценка2.Итого</div>
          <div className='col'>0.00</div>
        </div>
        <div className='row grid-header'>
          <div className='col-1'>№, Шифр</div>
          <div className='col-3'>Наименование</div>
          <div className='col-1'>Ед.Изм</div>
          <div className='col-1'>Кол-во</div>
          <div className='col-1'>ПЗ</div>
          <div className='col-1'>ОТ</div>
          <div className='col-1'>ЭМ</div>
          <div className='col-1'>МР</div>
          <div className='col-1'>ОБ</div>
          <div className='col-1'>Итого</div>
        </div>
        {smeta.data.length === 0 && noData}
        {smeta.data.map((part) => drawPart(part))}
      </div>
    </div>
  );
};

export default SmetaGrid;
