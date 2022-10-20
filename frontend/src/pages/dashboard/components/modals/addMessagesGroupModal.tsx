import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  InsertMesagesGroupVariables,
  insertMessagesGroupData,
  INSERT_MESSAGES_GROUP,
} from '../../../../queries/messagesGroup';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

interface AddMessageGroupModalProps {
  handleCloseModal: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  modalContainer: {
    maxHeight: '45vh',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
};

function AddMessageGroupModal(props: AddMessageGroupModalProps) {
  // Props
  const { handleCloseModal } = props;

  // States
  const [messages, setMessages] = useState<string[]>(['', '']);
  const [messagesGroupTitle, setMessagesGroupTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // GraphQL
  const [insertMessagesGroup] = useMutation<insertMessagesGroupData, InsertMesagesGroupVariables>(
    INSERT_MESSAGES_GROUP,
  );

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

  async function handleInsertMessagesGroup() {
    try {
      setLoading(true);

      const messagesGroup = {
        id: v4(),
        title: messagesGroupTitle,
        user_id_fk: 'b245ea36-6e7e-4352-a7a4-fbd23424602a',
        messages: { data: messages.filter((m) => m).map((m) => ({ id: v4(), message: m })) },
      };

      await insertMessagesGroup({ variables: { messagesGroup } });

      handleCloseModal();
      toast.success('Conjunto de mensagens inseridos com sucesso');
    } catch (error) {
      toast.error('Erro ao inserir novo conjunto de mensagens');
      console.error(error);
    } finally {
      setLoading(false);
    }

    return;
  }

  return (
    <Modal isOpen={true}>
      <ModalHeader>Novo conjunto de mensagens</ModalHeader>

      <ModalBody style={styles.modalContainer}>
        <Form>
          <Row>
            <FormGroup>
              <Label>Título do conjunto</Label>
              <Input onChange={(e) => setMessagesGroupTitle(e.target.value)} />
            </FormGroup>

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
        <Button disabled={loading} color="link" onClick={handleCloseModal} type="button">
          Cancelar
        </Button>
        <Button disabled={loading} type="submit" color="primary" onClick={handleInsertMessagesGroup}>
          {loading ? <Spinner size="sm" /> : 'Adicionar'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export { AddMessageGroupModal };
