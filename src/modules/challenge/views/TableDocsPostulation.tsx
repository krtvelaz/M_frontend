
import React, { useEffect, useState } from 'react';
import {Card,Table,swal_error,Link} from '../../../utils/ui'
import { Popover, Radio } from 'antd';
import { IEvent } from "../../publication/custom_types";
import { useDispatch, useSelector, } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';
import { Modal, } from "antd";
import { Formik, Form, Field } from "formik";
import ModalInfoPostulations from "../views/ModalInfoPostulations"
import { pencil, trash,} from '../../../utils/assets/img';
import WatchComponent from '../../../utils/assets/img/WatchComponent'




const TableDocsPostulation = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const { id } = useParams<any>();
    const dispatch = useDispatch<any>();
    const challenges = useSelector((store: any) => store.challenge.challenges.value);
    const { total } = useSelector((store: any) => store.challenge.challenges.pagination);
    const loading = useSelector((store: any) => store.challenge.challenges.loading);
    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
    });
    useEffect(() => {
        dispatch(actions.get_list_challenges());
        getChallenge();
    }, []);

    const change_page = (page: number, pageSize?: number) => {
        setFilters({ page, pageSize: pageSize || 10 });
        dispatch(actions.get_list_challenges(page, pageSize));
    };
    const getChallenge = async () => {
        const res = await dispatch(actions.get_detail_challenge(Number(3)));    
        };
    const OpenModal = () =>{
      setModalOpen(true)
      console.log("click",modalOpen)
    }

  
    const table_columns = [
        {
            title: "No.",
            fixed: "left",
            align: "center" as "center",
            render: (data: IEvent, values: any, i: number) => {
              return i + 1;
            },
          },
          {
            title: "Tipo de documento",
            dataIndex: "eve_titulo",
            align: "left" as "left",
            render: (value: string) => {
              return (
                value &&
                (value.length > 65 ? (
                  <Popover content={value}>
                    <span
                      style={{ cursor: "pointer" }}
                      className="popover-span"
                    >{`${value.substring(0, 64)}...`}</span>
                  </Popover>
                ) : (
                  value
                ))
              );
            },
          },
          {
            title: "Nombre",
            dataIndex: "eve_titulo",
            align: "left" as "left",
            render: (value: string) => {
              return (
                value &&
                (value.length > 65 ? (
                  <Popover content={value}>
                    <span
                      style={{ cursor: "pointer" }}
                      className="popover-span"
                    >{`${value.substring(0, 64)}...`}</span>
                  </Popover>
                ) : (
                  value
                ))
              );
            },
          },
          {
            title: "Ver",
            dataIndex: "eve_titulo",
            align: "left" as "left",
            render: (value: string) => {
              return (
                value &&
                (value.length > 65 ? (
                  <Popover content={value}>
                    <span
                      style={{ cursor: "pointer" }}
                      className="popover-span"
                    >{`${value.substring(0, 64)}...`}</span>
                  </Popover>
                ) : (
                  value
                ))
              );
            },
          },
          {
            title: 'Acciones',
            fixed: 'right',
            children: [
                {
                    title: <span style={{ fontSize: '9px' }}>Ver</span>,
                    dataIndex: 'id',
                    fixed: 'right',
                    align: 'center' as 'center',
                    render: (id: string) => {
                        return (
                        <WatchComponent
                        color_fill="#1D98D1"
                        />
                        );

                    },
                },
                {
                    title: <span style={{ fontSize: '9px' }}>Descargar</span>,
                    fixed: 'right',
                    dataIndex: 'id',
                    align: 'center' as 'center',
                    render: (id: number) => {
                        return (
                            <div>
                            <img
                                src={trash}
                                className="img-fluid"
                                alt=""
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    const result = await swal_error.fire({
                                        title: 'Eliminar elemento',
                                        html:
                                            '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                                            '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                                        showCancelButton: false,
                                        showDenyButton: true,
                                        confirmButtonText: 'Sí, eliminar',
                                        denyButtonText: `Cancelar`,
                                    });
                                    if (result.isConfirmed) {
                                        await dispatch(actions.delete_challenge(id));
                                        await dispatch(actions.get_list_challenges());
                                    }
                                }}
                            />
                            </div>
                        );
                    },
                },
            ],
        },
    ]
    return(
        <div className="row" style={{width: "100%",display: "contents",}}>        
        <Card>
        <span
       style={{ padding: "2% 0% 2% 1%",fontWeight: "bold",color:"#000000",fontSize: "14px",}}
       >Documentos técnicos</span>
        <Table
        title="Documentos tecnicos  "
        columns={table_columns}
        items={challenges}
        />
        </Card>
        <Card>
        <span
       style={{ padding: "2% 0% 2% 1%",fontWeight: "bold",color:"#000000",fontSize: "14px",}}
       >Documentos administrativos</span>
        <Table
        title="Documentos tecnicos  "
        columns={table_columns}
        items={challenges}
        />
        </Card>
        </div>

    )
}

export default TableDocsPostulation;
