import pytest
import os
import shutil
from Djreact.commands.frontendGenerator import generate_frontend as create_frontend

@pytest.fixture
def cleanup():
    yield
    if os.path.exists('test_frontend'):
        shutil.rmtree('test_frontend')

def test_create_frontend(cleanup):
    create_frontend('test_frontend', 'test_frontend', 'JS')
    assert os.path.exists('test_frontend')
    assert os.path.exists('test_frontend/test_frontend/package.json')
    assert os.path.exists('test_frontend/test_frontend/src')
    assert os.path.exists('test_frontend/test_frontend/public')