# FSC Task Manager

## ✨ Descrição

O **FSC Task Manager** é um aplicativo que permite criação, visualização, organização, edição e exclusão de tarefas pessoais, segmentando por turnos (manhã, tarde, noite) e status (não iniciada, em andamento, concluída). Todas as operações têm feedback visual, proporcionando uma gestão prática do fluxo de trabalho diário.

## 🚀 Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM 7](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/) + PostCSS + Autoprefixer
- [Sonner](https://sonner.emilkowal.ski/) (notificações)
- [uuid](https://www.npmjs.com/package/uuid)
- [Axios](https://axios-http.com/)
- [json-server](https://github.com/typicode/json-server) (API fake)
- ESLint + Prettier
- Husky + lint-staged + git-commit-msg-linter (CI local)

## ⚙️ Requisitos

- Node.js >= 18.x
- npm >= 9.x
- Sistema operacional Linux, MacOS ou Windows (recomendado ambiente UNIX)

## 🛠️ Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <REPO_URL>
   cd fsc-task-manager
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configuração do ambiente:**
   Nenhuma configuração avançada é requerida. O banco de dados fake utiliza `db.json` na raiz.
4. **Rodar o servidor JSON (API REST fake):**
   ```bash
   npx json-server --watch db.json --port 3001
   ```
5. **Iniciar o ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
6. **Acesse via navegador:**
   - App: http://localhost:5173
   - API: http://localhost:3001/tasks

## 📁 Estrutura de Pastas

```
fsc-task-manager/
├── public/            # Arquivos estáticos
├── src/
│   ├── assets/        # Ícones SVG e fontes (Poppins)
│   ├── components/    # Componentes reutilizáveis (UI, sidebar, header, etc)
│   ├── hooks/         # Hooks customizados para integração de dados (React Query, API, etc)
│   ├── keys/          # Chaves para cache e mutations do React Query
│   ├── pages/         # Páginas principais: Home, Minhas tarefas, Detalhes da tarefa
│   ├── styles/        # Estilos globais e específicos (Tailwind, CSS)
│   └── main.jsx       # Ponto de entrada da aplicação React
├── db.json            # Banco de dados fake (json-server)
├── package.json       # Dependências e scripts
├── tailwind.config.js # Configuração Tailwind
├── README.md          # ( Este arquivo )
```

## 🔑 Principais Funcionalidades

- Cadastro, edição e exclusão de tarefas com validação em tempo real
- Organização e separação de tarefas por período do dia (manhã, tarde, noite)
- Dashboard com cards de resumo (totais, em progresso, concluídas, etc)
- Listagem interativa e responsiva das tarefas (componentização reutilizável)
- Notificações instantâneas de sucesso e erro
- Interface moderna, responsiva e com tipografia Poppins
- Simulação de armazenamento remoto (API fake com json-server)

## 🧑‍💻 Boas Práticas Adotadas

- Padrão de componentização React para reuso e manutenibilidade
- ESLint e Prettier configurados para padronização e qualidade do código
- Uso de hooks customizados para centralização das lógicas
- Tailwind CSS para estilos utilitários e design system rápido
- Controle de estado assíncrono com React Query
- Feedback visual para interações do usuário
- Commits validados automaticamente (lint-staged, husky)

## 🗺️ Roadmap (Sugestões Futuras)

- Autenticação de usuários
- Sincronização de tarefas com banco de dados real
- Filtros avançados e busca por tarefas
- Análises e gráficos de produtividade
- Dark mode
- Deploy em produção (Vercel, Netlify, etc)

## 📃 Licença

Distribuído sob a licença MIT. Consulte o arquivo LICENSE (caso aplicação pública).

---

**Autor:** João Vitor de Sousa – Projeto desenvolvido durante Full Stack Club.
react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<!--
Prompt Futuro:
Escreva um README.md simples para esse projeto contendo informações técnicas de bibliotecas utilizadas, padrões de projeto e instruções de setup e configuração do projeto conforme as bibliotecas utilizadas. Mantenha o README simples contendo apenas as informações mais importantes. Lembre de mencionar que o nome desse projeto é Full Stack Club e foi desenvolvido durante o curso de React. -->
