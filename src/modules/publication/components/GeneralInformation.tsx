import { FC } from "react";
import { Card } from "../../../utils/ui";
import FormPublication from "./FormPublication";

interface IGeneralInformationProps {
  innerRef: any;
  onSubmit: (values: any) => void;
}

const GeneralInformation: FC<IGeneralInformationProps> = ({ innerRef, onSubmit}) => {
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
              type="gallery"
              innerRef={innerRef}
              onSubmit={onSubmit}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
