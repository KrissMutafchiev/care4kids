const Modal = ({ isOpen, title, children, onClose }:any) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg w-1/3">
          <h2>{title}</h2>
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
};
  export default Modal;