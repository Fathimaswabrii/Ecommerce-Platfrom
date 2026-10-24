# Simple E-commerce Product App

A React and Django REST Framework project. Users can sign up, log in, view products, and manage their own products.

## Features

- User signup and login
- List products
- Add, edit, and delete your own products
- JWT authentication

## Requirements

- Python 3.12
- Node.js 20.19+ or 22.12+

## Run the Django backend

Open PowerShell:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py migrate
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000`.

## Run the React frontend

Open a second PowerShell window:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Main API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/signup/` | Create an account |
| `POST` | `/api/token/` | Log in and get a JWT |
| `GET` | `/api/products/` | List products |
| `POST` | `/api/products/` | Add a product |
| `PUT` | `/api/products/{id}/` | Edit your product |
| `DELETE` | `/api/products/{id}/` | Delete your product |

Product changes require a valid access token. Each product is assigned to the signed-in user who creates it.
