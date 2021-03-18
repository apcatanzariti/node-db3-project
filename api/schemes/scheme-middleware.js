const Schemes = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Schemes.find();
    if (scheme) {
      next();
    } else {
      res.status(404).json({ message: `scheme with id ${req.params.id} does not exist` });
    }
  } catch {
    res.status(500).json({ message: 'something went wrong checking the id' });
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if (req.body.scheme_name === '' || !req.body.scheme_name) {
    res.status(400).json({ message: 'invalid scheme_name' });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions;
  const step = req.body.step_number;

  if (!instructions || instructions === '' || step < 1) {
    res.status(400).json({ message: 'invalid step' })
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
