import { Pagination } from 'antd';

interface PaginationProps {
    pageSize: number;
    total: number;
    pageChangeHandler: (page: number) => void;
}

const App = ({ pageSize, total, pageChangeHandler }: PaginationProps) => {
    return <Pagination showSizeChanger={false} hideOnSinglePage={true} className='mt-4' onChange={pageChangeHandler} defaultCurrent={1} pageSize={pageSize} total={total} />;
}

export default App;