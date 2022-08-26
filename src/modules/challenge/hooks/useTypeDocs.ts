import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { swal_error } from "../../../utils/ui";
import { IChallenge, IDocument } from "../custom_types";
import { actions } from "../redux";

const useDocument = (
  typeDoc: "general" | "admin" | "technicians" | "" ,
  setChallenge: any,
  challenge: IChallenge
) => {
  const dispatch = useDispatch<any>();
  const [isChange, setIsChange] = useState<boolean>(false);
  const documents: any = useSelector(
    (store: any) => store.challenge.documents_challenge.value
  );  


  
  const validateDocuments = (values: IDocument) => {
    let repeated_document = '';        
    if(typeDoc === 'general') {
      repeated_document = documents.find((doc: any )=> doc.document_type.id === values.chafil_id_tipo_documento);
    }else {
      repeated_document = documents.find((doc: any )=> (doc.document_type.id === values.chafil_id_tipo_documento && Number(doc.chafil_document_type?.profile?.id) === values.chafil_perfiles));
    }

    if (repeated_document) {
      swal_error.fire({
        title: "Error en el proceso",
        html:
          '<div class="mysubtitle">Ya existe un documento del tipo seleccionado.</div>' +
          '<div class="mytext">Escoja otro tipo de documento o elimine el existente.</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return;
    }

  }
  
  const onAddDocument = async (values: IDocument) => {        
    let repeated_document = ''; 
           
    if(typeDoc === 'general') {
      repeated_document = documents.find((doc: any )=> doc.chafil_document_type.id === values.chafil_id_tipo_documento);
    }else {
      repeated_document = documents.find((doc: any )=> (doc.chafil_document_type.id === values.chafil_id_tipo_documento && Number(doc.chafil_document_type?.profile?.id) === values.chafil_perfiles));
      
    }

    if (repeated_document) {
      swal_error.fire({
        title: "Error en el proceso",
        html:
          '<div class="mysubtitle">Ya existe un documento del tipo seleccionado.</div>' +
          '<div class="mytext">Escoja otro tipo de documento o elimine el existente.</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return;
    }
    
    const res = await dispatch(
      actions.create_challenge_document(
        values,
        challenge.general_information.key || -1,
        typeDoc
      )
    );
    
    if (res) {
      setIsChange(true);
    }
  };

  const onDelete = async (id: number) => {
    const res = await dispatch(actions.delete_challenge_document(id));
    setIsChange(true);
  };

  const onEditDocument = async (values: IDocument) => {  
    let repeated_document = documents.filter((doc: any) => doc.id !== values?.id)
    if(typeDoc === 'general') {
      repeated_document = repeated_document.find((doc: any )=> doc.chafil_document_type.id === values.chafil_id_tipo_documento);
    }else {
      repeated_document = repeated_document.find((doc: any )=> (doc.chafil_document_type.id === values.chafil_id_tipo_documento && Number(doc.chafil_document_type?.profile?.id) === values.chafil_perfiles));
      
    }

    if (repeated_document) {
      await swal_error.fire({
        title: "Error en el proceso",
        html:
          '<div class="mysubtitle">Ya existe un documento del tipo seleccionado.</div>' +
          '<div class="mytext">Escoja otro tipo de documento o elimine el existente.</div>',
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
      return;
    }
    const res = await dispatch(
      actions.edit_challenge_document(
        values,
        challenge.general_information.key || -1,
      )
    );
    if (res) setIsChange(true);
  };



  return {
    onAddDocument,
    onDelete,
    onEditDocument,
    isChange,
    setIsChange,
  };
};

export default useDocument;
