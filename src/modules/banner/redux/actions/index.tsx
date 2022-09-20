import {
    create_main_banner,
    edit_banner,
    get_banner_by_id,
    get_list_banners,
    delete_banner,
    get_image_banner,
} from './banner';

import {
    create_testimony,
    edit_testimonial,
    get_testimonial,
    get_list_testimonials,
    delete_testimonial,
    get_document_testimonial,
} from './testimony';
import {
    edit_statistics,
    edit_order_statistics,
    get_statistics
} from './statistic';

const actions = {
    create_main_banner,
    edit_banner,
    get_banner_by_id,
    get_list_banners,
    delete_banner,
    get_image_banner,
    create_testimony,
    edit_testimonial,
    get_testimonial,
    get_list_testimonials,
    delete_testimonial,
    get_document_testimonial,
    edit_statistics,
    edit_order_statistics,
    get_statistics
};

export default actions;
