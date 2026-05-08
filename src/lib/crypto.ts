import CryptoJS from 'crypto-js';

export const SYSTEM_SALT = 'AUTHLEDGER_SECURE_SALT_v1';

/**
 * Calculates the hash of an event payload as per the PRD specification:
 * SHA256(Payload_JSON + Timestamp_ISO + Salt_do_Sistema)
 */
export function calculateEventHash(payload: any, timestamp: string): string {
  const payloadString = JSON.stringify(payload);
  const dataToHash = payloadString + timestamp + SYSTEM_SALT;
  return CryptoJS.SHA256(dataToHash).toString();
}
