import { FieldProps } from 'formik';
import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { iconoCheck } from '../../../utils/assets/img';
import { Card, swal_error } from '../../../utils/ui';
import { actions } from '../redux';

interface SelectProps extends FieldProps {
    className?: string;
    postulation?: any;
    setPostulation?: any;
    extra_on_change?: (value: any, prev_value?: any) => void;
}

const CardDocsPostulation: FC<SelectProps> = ({
    field,
    form,
    className,
    extra_on_change,
    postulation,
    setPostulation,
    ...props
}) => {
    const inputRef = useRef<any>(null);
    const dispatch = useDispatch<any>();

    const on_download = async () => {
        const file = await dispatch(actions.get_document_challenge(field.value.retdoc_id_documento));
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.setAttribute('download', `documento.pdf`);
        document.body.appendChild(link);
        link.click();
    };

    const on_delete = async () => {
        inputRef.current.value = '';
        inputRef.current.files = null;
        const data = {
            filename: field.value.docPostulation.path,
            id: field.value.docPostulation.id,
        };
        await dispatch(actions.deleteDocumentPostulation(data));
        form.setFieldValue(field.name, { ...field.value, docPostulation: { name: '' } }, false);
    };

    const on_change = async (e: any) => {
        const doc = e.target.files[0];
        if (doc.type !== 'application/pdf') {
            e.target.value = null;
            await swal_error.fire({
                title: 'Tipo del documento',
                html:
                    '<div class="mysubtitle">El archivo no es del tipo requerido</div>' +
                    `<div class="mytext">Intente adjuntar un archivo de tipo ${
                        doc.type === 'img' ? 'imagen' : 'PDF'
                    }</div>`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
            });
            return;
        }
        const data = {
            posarc_id_document: field.value.retdoc_id_documento,
            posarc_id_postulation: postulation?.applicant_data?.id,
        };
        const res = await dispatch(actions.addDocumentPostulation(doc, data));

        form.setFieldValue(
            field.name,
            { ...field.value, docPostulation: { name: doc.name, file: doc, id: res.id, path: res.posarc_path_file } },
            false
        );
        extra_on_change && extra_on_change(doc, field.value);
    };

    return (
        <>
            <Card
                style={{
                    position: 'relative',
                    ...(form.errors.documents && !field.value.docPostulation.name && { border: '1px #AD0808 solid' }),
                }}
            >
                {field.value.docPostulation.name && (
                    <div
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(0, 144, 76, 0.9)',
                            width: '100%',
                            height: '100%',
                            top: '0px',
                            left: '0px',
                            borderRadius: '13px',
                            padding: '24px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            <span style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF' }}>
                                {field.value.docPostulation.name}
                            </span>
                            <img width="8%" height="8%" alt="circle-check" src={iconoCheck} />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                marginTop: '13%',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'Montserrat-Regular',
                                    color: '#FFFFFF',
                                    fontSize: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={on_delete}
                            >
                                Eliminar
                            </span>
                            <span
                                style={{
                                    fontFamily: 'Montserrat-Bold',
                                    color: '#FFFFFF',
                                    fontSize: '10px',
                                }}
                            >
                                Cargado
                            </span>
                        </div>
                    </div>
                )}

                <div>
                    <div
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Montserrat-Bold',
                            ...(form.errors.documents && !field.value.docPostulation.name && { color: '#AD0808' }),
                        }}
                        className='mb-3'
                    >
                        {field?.value?.retdoc_descripcion_documento}
                    </div>
                    <p
                        style={{
                            fontSize: '11px',
                            fontFamily: 'Work-Sans-Regular',
                            marginTop: '6px',
                        }}
                        className='my-3'
                    >
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida nibh quis lectus finibus,
                        at condimentum enim pulvinar. Quisque vulputate bibendum libero quis venenatis. */}
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                        }}
                    >
                        {field.value.retdoc_nombre_plantilla && (
                            <a
                                style={{
                                    color: '#FF8403',
                                    fontSize: '10px',
                                    fontFamily: 'Montserrat-Regular',
                                }}
                                onClick={on_download}
                            >
                                DESCARGAR FORMATO
                            </a>
                        )}

                        <label
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            <input ref={inputRef} onChange={on_change} style={{ display: 'none' }} type="file" />
                            <span
                                style={{
                                    fontSize: '10px',
                                    fontFamily: 'Montserrat-Regular',
                                    color: '#030303',
                                }}
                            >
                                CARGAR FORMATO
                            </span>
                        </label>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default CardDocsPostulation;
