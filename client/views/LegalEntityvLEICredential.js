let m = require("mithril");

let lei = "";

let LegalEntityvLEICredential = {
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "Legal Entity vLEI Credential")
            ]),
            m("div", {"class": "w3-panel w3-leftbar w3-light-grey w3-margin"}, [
                m("p", {"class": "w3-serif"}, "A vLEI Credential issued by a Qualified vLEI issuer to a Legal Entity")
            ]),
            m("div",
                [
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
                            m("button", {
                                "class": "w3-btn w3-blue-grey w3-margin-top w3-margin-bottom",
                                onclick: function () {
                                    // noinspection JSUnresolvedVariable
                                    m.request({
                                        "method": "POST",
                                        "url": GACC_SERVER_URL + "/issue/credential",
                                        "body": {
                                            "LEI": lei,
                                            "schema": "E-BRq9StLuC9DxGgiFiy2XND0fFgzyn8cjptlcdvGEFY",
                                            "type": "LegalEntityvLEICredential"
                                        },
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

module.exports = LegalEntityvLEICredential;