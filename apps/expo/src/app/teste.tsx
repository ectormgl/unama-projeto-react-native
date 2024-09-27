import React from 'react';
import { View, Text, Button } from 'react-native';
import { sendPointsP2P } from '~/utils/transaction'; // O caminho correto do seu hook

const SendPointsComponent = () => {
  const mutation = sendPointsP2P(); // Chamando o hook correto

  // Função para disparar a mutation
  const handleSendPoints = () => {
    mutation.mutate(); // Disparando a mutation
  };

  // Se o status for de loading
  if (mutation.isPending) {
    return <Text>Carregando...</Text>;
  }

  // Se houver erro
  if (mutation.isError) {
    return <Text>Erro: {(mutation.error).message}</Text>;
  }

  // Se a mutation foi bem-sucedida
  if (mutation.data) {
    return (
      <View>
        <Text>Pontos enviados com sucesso!</Text>
        <Text>ID: {mutation.data.idteste}</Text> 
        <Text>Nome completo: {mutation.data.fullnameTest}</Text>
      </View>
    );
  }

  return (
    <View>
      <Button title="Enviar Pontos" onPress={handleSendPoints} />
    </View>
  );
};

export default SendPointsComponent;
