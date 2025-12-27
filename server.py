import http.server
import socketserver
import os

PORT = 8000

class CleanURLRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # If the path doesn't exist, try appending .html
        if not os.path.exists(self.translate_path(self.path)):
            # Check if adding .html helps
            if os.path.exists(self.translate_path(self.path + ".html")):
                self.path = self.path + ".html"
                
        return super().do_GET()

Handler = CleanURLRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Clean URLs are enabled (e.g. /services -> /services.html)")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
