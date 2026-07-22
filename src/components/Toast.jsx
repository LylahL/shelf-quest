export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#000',
        border: '2px solid var(--green)',
        color: 'var(--green)',
        padding: '12px 18px',
        borderRadius: 6,
        fontSize: 10,
        zIndex: 40,
      }}
    >
      {message}
    </div>
  );
}
