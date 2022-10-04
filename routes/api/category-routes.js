const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

    try {
    //get variable to grab all records of the Catergory Model
    const categoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
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
    console.log('Category.get/ did not work')
    res.status(500).json(err);
    
  }
});

//get single category by id
router.get('/:id', async (req, res) => {
  try {
    // creating variable to find one category by its `id` value
    const oneCategoryData = await Category.findByPk(req.params.id, 
    // including its associated Products 
    {
      include: {
        model: Product,
        attributes: ['product_name'],  
        },
      });
      // checking to see if OneCategory data exist
      if (!oneCategoryData) {
        console.log('getting a single id category did not work');
        res.status(404).json( {message: 'There was an error with this prodcut id'});
        return;
      }
      res.status(200).json(oneCategoryData);
    } catch(err) {
      console.log('there was an error with category.get/id')
      res.status(500).json(err);
  }
  });

// create a new category
router.post('/', async (req, res) => {
  try{
    const NewCategoryData = await Category.create(
      {category_name: req.body.category_name});
   
    
    //response for route
    res.status(200).json(NewCategoryData);
    } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  
    //creating a variable to find the category by ID
    await Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name,
     },
      {
        where: {
          category_name: req.params.category_name,
        }
      },
    )
      .then((updatedCategory) => {
        // Sends the updated book as a json response
      res.status(200).json(updatedCategory);
      })
         
      .catch ((err) => res.status(400).json(err));
});

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
