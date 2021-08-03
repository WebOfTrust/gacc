let m = require("mithril");

let QualifiedvLEIIssuervLEICredential = {
    view: function () {
        return m("main", {"class": "w3-margin w3-card"},  [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "Qualified vLEI Issuer Credential")
            ]),
            m("div", {"class": "w3-panel w3-leftbar w3-light-grey w3-margin"}, [
                m("p", {"class": "w3-serif"}, "A vLEI Credential issued by GLEIF to Qualified vLEI Issuers which allows the Qualified vLEI Issuers to issue, verify and revoke Legal Entity vLEI Credentials and Legal Entity Official Organizational Role vLEI Credentials")
            ]),
            m("div", {"class": "w3-padding-top"},
                [
                    m("form", {"class": "w3-container"},
                        [
                            m("p"),
                            m("label", "Legal Entity Identifier"),
                            m("input", {"class": "w3-input w3-border w3-light-grey", "type": "text"}),
                            m("button", {
                                "class": "w3-btn w3-blue-grey w3-margin-top w3-margin-bottom",
                                onclick: function () {
                                    m.request({
                                        "method": "POST",
                                        "url": "http://localhost:8000/issue/credential",
                                        "body": {
                                            "LEI": "506700GE1G29325QX363"
                                        },
                                    })
                                }
                            }, "Issue")
                        ]
                    )
                ]
            )
        ])
    }
};

module.exports = QualifiedvLEIIssuervLEICredential