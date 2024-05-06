import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import usePost from '../../hooks/usePost';


function SuccessfulModal({ message, show, handleClose }) {

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.log({ message, show })
    if (show) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      // Đóng modal sau 5 giây
      setTimeout(() => {
        handleClose()
        setCountdown(5); // Reset thời gian đếm ngược
      }, 5000);

      // Hủy bỏ timer khi component unmount
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  const handleCloseSuccessModal = () => {
    setCountdown(5); // Reset thời gian đếm ngược
  };

  return (
    <div>
      <Modal show={show} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success text-center w-100'>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-success'>
          {message}
        </Modal.Body>
        <Modal.Footer>

          {show && <p>Auto closing in {countdown} seconds</p>}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SuccessfulModal;
