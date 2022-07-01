import { Card } from "../../../utils/ui";
import FormGeneral from "./FormGeneral";

const CreateGeneral = () => {
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
            <FormGeneral />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateGeneral;
