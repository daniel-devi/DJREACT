import pytest
import os
import shutil
from Djreact.commands.fullstackGenerator import generate_fullstack as create_fullstack

@pytest.fixture
def cleanup():
    yield
    if os.path.exists('test_fullstack'):
        shutil.rmtree('test_fullstack')

def test_create_fullstack(cleanup):
    create_fullstack('test_fullstack', 'test_fullstack')
    assert os.path.exists('test_fullstack/Frontend')
    assert os.path.exists('test_fullstack/test_fullstack')
    assert os.path.exists('test_fullstack/Frontend/package.json')
    assert os.path.exists('test_fullstack/test_fullstack/manage.py')
    assert os.path.exists('test_fullstack/test_fullstack/.env')
