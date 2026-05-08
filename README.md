# AuthLedger: Registro Imutável de Eventos 🛡️

**AuthLedger** é uma solução de alta confiabilidade baseada em **Arquitetura Web3 Híbrida**, projetada para transformar logs e eventos corporativos em ativos digitais invioláveis e auditáveis de forma independente.

## 🏗️ Arquitetura: The Web3 Moat
O projeto utiliza o conceito de **"Fosso Defensivo" (Moat)**, onde a confiança não depende de uma autoridade central (como um DBA ou Administrador de Sistema), mas sim de garantias criptográficas matemáticas.

1.  **Captura (Off-chain):** Eventos são recebidos via API, validados e persistidos em um banco de dados de alto desempenho (**Supabase/PostgreSQL**).
2.  **Processamento:** Cada log gera um hash determinístico utilizando **SHA-256** combinando: `Payload JSON + ISO Timestamp + System Salt`.
3.  **Ancoragem (On-chain):** O hash resultante é enviado para a rede **Polygon (L2)**, servindo como uma "âncora de imutabilidade" de baixo custo e alta velocidade.
4.  **Auditoria (Zero-Trust):** Qualquer auditor pode confrontar o estado atual do banco de dados com a prova registrada na blockchain. Se um único bit for alterado no banco, a prova matemática falha.

## 🚀 Stack Tecnológica
-   **Frontend:** React 19, Tailwind CSS 4, Motion.
-   **Backend:** Node.js, Express (API Gateway).
-   **Database & Auth:** Supabase.
-   **Blockchain:** Polygon L2 (Ethers.js integration strategy).
-   **Criptografia:** Crypto-JS (SHA-256).

## 🛠️ Como Executar
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Configure as variáveis de ambiente no `.env` (baseado no `.env.example`):
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
4. Inicie o servidor de desenvolvimento: `npm run dev`.

## 📈 Roadmap Técnico
- [x] MVP: Registro e Verificação de Hashes únicos.
- [ ] Fase 2: Implementação de **Merkle Trees** para batching de 1000:1 (Redução de custo de Gás).
- [ ] Fase 3: Integração nativa com ERPs (SAP/Oracle) via Webhooks.
- [ ] Fase 4: Provas de Conhecimento Zero (ZKP) para auditoria de dados sensíveis sem exposição de PII.

---
*"Não peça confiança. Prove a integridade."*
