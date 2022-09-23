import React, { useEffect, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { Input } from 'antd';
import { DocsTecPostulations } from './DocsTecPostulations';
import { DocsAdminPostulations } from './DocsAdminPostulations';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';

export const DocsPostulation = () => {
    const dispatch = useDispatch<any>();
    const [documentPos, setDocumentPos] = useState<any>([]);
    const { id } = useParams<any>();
    const challenge: any = useSelector((store: any) => store.postulation.challenge.value);
    const getChallenge = async () => {
        await dispatch(actions.get_detail_challenge(Number(1)));
    };
    const inforCardPostulation = () => {
        challenge.cha_documents?.map((item: any) => {
            return {
                title: item.chafil_nombre_plantilla,
                text: item.chafil_nombre_tipo_documento,
                id: item.chafil_id_tipo_documento,
            };
        });
    };

    useEffect(() => {
        getChallenge();
        // setDocumentPos(inforCardPostulation);
    }, []);

    const dataTecnica = [
        {
            id: 1,
            title: 'Nombre Documento',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida nibh quis lectus finibus, at condimentum enim pulvinar. Quisque vulputate bibendum libero quis venenatis.',
        },
        {
            id: 2,
            title: 'Nombre Documento',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida nibh quis lectus finibus, at condimentum enim pulvinar. Quisque vulputate bibendum libero quis venenatis.',
        },
        {
            id: 3,
            title: 'Nombre Documento',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida nibh quis lectus finibus, at condimentum enim pulvinar. Quisque vulputate bibendum libero quis venenatis.',
        },
    ];
    return (
        <div>
            <ComponetCard>
                <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>Documentos técnicos</span>
                <hr />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '20px' }}>
                    {dataTecnica.map((item, i) => (
                        <DocsTecPostulations documentPos={documentPos} data={item} key={i} />
                    ))}
                </div>

                <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>
                    Documentos administrativos
                </span>
                <hr />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '20px' }}>
                    {dataTecnica.map((item, i) => (
                        <DocsAdminPostulations documentPos={documentPos} dataDoc={item} key={i} />
                    ))}
                </div>
            </ComponetCard>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <button key="saveDoc" type="submit" className="btn btn-primary" style={{ width: '17%' }}>
                    Continuar
                </button>
            </div>
        </div>
    );
};
