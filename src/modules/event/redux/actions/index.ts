import {
    create_event,
    delete_event,
    get_list_events,
    get_event_history,
    get_event_by_id,
    edit_event,
    edit_publication_event,
} from "../actions/event";


import {
    get_list_bulletin,
    export_data,
} from "../actions/bulletin";

const actions = {
    create_event,
    delete_event,
    get_list_events,
    get_event_history,
    get_event_by_id,
    edit_event,
    edit_publication_event,
    get_list_bulletin,
    export_data,
}

export default actions;