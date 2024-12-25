import os
import click
import shutil
from pathlib import Path
from .removeINITfile import remove_init_files

# Correctly resolve the base directory for templates
TEMPLATE_BASE_DIR = Path(__file__).resolve().parent.parent / "templates"


def generate_frontend(pName: str, pPath: str, pFramework: str) -> None:
    """
    Generate a React frontend boilerplate project.

    Parameters:
        pName (str): The name of the project. If an empty string is provided, 'Frontend' is used as the default name.
        pPath (str): The path where the project will be created. Defaults to the current working directory if an empty string is provided.
        pFramework (str): The frontend framework to use. Defaults to 'TS' if an empty string is provided.

    Returns:
        None
    """
    # Validate TEMPLATE_BASE_DIR
    if not TEMPLATE_BASE_DIR.exists():
        click.echo(f"Error: Template base directory does not exist at {TEMPLATE_BASE_DIR}")
        return

    # Resolve the project path
    project_path = Path(pPath).resolve()
    javascript_template_path = TEMPLATE_BASE_DIR / "ReactJS"
    typescript_template_path = TEMPLATE_BASE_DIR / "ReactTS"

    # Check for invalid project paths
    invalid_paths = ['/.', '/\\', '/././', './.']
    if pPath in invalid_paths:
        click.echo("Error: Please provide a valid path for the project.")
        return

    # Check if the project directory already exists
    if project_path.exists():
        click.echo("Error: Project directory already exists!")
        return

    click.echo(f"Creating React {pFramework} Frontend project at {project_path}...")

    try:
        if pFramework == 'JS':
            shutil.copytree(javascript_template_path, project_path)
        elif pFramework == 'TS':
            shutil.copytree(typescript_template_path, project_path)
        else:
            click.echo(f"Invalid frontend framework: {pFramework}")
            return

        # Rename the main folder inside the project path
        new_project_name_path = project_path / pName
        os.rename(project_path / "Frontend", new_project_name_path)

        # Remove the __init__.py file from the project directory
        remove_init_files(new_project_name_path)
        
        # Success message
        click.echo(
            f"\nReact {pFramework} frontend boilerplate '{pName}' has been created at {project_path}"
            "\nTo install the required dependencies, run the following commands:"
            f"\n\ncd {new_project_name_path}"
            "\n\nnpm install\n\n"
            "You can start the development server using:\n"
            "npm run dev\n"
        )
    except FileNotFoundError as e:
        click.echo(f"Error: Template not found. {e}")
    except PermissionError as e:
        click.echo(f"Error: Permission denied. {e}")
    except OSError as e:
        click.echo(f"Error: OS error. {e}")
