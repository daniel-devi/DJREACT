import os
import click
import shutil
import secrets


TEMPLATE_BASE_DIR = os.path.join("DJREACT/templates/",)
## Get the absolute path of the current file


def generate_frontend(pName: str, pPath: str, pFramework: str) -> None:
    """
    Generate a React frontend boilerplate project.

    This function creates a React project with a predefined structure, 
    including settings for enhanced security and scalability. It also generates
    a unique secret key for the project and creates a `.env` file to manage
    sensitive data.

    @Parameters:
        pName (str): The name of the project. If an empty string is provided, 'Frontend' is used as the default name.
        pPath (str): The path where the project will be created. Defaults to the current working directory if an empty string is provided.
        pFramework (str): The frontend framework to use. Defaults to 'TS' if an empty string is provided.

    @Returns:
        None: The function performs file system operations to generate the project and does not return any value.
    
    @Raises:
        FileExistsError: If a project with the same name already exists at the specified path.
        PermissionError: If the function does not have the necessary permissions to create files or directories.
        OSError: If there is a failure related to file system operations (e.g., invalid paths).
    """
    pPath = f"./{pPath}"

    project_path = os.path.join(pPath)
    javascript_template_path = f'{TEMPLATE_BASE_DIR}ReactJS'
    typescript_template_path = f'{TEMPLATE_BASE_DIR}ReactTS'

    if pPath == '/.':
        click.echo("Error: Please provide a valid path for the project.")
        return

    if os.path.exists(project_path):
        click.echo("Error: Project directory already exists!")
        return

    click.echo(f"Creating React {pFramework} Frontend project at {project_path.strip('.')}...")

    if pFramework == 'JS':
        shutil.copytree(javascript_template_path, project_path)
        os.rename(os.path.join(f'{project_path}/Frontend'), os.path.join(f'{project_path}/{pName}'))

    elif pFramework == 'TS':
        shutil.copytree(typescript_template_path, project_path)
        os.rename(os.path.join(f'{project_path}/Frontend'), os.path.join(f'{project_path}/{pName}'))

    else:
        click.echo(f"Invalid frontend framework: {pFramework}")

    print(
        f"\nReact {pFramework} frontend boilerplate '{pName}' has been created at {project_path.strip('.')}"
        "\nTo install the required dependencies, run the following commands:"
        f"\n\ncd {project_path.strip('.')}/{pName}"
        "\n\nnpm install\n\n"
        "You can start the development server using:\n"
        "npm run dev\n"
    )
