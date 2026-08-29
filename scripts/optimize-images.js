#!/usr/bin/env node
/**
 * Optimizador de imágenes de productos (batch).
 *
 * Recorre una carpeta de entrada organizada en subcarpetas por producto y
 * genera dos versiones WebP de cada imagen:
 *   - GRANDE (detalle): máximo 1200px de ancho, calidad 80
 *   - THUMB  (grilla):  máximo 400px de ancho, calidad 75 -> subcarpeta thumbs/
 *
 * Uso:
 *   node scripts/optimize-images.js [carpetaEntrada] [carpetaSalida] [--dry-run]
 *
 * Por defecto:
 *   entrada -> /tmp/imagenes-raw   (en Windows, <TEMP>\imagenes-raw)
 *   salida  -> public/imagenes/productos
 *
 * También se puede configurar con las variables de entorno
 * IMAGENES_RAW_DIR e IMAGENES_OUT_DIR.
 */

import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const EXTENSIONES_VALIDAS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const VARIANTES = [
  { nombre: 'grande', ancho: 1200, calidad: 80, subcarpeta: '' },
  { nombre: 'thumb', ancho: 400, calidad: 75, subcarpeta: 'thumbs' },
];

// Cuántas imágenes se procesan en paralelo.
const CONCURRENCIA = 4;

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const posicionales = args.filter((a) => !a.startsWith('--'));

const ENTRADA_DEFAULT =
  process.platform === 'win32'
    ? path.join(os.tmpdir(), 'imagenes-raw')
    : '/tmp/imagenes-raw';

const INPUT_DIR = path.resolve(
  posicionales[0] || process.env.IMAGENES_RAW_DIR || ENTRADA_DEFAULT,
);
const OUTPUT_DIR = path.resolve(
  posicionales[1] ||
    process.env.IMAGENES_OUT_DIR ||
    path.join(PROJECT_ROOT, 'public', 'imagenes', 'productos'),
);

/** Convierte "Verde Xingú 60x120" en "verde-xingu-60x120". */
function slugify(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function esImagen(nombreArchivo) {
  return EXTENSIONES_VALIDAS.has(path.extname(nombreArchivo).toLowerCase());
}

function formatearBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const unidades = ['KB', 'MB', 'GB'];
  let valor = bytes / 1024;
  let i = 0;
  while (valor >= 1024 && i < unidades.length - 1) {
    valor /= 1024;
    i += 1;
  }
  return `${valor.toFixed(2)} ${unidades[i]}`;
}

/**
 * Recorre recursivamente la carpeta de entrada y devuelve un "producto" por
 * cada subcarpeta que contenga imágenes directamente. Soporta tanto una
 * estructura plana (raw/producto/) como anidada (raw/marca/producto/).
 */
async function buscarProductos(dir, relativo = '') {
  let entradas;
  try {
    entradas = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    console.warn(`  ! No se pudo leer ${dir}: ${error.message}`);
    return [];
  }

  const imagenes = entradas
    .filter((e) => e.isFile() && esImagen(e.name))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));

  const productos = [];

  if (relativo && imagenes.length > 0) {
    productos.push({
      nombre: relativo,
      slug: slugify(path.basename(relativo)),
      dirEntrada: dir,
      dirSalida: path.join(OUTPUT_DIR, ...relativo.split(path.sep).map(slugify)),
      imagenes,
    });
  } else if (!relativo && imagenes.length > 0) {
    console.warn(
      `  ! ${imagenes.length} imagen(es) sueltas en la raíz de entrada: se ignoran ` +
        '(cada imagen tiene que estar dentro de una subcarpeta por producto).',
    );
  }

  for (const entrada of entradas.filter((e) => e.isDirectory())) {
    productos.push(
      ...(await buscarProductos(
        path.join(dir, entrada.name),
        path.join(relativo, entrada.name),
      )),
    );
  }

  return productos;
}

/** Genera las dos variantes de una imagen. */
async function procesarImagen({ rutaEntrada, dirSalida, slug, indice, padding }) {
  const { size: pesoOriginal } = await fs.stat(rutaEntrada);
  const nombreSalida = `${slug}-${String(indice).padStart(padding, '0')}.webp`;
  const { width: anchoOriginal } = await sharp(rutaEntrada).metadata();

  let pesoGenerado = 0;
  const salidas = [];

  for (const variante of VARIANTES) {
    const destinoDir = variante.subcarpeta
      ? path.join(dirSalida, variante.subcarpeta)
      : dirSalida;
    const destino = path.join(destinoDir, nombreSalida);

    if (DRY_RUN) {
      salidas.push({ variante: variante.nombre, bytes: 0 });
      continue;
    }

    await fs.mkdir(destinoDir, { recursive: true });

    // withoutEnlargement: si ya es más chica que el máximo no la agranda,
    // solamente la convierte a WebP.
    const { size } = await sharp(rutaEntrada)
      .rotate()
      .resize({ width: variante.ancho, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: variante.calidad })
      .toFile(destino);

    pesoGenerado += size;
    salidas.push({ variante: variante.nombre, bytes: size });
  }

  return {
    nombreSalida,
    pesoOriginal,
    pesoGenerado,
    salidas,
    seRedimensiona: (anchoOriginal ?? 0) > VARIANTES[0].ancho,
  };
}

/** Corre tareas con un límite de concurrencia, conservando el orden. */
async function enLotes(items, limite, tarea) {
  const resultados = new Array(items.length);
  let siguiente = 0;

  const workers = Array.from(
    { length: Math.min(limite, items.length) },
    async () => {
      while (siguiente < items.length) {
        const i = siguiente++;
        resultados[i] = await tarea(items[i], i);
      }
    },
  );

  await Promise.all(workers);
  return resultados;
}

async function main() {
  console.log('\nOptimizador de imágenes de productos');
  console.log('====================================');
  console.log(`Entrada: ${INPUT_DIR}`);
  console.log(`Salida:  ${OUTPUT_DIR}`);
  if (DRY_RUN) console.log('Modo:    DRY RUN (no escribe archivos)');
  console.log('');

  try {
    const stat = await fs.stat(INPUT_DIR);
    if (!stat.isDirectory()) throw new Error('no es una carpeta');
  } catch {
    console.error(`ERROR: no existe la carpeta de entrada "${INPUT_DIR}".`);
    console.error(
      'Pasala como primer argumento: node scripts/optimize-images.js <carpeta>',
    );
    process.exitCode = 1;
    return;
  }

  const productos = await buscarProductos(INPUT_DIR);

  if (productos.length === 0) {
    console.warn('No se encontró ninguna subcarpeta con imágenes. Nada que hacer.');
    return;
  }

  let totalImagenes = 0;
  let pesoOriginalTotal = 0;
  let pesoOptimizadoTotal = 0;
  let pesoGrandesTotal = 0;
  let pesoThumbsTotal = 0;
  const fallidas = [];

  for (const producto of productos) {
    console.log(`- ${producto.nombre}  (${producto.imagenes.length} imágenes)`);
    const padding = Math.max(2, String(producto.imagenes.length).length);

    const resultados = await enLotes(
      producto.imagenes,
      CONCURRENCIA,
      async (archivo, i) => {
        const rutaEntrada = path.join(producto.dirEntrada, archivo);
        try {
          return await procesarImagen({
            rutaEntrada,
            dirSalida: producto.dirSalida,
            slug: producto.slug,
            indice: i + 1,
            padding,
          });
        } catch (error) {
          fallidas.push({ ruta: rutaEntrada, motivo: error.message });
          console.warn(`    x ${archivo}: ${error.message}`);
          return null;
        }
      },
    );

    for (const resultado of resultados) {
      if (!resultado) continue;
      totalImagenes += 1;
      pesoOriginalTotal += resultado.pesoOriginal;
      pesoOptimizadoTotal += resultado.pesoGenerado;
      for (const salida of resultado.salidas) {
        if (salida.variante === 'thumb') pesoThumbsTotal += salida.bytes;
        else pesoGrandesTotal += salida.bytes;
      }
      const nota = resultado.seRedimensiona ? '' : ' (ya era chica, solo WebP)';
      console.log(
        `    ${resultado.nombreSalida}  ${formatearBytes(resultado.pesoOriginal)} -> ` +
          `${formatearBytes(resultado.pesoGenerado)}${nota}`,
      );
    }
  }

  const ahorro = pesoOriginalTotal - pesoOptimizadoTotal;
  const porcentaje = pesoOriginalTotal > 0 ? (ahorro / pesoOriginalTotal) * 100 : 0;

  console.log('\n====================================');
  console.log('RESUMEN');
  console.log('====================================');
  console.log(`Productos procesados: ${productos.length}`);
  console.log(
    `Imágenes procesadas:  ${totalImagenes}  (${totalImagenes * 2} archivos generados)`,
  );
  console.log(`Peso total original:  ${formatearBytes(pesoOriginalTotal)}`);
  console.log(
    `Peso total optimizado: ${formatearBytes(pesoOptimizadoTotal)}  ` +
      `(grandes ${formatearBytes(pesoGrandesTotal)} + thumbs ${formatearBytes(pesoThumbsTotal)})`,
  );
  console.log(
    `Ahorro:               ${formatearBytes(ahorro)}  (${porcentaje.toFixed(1)}%)`,
  );
  if (fallidas.length > 0) {
    console.log(`Fallidas:             ${fallidas.length}`);
    for (const f of fallidas) console.log(`  x ${f.ruta}: ${f.motivo}`);
  }
  console.log('');
}

main().catch((error) => {
  console.error('\nERROR inesperado:', error);
  process.exitCode = 1;
});
