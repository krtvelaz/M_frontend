import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../utils/ui";
import { IGeneralInformation, IMasters } from "../custom_types";
import { actions } from "../redux";
import FormGeneral from "./FormGeneral";
interface GeneralInformationProps {
  general_information: IGeneralInformation;
  innerRef: any;
  active_key: string;
  onSubmit: (values: any) => void;
}
const CreateGeneral: FC<GeneralInformationProps> = ({ general_information, innerRef, onSubmit, active_key })=> {
  const list_master: IMasters = useSelector((store: any) => store.challenge.masters.value);  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card
            title={
              <>
                Información general
                <span style={{ color: "#AD0808", fontSize: "10px" }}>
                  {" "}
                  - Todos los campos son obligatorios
                </span>
              </>
            }
          >
            <FormGeneral 
            general_={general_information}
            innerRef={innerRef}
            onSubmit={onSubmit}
            masters={list_master}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateGeneral;
