let m = require("mithril");

let QualifiedvLEIIssuervLEICredential = {
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
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
                            m("input[readonly=true][value='254900OPPU84GM83MG36']", {
                                "class": "w3-input w3-border w3-light-grey w3-text-blue-grey",
                                "type": "text"
                            }),
                            m("button", {
                                "class": "w3-btn w3-blue-grey w3-margin-top w3-margin-bottom",
                                onclick: function () {
                                    // noinspection JSUnresolvedVariable
                                    m.request({
                                        "method": "POST",
                                        "url": GACC_SERVER_URL + "/issue/credential",
                                        "body": {
                                            "LEI": "254900OPPU84GM83MG36",
                                            "schema": "E9bX8Do0nb1Eq986HvoJ2iNO00TjC6J_2En8Du9L-hYU",
                                            "type": "QualifiedvLEIIssuervLEICredential"
                                        },
                                    }).catch(e => {
                                        console.log(e)
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

module.exports = QualifiedvLEIIssuervLEICredential;