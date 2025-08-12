export default function Modal({ open, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div style={{ background: '#fff', margin: '10% auto', padding: '1rem', maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
