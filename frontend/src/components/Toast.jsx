export default function Toast({ message, type, onClose }) {
  return (
    <div className={`toast show bg-${type} text-white position-fixed top-0 end-0 m-3`}>
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button className="btn-close btn-close-white" onClick={onClose}></button>
      </div>
    </div>
  );
}