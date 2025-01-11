import os
import click
import shutil
import secrets
from pathlib import Path

# Base and templates directory paths
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = BASE_DIR / "templates/Django"

def validate_paths(template_path: Path, project_path: Path) -> bool:
    """
    Validate the template and project paths.
    
    Parameters:
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

def copy_template(template_path: Path, project_path: Path) -> bool:
    """
    Copy template files to project directory.
    
    Parameters:
        template_path (Path): Source template directory
        project_path (Path): Destination project directory
        
    Returns:
        bool: True if copy successful, False otherwise
    """
    try:
        shutil.copytree(template_path, project_path)
        return True
    except Exception as e:
        click.echo(f"Error copying template: {e}")
        return False

def rename_project_folder(project_path: Path, project_name: str) -> Path:
    """
    Rename the default Backend folder to project name.
    
    Parameters:
        project_path (Path): Path to project directory
        project_name (str): New name for the project
        
    Returns:
        Path: Path to renamed folder
    """
    backend_folder = project_path / "Backend"
    renamed_folder = project_path / project_name
    if backend_folder.exists():
        os.rename(backend_folder, renamed_folder)
    return renamed_folder

def setup_project_secrets(project_path: Path, settings_path: Path) -> str:
    """
    Generate and configure project secrets.
    
    Parameters:
        project_path (Path): Path to project directory
        settings_path (Path): Path to settings.py file
        
    Returns:
        str: Generated secret key
    """
    secret_key = secrets.token_urlsafe(50)
    
    # Update settings.py
    if settings_path.exists():
        with open(settings_path, 'r') as file:
            settings_content = file.read()
        settings_content = settings_content.replace('<GENERATE_SECRET_KEY>', secret_key)
        with open(settings_path, 'w') as file:
            file.write(settings_content)
    
    # Create .env file
    env_path = project_path / ".env"
    with open(env_path, 'w') as file:
        file.write(f"SECRET_KEY={secret_key}\n")
        
    return secret_key

def display_success_message(project_name: str, project_path: Path) -> None:
    """
    Display success message with setup instructions.
    
    Parameters:
        project_name (str): Name of the created project
        project_path (Path): Path to project directory
    """
    click.echo(
        f"\nDjango Backend boilerplate - '{project_name}' created at '{project_path}'.\n"
        "Please install the required dependencies using:\n\n"
        f"cd {project_path}\n"
        "pip install -r requirements.txt\n\n"
        "Start the development server with 'python manage.py runserver'\n"
    )

def generate_backend(pName: str, pPath: str) -> None:
    """
    Generate a Django backend boilerplate project.

    Parameters:
        pName (str): The name of the project. If an empty string is provided, 'Backend' is used as the default name.
        pPath (str): The path where the project will be created. Defaults to the current working directory if empty.
    """
    project_path = Path(pPath).resolve()
    template_path = TEMPLATES_DIR

    if not validate_paths(template_path, project_path):
        return

    click.echo(f"Creating Django backend project at {project_path}...")

    try:
        if not copy_template(template_path, project_path):
            return
            
        renamed_folder = rename_project_folder(project_path, pName)
        settings_path = renamed_folder / "settings.py"
        
        setup_project_secrets(project_path, settings_path)
        display_success_message(pName, project_path)
        
    except Exception as e:
        click.echo(f"Error: {e}")
