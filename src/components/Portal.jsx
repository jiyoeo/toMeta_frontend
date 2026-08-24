import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  if (typeof window === 'undefined') return null;

  const modalRoot = document.getElementById('modal-root') || document.body;

  return createPortal(children, modalRoot);
};

export default Portal;