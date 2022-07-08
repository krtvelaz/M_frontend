import { useState } from "react";
import { IChallenge, IDocument } from "../custom_types";

const useDocument = (
  typeDoc: "general" | "administrative" | "technicians" | "report",
  setChallenge: any,
  challenge: IChallenge
) => {
  const [typesDocument, setTypesDocument] = useState([
    ...(typeDoc === "general"
      ? [
          {
            name: "Ficha del reto",
            id: "Ficha del reto",
          },
          {
            name: "Términos generales",
            id: "Términos generales",
          },
          {
            name: "Matriz de riesgo",
            id: "Matriz de riesgo",
          },
        ]
      : typeDoc === "technicians"
      ? [
          {
            name: "Formato presentación solución",
            id: "Formato presentación solución",
          },
          {
            name: "Certificado experiencia desarrollo tecnológico",
            id: "Certificado experiencia desarrollo tecnológico",
          },
          {
            name: "Matriz de riesgo",
            id: "Matriz de riesgo",
          },
          {
            name: "Diagrama arquitectónico",
            id: "Diagrama arquitectónico",
          },
          {
            name: "Otro",
            id: "Otro",
          },
        ]
      : typeDoc === "administrative"
      ? [
          {
            name: "RUT",
            id: "RUT",
          },
          {
            name: "Cédula representante",
            id: "Cédula representante",
          },
          {
            name: "Certificado seguridad social",
            id: "Certificado seguridad social",
          },
          {
            name: "Carta de presentación",
            id: "Carta de presentación",
          },
          {
            name: "Cédula mujeres",
            id: "Cédula mujeres",
          },
          {
            name: "Certificado discapacidad",
            id: "Certificado discapacidad",
          },
          {
            name: "Certificado único victimas",
            id: "Certificado único victimas",
          },
          {
            name: "Certificado población minoritaria",
            id: "Certificado población minoritaria",
          },
        ]
      : []),
  ]);

  const onAddDocument = (values: any) => {
    setTypesDocument(
      typesDocument.filter((doc) => doc.name !== values.document_type)
    );
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
    let restore_value = documents[index].document_type;
    if (restore_value) {
      setTypesDocument([
        ...typesDocument,
        { name: restore_value, id: restore_value },
      ]);
    }
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
                    name: "Autorización al representante legal para contratar cuando esta sea necesaria",
                    id: "Autorización al representante legal para contratar cuando esta sea necesaria",
                  },
                  {
                    name: "Las Asociaciones o corporaciones y fundaciones o instituciones de  utilidad Común, deben allegar con la propuesta de solución, el certificado de cumplimiento de normatividad expedido por la entidad que ejerce la Inspección, vigilancia y Control",
                    id: "Las Asociaciones o corporaciones y fundaciones o instituciones de  utilidad Común, deben allegar con la propuesta de solución, el certificado de cumplimiento de normatividad expedido por la entidad que ejerce la Inspección, vigilancia y Control",
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
