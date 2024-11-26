 📒 Aplicativo de Anotações Simples
O Aplicativo de Anotações Simples é uma ferramenta prática para criar, gerenciar e organizar suas anotações de forma rápida e eficiente. Desenvolvido com React Native, ele oferece uma interface intuitiva e funcionalidades essenciais para o dia a dia.

 ✨ Funcionalidades
- Adicionar anotações: Escreva suas ideias, lembretes ou tarefas de forma rápida.
- Exibir data e hora: Cada anotação mostra o dia, mês, ano e hora em que foi criada.
- Editar anotações: Faça alterações em suas anotações existentes.
- Excluir anotações: Remova anotações individuais ou apague todas de uma vez.
- Modal de confirmação: Mensagens de confirmação antes de excluir anotações, evitando ações acidentais.
- Armazenamento local: Todas as anotações são salvas no dispositivo, utilizando o AsyncStorage.

 🛠️ Tecnologias Utilizadas
- React Native: Framework principal para o desenvolvimento do app.
- AsyncStorage: Armazenamento local para persistência de dados.
- Expo: Facilita o desenvolvimento e execução do aplicativo.
- FontAwesome: Ícones para melhorar a interface.

 🎨 Design
O design do aplicativo é simples e funcional, com destaque para as seguintes características:
- Cores: Azul para o cabeçalho e botões principais, proporcionando uma aparência moderna.
- Modal: Caixas de diálogo claras e organizadas para confirmar ações.
- Responsividade: Adaptado para diferentes tamanhos de tela.

 🚀 Como Usar
1. Adicionar uma anotação:
   - Digite sua nota no campo de texto na parte inferior do aplicativo.
   - Clique no botão com o ícone de envio para salvar.
2. Editar uma anotação:
   - Clique no botão de edição ao lado da anotação que deseja modificar.
   - Faça as alterações e clique em "Salvar".
3. Excluir uma anotação:
   - Clique no botão de lixeira ao lado da anotação e confirme a exclusão.
4. Excluir todas as anotações:
   - Clique no botão de lixeira no cabeçalho e confirme a exclusão de todas as notas.

 🖥️ Estrutura de Código
O aplicativo é organizado da seguinte forma:
- `App.js`: Contém a lógica principal do aplicativo, como estados, armazenamento e manipulação de anotações.
- `components/box.js`: Componente que representa cada anotação, exibindo texto e botões de edição/exclusão.

 📦 Instalação e Execução
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/repositorio-app-anotacoes.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd repositorio-app-anotacoes
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o projeto:
   ```bash
   npm start
   ```
5. Abra o aplicativo no simulador ou em um dispositivo físico usando o Expo Go.

 📋 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo como desejar.
