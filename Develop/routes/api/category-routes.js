const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({ message: 'There is no category with this id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const oneCatergory = await Category.findByPk(req.params.id);
    res.status(200).json(oneCatergory);
  } catch(err) {
    res.status(400).json(err);

  }
  });

// create a new category
router.post('/', (req, res) => {
  try{
    const categoryData = Category.create({
        

    })


  } catch (err) {

  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = Category.update({
    
    })


  } catch (err) {

    res.status(400).json(err);

    }
  }
);

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
