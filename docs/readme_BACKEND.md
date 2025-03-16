# Backend Boilerplate Generator Documentation

## Overview

The `createBackend` command allows developers to quickly scaffold a Django backend project with pre-configured settings, apps, templates, static files, and essential project structure, enabling you to focus on development rather than setup.

---

## Command Usage

```bash
python djreact createBackend --name <project-name> --path <directory-path>
```

### Options:

| Option      | Description                                   | Required | Default           |
|-------------|-----------------------------------------------|----------|------------------|
| `--name`    | Name of the Django project                    | No       | backend_project  |
| `--path`    | Directory path where the project will be created | No       | ./backend        |


### Example:

```bash
python djreact createBackend --name BlogBackend --path blog-backend
```

This command will create a Django backend project named `BlogBackend` inside the `blog-backend` directory.

---

## Project Structure

```
backend/
├── BlogBackend/            # Django project folder
│   ├── settings.py         # Project settings
│   ├── urls.py             # Main URL configurations
│   ├── wsgi.py             # WSGI config
│   ├── asgi.py             # ASGI config
│
├── apps/                  # Modular Django apps
│   ├── authentication/    # Auth system (login, register, etc.)
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   ├── core/              # Core app for main functionalities
│       └── ...
│
├── templates/             # HTML templates
│   ├── base.html          # Base template
│   ├── core/
│   │   └── index.html
│   ├── authentication/
│       └── login.html
│
├── static/                # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── img/
│
├── docs/                  # Documentation folder
│
├── manage.py              # Django CLI management tool
├── requirements.txt       # Python dependencies
└── README.md              # Project README
```

---

## Features and Benefits

- **Pre-built Authentication System**: Comes with a ready-to-use user authentication system (login, register, password reset).
- **Core App**: Main app included for easy expansion of backend functionalities.
- **Template and Static File Support**: Organized and ready for HTML/CSS/JS assets.
- **Modular Structure**: Easily extendable and follows Django's best practices.

---

## After Generation: Getting Started

### 1. Navigate to the Backend Directory:
```bash
cd <directory-path>
```

### 2. Create and Activate Virtual Environment (Recommended):
```bash
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate    # Windows
```

### 3. Install Dependencies:
```bash
pip install -r requirements.txt
```

### 4. Run Migrations:
```bash
python manage.py migrate
```

### 5. Start the Development Server:
```bash
python manage.py runserver
```


---

## Next Steps

- **Add More Apps**: Use `python manage.py startapp <app_name>` to add more functionality.
- **Connect Frontend**: Easily integrate with React using the ReactDJ boilerplate.
- **Set Up Production**: Configure settings for production environments (ALLOWED_HOSTS, Static Roots, etc.).

---

## Contribution

Feel free to fork, extend, and contribute to this boilerplate generator. Submit PRs for any improvements or additional features.

---

## License

MIT License

---

**Created with ❤️ by ReactDJ Team**

