import {
  get_detail_challenge,
  create_challenge,
  update_challenge,
  get_image_principal,
  get_list_challenges,
  delete_challenge,
  publish_challenge,
  unpublish_challenge,
} from "./challenge";

import {
  create_challenge_document,
  edit_challenge_document,
  get_list_document,
  delete_challenge_document,
  get_document,
  get_types_documents,
} from "./document";

import {
  create_challenge_report,
  edit_challenge_report,
  get_list_challenge_report,
  delete_challenge_report,
} from "./report";

import {
  get_communes,
  get_dimensions,
  get_dependencies,
  get_profiles,
  get_neighborhoods,
} from "./masters";

const actions = {
  unpublish_challenge,
  publish_challenge,
  delete_challenge,
  get_image_principal,
  get_detail_challenge,
  create_challenge,
  update_challenge,
  create_challenge_report,
  edit_challenge_report,
  get_list_challenge_report,
  delete_challenge_report,
  get_document,
  get_types_documents,
  create_challenge_document,
  edit_challenge_document,
  get_list_document,
  delete_challenge_document,
  get_communes,
  get_dimensions,
  get_dependencies,
  get_profiles,
  get_neighborhoods,
  get_list_challenges
};

export default actions;
