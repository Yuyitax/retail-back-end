const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [{ 
        model: Product 
      }],
    });
    if(!category) {
      res.status(404).json({ message: 'No category was found'})
    }
    res.status(200).json(category)
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ 
        model: Product 
      }],
    });
    if(!category) {
      res.status(404).json({ message: 'No category ID was found'});
    }
    res.status(200).json(category);
  } 
  catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!updateCategory) {
      res.status(404).json({ message: 'The category you are looking for does not exist'});
    }
    res.status(200).json(updateCategory);
  } 
  catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteCategory + 'successfully deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
