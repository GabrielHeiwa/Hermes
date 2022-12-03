import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { socket } from '../../../../services/io';
import QrCode from 'qrcode';
import { useUser } from '../../../../contexts/user';

interface PhoneNumber {
  phone: string;
  description: string;
}

interface NewPhoneNumberProps {
  handleCloseModal: () => void;
}

function NewPhoneNumberModal({ handleCloseModal }: NewPhoneNumberProps) {
  // Contexts
  const { user } = useUser()

  // States
  const [show, setShow] = useState(false);

  // Refs
  const refCanvas = useRef<HTMLCanvasElement | null>(null);

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumber>();

  // Functions
  function handleOnSubmit(data: PhoneNumber) {
    socket.emit('new-phone-number', {
      description: data.description,
      phoneNumber: data.phone,
      userId: user?.id,
    });

    socket.on('new-phone-number-status', (data) => {
      data ? toast.success('Número adicionado com sucesso') : toast.error('Erro ao adicionar o número');
      handleCloseModal();
    });

    socket.on('qrcode', (qr) => {
      setShow(true);
      QrCode.toCanvas(refCanvas.current, qr, {});
    });
  }

  return (
    <Modal isOpen={true}>
      <ModalHeader>Novo número de celular</ModalHeader>

      <ModalBody>
        <Form>
          <Row>
            <FormGroup>
              <Label htmlFor="phone">Celular</Label>
              <Controller
                control={control}
                name="phone"
                rules={{ required: 'Campo não pode ser vazio' }}
                render={({ field: { onChange } }) => (
                  <Input id="phone" name="phone" invalid={errors.phone ? true : false} onChange={onChange} />
                )}
              />
              {errors.phone ? <FormFeedback>{errors.phone.message}</FormFeedback> : <></>}
            </FormGroup>

            <FormGroup>
              <Label>Descrição</Label>
              <Controller
                control={control}
                name="description"
                rules={{ required: 'Campo não pode ser vazio' }}
                render={({ field: { onChange } }) => (
                  <Input
                    id={'description'}
                    type="textarea"
                    name="description"
                    invalid={errors.description ? true : false}
                    onChange={onChange}
                  />
                )}
              />
              {errors.description ? <FormFeedback>{errors.description.message}</FormFeedback> : <></>}
            </FormGroup>
          </Row>
        </Form>
      </ModalBody>

      <div className="d-flex align-items-center justify-content-center">
        <canvas ref={refCanvas} className={`${show ? 'd-block' : 'd-none'}`}></canvas>
      </div>

      <ModalFooter>
        <Button color="link" onClick={handleCloseModal} type="button">
          Cancelar
        </Button>
        <Button type="submit" color="primary" onClick={handleSubmit(handleOnSubmit)}>
          Adicionar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewPhoneNumberModal;
