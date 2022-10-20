import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useState } from 'react';

interface AddMessageGroupModalProps {
  handleCloseModal: () => void;
}

const styles: Record<string, React.CSSProperties> = {
    modalContainer: {
        maxHeight: "45vh",
        overflow: "auto",
        whiteSpace: "nowrap",
    }
}

function AddMessageGroupModal(props: AddMessageGroupModalProps) {
  // Props
  const { handleCloseModal } = props;

  // States
  const [messages, setMessages] = useState<string[]>(['', '']);

  // Functions
  function handleAddMessage(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (index === messages.length - 1)
      return setMessages((curr) => {
        const _curr = structuredClone(curr);
        _curr[index] = e.target.value;
        return [..._curr, ''];
      });

    return setMessages((curr) => {
      const _curr = structuredClone(curr);
      _curr[index] = e.target.value;

      return [..._curr];
    });
  }

  return (
    <Modal isOpen={true} >
      <ModalHeader>Novo conjunto de mensagens</ModalHeader>

      <ModalBody style={styles.modalContainer}>
        <Form >
          <Row>
            {messages.map((_, index) => {
              /* TODO: Adicionar tratamento para quanto a mensagem anterior ficar vazia fazer com
               * que suma da vista do usuário
               */
              return (
                <FormGroup key={index}>
                  <Label htmlFor="phone">{index + 1}° Mensagem </Label>
                  <Input type="textarea" onChange={(e) => handleAddMessage(e, index)} />
                </FormGroup>
              );
            })}
          </Row>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="link" onClick={handleCloseModal} type="button">
          Cancelar
        </Button>
        <Button type="submit" color="primary" onClick={() => console.log(messages)}>
          Adicionar
        </Button>
      </ModalFooter>
    </Modal>
  );
}



export { AddMessageGroupModal };
