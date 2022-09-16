import React, { useEffect, useState } from 'react';
import ComponetCard from '../../../utils/ui/Card';
import { Input } from 'antd';
import { DocsTecPostulations } from './DocsTecPostulations';
import { DocsAdminPostulations } from './DocsAdminPostulations';

export const DocsPostulation = () => {
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
                        <DocsTecPostulations data={item} key={i} />
                    ))}
                </div>

                <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>
                    Documentos administrativos
                </span>
                <hr />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '20px' }}>
                    {dataTecnica.map((item, i) => (
                        <DocsAdminPostulations dataDoc={item} key={i} />
                    ))}
                </div>
            </ComponetCard>
        </div>
    );
};
