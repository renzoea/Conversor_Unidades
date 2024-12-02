const fs = require('node:fs');
const http = require('http');
const path = require('path');

const PORT = 3001;
const filePath = path.join(__dirname, 'datos.json');

// Inicializamos el archivo con un arreglo vacío si no existe
if (!fs.existsSync(filePath)) {
    console.log('El archivo no existe, creando uno nuevo...');
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf8'); // Si el archivo no existe, inicializarlo con un array vacío
}

const requestListener = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=UTF-8'); // Establecer codificación UTF-8 en las respuestas

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/guardar') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Concatenar los datos
        });
    
        req.on('end', () => {
            console.log('Cuerpo recibido:', body); // Muestra el cuerpo recibido
    
            try {
                const newConversion = JSON.parse(body); // Intentamos parsear el cuerpo como JSON
                console.log('Datos parseados:', newConversion); // Muestra los datos parseados
    
                // Validar datos recibidos
                if (!newConversion.valor || !newConversion.unidad1 || !newConversion.unidad2 || newConversion.resultado === undefined) {
                    throw new Error('Datos incompletos o inválidos');
                }
    
                // Leer archivo y agregar la nueva conversión
                let data = [];
                try {
                    // Intentar leer el archivo
                    data = fs.readFileSync(filePath, 'utf8'); // Leer el archivo
                    console.log('Datos leídos del archivo:', data); // Muestra los datos leídos del archivo
    
                    if (data) {
                        data = JSON.parse(data); // Parsear el archivo si contiene datos
                        console.log('Datos después de parsear:', data); // Muestra los datos después de parsear
                    } else {
                        console.log('El archivo está vacío. Iniciando un array vacío');
                        data = []; // Si no hay datos, iniciar un array vacío
                    }
                } catch (error) {
                    console.error('Error al leer o parsear el archivo:', error.message);
                    data = []; // Si ocurre un error al leer el archivo, iniciar un array vacío
                }
    
                // Agregar la nueva conversión al arreglo de datos
                data.push(newConversion);
                console.log('Datos después de agregar la conversión:', data); // Muestra los datos con la nueva conversión
    
                // Sobrescribir el archivo con los nuevos datos
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                console.log('Archivo actualizado correctamente');
    
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Conversión guardada correctamente' }));
            } catch (error) {
                console.error('Error al procesar los datos:', error.message);
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Error al guardar los datos', error: error.message }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/obtener') {
        try {
            let data = fs.readFileSync(filePath, 'utf8'); // Leer el archivo
            console.log('Datos leídos del archivo para GET:', data); // Muestra los datos leídos en GET
    
            if (!data) {
                data = []; // Si el archivo está vacío, devolver un array vacío
            } else {
                data = JSON.parse(data); // Parsear si contiene datos
            }
    
            res.writeHead(200);
            res.end(JSON.stringify(data)); // Enviar los datos en formato JSON
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Error al leer el archivo', error: error.message }));
        }
    }
}

// Crear servidor
const server = http.createServer(requestListener);

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
