import React, { FC, useEffect } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { DocsTecPostulations } from './DocsTecPostulations';
import { DocsAdminPostulations } from './DocsAdminPostulations';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import CardDocsPostulation from './CardDocsPostulation';

interface Props {
    id_challenge: number | string;
    type_person: number;
};

export const DocsPostulation: FC<Props> = ({ id_challenge, type_person }) => {
    const dispatch = useDispatch<any>();
    const SaveForP = useSelector((store: any) => store.postulation.postulation.value);

    const getChallenge = async () => {
        await dispatch(actions.get_documents_challenge(Number(id_challenge), type_person));
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
        await dispatch(actions.generate_settled(data, SaveForP));
    };

    return (
        <div className='mb-5'>
            <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>Documentos técnicos</span>
            <hr />
            <div>
                <DocsTecPostulations />
                {/* <CardDocsPostulation /> */}
            </div>

            <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>Documentos administrativos</span>
            <hr />
            <div>
                <DocsAdminPostulations />
            </div>
        </div>
    );
};
