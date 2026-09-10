import { PrismaClient } from '@prisma/client';
import { OSCE_MATRIX } from '../src/osceMatrix.js';

const prisma = new PrismaClient();

export async function seedOsceMatrix(client = prisma) {
  for (const area of OSCE_MATRIX) {
    const savedArea = await client.osceArea.upsert({ where: { slug: area.slug }, update: { name: area.name, order: area.order, active: area.active }, create: { name: area.name, slug: area.slug, order: area.order, active: area.active } });
    for (const theme of area.themes) {
      const savedTheme = await client.osceTheme.upsert({ where: { areaId_code: { areaId: savedArea.id, code: theme.code } }, update: { name: theme.name, order: theme.order, active: theme.active }, create: { areaId: savedArea.id, code: theme.code, name: theme.name, order: theme.order, active: theme.active } });
      const canonicalSlugs = theme.subthemes.map(subtheme => subtheme.slug);

      // Remove apenas entradas antigas sem estações vinculadas. Conteúdo já usado
      // permanece protegido, enquanto um banco ainda vazio converge para a matriz oficial.
      await client.osceSubtheme.deleteMany({
        where: {
          themeId: savedTheme.id,
          slug: { notIn: canonicalSlugs },
          stations: { none: {} }
        }
      });

      for (const subtheme of theme.subthemes) {
        await client.osceSubtheme.upsert({ where: { themeId_slug: { themeId: savedTheme.id, slug: subtheme.slug } }, update: { name: subtheme.name, order: subtheme.order, active: subtheme.active }, create: { themeId: savedTheme.id, name: subtheme.name, slug: subtheme.slug, order: subtheme.order, active: subtheme.active } });
      }
    }
  }
}

if (process.env.NODE_ENV !== 'test') seedOsceMatrix().finally(() => prisma.$disconnect());
