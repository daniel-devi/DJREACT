# Boilerplate Generator

The Boilerplate Generator is a CLI tool designed to quickly set up frontend and backend projects with pre-configured features and templates. It supports:
- Frontend projects using React (JavaScript or TypeScript).
- Backend projects using Django.
- Full-stack projects with React and Django integration.

This tool simplifies project initialization, saving time and effort while ensuring consistency and best practices.

---

## Features

- Generate React projects with support for TypeScript or JavaScript.
- Create Django project boilerplates with pre-configured settings.
- Build ReactDJ boilerplates for integrated React-Django workflows.
- Add optional features such as state management, authentication, and Docker support.
- Interactive CLI for seamless project setup.

---

## Setup Instructions

### Prerequisites

Before using the Boilerplate Generator, ensure the following are installed:
- Python 3.8+
- Node.js and npm/yarn
- Django (`pip install django`)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd boilerplate-generator
   ```

2. Install required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. (Optional) Set up the project as a global CLI tool:
   ```bash
   python setup.py install
   ```

---

## Usage

The CLI provides commands to generate boilerplates for different use cases. Below are the primary commands and their usage:

### 1. Generate Frontend Boilerplate

```bash
python cli.py createFrontend --name <project-name> --path <directory-path> --framework <JS/TS>
```
- **Options:**
  - `--name`: Name of the project.
  - `--path`: Directory path to create the project.
  - `--framework`: Choose `JS` for JavaScript or `TS` for TypeScript.

**Example:**
```bash
python cli.py createFrontend --name MyReactApp --path ./frontend --framework TS
```

---

### 2. Generate Backend Boilerplate

```bash
python cli.py createBackend --name <project-name> --path <directory-path>
```
- **Options:**
  - `--name`: Name of the Django project.
  - `--path`: Directory path to create the project.

**Example:**
```bash
python cli.py createBackend --name MyDjangoApp --path ./backend
```

---

### 3. Generate ReactDJ Boilerplate

```bash
python cli.py createReactDJ --name <project-name> --path <directory-path> --framework <JS/TS>
```
- **Options:**
  - `--name`: Name of the full-stack project.
  - `--path`: Directory path to create the project.
  - `--framework`: Choose `JS` for JavaScript or `TS` for TypeScript.

**Example:**
```bash
python cli.py createReactDJ --name MyFullStackApp --path ./fullstack --framework TS
```

---

## Output Structure

Each generated project follows a standard structure for maintainability and scalability:

### Frontend Boilerplate:
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
└── README.md
```

### Backend Boilerplate:
```
backend/
├── <project-name>/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── asgi.py
├── manage.py
├── requirements.txt
└── README.md
```

### Full-Stack (ReactDJ) Boilerplate:
```
fullstack/
├── frontend/
│   ├── public/
│   ├── src/
├── backend/
│   ├── <project-name>/
├── docker-compose.yml
└── README.md
```

---

## Additional Commands

See the individual README files for detailed explanations on each command and their outputs:

- [Frontend Command README](docs/readme-frontend.md)
- [Backend Command README](docs/readme-backend.md)
- [ReactDJ Command README](docs/readme-reactdj.md)
