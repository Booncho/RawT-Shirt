const express = require('express');
const router = express.Router();
const Post = require('../configs/addmodel');
const multer = require('multer');
const fs = require('fs');

// Image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

// Insert a T-shirt data
router.post('/add', upload, async (req, res) => {
  const add = new Post({
    title: req.body.title,
    category: req.body.category,
    body: req.body.body,
    price: req.body.price,
    image: req.file.filename,
  });

  try {
    await add.save();
    req.session.message = {
      type: 'success',
      message: 'T-Shirt added successfully!',
    };
    res.redirect('/');
  } catch (err) {
    res.json({ message: err.message, type: 'danger' });
  }
});

router.get('/', async (req, res) => {
  try {
    const add = await Post.find().exec();
    res.render('home', {
      title: 'T-shirt',
      add: add,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/add', (req, res) => {
  res.render('add_shirt', { title: "Addshirt" });
});

// Edit post
router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).exec();

    if (!post) {
      // Handle the case where the post is not found
      // For example, you can redirect to an error page or display a message
      redirect('/')
    } else {
      res.render('edit_shirt', {
        title: "Edit",
        post: post,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


//update 
router.post('/update/:id', upload, async (req, res) => {
  try {
    const id = req.params.id;
    let new_image = '';

    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync('uploads/' + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      price: req.body.price,
      image: new_image,
    });

    if (!updatedPost) {
      res.json({ message: 'Post not found', type: 'danger' });
    } else {
      req.session.message = {
        type: 'success',
        message: 'Update successfully!',
      };
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

//Delete
router.get('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Post.findByIdAndDelete(id).exec();

    if (result && result.image !== '') {
      try {
        fs.unlinkSync('uploads/' + result.image);
      } catch (err) {
        console.log(err);
      }
    }

    req.session.message = {
      type: 'success',
      message: 'Delete successfully!',
    };

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;

