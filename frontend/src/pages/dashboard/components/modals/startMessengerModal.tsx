import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setMessengers } from '../../../../redux/reducers/dashboardReducer';

interface StartMessengerModalProps {
  handleCloseModal: () => void;
}

function StartMessengerModal({ handleCloseModal }: StartMessengerModalProps) {
  // Redux
  const dispatch = useAppDispatch();
  const { messengerIdSelected, messengers } = useAppSelector((state) => state.dashboardReducer);

  // Functions
  function handleStartMessenger() {
    const auxMessengers = [...messengers];
    const index = auxMessengers.findIndex((messenger) => messengerIdSelected === messenger.id);

    if (index < 0) {
      toast.error('Mensageiro não encontrado');
      handleCloseModal();

      return;
    }

    const messenger = auxMessengers[index];

    if (messenger.running === true) {
      toast.warning('Mensageiro já está rodando');
      handleCloseModal();

      return;
    }

    auxMessengers[index] = {
      ...messenger,
      running: true,
    };

    dispatch(setMessengers(auxMessengers));
    toast.success(`Mensageiro: ${messenger.name} iniciado com sucesso`);

    handleCloseModal();

    return;
  }

  return (
    <Modal isOpen size="md">
      <ModalHeader>Iniciar mensageiro</ModalHeader>

      <ModalBody>
        <span>
          Esta ação ira iniciar o mensageiro atual e parar todos os outros que estejam rodando no mesmo horário que
          este. Tem certeza que deseja continuar com esta ação?
        </span>
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleCloseModal} color="link">
          Voltar
        </Button>

        <Button color="primary" onClick={handleStartMessenger}>
          Iniciar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default StartMessengerModal;
