from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer


#TODO : not understood
class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    # TODO: why?
    authentication_classes = ()

    #TODO: How to trigger post methods?
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            """
             save() will trigger following steps:
                - if the instance is not exist it will call serializer.create() else it will call update()
             ref: https://stackoverflow.com/questions/45100515/what-is-the-different-between-save-create-and-update-in-django-rest-fram
            """
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello": "world"}, status=status.HTTP_200_OK)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)