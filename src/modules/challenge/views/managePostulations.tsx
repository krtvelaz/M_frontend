
import React, { useEffect, useState } from 'react';
import {Card,Table} from '../../../utils/ui'
import { Popover, Radio } from 'antd';
import { IEvent } from "../../publication/custom_types";
import { useDispatch, useSelector, } from 'react-redux';
import { actions } from '../redux';
import { useParams } from 'react-router-dom';
import { Modal } from "antd";
import { Formik, Form, Field } from "formik";
import ModalInfoPostulations from "../views/ModalInfoPostulations"
import PostulationsFilter from './PostulationsFilter';


const managePostulations = () => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => {set_is_visible(true)};
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
    }

    const list_events: IEvent[] = [
        {
            id: 2,
            eve_titulo: "Titulo",
            eve_descripcion: "descripcion",
            eve_lugar_evento: "lugar evento",
            eve_fecha: "fecha",
            eve_hora: "hora",
            eve_cupos_limitado: false,
            eve_numero_cupos: 3,
            eve_publicada: true,
        },
        {
            id: 2,
            eve_titulo: "Titulo",
            eve_descripcion: "descripcion",
            eve_lugar_evento: "lugar evento",
            eve_fecha: "fecha",
            eve_hora: "hora",
            eve_cupos_limitado: true,
            eve_numero_cupos: 3,
            eve_publicada: false,
        },
        
    ]
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
            title: "Conv.",
            dataIndex: 'conv.',
            align: "left" as "left",
            render: (data: IEvent, values: any, i: number) => {
              return i = 1;
            },
          },
          {
            title: "Nombre del reto",
            dataIndex: 'name',
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
            title: "Nombre del postulante",
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
            title: "Estado",
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
            title: "Código del postulante",
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
            title: "Tipo de participante",
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
            title: "Cód. postulación",
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
            title: "Fecha. postulación",
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
            title: "Hora postulación",
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
            title: "Dimensión",
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
            title: "Acciones",
            dataIndex: "id",
            fixed: "right",
            children: [
              {
                title: <span style={{ fontSize: "9px" }}>Editar</span>,
                dataIndex: "id",
                fixed: "right",
                align: "center" as "center",
                render: (id: number) => {
                  return <ModalInfoPostulations onSubmit={OpenModal} id={id}/>
                },
              },
            ]
            }        
    ]
    return(
        <div className="row">
          <PostulationsFilter/>
        <div>
        <Card>
        <Table
        title="Listado de postulaciones"
        columns={table_columns}
        paginationTop
        items={challenges}
        change_page={change_page}
        with_pagination
        />
        </Card>
        </div>
       
        </div>

    )
}











export default managePostulations;
