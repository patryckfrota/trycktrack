import { createHash } from 'node:crypto';
import { normalizeImportPayload, splitImportedStation } from '../osceStation.schema.js';

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  return value;
}

export function stationFingerprint(station) {
  return createHash('sha256').update(JSON.stringify(stable(station))).digest('hex');
}

export function previewStationImport(payload, existingFingerprints = new Set()) {
  const stations = normalizeImportPayload(payload);
  const seen = new Set();
  const items = stations.map((station, index) => {
    const fingerprint = stationFingerprint(station);
    const duplicate = existingFingerprints.has(fingerprint) || seen.has(fingerprint);
    seen.add(fingerprint);
    return { index, externalId: station.externalId || null, title: station.metadata.title, areaSlug: station.metadata.areaSlug, themeCode: station.metadata.themeCode, subthemeSlug: station.metadata.subthemeSlug, format: station.metadata.format, version: station.metadata.version, fingerprint, duplicate };
  });
  return { valid: true, total: items.length, newCount: items.filter(item => !item.duplicate).length, duplicateCount: items.filter(item => item.duplicate).length, items, stations };
}

export async function importStations(payload, repository) {
  const existing = new Set(await repository.listFingerprints());
  const preview = previewStationImport(payload, existing);
  const imported = [];
  const batch = await repository.createImportBatch({ sourceName: null, totalItems: preview.total, importedItems: 0, duplicateItems: preview.duplicateCount });
  for (const item of preview.items) {
    if (item.duplicate) continue;
    const source = preview.stations[item.index];
    const subtheme = await repository.findSubtheme(source.metadata.areaSlug, source.metadata.themeCode, source.metadata.subthemeSlug);
    if (!subtheme) throw new Error(`Subtema não encontrado: ${source.metadata.areaSlug}/${source.metadata.themeCode}/${source.metadata.subthemeSlug}`);
    const split = splitImportedStation(source);
    imported.push(await repository.createStation({ subthemeId: subtheme.id, format: source.metadata.format, title: source.metadata.title, version: source.metadata.version, generationSource: 'CHATGPT_IMPORT', schemaVersion: source.schemaVersion, externalId: source.externalId || null, fingerprint: item.fingerprint, importBatchId: batch.id, clinicalContentJson: split.candidate, evaluatorContentJson: split.evaluator }));
  }
  await repository.updateImportBatch(batch.id, { importedItems: imported.length });
  return { batchId: batch.id, importedCount: imported.length, duplicateCount: preview.duplicateCount, imported };
}
