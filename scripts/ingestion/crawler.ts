import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const PDF_DIR = path.join(ROOT_DIR, 'tmp', 'pdfs');

// Agente HTTPS permissivo para contornar problemas de TLS/certificados em portais governamentais legados
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ciphers: 'DEFAULT@SECLEVEL=1',
  keepAlive: true
});

const httpClient = axios.create({
  httpsAgent,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  timeout: 30000
});

export interface ExamDownloadResult {
  examId: string;
  examName: string;
  source: string;
  year: number;
  edition: string;
  cadernoPdfPath: string;
  gabaritoPdfPath?: string;
  cadernoUrl: string;
  gabaritoUrl?: string;
}

export interface DiscoveredExamPdf {
  title: string;
  url: string;
  isGabarito: boolean;
  isCaderno: boolean;
  edition?: string;
}

/**
 * Garante que a pasta tmp/pdfs/ exista
 */
export function ensurePdfDirectory(): string {
  if (!fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR, { recursive: true });
  }
  return PDF_DIR;
}

/**
 * Faz download de uma URL de PDF e grava no disco de forma limpa
 */
export async function downloadPdfFile(url: string, destinationFilename: string): Promise<string> {
  ensurePdfDirectory();
  const filePath = path.join(PDF_DIR, destinationFilename);

  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 10000) {
    const fileSizeMb = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
    console.log(`[Crawler] ⚡ Arquivo já existente em cache local: ${destinationFilename} (${fileSizeMb} MB)`);
    return filePath;
  }

  console.log(`[Crawler] Baixando: ${url}`);
  console.log(`[Crawler] Destino: ${filePath}`);

  const response = await httpClient.get(url, {
    responseType: 'arraybuffer'
  });

  fs.writeFileSync(filePath, Buffer.from(response.data));
  const fileSizeMb = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
  console.log(`[Crawler] Download concluído: ${destinationFilename} (${fileSizeMb} MB)`);

  return filePath;
}

/**
 * Scraper especializado no repositório oficial de provas do INEP (Revalida)
 */
export async function crawlInepRevalida(year: number = 2024, requestedEdition?: string): Promise<ExamDownloadResult> {
  ensurePdfDirectory();

  const baseUrl = `https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/revalida/provas-e-gabaritos/${year}`;
  console.log(`[Crawler] Varrendo repositório público do INEP: ${baseUrl}`);

  const response = await httpClient.get(baseUrl);
  const $ = cheerio.load(response.data);

  const pdfLinks: DiscoveredExamPdf[] = [];

  $('a').each((_, element) => {
    const href = $(element).attr('href') || '';
    const text = $(element).text().trim();
    const parentText = $(element).parent().text().trim();

    if (href.toLowerCase().endsWith('.pdf')) {
      const fullUrl = href.startsWith('http') ? href : `https://download.inep.gov.br/${href.replace(/^\//, '')}`;
      const combinedDesc = `${text} ${href}`.toLowerCase();
      const isCaderno = (href.toLowerCase().includes('pv_objetiva') || 
                         (text.toLowerCase().includes('prova') && text.toLowerCase().includes('objetiva'))) &&
                        !href.toLowerCase().includes('habilidades') &&
                        !href.toLowerCase().includes('discursiva');
      const isGabarito = (href.toLowerCase().includes('gb_objetiva') || 
                          text.toLowerCase().includes('gabarito')) &&
                         !href.toLowerCase().includes('discursiva');

      let edition = '1';
      if (combinedDesc.includes(`${year}_2`) || combinedDesc.includes(`${year}.2`) || combinedDesc.includes(`${year}-2`) || combinedDesc.includes('_2_pv_') || combinedDesc.includes('_2_gb_')) {
        edition = '2';
      } else if (combinedDesc.includes(`${year}_1`) || combinedDesc.includes(`${year}.1`) || combinedDesc.includes(`${year}-1`) || combinedDesc.includes('_1_pv_') || combinedDesc.includes('_1_gb_')) {
        edition = '1';
      }

      if (isCaderno || isGabarito) {
        pdfLinks.push({
          title: text || parentText,
          url: fullUrl,
          isCaderno,
          isGabarito,
          edition
        });
      }
    }
  });

  console.log(`[Crawler] Encontrados ${pdfLinks.length} links relevantes de PDF.`);

  // Seleciona a edição solicitada ou a mais recente
  const targetEdition = requestedEdition || (pdfLinks.some(l => l.edition === '2') ? '2' : '1');

  const cadernoLink = pdfLinks.find(l => l.isCaderno && l.edition === targetEdition) ||
                      pdfLinks.find(l => l.isCaderno);

  const gabaritoLink = pdfLinks.find(l => l.isGabarito && l.edition === targetEdition) ||
                       pdfLinks.find(l => l.isGabarito);

  if (!cadernoLink) {
    throw new Error(`[Crawler] Nenhum caderno de prova objetiva em PDF foi localizado em ${baseUrl}`);
  }

  const cleanCadernoName = `revalida-${year}-${targetEdition}-caderno.pdf`;
  const cadernoPath = await downloadPdfFile(cadernoLink.url, cleanCadernoName);

  let gabaritoPath: string | undefined;
  if (gabaritoLink) {
    const cleanGabaritoName = `revalida-${year}-${targetEdition}-gabarito.pdf`;
    gabaritoPath = await downloadPdfFile(gabaritoLink.url, cleanGabaritoName);
  }

  const result: ExamDownloadResult = {
    examId: `revalida-${year}-${targetEdition}`,
    examName: `Revalida INEP: ${year}.${targetEdition}`,
    source: `Revalida INEP ${year}.${targetEdition}`,
    year,
    edition: `${year}.${targetEdition}`,
    cadernoPdfPath: cadernoPath,
    gabaritoPdfPath: gabaritoPath,
    cadernoUrl: cadernoLink.url,
    gabaritoUrl: gabaritoLink?.url
  };

  return result;
}

/**
 * Função genérica para varrer qualquer página aberta de concurso/residência médica
 */
export async function crawlGenericOpenRepository(pageUrl: string, prefixName: string): Promise<ExamDownloadResult> {
  ensurePdfDirectory();
  console.log(`[Crawler] Processando fonte de dados: ${pageUrl}`);

  let cadernoUrl = '';
  let gabaritoUrl = '';

  // Caso 1: URLs diretas separadas por pipe (caderno|gabarito)
  if (pageUrl.includes('|')) {
    const parts = pageUrl.split('|').map(s => s.trim());
    cadernoUrl = parts[0];
    if (parts[1]) {
      gabaritoUrl = parts[1];
    }
  } else if (pageUrl.toLowerCase().endsWith('.pdf') || pageUrl.toLowerCase().includes('.pdf?')) {
    // Caso 2: URL direta para o PDF do caderno
    cadernoUrl = pageUrl;
  } else {
    // Caso 3: URL de página pública HTML contendo links
    const response = await httpClient.get(pageUrl);
    const $ = cheerio.load(response.data);

    const cadernos: Array<{ url: string; score: number; text: string }> = [];
    const gabaritos: Array<{ url: string; score: number; text: string }> = [];

    $('a').each((_, element) => {
      const href = $(element).attr('href') || '';
      const text = $(element).text().trim();
      const title = $(element).attr('title') || '';
      const combined = `${text} ${href} ${title}`.toLowerCase();

      if (href.toLowerCase().includes('.pdf')) {
        const fullUrl = href.startsWith('http') ? href : new URL(href, pageUrl).toString();

        const isDisallowed = combined.includes('edital') || combined.includes('matricula') ||
                             combined.includes('matrícula') || combined.includes('recurso') ||
                             combined.includes('convocado') || combined.includes('resultado') ||
                             combined.includes('inscricao') || combined.includes('inscrição') ||
                             combined.includes('retificacao') || combined.includes('retificação') ||
                             combined.includes('errata');

        if (combined.includes('gabarito')) {
          const score = (combined.includes('definitivo') ? 10 : 0) +
                        (combined.includes('acesso direto') || combined.includes('acesso-direto') || combined.includes('grupo-a') || combined.includes('grupo a') || combined.includes('areasbasicas') ? 5 : 0) -
                        (combined.includes('preliminar') ? 8 : 0);
          gabaritos.push({ url: fullUrl, score, text });
        } else if (!isDisallowed) {
          if (combined.includes('prova') || combined.includes('caderno') || combined.includes('quest') ||
              combined.includes('acesso direto') || combined.includes('acesso-direto') ||
              combined.includes('grupo a1') || combined.includes('grupo-a1') || combined.includes('tipo 1') ||
              combined.includes('tipo-1') || combined.includes('tipo 01')) {
            const score = (combined.includes('acesso direto') || combined.includes('acesso-direto') ? 15 : 0) +
                          (combined.includes('grupo a1') || combined.includes('grupo-a1') ? 10 : 0) +
                          (combined.includes('tipo 1') || combined.includes('tipo-1') || combined.includes('tipo 01') ? 8 : 0) +
                          (combined.includes('prova a') || combined.includes('prova_a') ? 5 : 1);
            cadernos.push({ url: fullUrl, score, text });
          }
        }
      }
    });

    cadernos.sort((a, b) => b.score - a.score);
    gabaritos.sort((a, b) => b.score - a.score);

    if (cadernos.length > 0) cadernoUrl = cadernos[0].url;
    if (gabaritos.length > 0) gabaritoUrl = gabaritos[0].url;
  }

  if (!cadernoUrl) {
    throw new Error(`[Crawler] Não foi possível localizar o PDF do caderno na página ${pageUrl}`);
  }

  console.log(`[Crawler] Caderno selecionado: ${cadernoUrl}`);
  if (gabaritoUrl) {
    console.log(`[Crawler] Gabarito definitivo selecionado: ${gabaritoUrl}`);
  }

  const cleanCadernoName = `${prefixName}-caderno.pdf`;
  const cadernoPath = await downloadPdfFile(cadernoUrl, cleanCadernoName);
  let gabaritoPath: string | undefined;
  if (gabaritoUrl) {
    const cleanGabaritoName = `${prefixName}-gabarito.pdf`;
    gabaritoPath = await downloadPdfFile(gabaritoUrl, cleanGabaritoName);
  }

  const yearMatch = prefixName.match(/\d{4}/);
  const examYear = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();

  return {
    examId: prefixName,
    examName: prefixName.toUpperCase(),
    source: prefixName,
    year: examYear,
    edition: '1',
    cadernoPdfPath: cadernoPath,
    gabaritoPdfPath: gabaritoPath,
    cadernoUrl,
    gabaritoUrl
  };
}
