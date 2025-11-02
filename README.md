# DailyIU

Aplicativo mobile desenvolvido em React Native para gestão de bem-estar, exercícios e conteúdo relacionado à saúde.

---

## 🇬🇧 English

**DailyIU** is a mobile application developed with React Native for wellness management, exercises, and health-related content.

### About

DailyIU is a mobile app that provides a complete platform for users to manage their daily wellness, including personal diary features, workouts and exercises, plus an educational and interactive content area.

### Key Features

- **📅 Diary**: Daily activity tracking and monitoring
- **💪 Exercises**: Exercise catalog, personalized workouts and training plans
- **📚 Content**: Educational content feed with likes, comments and save system
- **👤 Authentication**: Complete login, registration and password recovery system
- **🎯 Onboarding**: Customized initial flow for new users
- **⚙️ Settings**: Profile management, accessibility preferences and notifications

### Tech Stack

**Core Technologies:**

- React Native 0.79.3
- React 19.0.0
- TypeScript 5.0.4
- React Navigation 7.x
- React Query (TanStack Query) 5.x
- Styled Components 6.x
- React Hook Form 7.x
- Zod 3.x (validation)

**Storage:**

- MMKV (fast local storage)
- AsyncStorage (async storage)

### Getting Started

**Prerequisites:**

- Node.js >= 18
- Yarn
- React Native CLI
- For iOS: Xcode, CocoaPods
- For Android: Android Studio, JDK

**Installation:**

1. Clone the repository
2. Install dependencies: `yarn install`
3. For iOS: Run `bundle install` and `bundle exec pod install --project-directory=ios`
4. Configure environment variables in `.env` file

**Running:**

- Start Metro: `yarn start`
- Run Android: `yarn android`
- Run iOS: `yarn ios`

### Project Structure

The project follows a modular structure with separated concerns:

- `/src/components` - Reusable components
- `/src/modules` - Feature modules (auth, exercises, content, diary, etc.)
- `/src/contexts` - React contexts
- `/src/services` - API services and offline sync
- `/src/navigation` - Navigation configuration
- `/src/theme` - Theme and styling system

### Available Scripts

- `yarn start` - Start Metro bundler
- `yarn android` - Run on Android
- `yarn ios` - Run on iOS
- `yarn test` - Run tests
- `yarn lint` - Run linter
- `yarn make:icon` - Generate app icon

### Features

**Authentication:** Login, registration, password recovery, session management

**Diary:** Calendar view, daily activity logging, report generation

**Exercises:** Exercise listings, workout creation and execution, personalized training plans, exercise evaluation and feedback

**Content:** Content feed, likes and comments system, save favorite content, create own content, categorization

**Onboarding:** Initial questionnaire, user experience personalization

**Accessibility:** Full support for light/dark themes, accessibility settings, accessible typography and colors

**Offline Sync:** Offline synchronization service allows users to continue using the app without internet connection, syncing data when connection is restored

### Development

The app uses Reactotron for debugging in development mode. Environment variables should be configured in a `.env` file at the project root.

### License

This project is licensed under the terms specified in the `LICENSE` file.

### Support

For support, contact through the "Talk to Us" feature within the app or open an issue in the repository.

---

## 🇧🇷 Português

## 📱 Sobre o Projeto

O DailyIU é um aplicativo móvel que oferece uma plataforma completa para usuários gerenciarem seu bem-estar diário, incluindo funcionalidades de diário pessoal, treinos e exercícios, além de uma área de conteúdo educacional e interativa.

### Principais Funcionalidades

- **📅 Diário**: Registro e acompanhamento de atividades diárias
- **💪 Exercícios**: Catálogo de exercícios, treinos personalizados e planos de treino
- **📚 Conteúdos**: Feed de conteúdo educacional com sistema de likes, comentários e salvamento
- **👤 Autenticação**: Sistema completo de login, registro e recuperação de senha
- **🎯 Onboarding**: Fluxo inicial personalizado para novos usuários
- **⚙️ Configurações**: Gerenciamento de perfil, preferências de acessibilidade e notificações

## 🛠️ Tecnologias Utilizadas

### Principais

- **React Native** 0.79.3
- **React** 19.0.0
- **TypeScript** 5.0.4
- **React Navigation** 7.x
- **React Query (TanStack Query)** 5.x
- **Styled Components** 6.x
- **React Hook Form** 7.x
- **Zod** 3.x (validação)

### Armazenamento

- **MMKV** (armazenamento local rápido)
- **AsyncStorage** (armazenamento assíncrono)

### Outras Bibliotecas

- **Axios** (cliente HTTP)
- **Moment.js** (manipulação de datas)
- **React Native Reanimated** (animações)
- **React Native Gesture Handler** (gestos)
- **React Native Video** (reprodução de vídeo)
- **React Native Image Picker** (seleção de imagens)
- **Phosphor React Native** (ícones)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18
- **Yarn**
- **React Native CLI**
- Para **iOS**: Xcode, CocoaPods
- Para **Android**: Android Studio, JDK

> **Nota**: Siga o guia oficial de [Configuração do Ambiente React Native](https://reactnative.dev/docs/set-up-your-environment) para mais detalhes.

## 🚀 Instalação

1. **Clone o repositório**:

```bash
git clone <url-do-repositorio>
cd tcc-tads-mobile
```

2. **Instale as dependências**:

```bash
yarn install
```

3. **Instale as dependências nativas (iOS)**:

```bash
# Primeira vez ou após atualizar dependências nativas
bundle install
bundle exec pod install --project-directory=ios
```

4. **Configure variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (consulte `.env.example` se disponível).

## 🏃 Executando o Projeto

### Metro Bundler

Inicie o servidor Metro (JavaScript bundler):

```bash
yarn start
```

### Android

```bash
yarn android
```

### iOS

```bash
yarn ios
```

## 📁 Estrutura do Projeto

```
src/
├── assets/           # Recursos estáticos (fontes, imagens, ilustrações)
├── components/       # Componentes reutilizáveis
├── contexts/         # Contextos React (Auth, Diary, Exercise, Content, etc.)
├── hooks/            # Custom hooks
├── modules/          # Módulos de funcionalidades
│   ├── auth/         # Autenticação
│   ├── config/       # Configurações
│   ├── content/      # Sistema de conteúdos
│   ├── core/         # Componentes core (Home)
│   ├── diary/        # Diário
│   ├── exercises/    # Exercícios e treinos
│   └── onboarding/   # Fluxo de onboarding
├── navigation/       # Configuração de navegação
├── services/         # Serviços (API, sincronização offline)
├── storage/          # Gerenciamento de armazenamento local
├── theme/            # Sistema de temas e estilos
├── types/            # Definições de tipos TypeScript
└── utils/            # Utilitários e helpers
```

## 🔧 Scripts Disponíveis

- `yarn start` - Inicia o Metro bundler
- `yarn android` - Executa o app no Android
- `yarn ios` - Executa o app no iOS
- `yarn test` - Executa os testes
- `yarn lint` - Executa o linter
- `yarn make:icon` - Gera o ícone do aplicativo

## 🧪 Testes

```bash
yarn test
```

## 🔐 Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente (arquivo `.env`):

```env
API_BASE_URL=sua-url-da-api
# Adicione outras variáveis conforme necessário
```

## 📱 Funcionalidades Principais

### Autenticação

- Login e registro de usuários
- Recuperação de senha
- Gerenciamento de sessão

### Diário

- Visualização em calendário
- Registro de atividades diárias
- Geração de relatórios

### Exercícios

- Listagem de exercícios disponíveis
- Criação e execução de treinos
- Planos de treino personalizados
- Avaliação e feedback de exercícios

### Conteúdos

- Feed de conteúdos
- Sistema de likes e comentários
- Salvamento de conteúdos favoritos
- Criação de conteúdos próprios
- Categorização

### Onboarding

- Questionário inicial
- Personalização da experiência do usuário

## 🎨 Temas e Acessibilidade

O aplicativo possui suporte completo a:

- Temas claro/escuro
- Configurações de acessibilidade
- Tipografia e cores acessíveis

## 🔄 Sincronização Offline

O aplicativo inclui um serviço de sincronização offline que permite que os usuários continuem utilizando o app mesmo sem conexão à internet, sincronizando dados quando a conexão for restabelecida.

## 🐛 Debugging

Em desenvolvimento, o app utiliza Reactotron para debugging:

```javascript
// Disponível apenas em modo desenvolvimento
if (__DEV__) {
  require('./ReactotronConfig');
}
```

## 📄 Licença

Este projeto está sob a licença especificada no arquivo `LICENSE`.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através da funcionalidade "Fale Conosco" dentro do aplicativo ou abra uma issue no repositório.

---

Desenvolvido com ❤️ usando React Native
