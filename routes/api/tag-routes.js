const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
 
  // be sure to include its associated Product data
  try {
    //get variable to grab all records of the Tag Model
    const TagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      //also including all the records from product as well
      include: [{ model: Product }],
    });
    // checking if empty or not
    if (!TagData) {
      res.status(404).json({ message: 'Ruh Row Raggy' });
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    console.log('tag.get/ did not work')
    res.status(500).json(err);
    
  }

});

router.get('/:id', async (req, res) => {
  
  try {
    //get variable to grab a single tag by its `id`
    const singleTagData = await Tag.findByPk(req.params.id,
      {
        
      // include all of its associated Product data
      
      include: [{ model: Product,
        attributes: ['product_name', 'price', "stock" ]

      }],
    });
    // checking if empty or not
    if (!singleTagData) {
      res.status(404).json({ message: 'Ruh Row Raggy' });
      return;
    }
    res.status(200).json(singleTagData);
  } catch (err) {
    console.log('Category.get/ did not work')
    res.status(500).json(err);
    
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try{
    const NewTagData = await Tag.create(
      {tag_name: req.body.tag_name});
      
      // checking if empty or not
    if (!NewTagData) {
      res.status(404).json({ message: 'Ruh Row Raggy' });
      return;
    }
    
    //response for route
    res.status(200).json(NewTagData);
    } catch (err) {
    console.log("could not create new tag");
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {  
    const updatedTag = await Tag.update(
    { tag_name: req.body.tag_name,},   
     { where: { id: req.params.id,}},  
    );
       // Sends the updated Tag as a json response
      
       res.status(200).json(updatedTag);
    }catch{ (err) => res.status(400).json(err);
      console.log('Updating Tag did not work');
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const DeleteTagData = await Tag.destroy(
     {where : { id: req.params.id}}
     );
      //checking if empty
     if (!DeleteTagData) {
      console.log('no tag to delete')
      res.status(404).json(err);
      return;
      }
    // responding 
      res.status(200).json(DeleteTagData);
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;
