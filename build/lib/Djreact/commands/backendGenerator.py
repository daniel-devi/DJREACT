import os
import click
import shutil
import secrets
from pathlib import Path

# Base and templates directory paths
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = BASE_DIR / "templates/Django"

def generate_backend(pName: str, pPath: str) -> None:
    """
    Generate a Django backend boilerplate project.

    Parameters:
        pName (str): The name of the project. If an empty string is provided, 'Backend' is used as the default name.
        pPath (str): The path where the project will be created. Defaults to the current working directory if an empty string is provided.
    """
    # Resolve the project path
    project_path = Path(pPath).resolve()
    template_path = TEMPLATES_DIR

    # Validate inputs
    if not template_path.exists():
        click.echo(f"Error: Template directory does not exist at {template_path}")
        return

    if project_path.exists():
        click.echo("Error: Project directory already exists!")
        return

    click.echo(f"Creating Django backend project at {project_path}...")

    try:
        # Copy the template to the specified location
        shutil.copytree(template_path, project_path)

        # Rename the 'Backend' folder to the project name
        backend_folder = project_path / "Backend"
        renamed_folder = project_path / pName
        if backend_folder.exists():
            os.rename(backend_folder, renamed_folder)

        # Generate a SECRET_KEY
        secret_key = secrets.token_urlsafe(50)
        settings_path = renamed_folder / "settings.py"
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

        click.echo(
            f"\nDjango Backend boilerplate - '{pName}' created at '{project_path}'.\n"
            "Please install the required dependencies using:\n\n"
            f"cd {project_path}\n"
            "pip install -r requirements.txt\n\n"
            "Start the development server with 'python manage.py runserver'\n"
        )
    except Exception as e:
        click.echo(f"Error: {e}")
