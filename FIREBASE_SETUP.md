# Firebase Push Notifications - Guia de Configuração

Este documento descreve como configurar o Firebase Cloud Messaging (FCM) para push notifications no aplicativo DailyIU.

## Pré-requisitos

1. Conta no Firebase Console (https://console.firebase.google.com/)
2. Projeto Firebase criado
3. Node.js e npm/yarn instalados
4. React Native 0.79.3 configurado

## Passo 1: Configuração do Firebase Console

### 1.1 Criar/Configurar Projeto Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Anote o nome do projeto e o ID do projeto

### 1.2 Adicionar App Android

1. No Firebase Console, clique em "Adicionar app" e selecione Android
2. Informe o package name: `com.dailyiu`
3. Baixe o arquivo `google-services.json`
4. Coloque o arquivo em: `android/app/google-services.json`

### 1.3 Adicionar App iOS

1. No Firebase Console, clique em "Adicionar app" e selecione iOS
2. Informe o Bundle ID: `com.dailyiu` (verifique no Xcode)
3. Baixe o arquivo `GoogleService-Info.plist`
4. Coloque o arquivo em: `ios/DailyIU/GoogleService-Info.plist`
5. Abra o projeto no Xcode e adicione o arquivo ao projeto

### 1.4 Habilitar Cloud Messaging

1. No Firebase Console, vá em "Cloud Messaging"
2. Certifique-se de que o Cloud Messaging está habilitado
3. Anote a chave do servidor (será necessária para o backend)

## Passo 2: Configuração iOS (APNs)

### 2.1 Certificados APNs

1. Acesse o [Apple Developer Portal](https://developer.apple.com/)
2. Vá em "Certificates, Identifiers & Profiles"
3. Crie um certificado APNs (Apple Push Notification service)
4. Baixe o certificado e faça upload no Firebase Console:
   - Firebase Console → Project Settings → Cloud Messaging → iOS app configuration
   - Faça upload do certificado APNs

### 2.2 Configurar Capabilities no Xcode

1. Abra o projeto no Xcode: `ios/DailyIU.xcworkspace`
2. Selecione o target "DailyIU"
3. Vá em "Signing & Capabilities"
4. Clique em "+ Capability"
5. Adicione "Push Notifications"
6. Adicione "Background Modes" e marque:
   - Remote notifications
   - Background fetch (opcional)

## Passo 3: Instalação de Dependências

Execute os seguintes comandos:

```bash
# Instalar dependências npm
npm install

# iOS - Instalar pods
cd ios
pod install
cd ..
```

## Passo 4: Verificação de Configuração

### Android

1. Verifique se `google-services.json` está em `android/app/`
2. Verifique se o plugin está aplicado em `android/app/build.gradle`
3. Verifique se as permissões estão no `AndroidManifest.xml`

### iOS

1. Verifique se `GoogleService-Info.plist` está em `ios/DailyIU/`
2. Verifique se o arquivo foi adicionado ao projeto no Xcode
3. Verifique se as capabilities estão configuradas

## Passo 5: Testes

### Testar em Dispositivo Físico

⚠️ **Importante**: Push notifications não funcionam bem em emuladores. Use dispositivos físicos.

1. Execute o app em um dispositivo físico:
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

2. Faça login no app
3. O token FCM será registrado automaticamente no backend após o login

### Verificar Token FCM

O token FCM será exibido no console quando:
- O app solicitar permissões de notificação
- O usuário fizer login
- O token for atualizado

## Estrutura de Payload de Notificação

O backend deve enviar notificações no seguinte formato:

```json
{
  "notification": {
    "title": "Título da Notificação",
    "body": "Corpo da notificação",
    "sound": "default"
  },
  "data": {
    "type": "comment|like|reply|reminder|general",
    "contentId": "123",
    "commentId": "456",
    "userId": "789"
  }
}
```

### Tipos de Notificação

- `comment`: Novo comentário em conteúdo
- `like`: Like em conteúdo
- `reply`: Resposta a comentário
- `reminder`: Lembrete (diário, exercício, etc.)
- `general`: Notificação geral

## Endpoints do Backend

O app espera os seguintes endpoints:

- `POST /notifications/token` - Registrar token FCM
- `PATCH /notifications/token` - Atualizar token FCM
- `DELETE /notifications/token?userId={userId}` - Remover token FCM

### Payload de Registro/Atualização

```json
{
  "token": "fcm_token_here",
  "userId": 123
}
```

## Troubleshooting

### Android

- **Erro de build**: Verifique se `google-services.json` está no local correto
- **Token não gerado**: Verifique permissões no AndroidManifest.xml
- **Notificações não aparecem**: Verifique se o app tem permissão de notificações

### iOS

- **Erro de build**: Execute `pod install` novamente
- **Token não gerado**: Verifique certificados APNs no Firebase Console
- **Notificações não aparecem**: Verifique capabilities no Xcode

## Próximos Passos

1. Configurar o backend para enviar notificações usando a chave do servidor FCM
2. Implementar lógica de navegação baseada no tipo de notificação
3. Adicionar tratamento de notificações locais (opcional)
4. Implementar badges de notificação (opcional)

