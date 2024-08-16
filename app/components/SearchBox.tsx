import React, { SetStateAction } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';

interface ISearchBoxProps{
    onSearch: (event:string)=>void;
}

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const SearchBox = ({onSearch}: ISearchBoxProps) => (
    <div className='flex my-2'>
        <Search size='large' placeholder="Find Pokemon" allowClear onSearch={onSearch}/>            
    </div>
);

export default SearchBox;