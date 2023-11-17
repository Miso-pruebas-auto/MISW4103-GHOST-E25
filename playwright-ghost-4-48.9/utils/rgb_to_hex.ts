export function rgbToHex(rgb: string): string {
    // Extraer los valores de R, G y B usando una expresión regular
    const match = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
  
    if (!match) {
      throw new Error('Formato de color RGB no válido');
    }
  
    // Obtener los valores de R, G y B
    const [, r, g, b] = match.map(Number);
  
    // Convertir a formato hexadecimal
    const hex = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  
    return hex;
  }
