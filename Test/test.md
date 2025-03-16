# Running Tests for Djreact Boilerplate Generator

This guide explains how to run tests for the Boilerplate Generator CLI.

## Test Coverage

| Command              | Test File                          | Description                                           |
|----------------------|------------------------------------|-------------------------------------------------------|
| createFrontend       | `tests/test_create_frontend.py`    | Tests React boilerplate (JS/TS) generation.           |
| createBackend        | `tests/test_create_backend.py`     | Tests Django backend boilerplate generation.          |
| createFullstack      | `tests/test_create_fullstack.py`   | Tests full-stack React + Django project generation.   |
| createReactDJ (alias)| `tests/test_create_djreact.py`    | Tests combined React + Django boilerplate.            |

## Setup for Testing

### Prerequisites

Make sure you have:

- Python 3.8+
- pytest (Testing framework)

### Install Pytest

If you haven't installed pytest yet, run:

```
pip install pytest
```

## Running Tests

### Run All Tests

To run all tests:

```
pytest
```

### Run Specific Test File

To run a specific test (e.g., frontend only):

```
pytest tests/test_create_frontend.py
```

## Clean Test Runs

- Tests generate boilerplate in a `test_output` directory.
- Verifies structure and files.
- Auto-cleans test output after validation.
- No manual cleanup needed.

### Expected Output

If tests pass, you'll see:

```
============================= test session starts ============================= 
collected 4 items 

tests/test_create_frontend.py .                                             [ 25%] 
tests/test_create_backend.py  .                                             [ 50%] 
tests/test_create_fullstack.py .                                           [ 75%] 
tests/test_create_djreact.py  .                                            [100%] 

============================== 4 passed in 2.13s ==============================
```

## Developer Notes

- **Test Files Location**: All tests are in the `/tests/` folder.
- **Temporary Files**: Tests use `/tests/test_output/` for temp files, auto-cleaned after tests.
- **Contributing**: Add new tests in `/tests/` if you add a new command or feature.

### Example: Adding a New Test

If you add a new command:

1. Create a test file, e.g., `test_create_api.py`, in `/tests/`.
2. Use existing test files as templates.
3. Ensure auto-clean structure is followed.

## File Structure

```
tests/
├── test_create_frontend.py
├── test_create_backend.py
├── test_create_fullstack.py
├── test_create_djreact.py
└── test_output/  # Temporary generated projects (auto-cleaned)
```

## Support

For issues or contributions, please submit a PR or open an issue in the GitHub repository.
