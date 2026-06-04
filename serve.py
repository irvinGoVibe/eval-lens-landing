#!/usr/bin/env python3
"""
Static file server with HTTP Range request support.
Safari requires Range support for <video> playback — Python's built-in
http.server doesn't provide it, which is why videos won't play in Safari
when served by `python3 -m http.server`.

Usage: python3 serve.py [port]   (default port: 5173)
"""
import os
import re
import sys
import mimetypes
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class RangeHTTPRequestHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        if not os.path.exists(path):
            self.send_error(404)
            return None

        ctype = mimetypes.guess_type(path)[0] or "application/octet-stream"
        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404)
            return None

        fs = os.fstat(f.fileno())
        size = fs.st_size

        range_header = self.headers.get("Range")
        if range_header:
            m = re.match(r"bytes=(\d*)-(\d*)", range_header)
            if m:
                start_s, end_s = m.groups()
                start = int(start_s) if start_s else 0
                end = int(end_s) if end_s else size - 1
                end = min(end, size - 1)
                if start > end or start >= size:
                    self.send_error(416, "Requested Range Not Satisfiable")
                    f.close()
                    return None
                length = end - start + 1
                self.send_response(206)
                self.send_header("Content-Type", ctype)
                self.send_header("Accept-Ranges", "bytes")
                self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
                self.send_header("Content-Length", str(length))
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                f.seek(start)
                return _BoundedReader(f, length)

        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(size))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        return f


class _BoundedReader:
    """Reads at most `length` bytes from `f`, then closes it."""
    def __init__(self, f, length):
        self.f = f
        self.remaining = length

    def read(self, n=-1):
        if self.remaining <= 0:
            return b""
        if n < 0 or n > self.remaining:
            n = self.remaining
        chunk = self.f.read(n)
        self.remaining -= len(chunk)
        return chunk

    def close(self):
        try:
            self.f.close()
        except Exception:
            pass


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    with ThreadingHTTPServer(("0.0.0.0", port), RangeHTTPRequestHandler) as httpd:
        print(f"Serving with Range support at http://127.0.0.1:{port}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nbye")


if __name__ == "__main__":
    main()
