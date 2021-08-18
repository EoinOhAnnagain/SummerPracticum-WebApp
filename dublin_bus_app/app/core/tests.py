from django.contrib.auth import get_user_model
from django.test import TestCase
from django.test import Client
from dublin_bus_app.app.core.models import *

class AgencyModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.agency = Agency.objects.create(
            agency_id="id1",
            agency_name = "name1",
            agency_url = "url1",
            agency_timezone = "tz1",
            agency_lang = "lang1"
        )
    def test_it_has_information_fields(self):
        self.assertIsInstance(self.agency.agency_id, str)
        self.assertEqual(self.agency.agency_id, "id1")
        self.assertIsInstance(self.agency.agency_name, str)
        self.assertEqual(self.agency.agency_name, "name1")
        self.assertIsInstance(self.agency.agency_url, str)
        self.assertEqual(self.agency.agency_url, "url1")
        self.assertIsInstance(self.agency.agency_timezone, str)
        self.assertEqual(self.agency.agency_timezone, "tz1")
        self.assertIsInstance(self.agency.agency_lang, str)
        self.assertEqual(self.agency.agency_lang, "lang1")

    # # (4)
    # def test_it_has_timestamps(self):
    #     self.assertIsInstance(self.actor.last_update, datetime)