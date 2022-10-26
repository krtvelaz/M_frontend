import { FC } from 'react';
import Table, { TablePaginationConfig } from 'antd/lib/table';
import { Empty } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { flecha_pagination_left, flecha_pagination_rigth } from '../assets/img';

interface CompressTableProps {
    columns: any;
    items: any[];
    title?: string;
    change_page?: (page: number, pageSize?: number) => void;
    loading?: boolean;
    with_pagination?: boolean;
    paginationTop?: boolean;
    count?: number;
    scroll?: any;
    expandable?: any;
}

// Pagination Table

function itemRenderTable(current: any, type: any, originalElement: any) {
    if (type === "prev") {
        return (
            <span className="border-ant-prev-table font-size-10px" style={{borderRadius: '4px 0 0 4px'}}>
                <img src={flecha_pagination_left} className="font-color-1FAEEF" style={{ display: "inline-flex", paddingRight: "2px" }} />
                Ant.
            </span>
        );
    }
    if (type === "next") {
        return (
            <span className="border-ant-prev-table font-size-10px" style={{borderRadius: '0 4px 4px 0'}}>
                Sig.
                <img src={flecha_pagination_rigth} className="font-color-1FAEEF" style={{ display: "inline-flex", paddingLeft: "2px" }} />
            </span>
        );
    }
    return originalElement;
}

const getPaginator = (
    total: number,
    paginationTop: boolean,
    change_page?: (page: number, pageSize?: number) => void,
    title?: string
): TablePaginationConfig => {
    return {
        responsive: true,
        pageSizeOptions: [10, 20, 50, 100],
        locale: { items_per_page: '' },
        showLessItems: true,
        position: paginationTop ? ['bottomRight', 'topRight'] : ['bottomRight'],
        total: total || 0,
        itemRender: itemRenderTable,
        ...(change_page
            ? {
                onChange: change_page,
                defaultPageSize: 10,
                showSizeChanger: true,
                // showQuickJumper: true,
            }
            : {}),
        showTotal: (total /*, current*/) => {
            return (
                <div>
                    {title && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '2px',
                                fontSize: '14px',
                            }}
                        >
                            {title}
                        </div>
                    )}

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
    paginationTop,
    scroll,
    expandable,
}) => {
    items = Array.isArray(items) ? items : [];
    const data = items?.map((item, i) => ({
        ...item,
        key: `compress_table_${i}`,
    }));
    const ops = {
        columns: columns,
        dataSource: data,
        ...(with_pagination
            ? {
                pagination: getPaginator(count ? count : data?.length, paginationTop || false, change_page, title),
            }
            : {}),
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
                        <span style={{ color: '#000000' }}>
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
            <Table {...ops} />
        </div>
    );
};

CompressTable.defaultProps = {
    items: [],
    change_page: () => { },
    loading: false,
    with_pagination: true,
    scroll: true,
};

export default CompressTable;
