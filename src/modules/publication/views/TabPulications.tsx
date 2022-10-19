import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DetailCardPublication } from '../components/CardPublication';
import { actions } from '../redux';

const TabPulications = () => {
    const { TabPane } = Tabs;
    const [keyTab, setKeryTab] = useState<string>('');
    const dispatch = useDispatch<any>();
    const on_change = (key: any) => {
        setKeryTab(key);
        
        dispatch(
            actions.get_list_publications({
                page: 1,
                page_size: 4,
                from: 'landing',
                is_published: true,
                ...(key !== '0' && { type: key }),
            })
        );
    };
    useEffect(() => {
        dispatch(actions.get_list_publications({ page: 1, page_size: 4, from: 'landing', is_published: true }));
    }, []);

    return (
        <div className="my-5">
            <div className="text-center text-white" style={{ fontFamily: '14px' }}>
                Conoce lo último
            </div>
            <h2 className="text-center text-white" style={{ fontFamily: 'Montserrat-Bold', fontSize: '20px' }}>
                Entérate de lo más actual
            </h2>
            <Tabs
                defaultActiveKey="0"
                className="tabs-events"
                onChange={on_change}
                tabBarStyle={{
                    fontSize: '13px',
                    color: '#fff',
                }}
            >
                <TabPane tab="Todos" key="0">
                    <DetailCardPublication keyTab={keyTab} />
                </TabPane>
                <TabPane tab="Resultados" key="RESULTADO">
                    <DetailCardPublication keyTab={keyTab} />
                </TabPane>
                <TabPane tab="Noticias" key="NOTICIA">
                    <DetailCardPublication keyTab={keyTab} />
                </TabPane>
                <TabPane tab="Eventos" key="EVENTO">
                    <DetailCardPublication keyTab={keyTab} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TabPulications;
