import { Card } from 'antd';
import React from 'react'
import FormMainBanner from '../components/FormMainBanner';

const CreateMainBanner = () => {
  return (
    <div className="h-100 d-flex flex-column">
    <div className="flex-fill overflow-auto">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="d-flex flex-row mb-3">
                    <h5>Carrusel principal</h5>
                </div>
                <div className="col-md-12">
                    <Card title='Agregar elemento'>
                        <FormMainBanner />
                    </Card>
                </div>
            </div>
        </div>
    </div>
    <div
        className="bg-white d-flex flex-row justify-content-between"
        style={{ padding: 16, borderTop: '1px solid #ccc' }}
    >
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
            }}
        >
            Atrás
        </button>
        <div className="flex-fill" />
        <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
            }}
        >
            Guardar
        </button>
    </div>
</div>
  )
}

export default CreateMainBanner
