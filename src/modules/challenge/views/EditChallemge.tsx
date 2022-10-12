import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChallengeFormTags from '../components/challengeFormTags';
import { IGeneralInformation } from '../custom_types';
import actions from '../redux/actions';

interface IParams {
    id: string;
}

const EditChallemge = () => {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const challenge: IGeneralInformation = useSelector((states: any) => states.challenge.challenge.value);

    useEffect(() => {
        dispatch(actions.get_detail_challenge(Number(id)));
    }, []);

    return <ChallengeFormTags type="edit" challenge_data={challenge} />;
};

export default EditChallemge;
