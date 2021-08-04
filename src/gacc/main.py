from wsgiref.simple_server import make_server

import falcon
import handling

app = falcon.App(cors_enable=True)
app.add_route('/issue/credential', handling.IssueCredential())
app.add_route('/presentation/request', handling.PresentationRequest())
app.add_route('/mailbox/request', handling.MailboxRequest())

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()
