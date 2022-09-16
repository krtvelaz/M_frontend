import { FC } from 'react';
import ComponetCard from '../../../utils/ui/Card';

interface DocsTecPostulations {
    data?: any;
}

export const DocsTecPostulations: FC<DocsTecPostulations> = ({ data }) => {
    return (
        <div>
            <ComponetCard>
                <div>
                    <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#000000' }}>{data.title}</span>
                    <div>
                        <p>{data.text}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <a>
                        <span style={{ fontSize: '10px', color: '#FF8403' }}>DESCARGAR FORMATO</span>
                    </a>
                    <label
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <input style={{ display: 'none' }} type="file" />
                        <span style={{ fontSize: '10px' }}>CARGAR FORMATO</span>
                    </label>
                </div>
            </ComponetCard>
        </div>
    );
};
