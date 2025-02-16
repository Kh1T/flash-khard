import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

export default function CreateFlashcardScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if (!result.canceled) {
    //     setImage(result.assets[0].uri);   
    //  }
  };

  // Function to start/stop audio recording
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const newRecording = new Audio.Recording();
        // await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        // await newRecording.startAsync();
        // setRecording(newRecording);
      } else {
        console.log('Permission to record audio denied');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
    //   await recording.stopAndUnloadAsync();
    //   const uri = recording.getURI();
    //   setAudioUri(uri);
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Question Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Question"
        value={question}
        onChangeText={setQuestion}
      />

      {/* Answer Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Answer"
        value={answer}
        onChangeText={setAnswer}
      />

      {/* Image Upload */}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Audio Recording */}
      <View style={styles.audioContainer}>
        {recording ? (
          <Button title="Stop Recording" onPress={stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={startRecording} />
        )}
        {audioUri && <Text>Audio Recorded: {audioUri}</Text>}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Flashcard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  audioContainer: {
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});