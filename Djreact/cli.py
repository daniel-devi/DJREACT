import click
from Djreact.commands import backendGenerator as backend
from Djreact.commands import frontendGenerator as frontend
from Djreact.commands import fullstackGenerator as fullstack

@click.group()
def cli():
    """DJReact - A ReactDJ Boilerplate Generator CLI.
    
    This is the main entry point for the CLI application that generates
    boilerplate code for Django backend, React frontend, or full-stack projects.
    
    Returns:
        None: This function serves as the main command group and doesn't return anything
    """
    pass
@cli.command()
@click.option('-name', default='Django-project Backend', help='Project name', type=str)
@click.option('-path', default='Django-Project', help='Destination path, leave empty for current directory')
def create_backend(name: str, path: str):
    """Generate a Django backend boilerplate project.
    
    This command creates a new Django backend project with the specified name
    at the given path location.
    
    Args:
        name (str): The name of the project to be created
        path (str): The destination path where the project will be generated
    """
    backend.generate_backend(name, path)

@cli.command()
@click.option('-name', default='React Project-TS', help='Project name')
@click.option('-path', default='React-Project', help='Destination path, leave empty for current directory')
@click.option('-framework', default='TS', help='Frontend framework (JS/TS)', type=click.Choice(['JS', 'TS'], case_sensitive=False))
def create_frontend(name: str, path: str, framework: str):
    """Generate a React frontend boilerplate project.
    
    This command creates a new React frontend project with the specified name
    at the given path location using either JavaScript or TypeScript.
    
    Args:
        name (str): The name of the project to be created
        path (str): The destination path where the project will be generated
        framework (str): The framework to use - either 'JS' or 'TS'
    """
    frontend.generate_frontend(name, path, framework)

@cli.command()
@click.option('-name', default='ReactDJ Project', help='Project name')
@click.option('-path', default='ReactDJ Project', help='Destination path')
def create_fullstack(name: str, path: str):
    """Generate a full-stack boilerplate project.
    
    This command creates a new full-stack project combining Django backend
    and React frontend with the specified name at the given path location.
    
    Args:
        name (str): The name of the project to be created
        path (str): The destination path where the project will be generated
    """
    fullstack.generate_fullstack(name, path)

def validate_project_name(name: str) -> bool:
    """Validate the project name.
    
    Args:
        name (str): The project name to validate
        
    Returns:
        bool: True if name is valid, False otherwise
    """
    return bool(name and name.strip())

def validate_path(path: str) -> bool:
    """Validate the project path.
    
    Args:
        path (str): The path to validate
        
    Returns:
        bool: True if path is valid, False otherwise
    """
    return bool(path and path.strip())

def main():
    """Main entry point for the CLI application."""
    cli()

if __name__ == '__main__':
    main()
