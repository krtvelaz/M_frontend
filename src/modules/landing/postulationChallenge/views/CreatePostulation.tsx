import React from "react";
import { Card } from "../../../../utils/ui";

const CreatePostulation = () => {
  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill overflow-auto">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="d-flex flex-row mb-3">
              <h5 className="my-5">Estadísticas</h5>
            </div>
            <div className="col-md-12">
              <Card title="Editar estadísticas  - Página inicio" actions={[]}>
                
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostulation;
