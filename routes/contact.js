const express = require('express');
const router = express.Router();

const contact_controller = require('../controllers/contactController');

/// CONTACT ROUTERS ///

// POST request for creating Contact
router.post('/create', contact_controller.contact_create_post);
// GET request for creating Contact
router.get('/create', contact_controller.contact_create_get);
// POST request to update Contact
router.post('/:id/update', contact_controller.contact_update_post);
// POST request to update Contact
router.get('/:id/update', contact_controller.contact_update_get);
// POST request to delate a Contact
router.post('/:id/delete', contact_controller.contact_delete_post);
// GET request for list of all Contact items
router.get('/', contact_controller.contact_list);


module.exports = router;
