import type { ColumnsType } from 'antd/es/table';
import { Table as AntdTable } from 'antd';
import { useTableSearch } from './useTableSearch';

export interface TableColumnType {
  id: number;
  transaction_time: string;
  status: boolean;
  customer_id: number;
  customer_name: string;
  currency: string;
}

interface TableProps {
  data: TableColumnType[];
}

const TODAY = '2023-03-08';

const todayFilter = (record: TableColumnType): boolean => {
  return record.transaction_time.includes(TODAY);
};

const IdSorter = (a: TableColumnType, b: TableColumnType) => a.id - b.id;

const TransactionTimeSorter = (a: TableColumnType, b: TableColumnType) => {
  if (a.transaction_time === b.transaction_time) {
    return 0;
  }

  //2023-03-07 17:39:50 포멧일 때만 가능
  const [aDate, aTime] = a.transaction_time.split(' ');
  const [bDate, bTime] = b.transaction_time.split(' ');
  if (aDate !== bDate) {
    return aDate > bDate ? 1 : -1;
  }
  return aTime > bTime ? 1 : -1;
};

const StatusFilter = (
  value: string | number | boolean,
  record: TableColumnType
) => record.status === value;

const StatusFilterOptions = [
  {
    text: 'O',
    value: true,
  },
  {
    text: 'X',
    value: false,
  },
];

const StatusRenderer = function (value: string | number | boolean) {
  return <span>{value ? 'O' : 'X'}</span>;
};

export const Table = ({ data }: TableProps) => {
  const { searchFilter, ...nameSearchProps } = useTableSearch('customer_name');
  const filtered = data.filter(
    (record) => todayFilter(record) && searchFilter(record)
  );
  const columns: ColumnsType<TableColumnType> = [
    {
      title: '주문번호',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: IdSorter,
    },
    {
      title: '거래시간',
      dataIndex: 'transaction_time',
      key: 'transaction_time',
      sorter: TransactionTimeSorter,
    },
    {
      title: '주문처리상태',
      dataIndex: 'status',
      key: 'status',
      render: StatusRenderer,
      filters: StatusFilterOptions,
      onFilter: StatusFilter,
    },
    {
      title: '고객번호',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: '고객이름',
      dataIndex: 'customer_name',
      key: 'customer_name',
      filterMode: 'menu',
      ...nameSearchProps,
    },
    {
      title: '가격',
      dataIndex: 'currency',
      key: 'currency',
    },
  ];

  console.log('Table re-render');

  return (
    <AntdTable
      columns={columns}
      dataSource={filtered}
      pagination={{
        pageSize: 50,
        defaultPageSize: 50,
        pageSizeOptions: [],
        position: ['topLeft'],
      }}
    />
  );
};
