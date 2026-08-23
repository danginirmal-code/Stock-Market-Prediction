from rest_framework import serializers

class StockPredictionSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=10, required=True)
    # start_date = serializers.DateField(required=True)
    # end_date = serializers.DateField(required=True)
    # prediction_days = serializers.IntegerField(required=True)
    # model_type = serializers.ChoiceField(choices=['LSTM', 'ARIMA'], required=True)
    # features = serializers.ListField(
    #     child=serializers.CharField(max_length=50),
    #     required=False
    # )