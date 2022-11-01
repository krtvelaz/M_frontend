import packageJson from '../../../../package.json';

const Powerby = () => {
    return (
        <>
            <div className='power-by_container'>
                <p className="powered-by_header">Powered by:</p>
                <p className='power-by_secretary'>Secretaría de innovación Digital</p>
            </div>
            <div className='power-by_container_version'>
                <p><span className='power-by_version'>Versión</span> <span className='power-by_version_number'>V{packageJson.version}</span></p>
            </div>
        </>
    );
};

export default Powerby;
