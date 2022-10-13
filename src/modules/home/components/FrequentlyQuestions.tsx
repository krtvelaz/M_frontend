import { Collapse } from 'antd';
import { useState } from 'react';
const { Panel } = Collapse;

const FrequentlyQuestions = () => {
  const [ selectedPanel, setSelectedPanel ] = useState<any>([]); 
  return (
    <div className="row">
      <div className="col-12 col-md-12  col-lg-12  mt-4 text-center">
        <p className="mb-0 my-5 " style={{ fontSize: '16px' }}>Conoce más acerca de las</p>
        <h2 className="text-stake my-2">Preguntas Frecuentes</h2>
      </div>
      <div className="my-3 ant-collapse-icon-position-end">
        <Collapse
          style={{
            background: "#FFFFFF",
            border: "0.5px solid #707070",
            opacity: "1"
          }}
          onChange={(e) => setSelectedPanel(e)}
        >
          <Panel extra={ selectedPanel.includes('1') ? '-' : '+' } className={selectedPanel.includes('1') ? 'panel-collapse' : '' } style={{ fontSize: '16px' }} showArrow={false} header="¿Puedo presentar varias ideas de solución a un mismo reto?" key="1">
            <p>
              {" "}
              Sólo podrás postularte una vez por reto; en caso de que tengas un error en el proceso de postulación
              puedes comunicarte con nosotros a través del correo medeinn@medellin.gov.co.
            </p>
          </Panel>
          <Panel extra={ selectedPanel.includes('2') ? '-' : '+' } className={selectedPanel.includes('2') ? 'panel-collapse' : '' } showArrow={false} header="¿Me puedo postular a más de un reto?" key="2">
            <p>
              {" "}
              Sí, siempre y cuando la propuesta de solución sea adaptable o correspondiente al reto que se postula. Los interesados ​​podrán postularse a varios, sin embargo, en caso de ser seleccionados como participantes del proceso de innovación abierta como solucionadores de dos (2) o más desafíos, deberán participar como solucionador en solo uno (1) de ellos.
            </p>
          </Panel>
          <Panel extra={ selectedPanel.includes('3') ? '-' : '+' } className={selectedPanel.includes('3') ? 'panel-collapse' : '' } showArrow={false} header="¿Cuándo y dónde informarán los postulados seleccionados?" key="3">
            <p>
              {" "}
              Convocatoria Residuos sólidos: Las propuestas pre-seleccionadas serán anunciadas el día 06 de junio, según los Términos de referencia, a través del correo electrónico de cada postulante.
              Convocatoria Embarazo adolescente: Las propuestas pre-seleccionadas serán anunciadas el día 08 de julio, según los Términos de referencia, a través del correo electrónico de cada postulante.

            </p>
          </Panel>
          <Panel extra={ selectedPanel.includes('4') ? '-' : '+' } className={selectedPanel.includes('4') ? 'panel-collapse' : '' } showArrow={false} header="¿Cómo puedo contactar al equipo de la convocatoria para recibir atención?" key="4">
            <p>

              {" "}
              Si tiene alguna inquietud o necesita recibir alguna atención, puede comunicarse con nosotros a través del correo medeinn@medellin.gov.co, dentro de las fechas definidas en los términos de referencia de acuerdo a cada etapa.
            </p>
          </Panel>
          <Panel extra={ selectedPanel.includes('5') ? '-' : '+' } className={selectedPanel.includes('5') ? 'panel-collapse' : '' } showArrow={false} header="¿Cuantas propuestas se van a seleccionar?" key="5">
            <p>

              {" "}
              Convocatoria Residuos sólidos: Una vez concluida la fase de postulación, se elegirán 2 solucionadores por reto, es decir, un total de 4 preseleccionados.
            </p>
          </Panel>
          <Panel extra={ selectedPanel.includes('6') ? '-' : '+' } className={selectedPanel.includes('6') ? 'panel-collapse' : '' } showArrow={false} header="¿Cómo serán seleccionados los ganadores?" key="6">
            <p>

              {" "}
              Convocatoria Residuos sólidos: Una vez se haga la preselección de los 4 participantes que pasan a la etapa de acompañamiento, encontrará un proceso de adaptación de la propuesta de solución la cual finalizará con un prototipo conceptual, el cual será evaluado de acuerdo a los términos de referencia por la mesa de jurados en una sesión tipo pitch.
              Convocatoria Embarazo adolescente: Una vez se haga la preselección de los 4 participantes que pasan a la etapa de acompañamiento, resultará a un proceso de adaptación de la propuesta de solución la cual finalizará con un prototipo conceptual, el cual será evaluado de acuerdo a los términos de referencia por la mesa de jurados en una sesión tipo pitch.
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default FrequentlyQuestions;
