import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (value: string) => void;
  placeholder: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, onSubmit, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    console.log('inputValue', inputValue)
    onSubmit(inputValue);
    setInputValue('');
    onRequestClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{placeholder}</h2>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder={placeholder} 
        />
        <button onClick={handleSubmit}>Thêm</button>
        <button onClick={onRequestClose}>Đóng</button>
      </div>
    </div>
  );
};

export default Modal;
