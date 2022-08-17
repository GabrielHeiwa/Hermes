import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setMessengers } from '../../../../redux/reducers/dashboardReducer';

interface RemoveMessengerModalProps {
  handleCloseModal: () => void;
}

function RemoveMessengerModal({ handleCloseModal }: RemoveMessengerModalProps) {
  // Redux
  const dispatch = useAppDispatch();
  const { messengerIdSelected, messengers } = useAppSelector((state) => state.dashboardReducer);

  // Functions
  function handleRemoveMessenger() {
    dispatch(setMessengers(messengers.filter((messenger) => messenger.id !== messengerIdSelected)));
    toast.success(`Mensageiro removido com sucesso`);
    handleCloseModal();

    return;
  }

  return (
    <Modal isOpen>
      <ModalHeader>Excluir mensageiro</ModalHeader>

      <ModalBody>
        CUIDADO! Está ação irá remover completamentamente o seu mensageiro caso o mesmo ainda não tenha terminado de
        enviar as mensagens tudo será perdido.
      </ModalBody>

      <ModalFooter>
        <Button color="link" onClick={handleCloseModal}>
          Voltar
        </Button>

        <Button color="danger" onClick={handleRemoveMessenger}>
          Excluir
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default RemoveMessengerModal;
