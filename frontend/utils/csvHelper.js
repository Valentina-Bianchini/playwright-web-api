// Helper para leer archivos CSV
const fs = require('fs');
const path = require('path');

/**
 * Lee un archivo CSV y lo convierte en un array de objetos
 * @param {string} filePath - Ruta al archivo CSV
 * @returns {Array<Object>} Array de objetos con los datos del CSV
 */
function readCSV(filePath) {
  // Leer el contenido del archivo CSV
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Dividir por líneas y filtrar líneas vacías
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  
  // La primera línea contiene los headers
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Convertir las líneas restantes en objetos
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    data.push(obj);
  }
  
  return data;
}

module.exports = { readCSV };
