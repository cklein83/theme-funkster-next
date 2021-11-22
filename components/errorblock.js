
const ErrorBlock = ({data}) => {
    return (
    <div className="alert alert-warning d-flex align-items-center" role="alert">
        <div className="bg-warning rounded-circle border border-white p-1 ps-2 pe-2 me-3 shadow-lg">
            <i className="bi bi-activity align-middle text-white"></i>
        </div>
        <div>
            Missing data
        </div>
    </div>
    )
}

export default ErrorBlock