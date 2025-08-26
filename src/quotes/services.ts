import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { QuotePdfParams } from './quote.model';

export async function generatePdfQuote(params: QuotePdfParams): Promise<string> {
  const doc = new PDFDocument();
  const desktopPath = path.join(require('os').homedir(), 'Desktop');
  const fileName = `orcamento_${Date.now()}.pdf`;
  const filePath = path.join(desktopPath, fileName);
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Informações do estúdio
  doc.fontSize(18).text('Estúdio Tattua Tattoo', { align: 'center' });
  doc.moveDown();

  doc.fontSize(14).text('Orçamento de Tattoo', { align: 'center' });
  doc.moveDown(2);

  // Informações do orçamento
  doc.fontSize(12);
  doc.text(`Profissional: ${params.profissional} - Valor: ${params.valores.profissional}`);
  doc.text(`Nome do Cliente: ${params.client_name} - Valor: ${params.valores.client_name}`);
  doc.text(`Data: ${params.date} - Valor: ${params.valores.date}`);
  doc.text(`Tamanho: ${params.size} - Valor: ${params.valores.size}`);
  doc.text(`Dificuldade: ${params.difficulty} - Valor: ${params.valores.difficulty}`);
  doc.text(`Região do Corpo: ${params.body_location} - Valor: ${params.valores.body_location}`);
  doc.text(`Quantidade de Cores: ${params.colors_quantity} - Valor: ${params.valores.colors_quantity}`);
  doc.text(`Tipo de Agulha/Preenchimento: ${params.type_filling} - Valor: ${params.valores.type_filling}`);
  doc.text(`Duração: ${params.duration} - Valor: ${params.valores.duration}`);

  doc.end();

  // Aguarda o término da escrita do arquivo
  await new Promise<void>((resolve, reject) => {
    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });

  return filePath;
}
