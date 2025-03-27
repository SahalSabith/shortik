from rest_framework import serializers
from .models import URL

class URLSerializer(serializers.ModelSerializer):
    class Meta:
        model = URL
        fields = ["original_url","user","short_url","created","clicks","status"]

    def create(self, validated_data):
        url = URL(
            original_url = validated_data["original_url"],
            user = validated_data["user"]
        )
        url.save()
        return url

