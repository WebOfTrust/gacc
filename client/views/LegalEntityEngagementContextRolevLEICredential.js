let m = require("mithril");

let personLegalName = "";
let engagementContextRole = "";
let lei = "";

let LegalEntityEngagementContextRolevLEICredential = {
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "Legal Entity Engagement Context Role vLEI Credential")
            ]),
            m("div", {"class": "w3-panel w3-leftbar w3-light-grey w3-margin"}, [
                m("p", {"class": "w3-serif"}, "A vLEI Role Credential issued to representatives of a Legal Entity in other than official roles but in functional or other context of engagement")
            ]),
            m("div", [
                    m("form", {"class": "w3-container w3-margin-top"},
                        [m("p"),
                            // m("label", {"class": "w3-text-dark-grey"}, "QualifiedvLEIIssuervLEICredential"),
                            // m("div", {
                            //     "class": "w3-text-dark-grey w3-margin-bottom",
                            // }, "254900OPPU84GM83MG36"),
                            m("label", "Legal Entity Identifier"),
                            m("input", {
                                "class": "w3-input w3-border w3-light-grey",
                                "type": "text",
                                oninput: function (e) {
                                    lei = e.target.value
                                },
                                value: lei
                            }),
                            m("label", "Person Legal Name"),
                            m("input", {
                                "class": "w3-input w3-border w3-light-grey",
                                "type": "text",
                                oninput: function (e) {
                                    personLegalName = e.target.value
                                },
                                value: personLegalName
                            }),
                            m("label", "Engagement Context Role"),
                            m("input", {
                                "class": "w3-input w3-border w3-light-grey",
                                "type": "text",
                                oninput: function (e) {
                                    engagementContextRole = e.target.value
                                },
                                value: engagementContextRole
                            }),
                            m("button", {
                                "class": "w3-btn w3-blue-grey w3-margin-top w3-margin-bottom",
                                onclick: function () {
                                    m.request({
                                        "method": "POST",
                                        "url": "http://localhost:8000/issue/credential",
                                        "body": {
                                            "schema": "EWPMkW-_BU6gh1Y8kizXHchFdmvu_i1wYlYbAC3aJABk",
                                            "LEI": lei,
                                            "personLegalName": personLegalName,
                                            "engagementContextRole": engagementContextRole,
                                            "type": "LegalEntityEngagementContextRolevLEICredential"
                                        },
                                    })
                                }
                            }, "Issue")
                        ]
                    )
                ]
            ),
        ])
    }
};

module.exports = LegalEntityEngagementContextRolevLEICredential