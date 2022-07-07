import { FC } from 'react';
import Table, { TablePaginationConfig } from 'antd/lib/table';
import { Empty } from 'antd';

interface CompressTableProps {
    columns: any;
    items: any[];
    title?: string;
    change_page?: (page: number, pageSize?: number) => void;
    loading?: boolean;
    with_pagination?: boolean;
    count?: number;
    scroll?: any;
    expandable?: any;
}

const getPaginator = (
    total: number,
    change_page?: (page: number, pageSize?: number) => void
): TablePaginationConfig => {
    return {
        responsive: true,
        pageSizeOptions: [10, 20, 50, 100],
        locale: { items_per_page: '' },
        showLessItems: true,
        position: ['bottomRight', 'topRight'],
        total: total || 0,
        ...(change_page
            ? {
                  onChange: change_page,
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
              }
            : {}),
        showTotal: (total /*, current*/) => {
            return (
                <div>
                    <span className="total-results">
                        Total <span style={{ color: '#F28C02' }}>: {total}</span>
                    </span>
                    <span className="results-text"> Registros por página </span>
                </div>
            );
        },
    };
};

const CompressTable: FC<CompressTableProps> = ({
    count,
    title,
    columns,
    items,
    change_page,
    loading,
    with_pagination,
    scroll,
    expandable,
}) => {
    items = Array.isArray(items) ? items : [];
    const data = items?.map((item, i) => ({ ...item, key: `compress_table_${i}` }));
    const ops = {
        columns: columns,
        dataSource: data,
        ...(with_pagination ? { pagination: getPaginator(count ? count : data?.length, change_page) } : {}),
        ...(expandable ? expandable : {}),
        loading: loading,
        bordered: true,
        className: 'w-100',
        locale: {
            emptyText: (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{
                        height: 60,
                        color: 'blue',
                    }}
                    description={
                        <span className="text-primary">
                            No hay datos para mostrar.
                            <br />
                        </span>
                    }
                />
            ),
        },
        ...(scroll ? (typeof scroll === 'boolean' ? { scroll: { x: 'max-content' } } : scroll) : {}),
    };
    return (
        <div>
            {title && (
                <>
                    <h3 style={{ fontWeight: 300 }}>{title}</h3>
                    <br />
                </>
            )}
            <Table {...ops} />
        </div>
    );
};

CompressTable.defaultProps = {
    items: [],
    change_page: () => {},
    loading: false,
    with_pagination: true,
    scroll: true,
};

export default CompressTable;
