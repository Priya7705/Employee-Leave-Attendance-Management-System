import "../styles/EmployeeModal.css";

function EmployeeModal({ open, onClose, children }) {

    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                {children}

            </div>

        </div>

    );

}

export default EmployeeModal;