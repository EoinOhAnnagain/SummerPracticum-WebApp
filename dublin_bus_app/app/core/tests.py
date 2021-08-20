from django.test import TestCase

TestCase.multi_db = True
TestCase.databases = {"bus","default"}

class view_tests(TestCase):

    def test_ApproachingBuses(self):
        # send post request with correct parameters
        url = "/core/user/approach/8220DB000003/"
        resp = self.client.get(url)

        # Check that the response is 200 OK.
        self.assertEqual(resp.status_code, 200)

    def test_Routes(self):
        url = "/core/routes"
        resp = self.client.get(url)

        # Check that the response is 200 OK.
        self.assertEqual(resp.status_code, 200)

    def test_Stop(self):
        url = "/core/stops/"
        resp = self.client.get(url)

        # Check that the response is 200 OK.
        self.assertEqual(resp.status_code, 200)

    def test_TravelTime(self):
        url = "/core/Travel/"
        data = {"param_1": 28, "param_2": "1", "param_3": "Shanowen Road, stop 230", "param_4": "2021-08-18"}
        resp = self.client.post(url, data=data)

        # Check that the response is 200 OK.
        self.assertEqual(resp.status_code, 200)

    def test_FareCalculation(self):
        url = "/core/Fare/"
        data = {"param_1": 28, "param_2": 1}
        resp = self.client.post(url, data=data)

        # Check that the response is 200 OK.
        self.assertEqual(resp.status_code, 200)
