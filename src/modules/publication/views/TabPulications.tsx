import { Tabs } from 'antd'
import React, { useState } from 'react'
import { DetailCardPublication } from '../components/DetailCardPublication';

export default function TabPulications() {
    const { TabPane } = Tabs;
    const onChange = (key: string) => {
        setKeyActually(key);
    };
    const [keyActually, setKeyActually] = useState("");

    return (
        <div className="my-5">
            <div className="text-white" style={{ fontFamily: '14px' }}>
                Conoce lo último
            </div>
            <h2 className="text-white" style={{ fontFamily: 'Montserrat-Bold', fontSize: '20px' }}>
                Entérarte de lo más actual
            </h2>
            <Tabs defaultActiveKey="1" className="tabs-events" onChange={onChange}>
                <TabPane tab="Retos solucionados" key="alls">
                    <DetailCardPublication keyActually={keyActually} />
                </TabPane>
                <TabPane tab="Eventos" key="news">
                    <DetailCardPublication keyActually={keyActually} />
                </TabPane>
                <TabPane tab="Avances de los retos" key="events">
                    <DetailCardPublication keyActually={keyActually} />
                </TabPane>
                <TabPane tab="Avances de los retos" key="results">
                    <DetailCardPublication keyActually={keyActually} />
                </TabPane>
            </Tabs>
        </div>
    )
}
