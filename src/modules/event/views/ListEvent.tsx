import { Popover, Radio } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trash } from '../../../utils/assets/img';
import { Card, Link, swal_error, Table } from "../../../utils/ui";
import { IEvent } from '../custom_types';
import { actions } from '../redux';
import ModalEditEvent from '../compenents/ModalEditEvent';

const ListEvent = () => {

  const [filters, setFilters] = useState({
    page: 1,
    page_size: 10,

  })
  
  const list_events: IEvent[] = useSelector(
    (store: any) => store.event.list_event.value
  );
  const loading: boolean = useSelector(
    (store: any) => store.event.list_event.loading
    );
    const {total}: any = useSelector(
      (store: any) => store.event.list_event.pagination
      );
      const dispatch = useDispatch<any>();
      const [isChange, setIsChange] = useState<boolean>(false);

  const get_events = async () => {
    await dispatch(actions.get_list_events(filters));
  };

  const editEvent = async (values: IEvent) => {    
    await dispatch(actions.edit_event(values));
    setIsChange(true);

  };

  const onDelete = async (id: number) => {
    await dispatch(actions.delete_event(id));
    setIsChange(true);
  };

  const change_page = (page: number, pageSize?: number) => {
    setFilters({
      page,
      page_size: pageSize || 10
    })
    dispatch(actions.get_list_events({page, page_size: pageSize}))
  }

  useEffect(() => {
    get_events();
  }, []);

  useEffect(() => {
    if (isChange) {
      get_events();
      setIsChange(false);
    }
  }, [isChange]);

    const table_columns: any = [
        {
          title: "No.",
          fixed: "left",
          align: "center" as "center",
          render: (data: IEvent, values: any, i: number) => {
            return i + 1;
          },
        },
        {
          title: "Nombre del evento",
          dataIndex: "eve_title",
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
          title: "Creado por",
          dataIndex: "audit_trail",
          align: "left" as "left",
          render: () => {
            return 'Luisa Sánchez'
          }
        },
        {
          title: "Publicado",
          align: "left" as "left",
          render: ( data: IEvent ) => {
            const onChange = async (e: any) => {
            await dispatch(actions.edit_publication_event(Number(data?.id), e?.target?.value === true ? 'publish' : 'unpublish'));
            await get_events()
            
            };
            
            return (
              <Radio.Group onChange={onChange} value={data.eve_status === 'Publicado' ? true : false}>
                <Radio value= {true} >Si</Radio>
                <Radio value= {false} >No</Radio>
              </Radio.Group>
            );
          },
        },
        {
          title: "Fecha evento",
          dataIndex: "eve_date",
          align: "left" as "left",
          render: (date: string) => {
            return moment(date).format("DD / MM / YYYY")
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
                return <ModalEditEvent   onSubmit={editEvent} id={id} />;
              },
            },
            {
              title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
              fixed: "right",
              dataIndex: "id",
              align: "center" as "center",
              render: ( id: number) => {
                return (
                  <img
                    src={trash}
                    className="img-fluid"
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                    const result =  await swal_error.fire({
                        title: "Eliminar elemento",
                        html:
                          '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                          '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                        showCancelButton: false,
                        showDenyButton: true,
                        confirmButtonText: "Sí, eliminar",
                        denyButtonText: `Cancelar`,
                      });
                      if (result.isConfirmed) {
                        onDelete(id);
                      }
                    }}
                  />
                );
              },
            },
          ],
        },
      ];

     

  return (
    <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="row">
          <h5 className="col d-flex justify-content-start">
            Gestionar eventos
          </h5>
          <div
            style={{
              margin: "0 20px 10px 0",
            }}
            className="col d-flex justify-content-end"
          >
            <Link to="/event/create" name="Crear Evento" iconText="+" />
          </div>
        </div>

        <Card>
          <Table
          title='Lista de eventos'
            columns={table_columns}
            loading={loading}
            change_page={change_page}
            with_pagination
            count={total}
            items={list_events}
            paginationTop
          />
        </Card>
      </div>
    </div>
  </div>
  )
}

export default ListEvent