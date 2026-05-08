export default function Toast({ message, type, onClose }) {

  return (
    <div
      className={`toast show align-items-center text-white bg-${type} border-0 position-fixed top-0 end-0 m-3`}
      role="alert"
      style={{
        zIndex: 9999,
        minWidth: "300px",
      }}
    >
      <div className="d-flex">

        <div className="toast-body">
          {message}
        </div>

        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          onClick={onClose}
        ></button>

      </div>
    </div>
  );
}