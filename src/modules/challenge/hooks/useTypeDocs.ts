import { useState } from "react";
import { useDispatch } from "react-redux";
import { IChallenge, IDocument } from "../custom_types";
import { actions } from "../redux";

const useDocument = (
  typeDoc: "general" | "administrative" | "technicians" | "report",
  setChallenge: any,
  challenge: IChallenge
) => {
  const dispatch = useDispatch<any>();
  const [typesDocument, setTypesDocument] = useState([
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
            id: 16,
          },
        ]
      : typeDoc === "administrative"
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
        ]
      : []),
  ]);

  const onAddDocument = async (values: IDocument) => {
    setTypesDocument(
      typesDocument.filter((doc) => doc.name !== values.cha_document_type)
    );

    const res = await dispatch(
      actions.create_challenge_document(
        values,
        challenge.general_information.key || -1,
        typeDoc
      )
    );

    if (res) {
      setChallenge((data: IChallenge) => {
        return {
          ...data,
          documents: {
            ...data.documents,
            ...(typeDoc === "general"
              ? { general: [...data.documents.general, values] }
              : typeDoc === "technicians"
              ? { technical: [...data.documents.technical, values] }
              : typeDoc === "administrative" && {
                  administrative: [...data.documents.administrative, values],
                }),
          },
          ...(typeDoc === "report" && {
            reports: [...data.reports, values],
          }),
        };
      });
    }
  };

  const onDelete = (index: number) => {
    let documents =
      typeDoc === "general"
        ? challenge.documents.general
        : typeDoc === "technicians"
        ? challenge.documents.technical
        : typeDoc === "administrative"
        ? challenge.documents.administrative
        : challenge.reports;
    let restore_value = documents[index].cha_document_type;

    // if (restore_value) {
    //   setTypesDocument([
    //     ...typesDocument,
    //     { name: restore_value, id: restore_value },
    //   ]);
    // }
    const newDocuments = documents.filter((doc, i) => i !== index);
    setChallenge((data: IChallenge) => {
      return {
        ...data,
        documents: {
          ...data.documents,
          ...(typeDoc === "general"
            ? { general: newDocuments }
            : typeDoc === "technicians"
            ? { technical: newDocuments }
            : { administrative: newDocuments }),
        },
        ...(typeDoc === "report" && { reports: newDocuments }),
      };
    });
  };

  const editListDocs = (value: string) => {
    let typesDocs = JSON.parse(JSON.stringify(typesDocument));
    typesDocs = [
      ...typesDocs,
      ...(typeDoc === "administrative"
        ? [
            ...(value === "Equipo de innovadores"
              ? [
                  {
                    name: "Recibo de servicios públicos",
                    id: "Recibo de servicios públicos",
                  },
                ]
              : []),
            ...(value === "Grupo de investigación"
              ? [
                  {
                    name: "Certificado validación IES que pertenece",
                    id: "Certificado validación IES que pertenece",
                  },
                  {
                    name: "Registro grupLAC, categoría B, A, A1",
                    id: "Registro grupLAC, categoría B, A, A1",
                  },
                  {
                    name: "Aval institución registrada en el instituLAC",
                    id: "Aval institución registrada en el instituLAC",
                  },
                  {
                    name: "Tener un proyecto de investigación en ejecución",
                    id: "Tener un proyecto de investigación en ejecución",
                  },
                ]
              : []),
            ...(value === "Persona jurídica"
              ? [
                  {
                    name: "Certificado de existencia y representación legal",
                    id: "Certificado de existencia y representación legal",
                  },
                  {
                    name: "Certificado de antecedentes disciplinarios",
                    id: "Certificado de antecedentes disciplinarios",
                  },
                  {
                    name: "Certificado de antecedentes  judiciales",
                    id: "Certificado de antecedentes  judiciales",
                  },
                  {
                    name:
                      "Autorización al representante legal para contratar cuando esta sea necesaria",
                    id:
                      "Autorización al representante legal para contratar cuando esta sea necesaria",
                  },
                  {
                    name:
                      "Las Asociaciones o corporaciones y fundaciones o instituciones de  utilidad Común, deben allegar con la propuesta de solución, el certificado de cumplimiento de normatividad expedido por la entidad que ejerce la Inspección, vigilancia y Control",
                    id:
                      "Las Asociaciones o corporaciones y fundaciones o instituciones de  utilidad Común, deben allegar con la propuesta de solución, el certificado de cumplimiento de normatividad expedido por la entidad que ejerce la Inspección, vigilancia y Control",
                  },
                ]
              : []),
          ]
        : []),
    ];
    setTypesDocument(typesDocs);
  };

  return {
    typesDocument,
    onAddDocument,
    onDelete,
    editListDocs,
  };
};

export default useDocument;
