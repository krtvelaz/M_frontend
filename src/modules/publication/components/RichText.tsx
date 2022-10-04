import { FieldProps } from 'formik';
import { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props extends FieldProps {
    className?: string;
    extra_on_change?: (value: any, prev_value?: any) => void;
}
const RichText: FC<Props> = ({
    field,
    form,
    className,
    extra_on_change,
    ...props
}) => {
    let reactQuillRef: any = null;
    let quillRef: any = null;

    const on_change = (value: any) => {
        form.setFieldValue(field.name, value, false);
        extra_on_change && extra_on_change(value, field.value);
    };

    const modules = {
        toolbar: [
            [{ header: [2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    return (
        <ReactQuill
            ref={(el) => {
                reactQuillRef = el;
            }}
            theme="snow"
            modules={modules}
            formats={formats}
            value={field.value}
            onChange={on_change}
            className={['w-100 ', className].join('')}
        />
    );
};

export default RichText;
