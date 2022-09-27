import React, { useEffect } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { DocsTecPostulations } from './DocsTecPostulations';
import { DocsAdminPostulations } from './DocsAdminPostulations';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';

type Props = {
    setTabSelect: React.Dispatch<React.SetStateAction<string>>;
};

export const DocsPostulation = ({ setTabSelect }: Props) => {
    const dispatch = useDispatch<any>();
    const SaveForP = useSelector((store: any) => store.postulation.postulation.value);

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
        await dispatch(actions.generate_settled(data, SaveForP));
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <button onClick={() => setTabSelect('2')} className="btn btn-outline-primary" type="button">
                        Ir atrás
                    </button>
                </div>
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
