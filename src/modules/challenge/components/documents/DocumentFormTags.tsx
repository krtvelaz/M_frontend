import { Tabs } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IChallenge, IDocument, IMasters } from '../../custom_types';

import AddDocument from './AddDocument';

interface DocumentsProps {
    onAddDocument: any;
    onDelete: (index: number) => void;
    onEditDocument: (values: IDocument) => any;
    typeDoc: 'general' | 'admin' | 'technicians' | '';
    challenge: IChallenge;
    active_key: string;
}

const DocumentFormTags: FC<DocumentsProps> = ({
    onAddDocument,
    onDelete,
    onEditDocument,
    typeDoc,
    challenge,
    active_key,
}) => {
    const { TabPane } = Tabs;

    const types_docuemnts = useSelector((store: any) => store?.challenge?.type_documents.value);

    return (
        <Tabs
            className="w-100 h-100 docs-challenge"
            activeKey={active_key}
            tabBarStyle={{
                background: '#fff',
                color: '#000000',
                paddingLeft: '20px',
                fontSize: '13px',
                marginBottom: 0,
                height: '60px' 
            }}
        >
            <TabPane tab="Doc. Generales" key="docs-1" disabled>
                <AddDocument
                    challenge={challenge}
                    typesDocument={types_docuemnts}
                    onAddDocument={onAddDocument}
                    onDelete={onDelete}
                    onEditDocument={onEditDocument}
                    typeDoc={typeDoc}
                    title="Agregar documentos generales"
                />
            </TabPane>
            <TabPane tab="Doc. Técnicos" key="docs-2" disabled>
                <AddDocument
                    challenge={challenge}
                    typesDocument={types_docuemnts}
                    onAddDocument={onAddDocument}
                    onDelete={onDelete}
                    onEditDocument={onEditDocument}
                    typeDoc={typeDoc}
                    title="Agregar documentos técnicos"
                />
            </TabPane>
            <TabPane tab="Doc. Administrativos" key="docs-3" disabled>
                <AddDocument
                    challenge={challenge}
                    typesDocument={types_docuemnts}
                    onAddDocument={onAddDocument}
                    onDelete={onDelete}
                    onEditDocument={onEditDocument}
                    typeDoc={typeDoc}
                    title="Agregar documentos adminitrativos"
                />
            </TabPane>
        </Tabs>
    );
};

export default DocumentFormTags;
