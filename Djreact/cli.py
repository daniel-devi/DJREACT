import click
from Djreact.commands import backendGenerator as backend
from Djreact.commands import frontendGenerator as frontend
from Djreact.commands import fullstackGenerator as fullstack
from Djreact.commands import djreactGenerator as djreact
from pathlib import Path

@click.group()
def cli():
    """DJReact - A ReactDJ Boilerplate Generator CLI."""
    pass

@cli.command()
@click.option('-name', default='Django-project Backend', help='Project name', type=str)
@click.option('-path', default='Django-Project', help='Destination path (default: Django-Project)', type=str)
def create_backend(name: str, path: str):
    """Generate a Django backend boilerplate project."""
    if not validate_inputs(name, path):
        return
    backend.generate_backend(name, path)


@cli.command()
@click.option('-name', default='React Project-TS', help='Project name', type=str)
@click.option('-path', default='React-Project', help='Destination path (default: React-Project)', type=str)
@click.option('-framework', default='TS', help='Frontend framework (JS/TS)', type=click.Choice(['JS', 'TS'], case_sensitive=False))
def create_frontend(name: str, path: str, framework: str):
    """Generate a React frontend boilerplate project."""
    if not validate_inputs(name, path):
        return
    frontend.generate_frontend(name, path, framework)


@cli.command()
@click.option('-name', default='ReactDJ Project', help='Project name', type=str)
@click.option('-path', default='ReactDJ Project', help='Destination path (default: ReactDJ Project)', type=str)
def create_fullstack(name: str, path: str):
    """Generate a full-stack Django & React boilerplate project."""
    if not validate_inputs(name, path):
        return
    fullstack.generate_fullstack(name, path)


@cli.command()
@click.option('-name', '--name', default='Djreact Project', help='Project name', type=str, prompt="Project Name")
@click.option('-path', '--path', default='Djreact Project', help='Destination path (default: current directory)', type=str, prompt="Project Path (default: current directory)")
def create_djreact(name: str, path: str):
    """Generate a customizable Django & React boilerplate project."""
    if not validate_inputs(name, path):
        return
    djreact.generate_djreact(name, path)


### --- Helpers --- ###

def validate_inputs(name: str, path: str) -> bool:
    """Validate both project name and path."""
    if not name or not name.strip():
        click.secho("❌ Error: Project name cannot be empty.", fg='red')
        return False
    if not path or not path.strip():
        click.secho("❌ Error: Project path cannot be empty.", fg='red')
        return False
    if not validate_path(path):
        click.secho(f"❌ Error: Invalid path '{path}'.", fg='red')
        return False
    return True


def validate_path(path: str) -> bool:
    """Validate the project path."""
    try:
        resolved_path = Path(path).resolve()
        if not resolved_path.exists():
            resolved_path.mkdir(parents=True, exist_ok=True)
        return True
    except Exception as e:
        click.secho(f"❌ Path Error: {e}", fg='red')
        return False


def main():
    cli()


if __name__ == '__main__':
    main()
