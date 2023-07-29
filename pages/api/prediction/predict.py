import numpy as np
import json
import sys
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder, LabelEncoder
from tensorflow import keras

def load_model():
    # Load the model from the file
    model = keras.models.load_model('keras_model.h5')
    return model

def preprocess_input(input_data):
    numerical_features = np.array(input_data[:27], dtype=np.float64)
    categorical_features = input_data[27:]

    # Normalize the numerical features using the previously fitted scaler
    numerical_features = scaler.transform(numerical_features.reshape(1, -1))

    # Perform one-hot encoding for categorical features using the previously fitted one-hot encoder
    encoded_features = onehot_encoder.transform([categorical_features])

    # Convert encoded features to dense array
    encoded_features = encoded_features.toarray()

    # Reshape numerical features to match the number of numerical columns used during fitting
    numerical_features = numerical_features.reshape(1, -1)

    # Combine the numerical and encoded categorical features
    processed_input = np.hstack([numerical_features, encoded_features])

    return processed_input


def postprocess_prediction(prediction):
    # Convert the prediction to the original label using the previously fitted label encoder
    predicted_job = label_encoder_target.inverse_transform(np.argmax(prediction, axis=1))
    #predicted_job = label_encoder_target.inverse_transform(prediction.ravel())

    return predicted_job

# Read the dataset
df = pd.read_csv('project_dataset.csv')

# Define categorical and numerical columns
categorical_columns = ['interests_1', 'interests_2', 'interests_3', 'Type of company want to settle in?', 'search']
numerical_columns = [col for col in df.columns if col not in categorical_columns + ['Suggested Job Role']]

# Initialize the MinMaxScaler
scaler = MinMaxScaler()
scaler.fit(df[numerical_columns])  # Fit the scaler on the numerical columns

# Initialize the OneHotEncoder
onehot_encoder = OneHotEncoder(handle_unknown='ignore')
onehot_encoder.fit(df[categorical_columns])  # Fit the encoder on all categorical features

# Initialize the LabelEncoder for the target variable
label_encoder_target = LabelEncoder()
df['Suggested Job Role'] = label_encoder_target.fit_transform(df['Suggested Job Role'])

# Define the input shape for reshaping the processed input
input_shape = (df.drop('Suggested Job Role', axis=1).shape[1], 1)

# Parse the command-line arguments
command = sys.argv[1]
#command = 'predict'
input_data = sys.argv[2]

#input_data = [76, 87, 60, 84, 89, 73, 62, 88, 69, 7, 1, 1, 2, 5, 0, 1, 0, 3, 5, 0, 1, 1, 0, 0, 1, 1, 1, 'python', 'networks', 'testing', 'data science', 'Testing and Maintainance Services']
if command == 'load_model':
    # Load the model and serialize it as JSON for communication with Node.js
    model = load_model()
    model_json = model.to_json()
elif command == 'predict':
    # Load the model and perform prediction
    model = load_model()
    
    input_data = json.loads(input_data)['input']
    # print(input_data['input'])
    input_data = np.array(input_data)
    processed_input = preprocess_input(input_data)
    prediction = model.predict(processed_input)
    predicted_job = postprocess_prediction(prediction)
    print(json.dumps(predicted_job.tolist()))
    sys.stdout.flush()
