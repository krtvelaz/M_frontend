import { FormikProps, FormikValues } from "formik";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import FormLocation from "../../../../utils/components/location/FormLocation";
import { Card } from "../../../../utils/ui";
import DocumentChallenge from "../components/DocumentChallenge";
import FormPostulation from "../components/FormPostulation";
import { IPostulation } from "../custom_types";
const CreatePostulation = () => {

  const form_ref = useRef<FormikProps<FormikValues>>();

  const addPostulation = (values: IPostulation) => { };
  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill overflow-auto">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="d-flex flex-row mb-3 col-md-12">
              <h5 className="my-5">¡Genial! estas a punto de postularte al reto</h5>
            </div>
            <div className="col-10">
              {/* <Card title=" Datos del postulante" actions={[]}>
                <FormPostulation innerRef={form_ref} onSubmit={addPostulation} />
              </Card> */}
{/* ---------------------------------------------------------------------------------------------- */}
              {/* <div className="site-card-wrapper">
                <div className="row">
                  <div className="col">
                  <Card actions={[]}>
                    <DocumentChallenge innerRef={form_ref} onSubmit={addPostulation}/>
                  </Card></div>
                  <div className="col">
                  <Card actions={[]}>
                    <DocumentChallenge innerRef={form_ref} onSubmit={addPostulation}/>
                  </Card></div>
                  <div className="col">
                  <Card actions={[]}>
                    <DocumentChallenge innerRef={form_ref} onSubmit={addPostulation}/>
                  </Card></div>
                </div>

                <div className="row ">
                  <div className="col-4">
                  <Card actions={[]}>
                    <DocumentChallenge innerRef={form_ref} onSubmit={addPostulation}/>
                  </Card></div>
                  <div className="col-4">
                  <Card actions={[]}>
                    <DocumentChallenge innerRef={form_ref} onSubmit={addPostulation}/>
                  </Card></div>
                 
                </div>

              </div> */}
  {/* ------------------------------------------------------------------------------------------------- */}
              <Card title=" Datos del postulante" actions={[]}>
                <FormLocation  innerRef={form_ref} onSubmit={addPostulation}/>
              </Card>
            </div>

          </div>
        </div>
      </div>


      <div className="bg-white d-flex flex-row justify-content-between">
        <div className="flex-fill" />
        <button
          type="button"
          className="btn btn-outline-primary me-4 "
          onClick={() => { }}
        >
          Cancelar
        </button>
        <button type="button" className="btn btn-primary" onClick={() => {

        }}>
          <Link to="/postulation-team-challenge">Continuar</Link>
        </button>
      </div>


    </div>
  );
};

export default CreatePostulation;
