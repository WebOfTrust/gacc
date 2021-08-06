let m = require("mithril");
const persist = require("../helpers/local_storage");

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
                            m("label", "Legal Entity Identifier"),
                            m("input", {
                                "class": "w3-input w3-border w3-light-grey",
                                "type": "text",
                                oninput: e => {
                                    lei = e.target.value
                                },
                                value: lei
                            }),
                            m("label", "Person Legal Name"),
                            m("input", {
                                "class": "w3-input w3-border w3-light-grey",
                                "type": "text",
                                oninput: e => {
                                    personLegalName = e.target.value
                                },
                                value: personLegalName
                            }),
                            m("label", "Engagement Context Role"),
                            m("input", {
                                "class": "w3-input w3-border w3-light-grey",
                                "type": "text",
                                oninput: e => {
                                    engagementContextRole = e.target.value
                                },
                                value: engagementContextRole
                            }),
                            m("button", {
                                "class": "w3-btn w3-blue-grey w3-margin-top w3-margin-bottom",
                                onclick: function () {
                                    // noinspection JSUnresolvedVariable
                                    m.request({
                                        "method": "POST",
                                        "url": GACC_SERVER_URL + "/issue/credential",
                                        "body": {
                                            "schema": "EWPMkW-_BU6gh1Y8kizXHchFdmvu_i1wYlYbAC3aJABk",
                                            "LEI": lei,
                                            "personLegalName": personLegalName,
                                            "engagementContextRole": engagementContextRole,
                                            "type": "LegalEntityEngagementContextRolevLEICredential"
                                        },
                                    }).then(res => {
                                        // noinspection JSUnresolvedVariable
                                        m.request({
                                            "method": "POST",
                                            "url": CONTROLLER_URL + "/exn/cmd/credential/issue",
                                            "headers": {
                                                "CESR-DATE": res['date'],
                                                "CESR-ATTACHMENT": res['attachment'],
                                                "Content-Type": "application/cesr+json"
                                            },
                                            "body": JSON.parse(res['d'])
                                        }).catch(e => {
                                            console.log(e)
                                        })
                                        persist.addCredential(JSON.parse(res['d'])["data"]["i"], res['d'])
                                    }).catch(e => {
                                        console.log(e)
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

module.exports = LegalEntityEngagementContextRolevLEICredential;