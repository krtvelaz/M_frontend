import { FormikProps, FormikValues } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal_error } from '../../../utils/ui';
import { swal_success } from '../../../utils/ui/swalAlert';
import { actions } from '../redux';

export const useCreatePostulation = (
    type: 'create' | 'edit',
    postulation_data?: any
): [string, any, any[], number, boolean, () => void, () => void, () => void, (key: string) => void, any, any] => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<any>();
    const state = location.state as {
        active_key: Location;
        max: number;
        postulation?: any;
    };
    const active_key: any = state?.active_key || '1';
    const ls = state;

    const initial_values: any = {
        applicant_data: {
            name: '',
            document_type: null,
            number_document: '',
            type_profiles: null,
            email: '',
            type_contact: null,
            number_contact: '',
            direction: '',
        },
        membersPostulations: [
            {
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            },
            {
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            },
            {
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            },
        ],
        formats: [],
    };

    const [postulation, setPostulation] = useState(ls?.postulation ? ls.postulation : initial_values);
    const [max, set_max] = useState<number>(state?.max || 1);
    const [is_saving, set_is_saving] = useState<boolean>(false);
    const [go_next, set_go_next] = useState<string>('');
    const ref = useRef<FormikProps<FormikValues>>();

    const steps = [
        {
            save: async () => {
                set_is_saving(true);
                await ref.current?.submitForm();
            },
            onSave: async (values: any) => {
                try {
                    if (!postulation.applicant_data.id) {
                        const res = await dispatch(actions.create_main_postulation(values));
                        setPostulation((data: any) => ({
                            ...data,
                            applicant_data: {
                                name: res.pos_business_name,
                                document_type: res.pos_type_document_id,
                                number_document: res.pos_documentid,
                                type_profiles: res.pos_id_type_competitor,
                                email: res.pos_email,
                                type_contact: values.type_contact,
                                number_contact: res.pos_number_contact,
                                direction: res.pos_address,
                                id: res.id,
                            },
                        }));
                    }

                    set_is_saving(false);
                } catch (error) {
                    return Promise.reject(error);
                }
            },
        },
        {
            save: async () => {
                set_is_saving(true);
                await ref.current?.submitForm();
            },
            onSave: async (values: any) => {

                const membersSend = values.membersPostulations.map((member: any) => {
                    return {
                        ...member,
                        gruint_victim: member.gruint_victim === 'si' ? true : false,
                        gruint_disability: member.gruint_disability === 'si' ? true : false,
                    };
                });
                try {
                    const res = await dispatch(actions.create_memberPostulation(membersSend, postulation.applicant_data.id));
                    setPostulation((data: any) => ({
                        ...data,
                        membersPostulations: values.membersPostulations,
                    }));
                } catch (error) {
                    Promise.reject(error);
                }
                set_is_saving(false);
            },
        },
        {
            save: async (is_finish?: boolean) => {
                set_is_saving(true);
                await ref.current?.submitForm();
            },
            onSave: async (values: any) => {
                set_is_saving(false);
            },
        },
    ];
    const limit = 3;
    const show_next = parseInt(active_key) < limit;
    const next_tab = () => {
        const key = parseInt(active_key);
        const next = key + 1;
        if (next <= limit) {
            callback(`${next}`);
        }
    };
    const prev_tab = () => {
        const key = parseInt(active_key);
        const prev = key - 1;
        if (prev > 0) {
            callback(`${prev}`, true);
        }
    };

    const callback = (key: string, prev = false) => {
        const int_key = parseInt(active_key);
        const save = steps[int_key - 1]?.save;

        if (prev) {
            set_is_saving(false);
            set_go_next(key);
            return;
        }

        save &&
            save().then(() => {
                set_go_next(key);
            });
    };

    const goBack = () => {
        if (active_key === '1') {
            // navigate('../challenge/list', { replace: true });
        } else {
            prev_tab();
        }
    };

    const execute_save = async () => {
        await steps[limit - 1].save(true);
    };

    useEffect(() => {
        if (postulation_data)
            setPostulation((data: any) => {
                return {
                    ...data,
                };
            });
    }, [postulation_data]);

    useEffect(() => {
        if (!is_saving && go_next) {
            console.log('aquiiiiii');

            const key = parseInt(go_next);
            if (key > max) {
                set_max(key);
            }
            navigate(location.pathname, {
                state: {
                    active_key: go_next,
                    postulation,
                    max,
                },
            });

            set_go_next('');
            console.groupEnd();
        }
    }, [is_saving, go_next]);

    return [
        active_key,
        postulation,
        steps,
        max,
        show_next,
        next_tab,
        goBack,
        execute_save,
        callback,
        setPostulation,
        ref,
    ];
};
