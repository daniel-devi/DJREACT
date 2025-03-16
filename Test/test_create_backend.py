import pytest
import os
import shutil
from Djreact.commands.backendGenerator import generate_backend as create_backend

@pytest.fixture
def cleanup():
    yield
    if os.path.exists('test_backend'):
        shutil.rmtree('test_backend')

def test_create_backend(cleanup):
    create_backend('test_backend', 'test_backend')
    assert os.path.exists('test_backend')
    assert os.path.exists('test_backend/manage.py')
    assert os.path.exists('test_backend/requirements.txt')
    assert os.path.exists('test_backend/apps')
