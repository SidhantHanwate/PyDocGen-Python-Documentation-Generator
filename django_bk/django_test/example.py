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
   