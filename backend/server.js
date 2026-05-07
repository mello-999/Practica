const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');
app.use('/galeria', express.static(path.join(__dirname, 'public/galeria')));
app.use('/alumnos', express.static(path.join(__dirname, 'public/alumnos')));


// Conexión a PostgreSQL
const pool = new Pool({
  user: 'kboom_user',
  host: 'localhost',
  database: 'super_kboom_bd',
  password: '123456789',
  port: 5432,
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

// Obtener usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener usuarios');
  }
});
  

// Guardar usuario
app.post('/usuarios', async (req, res) => {
  const { nombre } = req.body;

  
  try {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre) VALUES ($1) RETURNING *',
        [nombre]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar usuario');
  }
});



// Obtener alumnos
app.get('/alumnos', async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT * FROM alumnos_con_clases
`);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener alumnos');
  }
});


app.post('/alumnos', async (req, res) => {
  const { nombre, edad, categoria, club, ciudad, record, fotos } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO alumnos 
      (nombre, edad, categoria, club, ciudad, record, fotos)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [nombre, edad, categoria, club, ciudad, record, fotos]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear alumno');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});



app.get('/galeria', (req, res) => {
  const folderPath = path.join(__dirname, 'public/galeria');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo galería' });
    }

    const imagenes = files.map(file => `/galeria/${file}`);
    res.json(imagenes);
  });
});

