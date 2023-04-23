# views.py
import json
from django.http import JsonResponse

import ast
import networkx as nx
import os
import matplotlib.pyplot as plt

import base64

import subprocess


  
from PIL import Image

def replace_with_white_image(file_path):
    # Open the image file
    img = Image.open(file_path)

    # Create a new blank image with the same size and mode as the original image
    white_img = Image.new(mode=img.mode, size=img.size, color=(255, 255, 255))

    # Save the new image to the same file path, overwriting the original image
    white_img.save(file_path)

    # Close the image files
    img.close()
    white_img.close()


# Define a function to parse a Python file and extract function information
def parse_file(filepath,graph):
    with open(filepath, "r") as file:
        source = file.read()

    # Parse the source code into an abstract syntax tree (AST)
    tree = ast.parse(source)

    # Traverse the AST and extract information about the functions
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            function_name = node.name
            module_name = os.path.basename(filepath).split(".")[0]

            # Add the function as a node to the graph
            graph.add_node(f"{module_name}.{function_name}")

            # Traverse the AST again and look for function calls
            for subnode in ast.walk(node):
                if isinstance(subnode, ast.Call):
                    if isinstance(subnode.func, ast.Name):
                        # Add the function call as a directed edge in the graph
                        graph.add_edge(
                            f"{module_name}.{function_name}",
                            f"{module_name}.{subnode.func.id}"
                        )

# Parse all Python files in the "python_files" directory
# for filename in os.listdir("/home/swamikedari/Documents/code visualizer"):
#     if filename.endswith(".py"):
#         filepath = os.path.join("/home/swamikedari/Documents/code visualizer", filename)
#         parse_file(filepath)

# Generate a graph visualization and save it as an image file


def parse_folder(path, graph):
    # Create a graph object
    for filename in os.listdir(path):
        if filename.endswith(".py"):
            filepath=os.path.join(path,filename)
            parse_file(filepath,graph)
        elif os.path.isdir(os.path.join(path,filename)):
            parse_folder(os.path.join(path,filename),graph)

    return graph



def generate_data_url(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    data_url = f"data:image/png;base64,{encoded_string}"
    return data_url

def getfunctiongraph(request):
    body=json.loads(request.body)
    input_text = body["input"]

    print(f"Received input: {input_text}")  # Debugging print statement
    if input_text is not None:
        print("repo link: ", input_text)
        filepath=clone_repo(input_text)
        print(filepath)

        graph = nx.DiGraph()
        
        graph=parse_folder(filepath, graph)
        # set node positions using spring layout
        # pos = nx.spring_layout(graph, seed=20)
        nx.draw(graph, with_labels=True, font_size=7, node_size=1000, node_color='skyblue', arrowstyle='->', arrowsize=20)
        imagepath="/home/swamikedari/Documents/pydoc/Documentation_Generator/src/function_visualization.png"
        graph.clear()
        # Check if the file already exists
        # plt.figure(figsize=(1000, 1000))
        if os.path.isfile(imagepath):
            os.remove(imagepath)
            print(f"{imagepath} already exists")
            plt.savefig(imagepath)
            plt.clf()
        else:
            plt.savefig(imagepath)
            plt.clf()
    
        return JsonResponse({'output': imagepath})
    else:
        return JsonResponse({'error': 'No input provided'})

def loadcontent(request):
    body=json.loads(request.body)
    repo_link=body["input"]
   #  print(f"Received input:.................................................................................................................... {repo_link}")  # Debugging print statement
    if repo_link is not None:
        output_text = open_github_file(repo_link)
        return JsonResponse({'output': output_text})
    
def open_github_file(link):
    api_link = link.replace("github.com", "raw.githubusercontent.com")
    api_link = api_link.replace("/blob", "/")
    response = requests.get(api_link)
    file_content = response.text
    return file_content

def processInput(request):
    body=json.loads(request.body)
    input_text = body["input"]

    print(f"Received input: {input_text}")  # Debugging print statement
    if input_text is not None:
        output_text = genDostring(input_text)
        return JsonResponse({'output': output_text})
    else:
        return JsonResponse({'error': 'No input provided'})

def fetchdata(request):
    body=json.loads(request.body)
    print(body)
    input_text=body["input"]
    print(f"Received input: {input_text}")  # Debugging print statement
    if input_text is not None:
        output_text = fetchdata1(input_text)
        return JsonResponse({'output': output_text})
    else:
        return JsonResponse({'error': 'No input provided'})

import os 
import subprocess

def clone_repo(github_repo_link):
    # print()
    repo_dir = os.path.basename(github_repo_link)
    if os.path.exists(repo_dir):
        return os.path.abspath(repo_dir)
    subprocess.check_call(['git', 'clone', f'{github_repo_link}', repo_dir])
    return os.path.abspath(repo_dir)

import os
import subprocess

def getrequirements(folder_path):
    # Run the pipreqs command and capture its output as a string
    requirements_file = os.path.join(folder_path, "requirements.txt")
    command = f"pipreqs {folder_path} --force --savepath {requirements_file}"
    output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT)

    # Read the requirements.txt file and return its contents as a string
    with open(requirements_file, "r") as f:
        requirements = f.read()

    return requirements


DEV_MODE=True

import requests

# Define function to get list of files in a Github repo
def fetchdata1(repo_link):
    file_names = []
    get_files_in_repo(repo_link, file_names)
    return file_names


def getcontent(request):
    body=json.loads(request.body)
    input_text = body["input"]

    print(f"Received input: {input_text}")  # Debugging print statement
    if input_text is not None:
        output_text = get_files_in_repo(input_text)
        print(output_text)
        return JsonResponse({'output': output_text})
    else:
        return JsonResponse({'error': 'No input provided'})
    
def getrequire(request):
    body=json.loads(request.body)
    input_text = body["input"]

    print(f"Received input: {input_text}")  # Debugging print statement
    if input_text is not None:
        print("repo link: ", input_text)
        filepath=clone_repo(input_text)
        print(filepath)
        output_text=getrequirements(filepath)
        print(output_text)
        return JsonResponse({'output': output_text})
    else:
        return JsonResponse({'error': 'No input provided'})

import openai
def genDostring(str):
    #wreite a code to create a eample.py file with code from str given
    f = open("example.py", "w")
    f.write(str)
    f.close()

        # set the file path
    file_path = "example.py"

    # read the file contents
    with open(file_path, "r") as f:
        file_contents = f.read()

    # split the file contents into lines
    lines = file_contents.split("\n")

    # rest of the program
    rest_of_program = ""

    # functions
    functions = {}

    # current function
    current_function = None
    current_function_lines = []

    for line in lines:
        if line.startswith("def "):
            if current_function:
                # save the previous function
                functions[current_function] = "\n".join(current_function_lines)
            # start processing a new function
            current_function = line.split()[1].split("(")[0]
            current_function_lines = [line]
        elif current_function and line.startswith("	"):
            # add to the current function
            current_function_lines.append(line)
        else:
            # add to the rest of the program
            rest_of_program += line + "\n"

    # save the last function
    if current_function:
        functions[current_function] = "\n".join(current_function_lines)
    
    openai.api_key = "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"
    descriptions=[]
    for function_name, function_contents in functions.items():
        code = function_contents
        print("func : ", code)
        # print("sth... ",code,'\n')
        descriptions.append( openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        messages=[{"role": "user", "content": code+"\n# A high quality docstring for the above function. Fields should be docstring, paramters and return value by function. Shouldn't be detailed\n"}]
        )["choices"][0]["message"]["content"].strip())

    return descriptions
    



import requests
import json
import sys

def get_files_in_repo(repo_link, file_names):
    api_link = repo_link.replace("github.com", "api.github.com/repos") + "/contents/"
    response = requests.get(api_link)

    if response.status_code == 404:
        print("Invalid Github repo link")
        return

    files = json.loads(response.text)

    for file in files:
        if file["type"] == "file":
            if file["name"].endswith(".py"):
                # Construct the Github URL for the file
                file_url = repo_link + "/blob/main/" + file["path"]
                print( file_url)
                file_names.append(file_url)
        elif file["type"] == "dir":
            get_files_in_dir(repo_link, file["path"], file_names)

    # Check if there are more pages of files
    while "next" in response.links:
        response = requests.get(response.links["next"]["url"])
        files = json.loads(response.text)

        for file in files:
            if file["type"] == "file":
                if file["name"].endswith(".py"):
                    # Construct the Github URL for the file
                    file_url = repo_link + "/blob/main/" + file["path"]
                    print(file_url)
                    file_names.append(file_url)
            elif file["type"] == "dir":
                get_files_in_dir(repo_link, file["path"], file_names)

def get_files_in_dir(repo_link, dir_path, file_names):
    api_link = repo_link.replace("github.com", "api.github.com/repos") + "/contents/" + dir_path
    response = requests.get(api_link)

    if response.status_code == 404:
        print("Invalid Github repo link")
        return

    files = json.loads(response.text)

    for file in files:
        if file["type"] == "file":
            if file["name"].endswith(".py"):
                # Construct the Github URL for the file
                file_url = repo_link + "/blob/main/" + dir_path + "/" + file["name"]
                print(file_url)
                file_names.append(file_url)
        elif file["type"] == "dir":
            get_files_in_dir(repo_link, dir_path + "/" + file["name"], file_names)

