import { z } from 'zod';

export const EventSchema = z.object({
  organizationId: z.string().uuid(),
  systemId: z.string().uuid(),
  eventType: z.string().min(1),
  contentJson: z.record(z.string(), z.any()),
});

export type EventInput = z.infer<typeof EventSchema>;

export interface EventRecord extends EventInput {
  id: string;
  hashCalculado: string;
  timestampOriginal: string;
  statusAncoragem: 'PENDING' | 'ANCHORED' | 'FAILED';
}

export interface BlockchainProof {
  txHash: string;
  blockNumber: number;
  networkId: string;
  contractAddress: string;
  timestampBlockchain: string;
  eventHash: string;
}

export interface AuditRecord {
  id: string;
  eventoId: string;
  dataVerificacao: string;
  resultadoBooleano: boolean;
  detalhesErro?: string;
  usuarioAuditor: string;
}
