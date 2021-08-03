import m from 'mithril';

let Issue = require('./views/Issue')
let Verify = require('./views/Verify')

let root = document.body;

m.route(root, "/issue", {
    "/issue": Issue,
    "/verify": Verify,
})
