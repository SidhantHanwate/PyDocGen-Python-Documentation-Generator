# PyDocGen: Python Documentation Generator
The project makes the complete documentation for the python code which includes different types of documentation including code-summarizer, auto-generation of the requirements.txt file and the code visualization. 

``` bash
git clone github.com:SidhantHanwate/Documentation_Generator.git
```

### Tech Stack used: Django, React, Python(including a various other python modules)

## Installation and Running Backend: 
### Django
To install Django and run Backend, follow the steps below:
1. Change the directory to django_bk:
``` bash
cd django_bk
```

2. Install the following packages
``` bash
pip install django djangorestframework django-cors-headers openai networkx pipreqs pygithub pylint
```
3. Change the directory to django_test:
``` bash
cd django_test
```
4. Start the backend using the following commands:
``` bash
python manage.py runserver
```


## Installation and Running Frontend:
### React
To install React and run Frontend, follow the steps below:
1. Start another terminal in the Documentation_Generator directory
2. Install all the dependencies with:
``` bash
npm install
```
3. Install the axios dependency in case not installed using the following command:
``` bash
pip install axios
```
4. Start the Frontend with the following command:
``` bash
npm start
```

Django: https://docs.djangoproject.com/en/4.1/topics/install/
https://www.geeksforgeeks.org/django-introduction-and-installation/ 


Different python modules used includes ast, networkx, openai. We can install this modules using the pip install commands. 

Different django-react modules used include axios, corsheaders. 
"npm install axios" can be used for the installation of the axios.
