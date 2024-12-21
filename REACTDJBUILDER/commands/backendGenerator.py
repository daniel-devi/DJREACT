import os
import click
import shutil
import secrets

TEMPLATES_DIR = os.path.join("DJREACT/templates/Django",)

def generate_backend(pName: str, pPath: str) -> None:
    """
    Generate a Django backend boilerplate project.

    This function creates a Django project with a predefined structure, 
    including settings for enhanced security and scalability. It also generates
    a unique secret key for the project and creates a `.env` file to manage
    sensitive data.

    @Parameters:
        pName (str): The name of the project. If an empty string is provided, 'Backend' is used as the default name.
        pPath (str): The path where the project will be created. Defaults to the current working directory if an empty string is provided.

    @Returns:
        None: The function performs file system operations to generate the project and does not return any value.
    
    @Raises:
        FileExistsError: If a project with the same name already exists at the specified path.
        PermissionError: If the function does not have the necessary permissions to create files or directories.
        OSError: If there is a failure related to file system operations (e.g., invalid paths).
    """
    pPath = f"./{pPath}"

    project_path = os.path.join(pPath)
    template_path = TEMPLATES_DIR

    if pPath == './.' or pPath == '.\\' or pPath == './././':
        click.echo("Error: Please provide a valid path for the project.")
        return

    if os.path.exists(project_path):
        click.echo("Error: Project directory already exists!")
        return

    click.echo(f"Creating Django backend project at {project_path.strip('.')}....")
    shutil.copytree(template_path, project_path)

    # Rename the project folder to the provided name
    os.rename(os.path.join(f'{project_path}/Backend'), os.path.join(f'{project_path}/{ pName}'))

    # Generate SECRET_KEY
    secret_key = secrets.token_urlsafe(50)
    settings_path = os.path.join(f'{project_path}/{pName}/settings.py')
    with open(settings_path, 'r') as file:
        settings_content = file.read()

    settings_content = settings_content.replace('<GENERATE_SECRET_KEY>', secret_key)
    with open(settings_path, 'w') as file:
        file.write(settings_content)

    # Create .env file
    env_path = os.path.join(project_path, '.env')
    with open(env_path, 'w') as file:
        file.write(f"SECRET_KEY={secret_key}\n")

    print(
        f"\nDjango Backend boilerplate - '{pName}' created at '{project_path.strip('.')}'.\n"
        "Please install the required dependencies using:\n\n"
        f"cd {project_path.strip('.')}\n"
        "pip install -r requirements.txt\n\n"
        "Start the development server with 'python manage.py runserver'"
    )
