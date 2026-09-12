import http.server
import socketserver
import webbrowser
import threading
import time
import sys
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n[INFO] Local Server started at: http://localhost:{PORT}/dashboard/index.html")
        print("[INFO] Press Ctrl+C to stop the server.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[INFO] Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    # Launch browser after a short delay to ensure server is active
    print("[STARTING] Preparing local server for FMCG Financial Analytics Dashboard...")
    
    server_thread = threading.Thread(target=start_server)
    server_thread.daemon = True
    server_thread.start()
    
    # Small sleep before opening browser
    time.sleep(1)
    
    url = f"http://localhost:{PORT}/dashboard/index.html"
    print(f"[LAUNCHING] Opening web browser to {url} ...")
    webbrowser.open(url)
    
    # Keep main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[STOPPING] Shutting down...")
        sys.exit(0)
