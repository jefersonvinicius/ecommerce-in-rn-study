import React from 'react';
import LogInForm from 'app/components/LogInForm';
import Modal from 'react-native-modal';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onLogInFinished: () => void;
};

export default function LogInModal({isVisible, onClose, onLogInFinished}: Props) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose}>
      {isVisible && <LogInForm onLogInFinished={onLogInFinished} />}
    </Modal>
  );
}
