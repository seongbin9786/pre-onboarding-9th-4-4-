import { useQuery } from 'react-query';
import { allTransactions } from './apis/api';
import { Table } from './Table';

export function App() {
  const { data } = useQuery('allTransactions', allTransactions, {
    refetchInterval: 5 * 1000, // * 60,
    suspense: true,
  });

  // never happens...
  if (!data) {
    return null;
  }

  // top bar nav 하면 좋을 듯
  // if (isFetching) {
  //   return <h1>fetching!!!</h1>;
  // }

  return (
    <div
      style={{
        padding: '24px',
      }}
    >
      <h1>SwitchWon Admin</h1>
      <h2>All Transactions</h2>
      <Table data={data} />
    </div>
  );
}
