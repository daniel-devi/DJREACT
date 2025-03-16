import pytest
import os
import shutil
from Djreact.commands.djreactGenerator import generate_djreact as create_djreact

@pytest.fixture
def cleanup():
    yield
    if os.path.exists('test_djreact'):
        shutil.rmtree('test_djreact')

def test_create_djreact(cleanup):
    create_djreact('test_djreact', 'test_djreact')
    assert os.path.exists('test_djreact/frontend')
    assert os.path.exists('test_djreact/test_djreact')
    assert os.path.exists('test_djreact/frontend/package.json')
    assert os.path.exists('test_djreact/test_djreact/manage.py')
    assert os.path.exists('test_djreact/test_djreact/.env')
