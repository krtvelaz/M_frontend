import { Tag } from 'antd';
import React, { FC, useContext, useRef, useState } from 'react';
import { TemplateContext } from '../components/template/templateContext';
import { swal_error } from './swalAlert';

interface InputDocProps {
    file_type: 'pdf' | 'img';
    type_image?: 'PNG' | 'JPG';
    ancho_btn?: number;
    maximum_size?: number;
    form: any;
    field: any;
}

const DocumentInput: FC<InputDocProps> = ({ form, field, file_type, maximum_size = 5, type_image }) => {
    const [file, setFile] = useState();
    const fileInputRef = useRef<any>();
    const context = useContext(TemplateContext);
    const on_change = (value: any) => {
        form.setFieldValue(field.name, value, false);
    };

    return (
        <>
            <div className="input-group">
                <div
                    className="form-control"
                    style={{
                        borderBottomLeftRadius: '6px',
                        borderTopLeftRadius: '6px',
                        height: '38px',
                    }}
                >
                    {field.value?.name && (
                        <Tag
                            className="mt-1"
                            closable={true}
                            onClose={async () => {
                                on_change({ name: '' });
                            }}
                            onClick={() => {}}
                        >
                            {context.device === 'sm'
                                ? field.value?.name?.length > 15
                                    ? `${field.value.name.split('.')[0].substring(0, 11)}.${field?.value?.name?.split('.')[1] || type_image ? type_image : 'pdf'}`
                                    : field.value?.name
                                : field.value?.name?.length > 24
                                ? `${field.value.name.split('.')[0].substring(0, 20)}.${field.value.name.split('.')[1] || type_image ? type_image : 'pdf' }`
                                : field.value?.name}
                        </Tag>
                    )}
                </div>
                <div
                    className="btn btn-clear btn-outline-primary"
                    style={{ fontSize: '12px', height: '38px' }}
                    onClick={() => {
                        if (fileInputRef.current !== null) {
                            let elementDoc: any = document.getElementById('id-document-file');
                            if(elementDoc) {
                                elementDoc.value = null;
                            }
                            fileInputRef.current.click();
                        }
                    }}
                >
                    Adjuntar
                </div>
            </div>
            <div style={{ fontSize: '10px', marginTop: '5px' }}>
                Tipo de archivo: {file_type === 'img' ? type_image || 'PNG, JPG.' : file_type.toUpperCase()} Máx:{' '}
                {maximum_size}MB.
            </div>
            <input
                id='id-document-file'
                ref={fileInputRef}
                type="file"
                hidden
                onChange={async (e: any) => {
                    if (validate_file_type(e.target.files[0], file_type, type_image)) {
                        const size = maximum_size * 1000000;
                        if (e.target.files[0].size < size) {
                            on_change(e.target.files[0]);
                        } else {
                            if (file_type === 'pdf') {
                                await swal_error.fire({
                                    title: `Tamaño del documento`,
                                    html:
                                        `<div class="mysubtitle">El documento excede el tamaño permitido de ${maximum_size} MB</div>` +
                                        '<div class="mytext">Intente adjuntar un documento más pequeño</div>',
                                    showCancelButton: false,
                                    confirmButtonText: 'Aceptar',
                                });
                            } 
                            
                            if (file_type === 'img'){
                                await swal_error.fire({
                                    title: `Tamaño de la imagen`,
                                    html:
                                        `<div class="mysubtitle">La imagen excede el tamaño permitido de ${maximum_size} MB</div>` +
                                        '<div class="mytext">Intente adjuntar una imagen más pequeña</div>',
                                    showCancelButton: false,
                                    confirmButtonText: 'Aceptar',
                                });
                            }
                        }
                    } else {
                        await swal_error.fire({
                            title: 'Tipo del documento',
                            html:
                                '<div class="mysubtitle">El archivo no es del tipo requerido</div>' +
                                `<div class="mytext">Intente adjuntar un archivo de tipo ${
                                    file_type === 'img' ? 'imagen JPG' : 'PDF'
                                }</div>`,
                            showCancelButton: false,
                            confirmButtonText: 'Aceptar',
                        });
                    }
                }}
            />
        </>
    );
};

DocumentInput.defaultProps = {
    file_type: 'pdf',
};

const validate_file_type = (file: File, type: 'pdf' | 'img', type_image?: 'PNG' | 'JPG') => {
    const file_type = file?.type?.split('/').pop()?.toLowerCase();
    const file_type_name = file?.name?.split('.').pop()?.toLowerCase();
    
    switch (type) {
        case 'pdf':
            return file_type === 'pdf';
        case 'img': {
            if (type_image) {                
                return file_type_name === type_image.toLowerCase();
            }

            return (
                file_type === 'jpeg' ||
                file_type === 'jpg' ||
                file_type === 'png' ||
                file_type === 'bmp' ||
                file_type === 'gif'
            );
        }

        default:
            return false;
    }
};

export default DocumentInput;
