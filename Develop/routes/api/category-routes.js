const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

    try {
    //get variable to grab all records of the Catergory Model
    const categoryData = await Category.finALl({
      //also including all the records from product as well
      include: [{ model: Product }],
    });
    // checking if empty or not
    if (!categoryData) {
      res.status(404).json({ message: 'Ruh Row Raggy' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // creating variable to find one category by its `id` value
    const oneCatergory = await Category.findByPk(req.params.id);
    // TODO: be sure to include its associated Products 
    res.status(200).json(oneCatergory);
  } catch(err) {
    res.status(400).json(err);

  }
  });

// create a new category
router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create({ name: "newData"});
    // checking if empty or not
    if (!categoryData) {
      res.status(404).json({ message: 'Ruh Row Raggy' });
      return;
    }
    //response for route
    res.status(200).json(categoryData);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    //creating a variable to find the category by ID
    const categoryData = Category.findByPk(req.params.id);
    // checking if empty or not
    if (!categoryData) {
      res.status(404).json({ message: 'Ruh Row Raggy' });
      return;
    }
    //saving the caterogry found by the ID ....this feels wrong...?
    const updateCategoryData = categoryData.save();   
    //response of category Data
    res.status(200).json(updateCategoryData);

  } catch (err) {
    res.status(400).json(err);

    }
  }
);

//Route to delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  //creating variable to grab category by id
  const categoryData = Category.findByPk(req.params.id);
  if (!categoryData) {
    res.status(404).json({ message: 'Ruh Row Raggy' });
    return;
  }
  await categoryData.destroy();
  console.info(`${categoryData} was deleted`)
});

module.exports = router;
