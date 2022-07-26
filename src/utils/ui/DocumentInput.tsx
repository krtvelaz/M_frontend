import { Tag } from "antd";
import React, { FC, useRef, useState } from "react";
import { swal_error } from "./swalAlert";

interface InputDocProps {
  file_type: "pdf" | "img";
  ancho_btn?: number;
  maximum_size?: number;
  form: any;
  field: any;
}

const DocumentInput: FC<InputDocProps> = ({
  form,
  field,
  file_type,
  maximum_size = 5,
}) => {
  const fileInputRef = useRef<any>();
  const on_change = (value: any) => {
    form.setFieldValue(field.name, value, false);
  };

  return (
    <>
      <div className="input-group">
        <div
          className="form-control"
          style={{
            borderBottomLeftRadius: "6px",
            borderTopLeftRadius: "6px",
            height: "38px",
          }}
        >
          {field.value?.name && (
            <Tag
              className="mt-1"
              closable={true}
              onClose={async () => {
                on_change("");
              }}
              onClick={() => {}}
            >
              {field.value?.name?.length > 24
                ? `${field.value.name.split(".")[0].substring(0, 20)}.${
                    field.value.name.split(".")[1]
                  }`
                : field.value?.name}
            </Tag>
          )}
        </div>
        <div
          className="btn btn-clear btn-outline-primary"
          style={{ fontSize: "12px", height: "38px" }}
          onClick={() => {
            if (fileInputRef.current !== null) {
              fileInputRef.current.click();
            }
          }}
        >
          Adjuntar
        </div>
      </div>
      <div style={{ fontSize: "10px", marginTop: "5px" }}>
        Tipo de archivo: {file_type === 'img' ? 'PNG, JPG.' : file_type} Máx: {maximum_size}MB.
      </div>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={async (e: any) => {
          if (validate_file_type(e.target.files[0], file_type)) {
            const size = maximum_size * 1000000;
            if (e.target.files[0].size < size) {
              on_change(e.target.files[0]);
            } else {
              await swal_error.fire({
                title: "Tamaño del documento",
                html:
                  '<div class="mysubtitle">El archivo excede el tamaño permitido</div>' +
                  '<div class="mytext">Intente adjuntar un archivo más pequeño</div>',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
              });
            }
          } else {
            await swal_error.fire({
              title: "Tipo del documento",
              html:
                '<div class="mysubtitle">El archivo no es del tipo requerido</div>' +
                `<div class="mytext">Intente adjunta un archivo de tipo ${file_type === 'img' ? 'imagen' : 'PDF'}</div>`,
              showCancelButton: false,
              confirmButtonText: "Aceptar",
            });
          }
        }}
      />
    </>
  );
};

DocumentInput.defaultProps = {
  file_type: "pdf",
};

const validate_file_type = (file: File, type: "pdf" | "img") => {
  const file_type = file.type.split("/").pop()?.toLowerCase();
  switch (type) {
    case "pdf":
      return file_type === "pdf";
    case "img":
      return (
        file_type === "jpeg" ||
        file_type === "jpg" ||
        file_type === "png" ||
        file_type === "bmp" ||
        file_type === "gif"
      );
    default:
      return false;
  }
};

export default DocumentInput;
