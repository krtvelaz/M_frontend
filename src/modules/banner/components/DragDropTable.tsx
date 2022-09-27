import { Table } from 'antd';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
}

interface ITable {
    _columns: any;
    data: any[];
    setData: any;
    loading: boolean;
    edit: () => Promise<any>;
    className?: string;
}

const DragDropTable: FC<ITable> = ({ _columns, data, setData, loading, edit, className }) => {
    

    const [updateData, setUpdateData] = useState<boolean>(false);

    const updateOrder = async () => {
        await edit();
        setUpdateData(false);
    };    

    useEffect(() => {
        if (updateData) {
            updateOrder();
        }
    }, [updateData]);

   

    const type = 'DraggableBodyRow';
    const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }: DraggableBodyRowProps) => {
        const ref = useRef<HTMLTableRowElement>(null);
        const [{ isOver, dropClassName }, drop] = useDrop({
            accept: type,
            collect: (monitor: any) => {
                const { index: dragIndex } = monitor.getItem() || {};
                if (dragIndex === index) {
                    return {};
                }
                return {
                    isOver: monitor.isOver(),
                    dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
                };
            },
            drop: (item: { index: number }) => {
                moveRow(item.index, index);
            },
        });
        const [, drag] = useDrag({
            type,
            item: { index },
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
        });
        drop(drag(ref));

        return (
            <tr
                ref={ref}
                className={`${className}${isOver ? dropClassName : ''}`}
                style={{ cursor: 'move', ...style }}
                {...restProps}
            />
        );
    };
    const columns = _columns;
    const components = {
        body: {
            row: DraggableBodyRow,
        },
    };

    const moveRow = useCallback(
        async (dragIndex: number, hoverIndex: number) => {
            const dragRow = data[dragIndex];
            setData(
                update(data, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                })
            );
            setUpdateData(true);
        },
        [data]
    );
    return (
        <DndProvider backend={HTML5Backend}>
            <Table
                
                bordered={true}
                className={['w-100', className].join(' ')}
                loading={loading}
                columns={columns}
                dataSource={data}
                components={components}
                pagination={false}
                onRow={(_, index) => {
                    const attr = {
                        index,
                        moveRow,
                    };
                    return attr as React.HTMLAttributes<any>;
                }}
                scroll={{ x: 'max-content' }}
            />
        </DndProvider>
    );
};

export default DragDropTable;
