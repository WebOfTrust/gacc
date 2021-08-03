let m = require("mithril");

let IssueHelp = require('./IssueHelp')
let GLEIFvLEICredential = require('./GLEIFvLEICredential')
let LegalEntityEngagementContextRolevLEICredential = require('./LegalEntityEngagementContextRolevLEICredential')
let LegalEntityOfficialOrganizationalRolevLEICredential = require('./LegalEntityOfficialOrganizationalRolevLEICredential')
let LegalEntityvLEICredential = require('./LegalEntityvLEICredential')
let QualifiedvLEIIssuervLEICredential = require('./QualifiedvLEIIssuervLEICredential')

let Issue = {
    view: function () {
        return m("main", [
            m("div", {"class": "w3-row"},
                [
                    m("div", {"class": "w3-col s4"},
                        m("p",
                            m(IssueHelp)
                        )
                    ),
                    m("div", {"class": "w3-col s4"},
                        m("p",
                            m(GLEIFvLEICredential)
                        )
                    ),
                    m("div", {"class": "w3-col s4"},
                        m("p",
                            m(QualifiedvLEIIssuervLEICredential)
                        )
                    ),
                ]
            ),
            m("div", {"class": "w3-row"},
                [
                    m("div", {"class": "w3-col s4"},
                        m("p",
                            m(LegalEntityvLEICredential)
                        )
                    ),
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
                ]
            )
        ])
    }
};

module.exports = Issue;