import click
from Djreact.commands import backendGenerator as backend
from Djreact.commands import frontendGenerator as frontend
from Djreact.commands import fullstackGenerator as fullstack

@click.group()
def cli():
    """DJReact- A ReactDJ Boilerplate Generator CLI."""
    pass

@cli.command()
@click.option('-name', default='Django-project Backend', help='Project name', type=str)
@click.option('-path', default='Django', help='Destination path, leave empty for current directory')
def createBackend(name, path):
    """Generate a Django backend boilerplate.
    
    Args:
        name (str): The name of the project.
        path (str): The path where the project will be created.
    """
    backend.generate_backend(name, path)

@cli.command()
@click.option('-name', default='React Project', help='Project name')
@click.option('-path', default='React-Project', help='Destination path, leave empty for current directory')
@click.option('-framework', default='TS', help='Frontend framework (JS/TS)', type=click.Choice(['JS', 'TS'], case_sensitive=False))
def createFrontend(name, path, framework):
    """Generate a React frontend boilerplate.
    
    Args:
        name (str): The name of the project.
        path (str): The path where the project will be created.
        framework (str): The frontend framework to use.
    """
    frontend.generate_frontend(name, path, framework)

@cli.command()
@click.option('-name',  default='ReactDJ Project', help='Project name')
@click.option('-path', default='ReactDJ Project', help='Destination path')
def createFullstack(name, path):
    """Generate a full-stack boilerplate.
    
    Args:
        name (str): The name of the project.
        path (str): The path where the project will be created.
    """
    pass
    fullstack.generate_fullstack(name, path)

if __name__ == '__main__':
    cli()
