export default function Modal({ message, messageColor }) {
  return (
    <div id="modal" style={{ color: messageColor }}>
      <div id="modal-content" >
        <h1>{message}</h1>
      </div>
    </div> 
  );
}
