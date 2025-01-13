import os
import json
import click
import shutil
from pathlib import Path
from .removeINITfile import remove_init_files

# Correctly resolve the base directory for templates
TEMPLATE_BASE_DIR = Path(__file__).resolve().parent.parent / "templates"

def validate_template_directory() -> bool:
    """
    Validate if the template base directory exists.
    
    Returns:
        bool: True if directory exists, False otherwise
    """
    if not TEMPLATE_BASE_DIR.exists():
        click.echo(f"Error: Template base directory does not exist at {TEMPLATE_BASE_DIR}")
        return False
    return True

def validate_project_path(pPath: str, project_path: Path) -> bool:
    """
    Validate the project path for invalid patterns and existing directories.
    
    Parameters:
        pPath (str): The raw project path string
        project_path (Path): The resolved Path object
        
    Returns:
        bool: True if path is valid, False otherwise
    """
    invalid_paths = ['/.', '/\\', '/././', './.']
    if pPath in invalid_paths:
        click.echo("Error: Please provide a valid path for the project.")
        return False
        
    if project_path.exists():
        click.echo("Error: Project directory already exists!")
        return False
    
    return True

def setup_project_structure(pFramework: str, project_path: Path) -> bool:
    """
    Set up the initial project structure by copying template files.
    
    Parameters:
        pFramework (str): The frontend framework to use (JS/TS)
        project_path (Path): The target project path
        
    Returns:
        bool: True if setup successful, False otherwise
    """
    javascript_template_path = TEMPLATE_BASE_DIR / "ReactJS"
    typescript_template_path = TEMPLATE_BASE_DIR / "ReactTS"
    
    try:
        if pFramework == 'JS':
            shutil.copytree(javascript_template_path, project_path)
        elif pFramework == 'TS':
            shutil.copytree(typescript_template_path, project_path)
        else:
            click.echo(f"Invalid frontend framework: {pFramework}")
            return False
        return True
    except FileNotFoundError as e:
        click.echo(f"Error: Template not found. {e}")
    except PermissionError as e:
        click.echo(f"Error: Permission denied. {e}")
    except OSError as e:
        click.echo(f"Error: OS error. {e}")
    return False

def rename_project_directory(project_path: Path, pName: str) -> Path:
    """
    Rename the default Frontend directory to the specified project name.
    
    Parameters:
        project_path (Path): The project base path
        pName (str): The new project name
        
    Returns:
        Path: The new project path
    """
    new_project_name_path = project_path / pName
    os.rename(project_path / "Frontend", new_project_name_path)
    return new_project_name_path

def update_package_json_name(project_path: Path, pName: str) -> None:
    """
    Update the `name` field in the `package.json` file to match the project name.

    Parameters:
        project_path (Path): The project directory path
        pName (str): The new project name

    Returns:
        None
    """
    package_json_path = project_path / "package.json"
    if not package_json_path.exists():
        click.echo(f"Warning: package.json not found in {project_path}. Skipping name update.")
        click.echo("Please update the `name` field in package.json manually.")
        return

    try:
        with open(package_json_path, "r") as file:
            package_data = json.load(file)

        package_data["name"] = pName

        with open(package_json_path, "w") as file:
            json.dump(package_data, file, indent=2)

        click.echo(f"Updated `name` field in package.json to '{pName}'.")
    except (json.JSONDecodeError, IOError) as e:
        click.echo(f"Error updating package.json: {e}")

def display_success_message(pFramework: str, pName: str, project_path: Path, new_project_name_path: Path) -> None:
    """
    Display the success message with setup instructions.
    
    Parameters:
        pFramework (str): The frontend framework used
        pName (str): The project name
        project_path (Path): The project base path
        new_project_name_path (Path): The renamed project path
    """
    click.echo(
        f"\nReact {pFramework} frontend boilerplate '{pName}' has been created at {project_path}"
        "\nTo install the required dependencies, run the following commands:"
        f"\n\ncd {new_project_name_path}"
        "\n\nnpm install\n\n"
        "You can start the development server using:\n"
        "npm run dev\n"
    )

def generate_frontend(pName: str, pPath: str, pFramework: str) -> None:
    """
    Generate a React frontend boilerplate project.

    Parameters:
        pName (str): The name of the project. If an empty string is provided, 'Frontend' is used as the default name.
        pPath (str): The path where the project will be created. Defaults to the current working directory if empty.
        pFramework (str): The frontend framework to use. Defaults to 'TS' if an empty string is provided.

    Returns:
        None
    """
    if not validate_template_directory():
        return

    project_path = Path(pPath).resolve()
    if not validate_project_path(pPath, project_path):
        return

    click.echo(f"Creating React {pFramework} Frontend project at {project_path}...")

    if not setup_project_structure(pFramework, project_path):
        return

    new_project_name_path = rename_project_directory(project_path, pName)

    # Update the `name` field in package.json
    update_package_json_name(new_project_name_path, pName)
    
    # Remove the __init__.py file from the project directory
    remove_init_files(new_project_name_path)
    
    display_success_message(pFramework, pName, project_path, new_project_name_path)
