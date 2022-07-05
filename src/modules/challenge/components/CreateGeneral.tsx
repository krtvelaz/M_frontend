import { FC } from "react";
import { Card } from "../../../utils/ui";
import { IGeneralInformation } from "../custom_types";
import FormGeneral from "./FormGeneral";
interface GeneralInformationProps {
  general_information: IGeneralInformation;
  innerRef: any;
  onSubmit: (values: any) => void;
}
const CreateGeneral: FC<GeneralInformationProps> = ({ general_information, innerRef, onSubmit })=> {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card
            title={
              <>
                <span style={{ fontSize: "14px" }}>Información general</span>
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
            
            
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateGeneral;
