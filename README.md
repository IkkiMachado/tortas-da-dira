# Tortas da Dira — Confeitaria Artesanal Premium

Projeto desenvolvido rigorosamente com base no **Método Site Premium** (Metodologia Daniel Largueza / LRGZ).

---

## 🎯 Sobre o Projeto

Este site foi estruturado para o nicho de **Confeitaria Artesanal de Alta Linha / Encomendas de Tortas**, em **Porto Alegre - RS**, com foco em conversão direta para o WhatsApp, experiência visual apetitosa e facilidade de escolha para o cliente.

### 🌟 Pilares da Metodologia P.R.E.M.I.U.M. Aplicados:
1. **P**lanejamento:
   - Proposta de valor clara e afetiva: foco na tradição, no frescor dos ingredientes e no rendimento para festas familiares e comemorações.
   - Chamadas persuasivas focadas na dor de quem compra bolo (evitar bolos com pouco recheio, massas secas industriais ou atrasos na entrega).
2. **R**eferências:
   - Identidade visual acolhedora inspirada em *pâtisseries* e confeitarias finas: tons de Rose Confeitaria (`#B83354`), Cacau Nobre (`#2E1814`), Caramelo Dourado (`#C98A2C`) e fundo suave Marshmallow (`#FFFDFB`).
   - Tipografia de prestígio: combinação entre *Playfair Display* e *Plus Jakarta Sans*.
3. **E**strutura (Jornada de Conversão Completa):
   - **Topbar Informativa**: Aviso de Porto Alegre - RS, horários e WhatsApp.
   - **Hero Section**: Proposta de valor clara, produtos frescos e CTA duplo.
   - **Métricas de Autoridade**: 100% artesanal, 9 recheios nobres, produção fresca no dia e pontualidade garantida.
   - **Cardápio Oficial & Valores**: Abas interativas (Redondas, Retangulares e a clássica Marta Rocha gaúcha).
   - **Vitrine dos 9 Recheios Nobres**: Detalhamento apetitoso de cada recheio preparado na panela.
   - **Simulador Interativo de Encomenda**: O cliente escolhe tamanho, recheio, data e turno, obtendo o valor exato e um link direto para o WhatsApp pré-formatado.
   - **Calculadora Rápida de Convidados**: Ferramenta de apoio que recomenda a torta ideal conforme o número de convidados.
   - **Galeria de Fotos Reais**: Com filtro por categorias e modal Lightbox interativo com as 13 fotos reais de tortas produzidas pela Dira.
   - **Diferenciais Inegociáveis**: Nata fresca, recheios fartos de ponta a ponta e embalagem reforçada.
   - **Sobre a Dira**: História de carinho, tradição familiar e posicionamento de afeto.
   - **Como Encomendar**: Passo a passo simples em 3 etapas.
   - **FAQ Accordion**: Respostas claras sobre prazos (24h a 48h), tele-entrega/retirada, conservação e pagamentos.
   - **CTA Final & Rodapé Completo**: Links rápidos, dados institucionais e canal direto.
   - **Botão Flutuante do WhatsApp**: Animação de pulso e tooltip para conversão mobile.
4. **M**ontagem:
   - HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `dialog`, `footer`).
   - CSS3 moderno e modular com variáveis (`:root`), Grid, Flexbox e clamp() responsivo.
5. **I**mplementação:
   - JavaScript Vanilla puro (sem jQuery, sem bibliotecas pesadas), ultra rápido e leve.
6. **U**sabilidade:
   - 100% Responsivo (Mobile First), testado em smartphones, tablets e desktops.
7. **M**elhoria Contínua:
   - SEO local otimizado para Porto Alegre (meta tags, Open Graph, Rich Snippets semânticos).

---

## 📁 Estrutura de Arquivos

```
Tortas Dira/
│
├── index.html                  # Estrutura semântica e copywriting de alta conversão
├── css/
│   └── style.css               # Design System, variáveis CSS, layout e animações
├── js/
│   └── script.js               # Simulador de pedidos, calculadora, filtros e WhatsApp
├── img/                        # Imagens reais e organizadas do catálogo
│   ├── cardapio-oficial.jpg    # Cardápio original de referência
│   ├── marta-rocha.jpg         # Torta Marta Rocha autêntica com fios de ovos
│   ├── chocolate-morango.jpg   # Torta de chocolate com morangos frescos
│   ├── nata-morango.jpg        # Torta clássica de nata com morango
│   ├── nata-pessego.jpg        # Torta de nata com pêssego em calda
│   ├── frutas-vermelhas.jpg    # Torta com morangos e mirtilos
│   ├── torta-branca-crocante.jpg # Torta com rosetas e nozes crocantes
│   ├── rosetas-rosas.jpg       # Torta delicada com rosetas rosa pastel
│   ├── retangular-rosetas.jpg  # Torta retangular de festa
│   ├── tematica-gremio.jpg     # Torta temática do Grêmio FBPA
│   ├── tematica-inter.jpg      # Torta temática do S.C. Internacional
│   ├── infantil-unicornio.jpg  # Torta retangular unicórnio
│   ├── infantil-minnie.jpg     # Torta retangular Minnie Mouse
│   └── natalina-papainoel.jpg  # Torta comemorativa de Natal
└── README.md                   # Documentação e checklist de publicação
```

---

## ⚙️ Como Personalizar Dados Futuros

1. **Número de WhatsApp**:
   - No arquivo `js/script.js`, as constantes estão centralizadas no topo:
     ```javascript
     const CONFIG = {
       whatsappNumber: "5551991147384",
       whatsappDisplay: "(51) 99114-7384",
       city: "Porto Alegre - RS",
       businessName: "Tortas da Dira"
     };
     ```
   - No `index.html`, todos os links `wa.me/5551991147384` já estão configurados com o número oficial.

2. **Ajuste de Preços / Cardápio**:
   - No arquivo `js/script.js`, o objeto `CAKE_DATA` contém todos os tamanhos, fatias e valores. Qualquer reajuste de preço é refletido automaticamente no simulador.
   - No arquivo `index.html`, basta atualizar os valores correspondentes nos cards da seção `#cardapio`.

3. **Cores da Marca**:
   - Abra `css/style.css` e edite os tokens na seção `:root`:
     - `--primary`: Cor de destaque (atual: Rose Confeitaria `#B83354`)
     - `--secondary`: Cor escura de elegância (atual: Cacau Nobre `#2E1814`)
     - `--accent`: Cor de detalhes (atual: Caramelo Dourado `#C98A2C`)

---

## 🚀 Checklist de Publicação (Módulo 8 do Curso LRGZ)

- [x] Estrutura semântica HTML5 completa
- [x] Fotos reais da Dira catalogadas e integradas
- [x] Simulador de Encomenda interativo funcionando com envio pro WhatsApp
- [x] Calculadora de fatias para convidados implementada
- [x] Cardápio detalhado com as 3 categorias e os 9 recheios
- [x] Galeria com filtros e modal Lightbox
- [x] FAQ Accordion responsivo e acessível
- [x] Botão flutuante do WhatsApp ativo
- [x] Telefone oficial `+55 (51) 99114-7384` e localização `Porto Alegre - RS` configurados
- [ ] Publicar no **GitHub Pages**, **Vercel** ou **Netlify** (basta subir a pasta `Tortas Dira`)
- [ ] Apontar domínio próprio (ex: `tortasdadira.com.br`)
- [ ] Cadastrar no **Google Meu Negócio** (perfil local em Porto Alegre)
