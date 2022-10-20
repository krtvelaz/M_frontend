import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../../utils/ui';
import { IGeneralInformation } from '../custom_types';
import FormGeneral from './FormGeneral';
interface GeneralInformationProps {
    general_information: IGeneralInformation;
    innerRef: any;
    active_key: string;
    onSubmit: (values: any) => void;
}
const CreateGeneral: FC<GeneralInformationProps> = ({ general_information, innerRef, onSubmit, active_key }) => {
    const list_communes: any = useSelector((store: any) => store.challenge.communes.value);
    const list_dimensions: any = useSelector((store: any) => store.challenge.dimensions.value);
    const list_dependencies: any = useSelector((store: any) => store.challenge.dependencies.value);
    const list_profiles: any = useSelector((store: any) => store.challenge.profiles.value);

    return (
        <div className="container-fluid" style={{ paddingTop: '20px'}}>
            <div className="row">
                <div className="col-md-12">
                    <Card
                        title={
                            <>
                                Información general
                                <span style={{ color: '#AD0808', fontSize: '10px' }}>
                                    {' '}
                                    - Todos los campos son obligatorios
                                </span>
                            </>
                        }
                    >
                        <FormGeneral
                            general_={general_information}
                            innerRef={innerRef}
                            onSubmit={onSubmit}
                            communes={list_communes}
                            dimensions={list_dimensions}
                            dependencies={list_dependencies}
                            profiles={list_profiles}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateGeneral;
