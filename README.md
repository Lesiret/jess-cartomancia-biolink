# 🌺 Jess Cartomancia — Bio Link & Agendamento Interativo

> Aplicação web moderna, responsiva e de alta performance desenvolvida para centralização de links, apresentação de catálogo de serviços esotéricos e fluxo completo de agendamento e aplicação para **Jess Cartomancia**.

---

## ✨ Demonstração & Visão Geral

O projeto combina uma estética visual sofisticada com arquitetura frontend moderna:
- **Identidade Visual:** Inspirada na delicadeza floral do hibisco, com tons de rosa empoeirado (`#C082A0`, `#FAF0F5`), sombras suaves e tipografia clássica (*Playfair Display*, *Cinzel* e *Cormorant Garamond*).
- **Mobile-First:** Projetada prioritariamente para dispositivos móveis (Instagram, TikTok, WhatsApp), garantindo toque fluido, botões acessíveis e navegação intuitiva.
- **Fluxo de Conversão Humanizado:** Todo agendamento e aplicação gera automaticamente uma mensagem estruturada e elegante para confirmação via WhatsApp.

---

## 🚀 Principais Funcionalidades

### 1. 🌿 Bio Link Central
- Perfil com foto, selo de autenticidade e bio formatada.
- Links rápidos com feedback tátil para Redes Sociais, WhatsApp, Loja Shopee e E-books.
- Modal dedicado para pagamentos e doações via **Pix com Chave Copia e Cola**.

### 2. 🔮 Central de Agendamento Interativa
- **Consultas de Tarot & Baralho Cigano:**
  - Consulta Amorosa (Templo de Afrodite, Peladan, etc.)
  - Consulta Financeira & Profissional
  - Autoconhecimento & Caminhos Espirituais
  - Mesa Real & Panorama Mensal
  - Perguntas Objetivas
  - Avaliação de Magia
- **Rituais & Feitiços:**
  - Catálogo categorizado com fotos reais dos altares montados (Amor, Prosperidade, Proteção, Limpeza).
  - Informações detalhadas sobre valores, materiais inclusos e envio de foto/vídeo do ritual.
- **Mentoria Individual de Bruxaria:**
  - Apresentação completa dos 8 encontros, formato exclusivo e lista seleta de aplicação.
  - Formulário com wizard multi-etapas e perguntas de alinhamento prático.
- **E-books & Materiais Digitais:**
  - Espaço preparado para produtos e materiais de estudo.

### 3. 💳 Checkout Pix Transparente
- Geração instantânea de payload Pix com valor dinâmico.
- Copiar código Pix em 1 clique com notificação toast de confirmação.
- Direcionamento claro para envio de comprovante no WhatsApp.

---

## ⚡ Otimizações de Performance

Para garantir carregamento quase instantâneo mesmo em conexões móveis (3G/4G):

- **Code Splitting & Lazy Loading:**
  - O bundle inicial foi reduzido de **~785 kB para apenas ~23 kB** (uma redução de **~97%**).
  - O fluxo de agendamento e todos os 8 formulários são carregados sob demanda através de `React.lazy` e `Suspense`.
- **Pre-fetching Inteligente:**
  - Os módulos de agendamento e Pix são pré-carregados silenciosamente em background durante o tempo ocioso do navegador ou quando o usuário passa o mouse/dedo sobre o botão.
- **Vendor Chunking:**
  - Configuração do Vite com divisão inteligente de chunks (`vendor-react`, `vendor-motion`, `vendor-icons`), aproveitando ao máximo o cache do navegador.
- **Carregamento Otimizado de Mídia:**
  - Componente `SmartImage` com `loading="lazy"`, `decoding="async"` e efeito shimmer enquanto as imagens dos altares são renderizadas.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** — Biblioteca para interfaces reativas baseada em componentes funcionais e hooks.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática rigorosa para confiabilidade e manutenção do código.
- **[Vite 8](https://vite.dev/)** — Ferramenta de build de última geração com inicialização instantânea e bundling otimizado.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Framework CSS utilitário para design refinado e responsivo.
- **[Lucide React](https://lucide.dev/)** — Ícones SVG elegantes e consistentes.
- **[Motion](https://motion.dev/)** — Animações e micro-interações fluidas.

---

## 📁 Estrutura do Projeto

```text
├── src/
│   ├── assets/              # Imagens dos altares, rituais e avatares
│   ├── components/          # Componentes modulares reutilizáveis
│   │   ├── Consulta*.tsx    # Formulários específicos de cada tipo de consulta
│   │   ├── Mentoria*.tsx    # Formulário multi-etapas de mentoria
│   │   ├── PixModal.tsx     # Modal de pagamento e chave Pix com cópia
│   │   ├── ScheduleNavFlow  # Fluxo completo de navegação e catálogo
│   │   ├── SmartImage.tsx   # Imagens com lazy-loading e shimmer placeholder
│   │   └── Icons.tsx        # Ícones SVG personalizados
│   ├── data/                # Dados padrão, links, rituais e temas
│   ├── types.ts             # Definições de tipos TypeScript do sistema
│   ├── App.tsx              # Componente raiz da landing page
│   ├── main.tsx             # Ponto de entrada React DOM
│   └── index.css            # Estilos globais e fontes
├── index.html               # Entrypoint HTML com meta tags e pré-conexão de fontes
├── package.json             # Dependências e scripts do projeto
├── tsconfig.json            # Configurações do compilador TypeScript
└── vite.config.ts           # Configurações de build e divisão de chunks
```

---

## 💻 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- Gerenciador de pacotes **npm**, **pnpm** ou **yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/jess-cartomancia-biolink.git
   cd jess-cartomancia-biolink
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

4. **Gerar a versão de produção (Build otimizado):**
   ```bash
   npm run build
   ```

5. **Visualizar a build de produção:**
   ```bash
   npm run preview
   ```

---

## 📸 Como Trocar a Foto de Perfil

Trocar a foto da Jess é super simples. Você pode fazer de duas maneiras:

### Opção 1 (A mais fácil — sem mexer em código):
1. Escolha a sua foto no computador (formato `.jpg` ou `.png`).
2. Renomeie o arquivo para:
   `cartomancer_avatar_1790349939670.jpg`
3. Cole e substitua o arquivo existente dentro da pasta:
   `src/assets/images/`
4. Pronto! O site atualizará a foto automaticamente.

### Opção 2 (Com qualquer nome de arquivo):
1. Coloque a sua imagem dentro de `src/assets/images/` (por exemplo: `minha-foto.jpg`).
2. Abra o arquivo `src/data/defaultData.ts`.
3. Na **linha 2**, altere o caminho da importação:
   ```ts
   import cartomancerAvatar from '../assets/images/minha-foto.jpg';
   ```
4. Salve o arquivo e a nova foto já estará ativa!

---

## ☁️ Como Hospedar na Vercel (1 Minuto)

O projeto já está 100% configurado para a **Vercel** com o arquivo `vercel.json` incluso:

1. Suba o projeto para o seu repositório no **GitHub**.
2. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
3. Clique em **"Add New..."** > **"Project"**.
4. Selecione o repositório `jess-cartomancia-biolink`.
5. A Vercel detectará automaticamente o framework **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Clique em **"Deploy"**.
7. Em menos de 30 segundos seu link estará no ar com HTTPS e CDN mundial gratuito!

---

## 📄 Licença

Este projeto foi desenvolvido para a marca **Jess Cartomancia**. Todos os direitos reservados.

