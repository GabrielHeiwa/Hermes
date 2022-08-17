import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setMessengers } from '../../../../redux/reducers/dashboardReducer';

interface StopMessengerModalProps {
  handleCloseModal: () => void;
}

function StopMessengerModal({ handleCloseModal }: StopMessengerModalProps) {
  // Redux
  const dispatch = useAppDispatch();
  const { messengerIdSelected, messengers } = useAppSelector((state) => state.dashboardReducer);

  // Functions
  function handleStopMessenger() {
    const auxMessengers = [...messengers];
    const index = auxMessengers.findIndex((messenger) => messengerIdSelected === messenger.id);

    if (index < 0) {
      toast.error('Mensageiro não encontrado');
      handleCloseModal();

      return;
    }

    const messenger = auxMessengers[index];

    if (messenger.running === false) {
      toast.warning('Mensageiro já está parado');
      handleCloseModal();
      return;
    }

    auxMessengers[index] = {
      ...messenger,
      running: false,
    };

    dispatch(setMessengers(auxMessengers));
    toast.success(`Mensageiro: ${messenger.name} parado com sucesso`);

    handleCloseModal();

    return;
  }

  return (
    <Modal isOpen size="md">
      <ModalHeader>Iniciar mensageiro</ModalHeader>

      <ModalBody>
        <span>
          Esta ação ira parar o mensageiro atual que está rodando. Tem certeza que deseja continuar com esta ação?
        </span>
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleCloseModal} color="link">
          Voltar
        </Button>

        <Button color="danger" onClick={handleStopMessenger}>
          Parar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default StopMessengerModal;
