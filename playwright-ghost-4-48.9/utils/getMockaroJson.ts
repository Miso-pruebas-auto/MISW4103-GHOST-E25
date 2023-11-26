import fs from 'fs';
import path from 'path';

export async function getMockaroJson(nameFile: string): Promise<any> {
  try {
    const route = await path.resolve(__dirname, `./data/${nameFile}`);
    const contenidoJSON = await fs.readFileSync(route, 'utf-8');
    return await JSON.parse(contenidoJSON);
  } catch (error) {
    console.error('Error al leer o parsear el archivo JSON:', error.message);
  }
}
