import { FormikProps, FormikValues } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
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
  const [resports, setReports] = useState([]);

  const onAddReport = async (values: Informe) => {   
    const res = await dispatch(
      actions.create_challenge_report(
        values,
        challenge.general_information.key || -1
      )
    );
    if (res) {
      setChallenge((data: IChallenge) => {
        return {
          ...data,
          reports: [...data.reports, res],
        };
      });
    }
  };

  const onEditReport = async (values: Informe) => {
    const res = await dispatch(
      actions.edit_challenge_report(
        values,
        challenge.general_information.key || -1
      )
    );
    if (res) {
    }
  };

  const onDelete = async (id: number) => {
    const res = await dispatch(actions.delete_challenge_report(id));
    if (res) {
      const newDocuments = challenge.reports.filter((doc) => doc.id !== id);      
      setChallenge((data: IChallenge) => {
        return {
          ...data,
          resports: newDocuments
        };
      });
    }
  }

  const listReports = async () => {
    const data = await dispatch(actions.get_list_challenge_report({}));
    setReports(data);
  };

  useEffect(() => {
    listReports();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
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
          {resports.length > 0 && (
            <Card>
              <span className="my-3" style={{ fontSize: "14px" }}>
                Documentos agregados
                <TableReport
                  reports={resports}
                  loading={false}
                  onEdit={onEditReport}
                  onDelete={onDelete}
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
