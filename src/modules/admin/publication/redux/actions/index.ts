
import {
    create_event,
    delete_event,
    get_list_events,
    get_event_by_id,
    edit_event,
    edit_publication_event,
} from "./event";

import {
    create_publication,
    get_list_publications,
    get_publication_by_id,
    edit_publication,
    delete_publication,
    edit_published_publication,
} from "./publication";

import {
    create_gallery,
    edit_gallery,
    get_gallery_by_id,
    get_list_gallery,
    delete_gallery,
} from "./gallery";

const actions = {
    create_event,
    delete_event,
    get_list_events,
    get_event_by_id,
    edit_event,
    edit_publication_event,
    create_publication,
    get_list_publications,
    get_publication_by_id,
    edit_publication,
    delete_publication,
    edit_published_publication,
    create_gallery,
    edit_gallery,
    get_gallery_by_id,
    get_list_gallery,
    delete_gallery,
  }
  
  export default actions;