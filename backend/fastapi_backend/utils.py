import torch
import numpy as np
from dataclasses import dataclass
from model import CNNGRU_Model
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report

@dataclass
class EEGdata:
    label: int
    data: float
    Fs: int

class EEGClassifier:
    def __init__(self, model_path, device='cuda' if torch.cuda.is_available() else 'cpu'):
        self.device = device
        # Initialize model parameters
        self.n_chan = 59  # Set this to match your input data channels
        self.model = CNNGRU_Model(self.n_chan, signal_length=2500)  # 5 seconds * 500Hz = 2500

        # Load the trained model
        self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.to(self.device)
        self.model.eval()

    def preprocess_data(self, raw_data):
        """
        Preprocess the input EEG data
        raw_data should be a numpy array of shape (time_points, channels)
        """
        # Create EEGdata object
        eeg_data = EEGdata(label=0, data=raw_data, Fs=500)  # Label doesn't matter for prediction

        # Convert to list to match prepare_dataset function expectations
        data_list = [eeg_data]

        # Prepare data using the same function used during training
        signal_data, _ = prepare_dataset(data_list)
        return signal_data

    def predict(self, raw_data):
        """
        Predict the class for input EEG data
        Returns prediction (0 or 1) and probability
        """
        # Preprocess the data
        processed_data = self.preprocess_data(raw_data)

        # Convert to tensor and move to device
        input_tensor = processed_data[0].unsqueeze(0).to(self.device)

        # Make prediction
        with torch.no_grad():
            output = self.model(input_tensor)
            probs = torch.sigmoid(output)
            probs_normalized = probs / probs.sum(dim=1, keepdim=True)

            # Get prediction (0 or 1)
            prediction = (probs_normalized > 0.5).int().cpu().numpy()
            probabilities = probs_normalized.cpu().numpy()

        # Convert to class labels and probabilities
        predicted_class = prediction[0][0]
        class_probabilities = {
            'class_0': float(probabilities[0][1]),  # Probability for class 0
            'class_1': float(probabilities[0][0])   # Probability for class 1
        }
        if predicted_class == 0:
            classified_class = "class_0"
        else:
            classified_class = "class_1"
        
        selected_class = class_probabilities.get(classified_class)
        return predicted_class, class_probabilities, selected_class

def prepare_dataset(dataset):
    signal_samples = []
    target_labels = []
    for data_item in dataset:
        sample_signal = data_item.data
        sample_signal = np.transpose(sample_signal)
        sample_tensor = torch.from_numpy(sample_signal).float()
        signal_samples.append(sample_tensor)
        if data_item.label == 0:
            label_tensor = torch.tensor([0, 1]).float()
        else:
            label_tensor = torch.tensor([1, 0]).float()
        target_labels.append(label_tensor)
    return signal_samples, target_labels