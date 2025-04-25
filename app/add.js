import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { addPerson } from '../config/database';

export default function AddDataPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    phone_number: '',
    email: '',
    city_of_origin: '',
    date_of_birth: '',
    religion: '',
  });
  const [errors, setErrors] = useState({});

  // validationss
  const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    if (!phone) return true;
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

  const validateDateOfBirth = (date) => {
    if (!date) return true;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    // check if date is valid
    const parts = date.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getFullYear() === year && 
           dateObj.getMonth() === month - 1 && 
           dateObj.getDate() === day;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) {
      newErrors.phone_number = 'Phone number must contain only numbers';
    }
    
    if (formData.date_of_birth && !validateDateOfBirth(formData.date_of_birth)) {
      newErrors.date_of_birth = 'Date must be in YYYY-MM-DD format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please check the form for errors');
      return;
    }

    try {
      await addPerson(formData);
      Alert.alert('Success', 'Person added successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error adding person:', error);
      Alert.alert('Error', 'Failed to add person');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={[styles.input, errors.full_name && styles.inputError]}
              value={formData.full_name}
              onChangeText={(text) => setFormData({ ...formData, full_name: text })}
              placeholder="Enter full name"
            />
            {errors.full_name && <Text style={styles.errorText}>{errors.full_name}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Enter address"
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, errors.phone_number && styles.inputError]}
              value={formData.phone_number}
              onChangeText={(text) => setFormData({ ...formData, phone_number: text })}
              placeholder="Enter phone number (numbers only)"
              keyboardType="phone-pad"
            />
            {errors.phone_number && <Text style={styles.errorText}>{errors.phone_number}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>City of Origin</Text>
            <TextInput
              style={styles.input}
              value={formData.city_of_origin}
              onChangeText={(text) => setFormData({ ...formData, city_of_origin: text })}
              placeholder="Enter city of origin"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={[styles.input, errors.date_of_birth && styles.inputError]}
              value={formData.date_of_birth}
              onChangeText={(text) => setFormData({ ...formData, date_of_birth: text })}
              placeholder="Enter date of birth (YYYY-MM-DD)"
            />
            {errors.date_of_birth && <Text style={styles.errorText}>{errors.date_of_birth}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Religion</Text>
            <TextInput
              style={styles.input}
              value={formData.religion}
              onChangeText={(text) => setFormData({ ...formData, religion: text })}
              placeholder="Enter religion"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Person</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});