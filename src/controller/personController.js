const Person = require('../model/Person');

// CREATE: Adding a new person
const createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json({
        success: true,
        person: person
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        error: 'Failed to create a new person', 
        error: error.message 
    });
  }
};

// READ: Fetching details of a person by ID
const getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.user_id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json({
        success: true,
        person: person
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
        error: 'Failed to fetch person details', 
        message: error.message 
    });
  }
};

// READ: Fetching details of a person by ID
const getAllPersons = async (req, res) => {
    try {
      const persons = await Person.find();
      if (persons.length === 0) {
        return res.status(404).json({ error: 'No Persons found' });
      }
      res.status(200).json({
        success: true,
        persons: persons
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: 'Failed to fetch people', 
        message: error.message 
    });
    }
};

// UPDATE: Modifying details of an existing person by ID
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.user_id, req.body, {
      new: true,
    });
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json({
        success: true,
        person: person
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        error: 'Failed to update person details', 
        message: error.message
    });
  }
};

// DELETE: Removing a person by ID
const deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.user_id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json({ 
        success: true,
        message: 'Person deleted successfully' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        error: 'Failed to delete person', 
        message: error.message 
    });
  }
};

module.exports = {
  createPerson,
  getPersonById,
  getAllPersons,
  updatePerson,
  deletePerson,
};
