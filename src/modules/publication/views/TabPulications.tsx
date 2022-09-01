import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DetailCardPublication } from '../components/DetailCardPublication';
import { actions } from '../redux';

const TabPulications = () => {
    const { TabPane } = Tabs;
    const dispatch = useDispatch<any>();
    const on_change = (key: string) => {
        dispatch(actions.get_history_publications(Number(key)))
    }
    useEffect(()=> {
        dispatch(actions.get_history_publications())
    },[])
    
    return (
        <div className="my-5">
            <div className="text-white" style={{ fontFamily: '14px' }}>
                Conoce lo último
            </div>
            <h2 className="text-white" style={{ fontFamily: 'Montserrat-Bold', fontSize: '20px' }}>
                Entérarte de lo más actual
            </h2>
            <Tabs defaultActiveKey="1" className="tabs-events" onChange={on_change}>
                <TabPane tab="Retos solucionados" key="0">
                    <DetailCardPublication  />
                </TabPane>
                <TabPane tab="Eventos" key="1">
                    <DetailCardPublication  />
                </TabPane>
                <TabPane tab="Avances de los retos" key="2">
                    <DetailCardPublication  />
                </TabPane>
                <TabPane tab="Avances de los retos" key="3">
                    <DetailCardPublication  />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TabPulications;
