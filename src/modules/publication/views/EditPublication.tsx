import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PublicationFormTags from '../components/PublicationFormTags';
import { IPublication } from '../custom_types';
import { actions } from '../redux';

const EditPublication = () => {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const publication_data: IPublication = useSelector((store: any) => store.publication.publication.value);

    useEffect(() => {
        dispatch(actions.get_publication_by_id(Number(id)));
    }, []);

    return <PublicationFormTags type="edit" publication_data={publication_data} />;
};

export default EditPublication;
