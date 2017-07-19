var User = require('../models/user')

//display's list of all users
exports.genre_list = function(req, res, next) {
    User.find()
    .sort([['userName', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('user_list', { title: 'User List', list_users:  list_users});
    })

};

// Display User create form on GET
exports.user_create_get = function(req, res, next) {
    res.render('user_form', { title: 'Create User'});
};

// Handle User create on POST
exports.user_create_post = function(req, res, next) {

    //Check that the name field is not empty
    req.checkBody('userName', 'User name required').notEmpty();
    req.checkBody('password', 'User name required').notEmpty();
    req.checkBody('hasBook', 'This shouldnt have errored');


    //Run the validators
    var errors = req.validationErrors();

    //Create a user object with escaped and trimmed data.
    var user = new User({
        userName: req.body.userName,
        password: req.body.password,
        hasBook: req.body.hasBook
    });


    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('user_form', { title: 'Create User', user: user, errors: errors});
    return;
    }
    else {
        // Data from form is valid.
        //Check if User with same name already exists
        User.findOne({ 'userName': req.body.userName })
            .exec( function(err, found_user) {
                 console.log('found_user: '+found_user)
                 if (err) { return next(err); }

                 if (found_user) {
                     //User exists, redirect to its detail page
                     res.redirect(found_user.url);
                 }
                 else {

                     user.save(function (err) {
                       if (err) { return next(err); }
                       //User saved. Redirect to User detail page
                       res.redirect(user.url);
                     });

                 }

             });
    }

};

// Display User delete form on GET
exports.user_delete_get = function(req, res, next) {

    async.parallel({
        user: function(callback) {
            User.findById(req.params.id).exec(callback)
        },
        function(err, results) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('user_delete', { title: 'Delete User', user: results.user} );
    }

});
};

// Handle User delete on POST
exports.user_delete_post = function(req, res, next) {

    req.checkBody('id', 'User id must exist').notEmpty();

    async.parallel({
        User: function(callback) {
            User.findById(req.params.id).exec(callback)
        }
       

        })
    };

// Display User update form on GET
exports.user_update_get = function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();
    User.findById(req.params.id, function(err, User) {
        if (err) { return next(err); }
        //On success
        res.render('user_form', { title: 'Update User', user: user });
    });

};

// Handle User update on POST
exports.user_update_post = function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();
    //Check that the name field is not empty
    req.checkBody('userName', 'User name required').notEmpty();
    req.checkBody('password', 'User name required').notEmpty();
    req.checkBody('hasBook', 'meh');
    //Trim and escape the name field.
    req.sanitize('userName').escape();
    req.sanitize('userName').trim();
    req.sanitize('password').escape();
    req.sanitize('password').trim();
    req.sanitize('hasBook').escape();
    req.sanitize('hasBook').trim();

    //Run the validators
    var errors = req.validationErrors();

    //Create a User object with escaped and trimmed data (and the old id!)
    var user = new User(
      {
        userName: req.body.userName,
        _id: req.params.id,
        password: req.body.password,
        hasBook: hasBook
      }
    );

    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('user_form', { title: 'Update User', user: user, errors: errors});
    return;
    }
    else {
        // Data from form is valid. Update the record.
        User.findByIdAndUpdate(req.params.id, user, {}, function (err,theuser) {
            if (err) { return next(err); }
               //successful - redirect to User detail page.
               res.redirect(theuser.url);
            });
    }

};