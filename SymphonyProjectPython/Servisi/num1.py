import requests
import json

class test1(object):

    url="http://services.groupkt.com/country/get/all"
    response = requests.get(url)
    print(json.dumps(response.json(), indent=4))
    assert