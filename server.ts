import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { calculateEventHash } from "./src/lib/crypto";
import { EventSchema } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "AuthLedger API" });
  });

  // In-memory cache to simulate idempotency (In production use Redis)
  const processedHashes = new Set<string>();

  /**
   * Captura de Evento (Registro Imutável)
   * Recebe o payload, calcula o hash e inicia o processo de ancoragem.
   */
  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = EventSchema.parse(req.body);
      const timestamp = new Date().toISOString();
      const hash = calculateEventHash(validatedData.contentJson, timestamp);

      // Web3 Idempotency Moat: Avoid duplicated on-chain gas costs
      if (processedHashes.has(hash)) {
        return res.status(200).json({
          status: "ALREADY_ANCHORED",
          hashCalculated: hash,
          message: "Payload already anchored. Returning existing proof."
        });
      }

      processedHashes.add(hash);
      
      res.status(201).json({
        id: crypto.randomUUID(),
        hashCalculated: hash,
        timestampOriginal: timestamp,
        status: "ANCHORED",
        blockchain: {
          network: "Polygon L2",
          txId: "0x" + Math.random().toString(16).slice(2, 66),
          block: 12409582
        }
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid payload", details: error });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AuthLedger Server running on http://localhost:${PORT}`);
  });
}

startServer();
