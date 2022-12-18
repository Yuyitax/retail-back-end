const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ 
        model: Product,
        through: ProductTag
       }],
    });
    if(!tags) {
      res.status(404).json({ message: 'No tag was found'})
    }
    res.status(200).json(tags)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ 
        model: Product,
        through: ProductTag
      }],
    });
    if(!tag) {
      res.status(404).json({ message: 'The tag ID you are looking for cannot be found'});
    }
    res.status(200).json(tag);
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!updateTag) {
      res.status(404).json({ message: 'The tag has been updated'});
    }
    res.status(200).json(updateTag);
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteTag + 'successfully deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
