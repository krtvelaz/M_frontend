import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IChallenge, IDocument } from "../custom_types";
import { actions } from "../redux";

const useDocument = (
  typeDoc: "general" | "admin" | "technicians",
  setChallenge: any,
  challenge: IChallenge
) => {
  const dispatch = useDispatch<any>();
  const [typesDocument, setTypesDocument] = useState<any>([]);
  const [isChange, setIsChange] = useState<boolean>(false);

  const onAddDocument = async (values: IDocument) => {
    const res = await dispatch(
      actions.create_challenge_document(
        values,
        challenge.general_information.key || -1,
        typeDoc
      )
    );
    
    if (res) {
      setChallenge((data: IChallenge) => ({
        ...data,
        documents: {
          ...data.documents,
          ...(typeDoc === 'general' && {general: [...data.documents.general, res]}),
          ...(typeDoc === 'technicians' && {technical: [...data.documents.technical, res]}),
          ...(typeDoc === 'admin' && {administrative: [...data.documents.administrative, res]}),
        },
      }));
      setIsChange(true);
    }
  };

  const onDelete = async (id: number) => {
    const res = await dispatch(actions.delete_challenge_document(typeDoc, id));
    if (res) {
      setIsChange(true);
    }
  };

  const onEditDocument = async (values: IDocument) => {
    const res = await dispatch(
      actions.edit_challenge_document(
        values,
        challenge.general_information.key || -1,
        typeDoc
      )
    );
    if (res) setIsChange(true);
  };

  const editListDocs = (value: number) => {
    if (typeDoc === "admin") {
      let typesDocs = JSON.parse(JSON.stringify(typesDocument));
      typesDocs = [
        ...typesDocs,
        ...(value === 3
          ? [
              {
                name: "Recibo de servicios públicos",
                id: 16,
              },
            ]
          : value === 1
          ? [
              {
                name: "Certificado validación IES que pertenece",
                id: 17,
              },
              {
                name: "Registro grupLAC, categoría B, A, A1",
                id: 18,
              },
              {
                name: "Aval institución registrada en el instituLAC",
                id: 19,
              },
              {
                name: "Tener un proyecto de investigación en ejecución",
                id: 20,
              },
            ]
          : [
              {
                name: "Certificado de existencia y representación legal",
                id: 21,
              },
              {
                name: "Certificado de antecedentes disciplinarios",
                id: 22,
              },
              {
                name: "Certificado de antecedentes  judiciales",
                id: 23,
              },
              {
                name:
                  "Autorización al representante legal para contratar cuando esta sea necesaria",
                id: 24,
              },
              {
                name:
                  "Las Asociaciones o corporaciones y fundaciones o instituciones de  utilidad Común, deben allegar con la propuesta de solución, el certificado de cumplimiento de normatividad expedido por la entidad que ejerce la Inspección, vigilancia y Control",
                id: 25,
              },
            ]),
      ];
      setTypesDocument(typesDocs);
    }
  };

  const getTypesDocuments = () => {
    setTypesDocument([
      ...(typeDoc === "general"
        ? [
            {
              name: "Ficha del reto",
              id: 1,
            },
            {
              name: "Términos generales",
              id: 2,
            },
            {
              name: "Matriz de riesgo",
              id: 3,
            },
          ]
        : typeDoc === "technicians"
        ? [
            {
              name: "Formato presentación solución",
              id: 4,
            },
            {
              name: "Certificado experiencia desarrollo tecnológico",
              id: 5,
            },
            {
              name: "Matriz de riesgo",
              id: 6,
            },
            {
              name: "Diagrama arquitectónico",
              id: 7,
            },
            {
              name: "Otro",
              id: 26,
            },
          ]
        : typeDoc === "admin"
        ? [
            {
              name: "RUT",
              id: 8,
            },
            {
              name: "Cédula representante",
              id: 9,
            },
            {
              name: "Certificado seguridad social",
              id: 10,
            },
            {
              name: "Carta de presentación",
              id: 11,
            },
            {
              name: "Cédula mujeres",
              id: 12,
            },
            {
              name: "Certificado discapacidad",
              id: 13,
            },
            {
              name: "Certificado único victimas",
              id: 14,
            },
            {
              name: "Certificado población minoritaria",
              id: 15,
            },
            {
              name: "Otro",
              id: 26,
            },
          ]
        : []),
    ]);
  };

  return {
    typesDocument,
    onAddDocument,
    onDelete,
    onEditDocument,
    editListDocs,
    isChange,
    setIsChange,
    getTypesDocuments,
  };
};

export default useDocument;
