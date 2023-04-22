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
