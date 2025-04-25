from app import app

# Create an ASGI application using Flask's WSGI application
from uvicorn.middleware.wsgi import WSGIMiddleware

# Wrap the Flask app in an ASGI wrapper
app = WSGIMiddleware(app)