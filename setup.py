from setuptools import setup, find_packages

def get_long_description():
    """
    Read and return the contents of README.md file
    Returns:
        str: Content of README.md
    """
    return open("README.md").read()

def get_packages():
    """
    Define package discovery configuration
    Returns:
        list: List of discovered packages
    """
    return find_packages(
        include=[
            "Djreact",
            "Djreact.*",
            "Djreact.templates",
            "Djreact.templates.*",
            "Djreact.templates.ReactTS.*",
            "Djreact.templates.ReactJS.*",
            "Djreact.templates.Django.*",
            "Djreact.templates.ReactDJ.*",
            "Djreact.templates.DReact.*",

        ],
        exclude=["tests"]
    )

def get_install_requires():
    """
    Define required package dependencies
    Returns:
        list: List of required packages with versions
    """
    return [
        "click>=8.0.0",
        "setuptools>=75.6.0",
        "jinja2>=3.0.0",
        "python-decouple>=3.7",
        "Django==4.2",
        "djangorestframework==3.14",
    ]

def get_classifiers():
    """
    Define package classifiers for PyPI
    Returns:
        list: List of package classifiers
    """
    return [
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ]

setup(
    name="Djreact",
    version="2.0.1",
    description="A CLI tool for generating Django and React boilerplate code, you can customize it to your needs",
    long_description=get_long_description(),
    long_description_content_type="text/markdown",
    license="MIT",
    author="Daniel Agufenwa",
    author_email="devonaguh33@gmail.com",
    url="https://github.com/daniel-devi/DJREACT.git",
    packages=get_packages(),
    package_data={"Djreact": ["templates/**/*"]},
    include_package_data=True,
    install_requires=get_install_requires(),
    entry_points={
        "console_scripts": [
            "djreact=Djreact.cli:cli",
        ],
    },
    classifiers=get_classifiers(),
    python_requires=">=3.10",
    test_suite="Test",
)