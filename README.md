# Shortik

Shortik is a URL shortening and QR code generator web application that allows users to create short, memorable URLs and generate QR codes for any provided link. Additionally, users can track the number of times a shortened link has been accessed and download the generated QR codes.

## Features

- **URL Shortening:** Convert long URLs into short, easy-to-remember links.
- **QR Code Generation:** Generate QR codes for any URL provided.
- **Analytics Tracking:** Track the number of times a shortened URL has been clicked.
- **QR Code Download:** Users can download QR codes for offline use.
- **Authentication:** Token-based authentication for secure access.
- **RESTful API:** Built using Django REST Framework (DRF).

## Technologies Used

### Backend:
- **Python** (Django)
- **Django REST Framework (DRF)** for API development

### Frontend:
- **React.js (Vite)** for building the user interface

### Authentication:
- **Token-based authentication**

## Installation & Setup

### Prerequisites:
- Python 3.x
- Node.js & npm/yarn
- Django & Django REST Framework
- React.js (Vite)

### Backend Setup:
```bash
# Clone the repository
git clone https://github.com/yourusername/shortik.git
cd shortik/backend

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Run the server
python manage.py runserver
```

### Frontend Setup:
```bash
cd ../frontend

# Install dependencies
npm install  # or yarn install

# Start the frontend server
npm run dev  # or yarn dev
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/login/` | POST | User login |
| `/api/register/` | POST | User registration |
| `/api/logout/` | POST | User logout |
| `/api/user-details/` | GET | Retrieve user details |
| `/api/qr-generate/` | POST | Generate a QR code for a given URL |
| `/api/short-url/` | POST | Shorten a given URL |
| `/api/urls/` | GET | Retrieve all shortened URLs |
| `/api/redirect/<short_url>/` | GET | Redirect to the original URL from a short URL |

## Contributing
Feel free to contribute by opening an issue or submitting a pull request.

Happy coding! 🚀

