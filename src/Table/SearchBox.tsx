import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface SearchBoxProp {
  handleSetFilter: (searchText: string) => void;
  handleResetFilter: () => void;
}

export const SearchBox = ({
  handleSetFilter,
  handleResetFilter,
}: SearchBoxProp) => {
  const [searchText, setSearchText] = useState('');

  const setFilter = () => handleSetFilter(searchText);
  const resetFilter = () => {
    handleResetFilter();
    setSearchText('');
  };

  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={setFilter}
        style={{ marginBottom: 8, display: 'block' }}
        autoFocus
      />
      <Space>
        <Button
          type='primary'
          onClick={setFilter}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}
        >
          검색
        </Button>
        <Button onClick={resetFilter} size='small' style={{ width: 90 }}>
          초기화
        </Button>
      </Space>
    </div>
  );
};
