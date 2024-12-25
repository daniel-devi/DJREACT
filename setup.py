from setuptools import setup, find_packages

#TODO: EDIT
setup(
    name="Djreact",
    version="1.2.4",
    description="A CLI tool for generating Django and React boilerplate code, you can customize it to your needs",
    long_description=open("README.md").read(),
    license="MIT",
    long_description_content_type="text/markdown",
    author="Daniel Agufenwa",
    author_email="devonaguh33@gmail.com",
    url="https://github.com/daniel-devi/DJREACT.git",
    packages=find_packages(),
    package_data={"Djreact": ["templates/**/*"]},
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
            "djreact=Djreact.cli:cli",
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.10",
)
