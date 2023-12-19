const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

// Configuración para bcrypt
const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

// Configuración de CORS y middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://alexdiazcalero:EIx9PEFiPTdOA2zF@cluster0.3zengf7.mongodb.net/?retryWrites=true&w=majority');

// Registro de un nuevo usuario
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    // Usuario no encontrado
    return res.status(400).json({ error: 'User not found', message: 'Invalid username or password' });
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // Usuario autenticado
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('Wrong credentials');
  }
});

// Obtener perfil del usuario
app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  // Verificar que el token esté presente antes de intentar verificarlo
  if (token) {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        // Manejar el error si la verificación falla
        return res.status(401).json({ error: 'Invalid token' });
      }
      // Enviar la información del usuario si la verificación es exitosa
      res.json(info);
    });
  } else {
    // Manejar el caso en el que el token no está presente
    res.status(401).json({ error: 'Token not present', message: 'User not authenticated' });
  }
});

// Cierre de sesión
app.post('/logout', (req, res) => {
  res.cookie('token', '').json('OK');
});

// Crear un nuevo post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content, city , room,floor,price,meter } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      city,
      room,
      floor,
      price,
      meter,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

// Actualizar un post existente
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content, city, room,floor,price,meter } = req.body;
    const postDoc = await Post.findById(id);
    // const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    // if (!isAuthor) {
    //   return res.status(400).json('You are not the author');
    // }



  // Verificar si el usuario es el autor original o si es "admin"
  const isAuthorOrAdmin = JSON.stringify(postDoc.author) === JSON.stringify(info.id) || info.username === 'admin';

  if (!isAuthorOrAdmin) {
    return res.status(400).json('You are not authorized to edit this post');
  }

    await Post.updateOne({
      _id: id,
      // author: info.id,
    }, {
      title,
      summary,
      content,
      city,
      room,
      floor,
      price,
      meter,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

// Obtener todos los posts
app.get('/post', async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});


//obtener los post por autor

app.get('/findAuthor', async (req, res) => {
  try {
    const { author } = req.query;
    console.log('Received findAuthor request for author ID:', author); // Agrega este log para depurar

    // Verifica que el parámetro 'author' esté presente y sea un ID válido
    if (!author || !mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    const posts = await Post.find({ author })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Borrar post
app.delete('/delete/:id', async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const result = await Post.deleteOne({ _id: postId });

    if (result.deletedCount === 1) {
      res.json({ success: true, message: 'Publicación eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la publicación para eliminar' });
    }
  } catch (error) {
    console.error('Error al intentar eliminar la publicación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});





// Obtener un post por ID
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

app.get('/search/', async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      city: { $regex: query.search, $options: "i" }
    };
    const posts = await Post.find(query.search ? searchFilter : {}); // Usar un objeto vacío si no hay filtro
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});



// Obtener todos los usuarios
app.get('/user', async (req, res) => {
  try {
    const users = await User.find({ username: { $ne: 'admin' } }); // $ne significa "not equal"
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Borrar post
app.delete('/borrarUser/:username', async (req, res) => {
  const usernameToDelete = req.params.username;
  console.log('Username to delete:', usernameToDelete);

  try {
    const result = await User.deleteOne({ username: usernameToDelete });
    console.log('Delete result:', result);

    if (result.deletedCount === 1) {
      res.json({ success: true, message: 'Usuario eliminado exitosamente' });
    } else {
      console.log('User not found for deletion.');
      res.status(404).json({ error: 'No se encontró el usuario para eliminar' });
    }
  } catch (error) {
    console.error('Error al intentar eliminar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

// Configuración del servidor para escuchar en el puerto 4000
app.listen(4000);
