import {
  get_detail_challenge,
  create_challenge,
  update_challenge,
  get_four_challenge,
} from "./challenge";

import {
  create_challenge_document,
  edit_challenge_document,
  get_list_document,
  delete_challenge_document,
  get_document,
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
  get_detail_challenge,
  create_challenge,
  update_challenge,
  create_challenge_report,
  edit_challenge_report,
  get_list_challenge_report,
  delete_challenge_report,
  get_four_challenge,
  get_document,
  create_challenge_document,
  edit_challenge_document,
  get_list_document,
  delete_challenge_document,
  get_communes,
  get_dimensions,
  get_dependencies,
  get_profiles,
  get_neighborhoods,
};

export default actions;
