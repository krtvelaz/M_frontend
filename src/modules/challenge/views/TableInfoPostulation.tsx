
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


const TableInfoPostulation = () => {
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
            title: "Nombre y apellidos",
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
            title: "No de Documento",
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
            title: "Discapacitado",
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
            title: "Sexo",
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
            title: "Orientación Sexual",
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
            title: "Identidad de Genero",
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
            title: "Etnia",
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
    ]
    return(
        <div className="row" style={{width: "100%",display: "contents",}}>
       
        <Card>
        <Table
        title="Listado de postulaciones"
        columns={table_columns}
        items={challenges}
        with_pagination
        />
        </Card>
        </div>

    )
}

export default TableInfoPostulation;
