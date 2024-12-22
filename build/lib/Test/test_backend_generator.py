import os
import unittest
from unittest.mock import patch, MagicMock, mock_open
import shutil
import secrets
from click.testing import CliRunner

# Import the function from its new location
from Djreact.commands.backendGenerator import generate_backend



class TestGenerateBackend(unittest.TestCase):

    @patch("DJREACT.commands.backendGenerator.os.path.exists")
    @patch("DJREACT.commands.backendGenerator.shutil.copytree")
    @patch("DJREACT.commands.backendGenerator.os.rename")
    @patch("DJREACT.commands.backendGenerator.secrets.token_urlsafe")
    @patch("builtins.open", new_callable=mock_open)
    def test_valid_backend_creation(
        self, mock_open, mock_token_urlsafe, mock_rename, mock_copytree, mock_exists
    ):
        """
        Test case for successful backend creation.
        """
        # Debugging information
        print("Running test_valid_backend_creation...")

        # Mock return values
        mock_exists.return_value = False
        mock_token_urlsafe.return_value = "mock_secret_key"

        # Call the function
        generate_backend("MyProject", "test_path")

        # Debugging information
        print("Mocks called: ")
        print(f"mock_copytree: {mock_copytree.call_args}")
        print(f"mock_rename: {mock_rename.call_args}")

        # Verify file and directory operations
        mock_copytree.assert_called_once_with(
            os.path.join("DJREACT/templates/Django"), "./test_path"
        )
        mock_rename.assert_called_once_with(
            "./test_path/Backend", "./test_path/MyProject"
        )

        # Verify file reads and writes
        mock_open.assert_any_call("./test_path/MyProject/settings.py", "r")
        mock_open.assert_any_call("./test_path/MyProject/settings.py", "w")
        mock_open.assert_any_call("./test_path/.env", "w")

        # Check the secret key was generated
        mock_token_urlsafe.assert_called_once()

    @patch("DJREACT.commands.backendGenerator.os.path.exists")
    def test_directory_already_exists(self, mock_exists):
        """
        Test case for handling existing directory.
        """
        print("Running test_directory_already_exists...")
        # Mock the directory existence check
        mock_exists.return_value = True

        runner = CliRunner()
        result = runner.invoke(generate_backend, ["-name", "MyProject", "-path", "test_path"])

        # Debugging information
        print("Result output: ", result.output)

        # Verify the error message is printed
        self.assertIn("Error: Project directory already exists!", result.output)

if __name__ == "__main__":
    unittest.main()
