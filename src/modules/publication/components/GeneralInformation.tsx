import { FC } from "react";
import { Card } from "../../../utils/ui";
import { IPublication } from "../custom_types";
import FormPublication from "./FormPublication";

interface IGeneralInformationProps {
  innerRef: any;
  onSubmit: (values: any) => void;
  publication: IPublication
}

const GeneralInformation: FC<IGeneralInformationProps> = ({ innerRef, onSubmit, publication}) => {
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
           <FormPublication
              type="general"
              innerRef={innerRef}
              onSubmit={onSubmit}
              publication={publication.general_information}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
