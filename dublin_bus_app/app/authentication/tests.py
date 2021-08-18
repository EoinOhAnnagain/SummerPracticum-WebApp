from django.contrib.auth import get_user_model
from django.test import TestCase
from django.test import Client


class auth_tests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.User = get_user_model()
        cls.user = cls.User.objects.create_user(email='normal@user.com', password='foo')

    """
    model test
    1. Test user model.
    2. Test superuser model.
    """
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
        # test instance class type
        self.assertTrue(isinstance(user, User))
        # test instance name is equal to email
        self.assertEqual(user.__str__(), user.email)
        # test instance's fields is same as the value we set
        self.assertEqual(user.email, 'normal@user.com')
        # test instance's fields is same as the value we set
        self.assertTrue(user.check_password('foo'))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        # test error rasises mechanisms
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(email='super@user.com', password='foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)

    """
    API test
    1. Obtain token (signin)
    2. CustomUserCreate (signup)
    3. LogoutAndBlacklistRefreshTokenForUserView (log out)
    """

    def test_obtain_token(self):
        # get customising user model
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')

        # send post request with correct parameters
        url = "/api/token/obtain/"
        resp = self.client.post(url, data={'email': 'normal@user.com','password': 'foo'})

        # check the response data is not blank
        self.assertTrue(resp.json()['access'])
        # Check that the response is 200 OK.
        self.assertEqual(resp.status_code, 200)

        # send post request with incorrect parameters
        resp = self.client.post(url, data={'email': 'normal@user.com', 'password': 'foo1'})
        # Check that the response is 401 Fail.
        self.assertEqual(resp.status_code, 401)


    def test_customUser_create(self):
        # send post request with correct parameters
        url = "/api/user/create/"
        resp = self.client.post(url, data={'email': 'normal@user.com', 'password': '12345678'})

        # Check that the response is 201 OK.
        self.assertEqual(resp.status_code, 201)

        # send post request with incorrect parameters
        resp = self.client.post(url, data={'email': 'normal@user.com', 'password': ''})
        # Check that the response is 400 Fail.
        self.assertEqual(resp.status_code, 400)

    def test_blacklist_token(self):
        # get customising user model
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')

        url = "/api/token/obtain/"
        resp = self.client.post(url, data={'email': 'normal@user.com', 'password': 'foo'})
        refresh_token = resp.json()['refresh']
        print(refresh_token)

        url = "/api/blacklist/"
        resp = self.client.post(url, data={'refresh_token': str(refresh_token)})

        # Check that the response is 205 OK.
        self.assertEqual(resp.status_code, 205)



