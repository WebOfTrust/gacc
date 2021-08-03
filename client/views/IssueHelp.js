let m = require("mithril");

let IssueHelps = {
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
            m("div", {"class": "w3-container w3-light-grey"}, [
                m("h5", {"class": "w3-text-blue-grey"}, "Credential Schema")
            ]),
            m("div", {"class": "w3-panel"}, [
                    m("div", {"class": "w3-container w3-margin-bottom"}, [
                        m("a[href='https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/gleif-vLEI-credential.json'][target='_blank']", "GLEIF vLEI Credential")
                    ]),
                    m("div", {"class": "w3-container w3-margin-bottom"}, [
                        m("a[href='https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/qualified-vLEI-issuer-vLEI-credential.json'][target='_blank']", "Qualified vLEI Issuer Credential")
                    ]),
                    m("div", {"class": "w3-container w3-margin-bottom"}, [
                        m("a[href='https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/legal-entity-vLEI-credential.json'][target='_blank']", "Legal Entity vLEI Credential")
                    ]),
                    m("div", {"class": "w3-container w3-margin-bottom"}, [
                        m("a[href='https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/legal-entity-official-organizational-role-vLEI-credential.json'][target='_blank']", "Legal Entity Official Organizational Role vLEI Credential")
                    ]),
                    m("div", {"class": "w3-container w3-margin-bottom"}, [
                        m("a[href='https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/legal-entity-engagement-context-role-vLEI-credential.json'][target='_blank']", "Legal Entity Engagement Context Role vLEI Credential")
                    ]),
                ]
            ),
        ])
    }
};

module.exports = IssueHelps