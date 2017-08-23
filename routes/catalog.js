var express = require('express');
var router = express.Router();
var passport = require('passport');

// Require our controllers
var book_controller = require('../controllers/bookController'); 
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');
var user_controller = require('../controllers/userController');

/// BOOK ROUTES ///
/**
 *  @swagger
 *  /:
 *    get:
 *      summary: says hi to the people
 *      operationId: index
 *      responses:
 *        200:
 *          description: hello world
 */
/* GET catalog home page. */
router.get('/', book_controller.index);  
/**
 * @swagger
 * /book/:id/delete:
 *  post:
 *      summary: deletes current book.
 *      tags:
 *       - book
 *       - admin/logged in
 *      parameter:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      description: gets book by id populates author, genre, from he document
 *      responses:
 *          "200":    
 *              description: Succes!
 *              content:
 *                  "application/json":
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              type: string
 *      example:
 *          
 */
// POST request to delete Book
router.post('/book/:id/delete', book_controller.book_delete_post);
/**
 * @swagger
 * /book/:id/update:
 *  get:
 *      summary: finds book by id, and the corresponding author/genre
 *      tags:
 *       - book
 *       - admin/logged in
 *      parameter:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *      description: a description
 *      responses:
 *          200:
 *              description: Succes
 *              content: 
 *                  "application/json":
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: string
 *               
 */
/* GET request to update Book. */
router.get('/book/:id/update', book_controller.book_update_get);
/**
 * @swagger
 * /book/:id/update:
 *  post:
 *      summary: finds book by id if it exists it will update else create a new one
 *      tags:
 *       - book
 *       - admin/logged in
 */
// POST request to update Book
router.post('/book/:id/update', book_controller.book_update_post);
/**
 * @swagger
 * /book/:id:
 *  get:
 *      summary: finds book by id populates the genre and author and renders the book_detail page
 *      tags:
 *       - book
 * 
 */
/* GET request for one Book. */
router.get('/book/:id', book_controller.book_detail);
/**
 * @swagger
 * /books:
 *  get:
 *      summary: renders a list of all the books (with authors and more)
 *      tags:
 *       - book
 */
/* GET request for list of all Book. */
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///
/**
 * @swagger
 * /author/create:
 *  get:
 *      summary: gets the form to create a author
 *      tags:
 *       - author 
 *       - admin/logged in
 */
/* GET request for creating Author. NOTE This must come before route for id (ie display author)*/
router.get('/author/create', author_controller.author_create_get);
/**
 * @swagger
 * /author/create:
 *  post:
 *      summary: uses the input from user to create a new author
 *      tags:
 *       - author
 *       - admin/logged in
 */
/* POST request for creating Author. */
router.post('/author/create', author_controller.author_create_post);
/**
 * @swagger
 * /author/:id/delete:
 *  get:
 *      summary: gets the form to delete the selected author
 *      tags:
 *       - author
 *       - admin/logged in
 */
/* GET request to delete Author. */
router.get('/author/:id/delete', author_controller.author_delete_get);
/**
 * @swagger
 * /author/:id:/delete:
 *  post:
 *      summary: uses the input from user to delete the selected author
 *      tags:
 *       - author
 *       - admin/logged in
 */
// POST request to delete Author
router.post('/author/:id/delete', author_controller.author_delete_post);
/**
 * @swagger
 * /author/:id/update:
 *  get:
 *      summary: gets the form to update a author (change name and date of birth/death)
 *      tags:
 *       - author
 *       - admin/logged in
 *       
 */
/* GET request to update Author. */
router.get('/author/:id/update', author_controller.author_update_get);
/**
 * @swagger
 * /author/:id/update:
 *  post:
 *      summary: uses the input from the form to update the author object
 *      tags:
 *       - author
 *       - admin/logged in
 */
// POST request to update Author
router.post('/author/:id/update', author_controller.author_update_post);
/**
 * @swagger
 * /author/:id:
 *  get:
 *      summary: gets the html to display the specifics of a specific author
 *      tags:
 *       - author
 */
/* GET request for one Author. */
router.get('/authors', author_controller.author_detail);
/**
 * @swagger
 * /author:
 *  get:
 *      summary: gets the html to display all the authors name's/day of birth/death in a list
 *      tags:
 *       - author
 */
/* GET request for list of all Authors. */
router.get('/authors', author_controller.author_list);


/// GENRE ROUTES ///
/**
 * @swagger
 * /genre/create:
 *  get:
 *      summary: gets the form to create a genre
 *      tags:
 *       - Genre
 *       - admin/logged in
 */
/* GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id) */
router.get('/genre/create', genre_controller.genre_create_get);
/**
 * @swagger
 * /genre/create:
 *  post:
 *      summary: uses the input from the form to create a new genre
 *      tags:
 *       - Genre
 *       - admin/logged in
 */
/* POST request for creating Genre. */
router.post('/genre/create', genre_controller.genre_create_post);
/**
 * @swagger
 * /genre/:id/delete:
 *  get:
 *      summary: gets the form to delete a genre
 *      tags:
 *       - Genre
 *       - admin/logged in
 */
/* GET request to delete Genre. */
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
/**
 * @swagger
 * /genre/:id/delete:
 *  post:
 *      summary: uses the input from the form to delete the selected genre
 *      tags:
 *       - Genre
 *       - admin/logged in
 */
// POST request to delete Genre
router.post('/genre/:id/delete', genre_controller.genre_delete_post);
/**
 * @swagger
 * /genre/:id/update:
 *  get:
 *      summary: gets the form to update a specific genre
 *      tags:
 *       - Genre
 *       - admin/logged in
 */
/* GET request to update Genre. */
router.get('/genre/:id/update', genre_controller.genre_update_get);
/**
 * @swagger
 * /genre/:id/update:
 *  post:
 *      summary: uses the form input to update a specific genre
 *      tags:
 *       - Genre
 *       - admin/logged in
 */
// POST request to update Genre
router.post('/genre/:id/update', genre_controller.genre_update_post);
/**
 * @swagger
 * /genre/:id:
 *  get:
 *      summary: gets a specific genre and shows the books that belong to it
 *      tags:
 *       - Genre
 */
/* GET request for one Genre. */
router.get('/genre/:id', genre_controller.genre_detail);
/**
 * @swagger
 * /genres:
 *  get:
 *      summary: neatly displays all the genre's in an unordered list
 *      tags:
 *       - Genre
 *       - admin/logged in
 */
/* GET request for list of all Genre. */
router.get('/genres', genre_controller.genre_list);


/// BOOKINSTANCE ROUTES ///
/**
 * @swagger
 * /bookinstance/create:
 *  get:
 *      summary: gets the form to create an new bookinstance
 *      tags:
 *       - BookInstance
 *       - admin/logged in
 */
/* GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id) */
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);
/**
 * @swagger
 * /bookinstance/create:
 *  post:
 *      summary: uses the form input to create a new bookinstance
 *      tags:
 *       - BookInstance
 */
/* POST request for creating BookInstance. */
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);
/**
 * @swagger
 * /bookinstance/:id/delete:
 *  get:
 *      summary: gets the form to delete a bookinstance
 *      tags:
 *       - BookInstance
 *       - admin/logged in
 */
/* GET request to delete BookInstance. */
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);
/**
 * @swagger
 * /bookinstance/:id/delete:
 *  post:
 *      summary: uses the input of the form to delete a bookinstance
 *      tags:
 *       - BookInstance
 *       - admin/logged in
 */
// POST request to delete BookInstance
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);
/**
 * @swagger
 * /bookinstance/:id/update:
 *  get:
 *      summary: gets the form to update a specific bookinstance
 *      tags:
 *       - BookInstance
 */
/* GET request to update BookInstance. */
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);
/**
 * @swagger
 * /bookinstance/:id/update:
 *  post:
 *      summary: uses the input of the form to update a bookinstance
 *      tags:
 *       - BookInstance
 */
// POST request to update BookInstance
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);
/**
 * @swagger
 * /bookinstance/:id/:
 *  get:
 *      summary: shows the information of the book Bookinstance
 *      tags:
 *       - BookInstance
 */
/* GET request for one BookInstance. */
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);
/**
 * @swagger
 * /bookinstances:
 *  get:
 *      summary: shows all instances
 *      tags:
 *       - BookInstance
 */
/* GET request for list of all BookInstance. */
router.get('/bookinstances', book_instance_controller.bookinstance_list);

//USER ROUTES
/**
 * @swagger
 * /user/create:
 *  get:
 *      summary: shows all instances
 *      tags:
 *       - User
 */
/* GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id) */
router.get('/user/create', user_controller.user_create_get);

/* POST request for creating BookInstance. */
router.post('/user/create', user_controller.user_create_post);

/* GET request to delete BookInstance. */
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST request to delete BookInstance
router.post('/user/:id/delete', user_controller.user_delete_post);

/* GET request to update BookInstance. */
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update BookInstance
router.post('/user/:id/update', user_controller.user_update_post);

/* GET request for list of all BookInstance. */
//router.get('/users', user_controller.user_list);

module.exports = router;

