import { PrismaClient } from '@prisma/client';

function hydrateStation(record) {
  if (!record) return null;
  return {
    ...record,
    area: record.subtheme?.theme?.area?.name || record.area,
    theme: record.subtheme?.theme?.name || record.theme,
    subtheme: record.subtheme?.name || record.subtheme,
    content: record.clinicalContentJson,
    timeLimitSeconds: Number(record.clinicalContentJson?.metadata?.estimatedMinutes || 10) * 60
  };
}

export class MemoryOsceRepository {
  constructor({ subthemes = [], stations = [] } = {}) { this.subthemes = subthemes; this.stations = stations; this.batches = []; this.sessions = []; }
  async listFingerprints() { return this.stations.map(item => item.fingerprint).filter(Boolean); }
  async findSubtheme(areaSlug, themeCode, subthemeSlug) { return this.subthemes.find(item => item.slug === subthemeSlug && item.themeCode === themeCode && item.areaSlug === areaSlug) || null; }
  async createStation(data) { const subtheme = this.subthemes.find(item => item.id === data.subthemeId); const station = { id: `station_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, status: 'DRAFT', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), area: subtheme?.areaName || data.clinicalContentJson?.metadata?.areaSlug, areaId: subtheme?.areaId, theme: subtheme?.themeName || data.clinicalContentJson?.metadata?.themeCode, themeId: subtheme?.themeId, subtheme: subtheme?.name || data.clinicalContentJson?.metadata?.subthemeSlug, ...data, content: data.clinicalContentJson, timeLimitSeconds: Number(data.clinicalContentJson?.metadata?.estimatedMinutes || 10) * 60 }; this.stations.push(station); return station; }
  async listStations(filters = {}) { return this.stations.filter(item => !filters.area || item.area === filters.area || item.areaId === filters.area).filter(item => !filters.theme || item.theme === filters.theme || item.themeId === filters.theme).filter(item => !filters.subtheme || item.subtheme === filters.subtheme || item.subthemeId === filters.subtheme).filter(item => !filters.format || item.format === filters.format); }
  async getStation(id) { return this.stations.find(item => item.id === id) || null; }
  async listVersions(station) { return this.stations.filter(item => station.externalId ? item.externalId === station.externalId : item.id === station.id).sort((a, b) => b.version - a.version); }
  async createImportBatch(data) { const batch = { id: `batch_${Date.now()}`, createdAt: new Date().toISOString(), ...data }; this.batches.push(batch); return batch; }
  async updateImportBatch(id, data) { const batch = this.batches.find(item => item.id === id); Object.assign(batch, data); return batch; }
  async createSessionRecord(data) { this.sessions.push({ ...data }); return data; }
  async updateSessionRecord(id, data) { const session = this.sessions.find(item => item.id === id); if (session) Object.assign(session, data); return session; }
  async listSessionHistory(clientUserKey) { return this.sessions.filter(item => item.clientUserKey === clientUserKey).sort((a, b) => String(b.startedAt).localeCompare(String(a.startedAt))); }
  async addEventRecord(data) { return data; }
}

export class PrismaOsceRepository {
  constructor(client = new PrismaClient()) { this.client = client; }
  async listFingerprints() { return (await this.client.osceStation.findMany({ select: { fingerprint: true } })).map(item => item.fingerprint); }
  async findSubtheme(areaSlug, themeCode, subthemeSlug) { return this.client.osceSubtheme.findFirst({ where: { slug: subthemeSlug, theme: { code: themeCode, area: { slug: areaSlug } } } }); }
  async createStation(data) { return this.client.osceStation.create({ data }); }
  async listStations(filters = {}) {
    const rows = await this.client.osceStation.findMany({ where: { format: filters.format || undefined, subthemeId: filters.subtheme || undefined, subtheme: { themeId: filters.theme || undefined, theme: { areaId: filters.area || undefined } } }, include: { subtheme: { include: { theme: { include: { area: true } } } } }, orderBy: { updatedAt: 'desc' } });
    return rows.map(hydrateStation);
  }
  async getStation(id) { return hydrateStation(await this.client.osceStation.findUnique({ where: { id }, include: { subtheme: { include: { theme: { include: { area: true } } } } } })); }
  async listVersions(station) { return this.client.osceStation.findMany({ where: station.externalId ? { externalId: station.externalId } : { id: station.id }, select: { id: true, externalId: true, title: true, version: true, status: true, schemaVersion: true, createdAt: true, updatedAt: true }, orderBy: { version: 'desc' } }); }
  async createImportBatch(data) { return this.client.osceImportBatch.create({ data }); }
  async updateImportBatch(id, data) { return this.client.osceImportBatch.update({ where: { id }, data }); }
  async createSessionRecord(data) { return this.client.osceSession.create({ data }); }
  async updateSessionRecord(id, data) { return this.client.osceSession.update({ where: { id }, data }); }
  async listSessionHistory(clientUserKey) { return this.client.osceSession.findMany({ where: { clientUserKey }, select: { id: true, stationId: true, mode: true, startedAt: true, finishedAt: true, summary: true, currentTaskIndex: true, finalRevealed: true, resultDeliveredAt: true, station: { select: { title: true, format: true, version: true } } }, orderBy: { startedAt: 'desc' } }); }
  async addEventRecord(data) { return this.client.osceEvent.create({ data }); }
}

export function createOsceRepository(options = {}) {
  return process.env.DATABASE_URL ? new PrismaOsceRepository() : new MemoryOsceRepository(options);
}
