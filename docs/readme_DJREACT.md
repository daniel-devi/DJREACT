# ReactDJ Full-Stack Boilerplate Generator Documentation

## Overview

The `createReactDJ` command scaffolds a full-stack boilerplate that integrates a React (frontend) and Django (backend) project with a pre-configured setup for seamless development. Perfect for building modern web apps with a powerful Python backend and a flexible React frontend.

---

## Command Usage

```bash
python djreact createReactDJ --name <project-name> --path <directory-path>
```

### Options:

| Option      | Description                                   | Required | Default           |
|-------------|-----------------------------------------------|----------|------------------|
| `--name`    | Name of the full-stack project                | No       | react_django_app |
| `--path`    | Directory path where the project will be created | No       | ./fullstack       |


### Example:

```bash
python djreact createReactDJ --name SocialPlatform --path social-platform
```

This command will create a full-stack project called `SocialPlatform` inside the `social-platform` directory.

---

## Output Structure

```
fullstack/
├── frontend/             # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── README.md
│   └── .env
│
├── backend/              # Django backend
│   ├── <project-name>/   # Django project folder
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── apps/             # Modular apps (auth, core, etc.)
│   ├── templates/        # HTML templates
│   ├── static/           # Static files (CSS, JS, images)
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
│
├── docs/                # Documentation folder
└── README.md            # Main project README
```

---

## Features and Benefits

- **Integrated Frontend & Backend**: React and Django projects are linked for efficient full-stack development.
- **Pre-configured API Connection**: Comes with example setup to connect React frontend to Django backend via API.
- **Authentication & Core Features**: Backend includes authentication system; frontend has starter pages and components.
- **Shared Docs Folder**: A shared space for documenting both frontend and backend.

---

## After Generation: Getting Started

### 1. Navigate to Your Project:
```bash
cd <directory-path>
```

### 2. Setup Backend

#### a. Virtual Environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate    # Windows
```

#### b. Install Dependencies:
```bash
pip install -r requirements.txt
```

#### c. Run Migrations:
```bash
python manage.py migrate
```

#### d. Run Backend Server:
```bash
python manage.py runserver
```


### 3. Setup Frontend

```bash
cd ../frontend
npm install   # or yarn install
npm run dev   # or yarn dev
```


### 4. Connect Frontend to Backend

- Ensure Django backend API is running (default at `http://127.0.0.1:8000/`).
- Update React frontend `.env` to point to backend API URL:

```
REACT_APP_API_URL=http://127.0.0.1:8000/api/
```


---

## Advanced: Production Setup

- **Backend**: Set `DEBUG=False` and configure production settings (ALLOWED_HOSTS, CORS, STATIC_ROOT).
- **Frontend**: Build production-ready static files using `npm run build` and serve them with Django or a separate hosting service.
- **Deployment**: Suggested platforms: Railway, Render, Heroku, Vercel (for frontend), AWS, DigitalOcean.


---

## Contribution

Feel free to contribute improvements, bug fixes, and new features. Submit a pull request or open an issue.

---

## License

MIT License

---

**Created with ❤️ by ReactDJ Team**

