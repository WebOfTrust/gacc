let m = require("mithril");

let GLEIFvLEICredentialView = require('./GLEIFvLEICredential')
let LegalEntityEngagementContextRolevLEICredential = require('./LegalEntityEngagementContextRolevLEICredential')
let LegalEntityOfficialOrganizationalRolevLEICredential = require('./LegalEntityOfficialOrganizationalRolevLEICredential')
let LegalEntityvLEICredential = require('./LegalEntityvLEICredential')
let QualifiedvLEIIssuervLEICredential = require('./QualifiedvLEIIssuervLEICredential')

let Issue = {
    view: function () {
        return m("main", [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h1", "GACC"),
                m("p", "GLEIF Console for vLEI Credentials")
            ]),
            m("div", {"class": "w3-bar w3-light-grey"},
                [
                    m("a", {"class": "w3-bar-item w3-button w3-blue-grey", "href": "#!issue"},
                        "Issue"
                    ),
                    m("a", {"class": "w3-bar-item w3-button", "href": "#!verify"},
                        "Verify"
                    ),
                ]
            ),
            m("div", {"class": "w3-row"},
                [
                    m("div", {"class": "w3-col s4"},
                        m("p",
                            m(GLEIFvLEICredentialView)
                        )
                    ),
                    m("div", {"class": "w3-col s4"},
                        m("p",
                            m(QualifiedvLEIIssuervLEICredential)
                        )
                    ),
                    m("div", {"class": "w3-col s4"},
                        m("p",
                            m(LegalEntityvLEICredential)
                        )
                    )
                ]
            ),
            m("div", {"class": "w3-row"},
                [
                    m("div", {"class": "w3-col s4 "},
                        m("p",
                            m(LegalEntityOfficialOrganizationalRolevLEICredential)
                        )
                    ),
                    m("div", {"class": "w3-col s4 "},
                        m("p",
                            m(LegalEntityEngagementContextRolevLEICredential)
                        )
                    ),
                    m("div", {"class": "w3-col s4 "},
                        m("p",
                            "s4"
                        )
                    )
                ]
            ),
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

module.exports = Issue