# DJReact Boilerplate Generator
**Version 2**

**DJReact** is a powerful CLI tool for rapidly generating **React**, **Django**, and **Full-stack** (React + Django) boilerplate projects — pre-configured and ready to scale.

---

## Features

- **React Frontend** (TypeScript/JavaScript) boilerplate.
- **Django Backend** boilerplate with modular structure and essential apps.
- **Full-stack React-Django integration** with seamless API connections.
- Clean, minimal, and extensible setup for production-ready projects.
- Easy, developer-friendly CLI commands for quick scaffolding.

---

## ⚙️ Prerequisites

Ensure these are installed:

- **Python 3.8+**
- **Node.js & npm/yarn**
- **Django** (Install with `pip install django`)

---

## 📦 Installation

```bash
git clone https://github.com/daniel-devi/DJREACT.git
cd DJREACT
pip install .
```

✅ You can now use `djreact` as a global command.

---

## 🚨 Usage

### Command Overview

| Command                   | Description                            |
|--------------------------|----------------------------------------|
| `djreact create-backend`  | Generate Django backend boilerplate    |
| `djreact create-frontend` | Generate React frontend boilerplate    |
| `djreact create-fullstack`| Generate Full-stack (Django + React)   |
| `djreact create-djreact`  | Full-stack (customizable prompts)      |

---

## 🔑 Commands & Options

### 1. **Create Django Backend**

```bash
djreact create-backend --name <project-name> --path <directory-path>
```

- `--name`: (Optional) Project name. Default: `Django-project Backend`
- `--path`: (Optional) Destination path. Default: `Django-Project`

**Example:**
```bash
djreact create-backend --name my-backend --path backend
```

---

### 2. **Create React Frontend**

```bash
djreact create-frontend --name <project-name> --path <directory-path> --framework <JS/TS>
```

- `--name`: (Optional) Project name. Default: `React Project-TS`
- `--path`: (Optional) Destination path. Default: `React-Project`
- `--framework`: (Optional) Choose between `JS` (JavaScript) or `TS` (TypeScript). Default: `TS`

**Example:**
```bash
djreact create-frontend --name my-frontend --path frontend --framework TS
```

---

### 3. **Create Full-stack (React + Django)**

```bash
djreact create-fullstack --name <project-name> --path <directory-path>
```

- `--name`: (Optional) Project name. Default: `ReactDJ Project`
- `--path`: (Optional) Destination path. Default: `ReactDJ Project`

**Example:**
```bash
djreact create-fullstack --name my-fullstack-app --path fullstack
```

---

### 4. **Interactive Full-stack (DJReact)**

```bash
djreact create-djreact
```

- **Prompts for:**
  - `Project name`
  - `Destination path`

Safer interactive version for custom generation.

---

## 📁 Output Project Structure

### Frontend (React)
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx / App.js
│   └── index.tsx / index.js
├── package.json
└── README.md
```

### Backend (Django)
```
backend/
├── <project-name>/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── apps/
│   ├── core/
│   └── authentication/
├── templates/
│   └── (Jinja templates & static files)
├── manage.py
└── README.md
```

### Full-stack (React + Django)
```
fullstack/
├── frontend/
│   └── (React project)
├── backend/
│   └── (Django project)
└── README.md
```

---

## 🗂️ File-Specific Documentation

For **detailed breakdowns**, check:

- [Frontend Boilerplate Docs](docs/readme-frontend.md)
- [Backend Boilerplate Docs](docs/readme-backend.md)
- [Full-stack ReactDJ Docs](docs/readme-reactdj.md)

---

## ✅ Example Workflow

```bash
# Generate Django backend
djreact create-backend --name my-backend --path backend

# Generate React frontend in TypeScript
djreact create-frontend --name my-frontend --path frontend --framework TS

# Generate integrated React-Django project
djreact create-fullstack --name my-fullstack --path fullstack

# Or use interactive mode
djreact create-djreact
```

---

## 💬 Contributing

Contributions are welcome! Please submit pull requests or issues to help improve this tool for the community.

---

## 📄 License

MIT License © 2024 Daniel Devi

---