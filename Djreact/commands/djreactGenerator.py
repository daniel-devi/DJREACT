import os
import click
import shutil
import secrets
from pathlib import Path
from .removeINITfile import remove_init_files

# Resolve templates directory dynamically
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = BASE_DIR / "templates/DReact"

def validate_paths(template_path: Path, project_path: Path) -> bool:
    """
    Validate the template and project paths.
    
    Args:
        template_path (Path): Path to the template directory
        project_path (Path): Path where project will be created
        
    Returns:
        bool: True if paths are valid, False otherwise
    """
    if not template_path.exists():
        click.echo(f"Error: Template directory does not exist at {template_path}")
        return False

    if project_path.exists():
        click.echo("Error: Project directory already exists!")
        return False
    
    return True

def copy_template(template_path: Path, project_path: Path) -> None:
    """
    Copy template directory to project path.
    
    Args:
        template_path (Path): Source template directory
        project_path (Path): Destination project directory
    """
    shutil.copytree(template_path, project_path)

def rename_backend_folder(project_path: Path, project_name: str) -> Path:
    """
    Rename the Backend folder to project name.
    
    Args:
        project_path (Path): Project root directory
        project_name (str): Name of the project
        
    Returns:
        Path: Path to renamed backend folder
    """
    backend_folder = project_path / "Boilerplate"
    renamed_folder = project_path / project_name
    if backend_folder.exists():
        os.rename(backend_folder, renamed_folder)
    return renamed_folder

def setup_project_structure(project_path: Path, template_path: Path, project_name: str) -> tuple[Path, Path]:
    """
    Set up the initial project structure by copying templates and renaming directories.
    
    Args:
        project_path (Path): Path where project will be created
        template_path (Path): Path to the template directory
        project_name (str): Name of the project
        
    Returns:
        tuple: Renamed backend folder path and frontend folder path
    """
    copy_template(template_path, project_path)
    renamed_folder = rename_backend_folder(project_path, project_name)
    frontend_path = project_path / "frontend"
    return renamed_folder, frontend_path

def update_settings_file(settings_path: Path, secret_key: str) -> None:
    """
    Update Django settings file with generated secret key.
    
    Args:
        settings_path (Path): Path to settings.py file
        secret_key (str): Generated secret key
    """
    if settings_path.exists():
        with open(settings_path, 'r') as file:
            settings_content = file.read()
        settings_content = settings_content.replace('<GENERATE_SECRET_KEY>', secret_key)
        with open(settings_path, 'w') as file:
            file.write(settings_content)

def create_env_file(env_path: Path, secret_key: str) -> None:
    """
    Create .env file with secret key.
    
    Args:
        env_path (Path): Path to .env file
        secret_key (str): Generated secret key
    """
    with open(env_path, 'w') as file:
        file.write(f"SECRET_KEY={secret_key}\n")
        file.write(f"DEBUG=True")
        file.write(f"ALLOWED_HOST=['http://localhost:5173/']")
        file.write(f"EMAIL_HOST=<your_email_host>")
        file.write(f"EMAIL_PORT=<your_email_port>")
        file.write(f"EMAIL_HOST_USER=<your_email_host_user>")
        file.write(f"EMAIL_HOST_PASSWORD=<your_email_host_password>")
        file.write(f"REDIS_HOST=<your_redis_host>")
        file.write(f"REDIS_PORT=<your_redis_port>")
        file.write(f"REDIS_DB=<your_redis_db>")
        file.write(f"SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=<your_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY>")
        file.write(f"SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=<your_SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET>")
        file.write(f"STRIPE_TEST_SECRET_KEY=<your_STRIPE_TEST_SECRET_KEY>")
        file.write(f"STRIPE_TEST_PUBLISHABLE=<your_STRIPE_TEST_PUBLISHABLE>")


def setup_secret_key(renamed_folder: Path, project_path: Path, project_name: str) -> None:
    """
    Generate and set up the secret key in settings and .env file.
    
    Args:
        renamed_folder (Path): Path to the renamed backend folder
        project_path (Path): Path where project will be created
        project_name (str): Name of the project
    """
    secret_key = secrets.token_urlsafe(50)
    settings_path = renamed_folder / "settings.py"
    env_path = project_path / project_name / ".env"
    
    update_settings_file(settings_path, secret_key)
    create_env_file(env_path, secret_key)

def display_success_message(project_name: str, project_path: Path) -> None:
    """
    Display the success message with setup instructions.
    
    Args:
        project_name (str): Name of the project
        project_path (Path): Path where project was created
    """
    click.echo(
        f"\nDjreact Boilerplate - '{project_name}' created at '{project_path}'.\n"
        "Please install the backend dependencies using:\n\n"
        f"cd {project_path / 'Boilerplate'}\n"
        "pip install -r requirements.txt\n\n"
        "py manage.py migrate\n\n"
        "Start the development server with 'python manage.py runserver'\n\n"
        "To install the required frontend dependencies, run the following commands:\n\n"
        f"cd {project_path / 'frontend'}\n"
        "npm install\n\n"
        "Start the frontend development server using:\n"
        "npm run dev\n"
    )

def generate_djreact(pName: str, pPath: str) -> None:
    """
    Generate a New Django React full-stack boilerplate project.
    
    Args:
        pName (str): Name of the project
        pPath (str): Path where project will be created
    """
    project_path = Path(pPath or '.').resolve()
    template_path = TEMPLATES_DIR

    if not validate_paths(template_path, project_path):
        return

    try:
        click.echo(f"Creating full-stack project at {project_path}...")
        
        renamed_folder, frontend_path = setup_project_structure(project_path, template_path, pName)
        remove_init_files(frontend_path)
        setup_secret_key(renamed_folder, project_path, pName)
        display_success_message(pName, project_path)

    except Exception as e:
        click.echo(f"Error: {e}")
