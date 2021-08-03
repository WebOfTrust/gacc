import json

import falcon
import requests
from keri.app import keeping, habbing
from keri.core import scheming, coring
from keri.core.coring import Serder
from keri.db import basing
from keri.peer import exchanging
from keri.peer.httping import CESR_CONTENT_TYPE
from keri.vc import proving


class IssueCredential:
    @staticmethod
    def on_post(req, resp):
        name = "controller"

        with basing.openDB(name=name, temp=False) as db, \
                keeping.openKS(name=name, temp=False) as ks:
            hab = habbing.Habitat(name=name, ks=ks, db=db, temp=False, create=False)

            schema = req.media.get("schema")
            source = None

            d = dict(
                i="",
                type=["VerifiableCredential",
                      "GLEIFvLEICredential"],
                LEI=req.media.get("LEI")
            )

            saider = scheming.Saider(sed=d, code=coring.MtrDex.Blake3_256, idder=scheming.Ids.i)
            d["i"] = saider.qb64

            cred = proving.credential(schema="E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4",
                                      issuer="EYNHFK056fqNSG_MDE7d_Eqk0bazefvd4eeQLMPPNBnM",
                                      subject=d,
                                      source=source)

            print(cred.pretty())

            issuepayload = dict(
                recipient="EhYpYZSUAtiEurF7XngDB2mII2khY9ktlfqKHd1NHfNY",
                data=d,
                schema="E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4"
            )

            serder = exchanging.exchange(route="/cmd/credential/issue", payload=issuepayload)
            msg = hab.sanction(serder=serder)
            ser = Serder(raw=msg)

            date = serder.ked['dt']
            attachment = msg[ser.size:].decode("utf-8")

            requests.post("http://localhost:5623/exn/cmd/credential/issue", data=json.dumps(serder.ked['q']),
                          headers={
                              "CESR-DATE": date,
                              "CESR-ATTACHMENT": attachment,
                              "Content-Type": CESR_CONTENT_TYPE
                          })
            resp.status = falcon.HTTP_202


class PresentationRequest:
    @staticmethod
    def on_get(req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        resp.content_type = falcon.MEDIA_TEXT  # Default is JSON, so override
        resp.text = ('\nTwo things awe me most, the starry sky '
                     'above me and the moral law within me.\n'
                     '\n'
                     '    ~ Immanuel Kant\n\n')

    @staticmethod
    def on_post(req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        resp.content_type = falcon.MEDIA_TEXT  # Default is JSON, so override
        resp.text = ('\nTwo things awe me most, the starry sky '
                     'above me and the moral law within me.\n'
                     '\n'
                     '    ~ Immanuel Kant\n\n')
