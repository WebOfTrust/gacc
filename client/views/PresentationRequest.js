let m = require("mithril");

let Recipient = require('./Recipient')
let val = "E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4";

let PresentationRequest = {
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "Presentation Request")
            ]),
            m("div",
                [
                    m("form",
                        [m("p"),
                            m(Recipient),
                            m("div", {"class": "w3-container w3-margin-bottom"}, [
                                m("label", "Schema"),
                                m("select", {
                                        "class": "w3-select", "name": "option",
                                        onchange: e => {
                                            val = e.target.value
                                        }
                                    },
                                    [
                                        m("option", {"value": "E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4"},
                                            "GLEIF vLEI Credential"
                                        ),
                                        m("option", {"value": "E9bX8Do0nb1Eq986HvoJ2iNO00TjC6J_2En8Du9L-hYU"},
                                            "Qualified vLEI Issuer Credential"
                                        ),
                                        m("option", {"value": "E-BRq9StLuC9DxGgiFiy2XND0fFgzyn8cjptlcdvGEFY"},
                                            "Legal Entity vLEI Credential"
                                        ),
                                        m("option", {"value": "EUZ_F1do5sG78zeeA_8CChT5utRpOXQK4GYnv0WGRfuU"},
                                            "Legal Entity Official Organizational Role vLEI Credential"
                                        ),
                                        m("option", {"value": "EWPMkW-_BU6gh1Y8kizXHchFdmvu_i1wYlYbAC3aJABk"},
                                            "Legal Entity Engagement Context Role vLEI Credential"
                                        )
                                    ]
                                ),]),
                            m("div", {"class": "w3-container"}, [
                                m("button", {
                                    "class": "w3-btn w3-blue-grey w3-margin-bottom",
                                    onclick: function () {
                                        console.log("hi")
                                        console.log(val)
                                        // noinspection JSUnresolvedVariable
                                        m.request({
                                            "method": "POST",
                                            "url": GACC_SERVER_URL + "/presentation/request",
                                            "body": {
                                                "schema": val
                                            },
                                        }).then(res => {
                                            // noinspection JSUnresolvedVariable
                                            m.request({
                                                "method": "POST",
                                                "url": CONTROLLER_URL + "/exn/cmd/presentation/request",
                                                "headers": {
                                                    "CESR-DATE": res['date'],
                                                    "CESR-ATTACHMENT": res['attachment'],
                                                    "Content-Type": "application/cesr+json"
                                                },
                                                "body": JSON.parse(res['data'])
                                            }).catch(e => {
                                                console.log(e)
                                            })
                                        }).catch(e => {
                                            console.log(e)
                                        })
                                    }
                                }, "Request")
                            ])
                        ]
                    )
                ]
            ),
        ])
    }
};

module.exports = PresentationRequest;