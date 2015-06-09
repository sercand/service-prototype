/**
 * Created by sercand on 09/06/15.
 */

"use strict";

var express = require('express');
var router = express.Router();
var Parent = require('../../models/parent');
var Child = require('../../models/child');
var hash = require('../../lib/hash');
var validator = require('validator');


/**
 * /api/v1/parent/:id
 */
function getParent(req, res, next) {
    let parent_id = req.params.id;

    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }

    Parent.findById(parent_id, {password: 0}, (err, doc)=> {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return next(new Error("Parent not found"));
        }
        return res.json({
            success: true,
            data: doc
        });
    });
}

/**
 * /api/v1/parent/:id/addchild
 - name
 */
function addChild(req, res, next) {
    let parent_id = req.params.id;
    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }

    let child_name = req.body.name;
    let child = new Child(child_name);

    Parent.findById(parent_id, {_id: 1}, (err, doc)=> {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return next(new Error("Parent not found"));
        }

        child.setParentId(parent_id);

        child.save((err2)=> {
            if (err) {
                return next(err2);
            }
            return res.json({
                success: true,
                child_id: child._id.toString()
            });
        });
    });
}

/**
 * /api/v1/parent/:id/changepassword
 - old_password
 - new_password
 */
function changepassword(req, res, next) {
    let parent_id = req.params.id;

    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }

    let old_password = req.body.old_password;
    let new_password = req.body.new_password;

    if (!old_password) {
        return next(new Error("User's password is missing"));
    }

    if (!new_password) {
        return next(new Error("User's new password is missing"));
    }
    if (new_password.length < 4) {
        return next(new Error("Password is short"));
    }
    Parent.findById(parent_id, {fields: {_id: 1, password: 1}}, function (err, doc) {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return next(new Error("Parent not found"));
        }

        hash.validPassword(old_password, doc.password, (err2, valid)=> {
            if (err2) {
                return next(err2);
            }
            if (valid) {

                hash.generateHash(new_password, (err3, pw)=> {
                    if (err3) {
                        return next(err3);
                    }
                    Parent.updatePassword(parent_id, pw, (err4)=> {
                        if (err4) {
                            return next(err4);
                        } else {
                            return res
                                .status(200)
                                .json({success: true});
                        }
                    });
                });

            } else {
                return next(new Error("Old password is not correct"));
            }
        });
    });
}

/**
 * /api/v1/parent/:id/getchild/:child_id
 */
function getAChild(req, res, next) {
    let parent_id = req.params.id;
    let child_id = req.params.child_id;
    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }
    if (!validator.isMongoId(child_id)) {
        return next(new Error("Invalid Child ID"));
    }

    Child.findById(child_id, (err, doc)=> {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return next(new Error("Child not found"));
        }

        //todo check for parent id

        return res.status(200).json({
            success: true,
            data: doc
        });
    });
}

/**
 * /api/v1/parent/:id/getchildren
 */
function getchildren(req, res, next) {
    let parent_id = req.params.id;
    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }

    Child.findByParentId(parent_id, (err, docs)=> {
        if (err) {
            return next(err);
        }
        if (!docs) {
            return next(new Error("Children not found"));
        }

        //todo check for parent id

        return res.status(200).json({
            success: true,
            data: docs
        });
    });
}

router.get('/:id', getParent);
router.post('/:id/addchild', addChild);
router.post('/:id/changepassword', changepassword);
router.get('/:id/getchild/:child_id', getAChild);
router.get('/:id/getchildren', getchildren);

module.exports = router;
