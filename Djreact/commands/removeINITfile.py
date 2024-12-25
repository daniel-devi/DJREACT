import os

def remove_init_files(folder_path):
    """
    Recursively removes all __init__.py files in the given folder and its subfolders.

    :@param folder_path: The path to the folder where the search begins.
    """
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file == "__init__.py":
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"Removed: {file_path}")
                except Exception as e:
                    print(f"Error removing {file_path}: {e}")
