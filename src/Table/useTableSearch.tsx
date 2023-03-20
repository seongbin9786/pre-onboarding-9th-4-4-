import { FC, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type {
  FilterConfirmProps,
  FilterDropdownProps,
} from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { SearchBox } from './SearchBox';
import { TableColumnType } from './index';

export type ConfirmFunction = (param?: FilterConfirmProps) => void;

export type SearchHandler = (
  confirm: ConfirmFunction
) => (searchText: string) => void;

/**
 * search에 필요한 column 필드를 반환
 */
export const useTableSearch = (dataIndex: keyof TableColumnType) => {
  console.log('useTableSearch called');

  // 얘는 여기 있는 게 좋겠다.
  // searchText는 <SearchBox />와 Filter 작업 간의 공유 상태이다.
  const [searchFilterText, setSearchFilterText] = useState('');

  // TODO: confirm, clearFilters 가 Filter 기능을 토글링하지 않음. 그럼 필요하지 않은데..
  const setFilter = (confirm: ConfirmFunction) => (searchText: string) => {
    setSearchFilterText(searchText);
    confirm();
    console.log('setFilter called');
  };

  const resetFilter = (clearFilters: () => void) => () => {
    clearFilters();
    setSearchFilterText('');
  };

  // searchText가 변경되지 않으면 함수를 매번 생성하지 않게.
  return {
    filterDropdown: filterDropDownRenderer(setFilter, resetFilter),
    filterIcon: iconRenderer(),
    onFilter: recordFilter(dataIndex),
    render: searchResultRenderer(searchFilterText),
    searchFilter: (record: TableColumnType) => {
      return recordFilter(dataIndex)(searchFilterText, record);
    },
  };
};

const filterDropDownRenderer = (
  setFilter: SearchHandler,
  resetFilter: (clearFilters: () => void) => () => void
): FC<FilterDropdownProps> => {
  // eslint-disable-next-line react/display-name
  return ({ confirm, clearFilters }: FilterDropdownProps) => {
    if (!confirm) {
      console.log('no confirm');
      throw new Error('antd error');
    }
    if (!clearFilters) {
      console.log('no clearFilters');
      throw new Error('antd error');
    }

    const handleSetFilter = setFilter(confirm);
    const handleResetFilter = resetFilter(clearFilters);

    return (
      <SearchBox
        handleSetFilter={handleSetFilter}
        handleResetFilter={handleResetFilter}
      />
    );
  };
};

function iconRenderer() {
  // eslint-disable-next-line react/display-name
  return (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  );
}

const recordFilter =
  (dataIndex: keyof TableColumnType) =>
  (value: string | number | boolean, record: TableColumnType) => {
    const include = record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase());

    // console.log(`[${record[dataIndex]}] has [${value}] ? = ${include}`);

    return include;
  };

const searchResultRenderer =
  (searchText: string) =>
  // eslint-disable-next-line react/display-name
  (text: string) =>
    (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    );
