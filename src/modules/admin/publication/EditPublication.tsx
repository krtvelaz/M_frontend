import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PublicationFormTags from "./components/postNews/PublicationFormTags"

const EditPublication = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  useEffect(() => {      
    // disparar accion
}, []);
  return (
    <PublicationFormTags type="edit" />
  )
}

export default EditPublication
