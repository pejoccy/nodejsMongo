const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let Contact = require('../models/contact');

const genders = ['Male', 'Female'];

const validator = [
  // Validate fields.
  body('surname', 'Surname must not be empty.').isLength({ min:1 }).trim(),
  body('firstname', 'Firstname must not be empty.').isLength({ min:1 }).trim(),
  body('phone', 'Invalid phone number.').isLength({ min:11 }).trim(),

  sanitizeBody('*').trim().escape(),

];

exports.contact_list = function(req, res, next) {

  Contact.find()
    .exec((err, contact_list) => {
      if (err) { next(err); }

      res.render('contact_list', { title: 'Contacts', contacts: contact_list});
    })
};


exports.contact_create_get = function(req, res, next) {
  res.render('contact_form', { title: 'Create Contact', genders: genders});
}


exports.contact_create_post = [
  ...validator,

  (req, res, next) => {
    const errors = validationResult(req);

    var contact = new Contact(
      { surname: req.body.surname,
        firstname: req.body.firstname,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
      });

    if (!errors.isEmpty()) {
      res.render('contact_form', {title: 'Create Contact', genders: genders, contact: contact, errors: errors.array() });
      return;
    }
    else {
      contact.save((err) => {
        if (err) { return next(err); }
        res.redirect('/');
      });
    }
  }
];


exports.contact_delete_post = function(req, res, next) {
  const id = req.body._id;

  Contact.remove({_id: id}).exec((err) => {
    if (err) { return next(err); }

    res.redirect('/');
  });
  res.send('NOT IMPLEMENTED: Author delete GET');
};


exports.contact_update_post = [
  ...validator,
  (req, res, next) => {
    const id = req.params.id;

    const errors = validationResult(req);

    const contact = {
      surname: req.body.surname,
      firstname: req.body.firstname,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
    };

    if (!errors.isEmpty()) {
      res.render('contact_form', {title: 'Create Contact', genders: genders, contact: contact, errors: errors.array() });
      return;
    }
    else {
      Contact.findOneAndUpdate({_id: id}, contact, (err) => {
        if (err) { return next(err); }

        res.redirect('/');
      });
    }
  }
];

exports.contact_update_get = function(req, res, next) {
  const id = req.params.id;

  Contact
    .findOne({_id: id})
    .exec((err, result) => {
      if (err || !result) { return next(err); }

      res.render('contact_form', {title: 'Update Contact', genders: genders, contact: result });
      return;
    });

};
