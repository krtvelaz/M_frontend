const Spinner = () => {
    return (
        <div
            className="container-modal"
            style={{
                width: '100%',
                height: '90%',
                position: 'fixed',
                top: 80,
                left: 0,
                backgroundColor: 'rgba(20, 16, 28, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
            }}
        >
            <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: 30, marginLeft: 10, color: '#fff' }} />
        </div>
    );
};

export default Spinner;
