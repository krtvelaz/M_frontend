import React, { useEffect, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { Input } from 'antd';
import { DocsTecPostulations } from './DocsTecPostulations';
import { DocsAdminPostulations } from './DocsAdminPostulations';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';
import { swal_error } from '../../../utils/ui';

export const DocsPostulation = () => {
    const dispatch = useDispatch<any>();
    const SaveForP = useSelector((store: any) => store.postulation.postulation.value);
    const { id } = useParams<any>();

    console.log(SaveForP);

    const getChallenge = async () => {
        await dispatch(actions.get_detail_challenge(Number(47)));
    };
    useEffect(() => {
        getChallenge();
    }, []);

    const CreatePostulation = async () => {
        const data = {
            id_postulacion: SaveForP.id,
            to: SaveForP.pos_email,
            subject: SaveForP.pos_business_name,
            attachment: [],
        };
        await dispatch(actions.generate_settled(data));
    };

    return (
        <div style={{ display: 'contents' }}>
            <ComponetCard>
                <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>Documentos técnicos</span>
                <hr />
                <div>
                    <DocsTecPostulations />
                </div>

                <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>
                    Documentos administrativos
                </span>
                <hr />
                <div>
                    <DocsAdminPostulations />
                </div>
            </ComponetCard>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <button
                    onClick={() => CreatePostulation()}
                    key="saveDoc"
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '17%' }}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};
