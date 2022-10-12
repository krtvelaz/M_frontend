import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';

import { MailOutlined } from '@ant-design/icons';
import { bell } from '../../../utils/assets/img';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';

const DropdownNotification = () => {
    const notifications = useSelector((store: any) => store.notification.notifications.value);
    const { total } = useSelector((store: any) => store.notification.notifications.pagination);
    const [notificationList, setNotificationList] = useState<any[]>();
    const dispacth = useDispatch<any>();

    useEffect(() => {
        dispacth(actions.get_list_notifications({ page: 1, page_size: 10,  order_by_value: 'desc', is_readed: false }));
    }, []);

    useEffect(() => {
        setNotificationList([
            ...notifications,
            {
                key: 'all-notification',
                not_message: "Ver más..."

            },
        ]);
    }, [notifications]);

    const navigate = useNavigate();
    const handleClick = (e: any) => {
        if (e.key === 'all-notification') {
            navigate('../notifications/list');
        }
    };
    const menu = (
        <Menu
            onClick={handleClick}
            style={{
                width: 250,
                boxShadow: '0 0 10px #CCC',
                borderRadius: '5px',
            }}
            items={notificationList?.map((notification: any, index: number) => {
                return ({
                    key: notification.key ? `${notification.key}` : `notification-${index}`,
                    label: <div className="text-center">{notification?.not_message}</div>,
                    icon: <MailOutlined />,
                })
            })}
        />
    );
    return (
        <Dropdown overlay={menu}>
            <div>
                <img src={bell} alt="" style={{ marginLeft: '10px', cursor: 'pointer' }} />

                <span
                    style={{
                        color: '#F8AC00',
                        fontSize: '10px',
                        marginLeft: '3px',
                        marginRight: '10px',
                    }}
                >
                    {total} +
                </span>
            </div>
        </Dropdown>
    );
};

export default DropdownNotification;
