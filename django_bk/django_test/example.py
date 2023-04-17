# views.py
import json
from django.http import JsonResponse

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

dependencies=set()
def getrequirements(path):
    for filename in os.listdir(path):
        if filename.endswith(".py"):
            filepath=os.path.join(path,filename)
            command = ['pip', 'list',path, os.path.join(path, filename)]
            result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode != 0:
                print(f"Error running command {command}:")
                print(result.stderr.decode())
            else:
                dependencies.update(result.stdout.decode().splitlines())

        elif os.path.isdir(os.path.join(path,filename)):
            getrequirements(os.path.join(path,filename)) 
    
    # Write the dependencies to a requirements.txt file
    list=[] 
    with open(os.path.join(path, 'requirements.txt'), 'w') as f:
        for dependency in sorted(dependencies):
            list.append(dependency)
            f.write(dependency + '\n')
    
    print(list)

    return list 

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
    for function_name, function_contents in functions.items():
        code = function_contents
        print("sth... ",code,'\n')
        completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        messages=[{"role": "user", "content": code+"\n# A high quality docstring for the above function. Fields should be docstring, paramters and return value by function. Shouldn't be detailed\n"}]
        )["choices"][0]["message"]["content"].strip()

        return completion
    



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

