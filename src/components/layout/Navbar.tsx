import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { SmetaContext } from '../../context/smetaContext';

interface Props {}

const Navbar = (props: Props) => {
  const { currentFile, openFile } = useContext(SmetaContext);
  const files = [
    { name: 'small', description: 'Простой файл на 10 позиций, без привязок' },
    {
      name: 'medium',
      description:
        'Средний файл на 100 позиций с привязками и большой концовкой',
    },
    { name: 'large', description: 'Большой файл ~1500 позиций' },
  ];

  const onSelectFile = (index: number) => {
    openFile(files[index].name);
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <span className='navbar-brand mb-0 h1'>
          <FontAwesomeIcon icon={faTable} size='lg' /> Гсс+
        </span>
        <ul className='navbar-nav'>
          {files.map((file, index) => (
            <li
              key={index}
              className={
                'nav-item' + (currentFile === file.name ? ' active' : '')
              }
            >
              <a
                href='#!'
                className='nav-link'
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  onSelectFile(index);
                }}
                title={file.description}
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
