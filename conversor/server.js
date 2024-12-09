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
            console.log('Cuerpo recibido:', body);

            try {
                const newConversion = JSON.parse(body); // Parsear el cuerpo como JSON
                console.log('Datos parseados:', newConversion);

                // Validar los datos recibidos
                if (!newConversion.valor || !newConversion.unidad1 || !newConversion.unidad2 || newConversion.resultado === undefined) {
                    throw new Error('Datos incompletos o inválidos');
                }

                // Sobrescribir el archivo con solo el nuevo objeto (un solo objeto dentro de un array)
                fs.writeFileSync(filePath, JSON.stringify([newConversion], null, 2), 'utf8'); // Guardar solo un objeto dentro de un array
                console.log('Archivo sobrescrito con la nueva conversión');

                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Conversión guardada y datos anteriores eliminados' }));
            } catch (error) {
                console.error('Error al procesar los datos:', error.message);
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Error al guardar los datos', error: error.message }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/obtener') {
        try {
            let data = fs.readFileSync(filePath, 'utf8'); // lee el archivo
            console.log('Datos leídos del archivo para GET:', data); // muestra los datos

            if (!data) {
                data = []; //muestra un array vacio si no nada en datos.json
            } else {
                data = JSON.parse(data); //muestra los datos 
            }

            // llamar al ultimo dato
            const lastData = data[data.length - 1] || {}; // si no hay devuelve vacio

            res.writeHead(200);
            res.end(JSON.stringify(lastData)); // envia en formato json
        } catch (error) {
            console.error('Error al leer el archivo para obtener:', error.message);
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
