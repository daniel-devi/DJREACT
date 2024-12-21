from setuptools import setup, find_packages

#TODO: EDIT
setup(
    name="DjReact",
    version="1.0.0",
    description="A CLI tool for generating Django and React boilerplate code, you can customize it to your needs",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    author="Daniel Agufenwa",
    author_email="devonaguh33@gmail.com",
    url="https://github.com/daniel-devi/boilerplate-cli",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "click>=8.0.0",
        "setuptools>=75.6.0",
        "jinja2>=3.0.0",
        "python-decouple>=3.7",
        "Django==4.2",
        "djangorestframework==3.14",
    ],
    entry_points={
        "console_scripts": [
            "djreact=DJREACT.cli:cli",
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
)
