let m = require("mithril");

let Verify = {
    view: function () {
        return m("main", [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h1", "GACC"),
                m("p", "GLEIF Console for vLEI Credentials")
            ]),
            m("div", {"class": "w3-bar w3-light-grey"},
                [
                    m("a", {"class": "w3-bar-item w3-button", "href": "#!issue"},
                        "Issue"
                    ),
                    m("a", {"class": "w3-bar-item w3-button w3-blue-grey", "href": "#!verify"},
                        "Verify"
                    ),
                ]
            ),
            m("div", "verify"),
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

module.exports = Verify;