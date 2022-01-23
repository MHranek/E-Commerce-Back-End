const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    // be sure to include its associated Product data
    const tagData = await Tag.findAll({ include: Product });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    // be sure to include its associated Product data
    const tagData = await Tag.findByPk(req.params.id, { include: Product });
    if (!tagData) {
      res.status(404).json("No tag with that ID exists");
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.status(200).json("Successfully created tag");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateTag) {
      res.status(404).json("No tag with that ID exists");
      return;
    }
    res.status(200).json("Successfully updated tag");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(404).json("No tag with that ID exists");
      return;
    }
    res.status(200).json("Successfully deleted tag");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
