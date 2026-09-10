import { stationContentSchema } from '../osce.js';

export function validateGeneratedStation(content) {
  return stationContentSchema.parse(content);
}

export async function generateStation() {
  throw new Error('Geração de estação OSCE será conectada à IA em uma etapa posterior.');
}
