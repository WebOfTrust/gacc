import m from 'mithril';

let Issue = require('./views/Issue')
let Verify = require('./views/Verify')

let root = document.body;

let Layout = {
    view: vnode => {
        return m("main.layout", [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h1", "GACC"),
                m("p", "GLEIF Console for vLEI Credentials")
            ]),
            m("nav.menu", {"class": "w3-bar w3-light-grey"},
                [
                    m(m.route.Link, {"class": "w3-bar-item w3-button", "href": "issue"},
                        "Issue"
                    ),
                    m(m.route.Link, {"class": "w3-bar-item w3-button", "href": "verify"},
                        "Verify"
                    ),
                ]
            ),
            m("section", vnode.children),
            m("div", {"class": "w3-container w3-teal"},
                [
                    m("p",
                        "GLEIF Demo"
                    ),
                ]
            )
        ])
    }
};

m.route(root, "/issue", {
    "/issue": {
        render: vnode => {
            return m(Layout, m(Issue, vnode.attrs))
        }
    },
    "/verify": {
        render: vnode => {
            return m(Layout, m(Verify, vnode.attrs))
        }
    },
})
