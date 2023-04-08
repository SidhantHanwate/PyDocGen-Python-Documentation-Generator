# views.py
import json
from django.http import JsonResponse

def processInput(request):
    body=json.loads(request.body)
    input_text = body["input"]

    print(f"Received input: {input_text}")  # Debugging print statement
    if input_text is not None:
        output_text = genDostring(input_text)
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