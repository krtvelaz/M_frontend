import { FormikProps, FormikValues } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../utils/ui";
import { IChallenge, Informe } from "../../custom_types";
import { actions } from "../../redux";
import FormReport from "./FormReport";
import TableReport from "./TableReport";

interface ReportPros {
  challenge: IChallenge;
  setChallenge: any;
}

const AddReport: FC<ReportPros> = ({ challenge, setChallenge }) => {
  const form_ref = useRef<FormikProps<FormikValues>>();
  const dispatch = useDispatch<any>();
  const [isChange, setIsChange] = useState<boolean>(false);
  const reports = useSelector(
    (store: any) => store?.challenge?.reports.value
  );
  const { total } = useSelector(
    (store: any) => store?.challenge?.reports.pagination
  );
  const loading = useSelector(
    (store: any) => store?.challenge?.reports.loading
  );
  

  
  const onAddReport = async (values: Informe) => {
    const res = await dispatch(
      actions.create_challenge_report(
        values,
        challenge.general_information.key || 2
      )
    );
    if (res) {
      setChallenge((data: IChallenge) => {
        return {
          ...data,
          reports: [...data.reports, res],
        };
      });
      setIsChange(true);
    }
  };

  const onEditReport = async (values: Informe) => {
    const res = await dispatch(
      actions.edit_challenge_report(
        values,
        challenge.general_information.key || 2
      )
    );
    if (res) {
      setIsChange(true);
    }
  };

  const onDelete = async (id: number) => {
    const res = await dispatch(actions.delete_challenge_report(id));
    if (res) {
      const newDocuments = challenge.reports.filter((doc) => doc.id !== id);
      setChallenge((data: IChallenge) => {
        return {
          ...data,
          resports: newDocuments,
        };
      });
      setIsChange(true);
    }
  };

  const listReports = async () => {
    const data = await dispatch(
      actions.get_list_challenge_report(
        challenge.general_information.key || 2,
        {}
      )
    );
  };

  useEffect(() => {
    listReports();
  }, []);

  useEffect(() => {
    if (isChange) {
      listReports();
      setIsChange(false);
    }
  }, [isChange]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h4
            className="text-center mb-3"
            style={{ fontFamily: "Work-Sans-SemiBold" }}
          >
            Este formulario es opcional, si no hay información para asociar
            puede finalizar la creación del reto haciendo clic en el botón
            finalizar reto.
          </h4>
          <Card
            title={
              <>
                <span style={{ fontSize: "14px" }}>Agregar informe</span>
                <span style={{ color: "#AD0808", fontSize: "10px" }}>
                  {" "}
                  - Todos los campos son obligatorios
                </span>
              </>
            }
            actions={[
              <div
                className="d-flex justify-content-end"
                style={{ padding: "20px" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    form_ref.current?.submitForm();
                  }}
                >
                  Agregar documento
                </button>
              </div>,
            ]}
          >
            <FormReport innerRef={form_ref} onSubmit={onAddReport} />
          </Card>
          {reports.length > 0 && (
            <Card>
              <span className="my-3" style={{ fontSize: "14px" }}>
                Documentos agregados
                <TableReport
                  reports={reports}
                  loading={loading}
                  onEdit={onEditReport}
                  onDelete={onDelete}
                  count={total}
                />
              </span>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReport;
