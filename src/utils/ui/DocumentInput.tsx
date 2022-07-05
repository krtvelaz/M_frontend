import { Tag } from "antd";
import React, { FC, useRef, useState } from "react";

interface InputDocProps {
  tipos_doc?: string;
  setGuardoArchivo?: (data: boolean) => void;
  ancho_btn?: number;
  maximum_size?: number;
  form: any;
  field: any;
}

const DocumentInput: FC<InputDocProps> = ({
  form,
  field,
  tipos_doc = "PDF",
  setGuardoArchivo,
  maximum_size = 5,
}) => {
  const [doc, setDoc] = useState("");
  const fileInputRef = useRef<any>();
  const on_change = (value: any) => {
    setDoc(value);
    form.setFieldValue(field.name, value, false);
  };
  
  return (
    <>
      <div className="input-group">
        <div className="form-control">
          {doc && (
            <Tag
              className="mt-1"
              closable={true}
              onClose={async () => {
                on_change('')
              }}
              onClick={() => {}}
            >
              {doc.length > 24
                ? `${doc.split(".")[0].substring(0, 20)}.${doc.split(".")[1]}`
                : doc}
            </Tag>
          )}
        </div>
        <div
          className="btn btn-clear btn-outline-primary"
          style={{ fontSize: "12px" }}
          onClick={() => {
            if (fileInputRef.current !== null) {
              fileInputRef.current.click();
            }
          }}
        >
          Adjuntar
        </div>
      </div>
      <div style={{fontSize: '10px', marginTop: '5px'}}>
        Tipo de archivo: {tipos_doc} Máx: {maximum_size}MB.
      </div>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={(e: any) => {
          // on_change(e);
          const size = maximum_size * 1000000;
          if (e.target.files.length > 0) {
            if (e.target.files[0].size > size) {
              // Solo se permiten archivos menores a 5MB
              return;
            }
            if (
              e.target.files[0].type === "application/pdf" ||
              e.target.files[0].type === "image/png" ||
              e.target.files[0].type === "image/jpeg"
            ) {
              const { name } = e.target.files[0];
              on_change(name);
              return;
            }
            // Solo se permiten archivos PDF, Word y Excel
            return;
          }
        }}
      />
    </>
  );
};

export default DocumentInput;
