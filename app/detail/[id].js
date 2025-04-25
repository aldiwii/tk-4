import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getPersonById, updatePerson, deletePerson } from '../../config/database';

export default function DetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [person, setPerson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadPersonDetails();
  }, []);

  const loadPersonDetails = async () => {
    try {
      const data = await getPersonById(id);
      setPerson(data);
      setEditForm(data);
    } catch (error) {
      console.error('Error loading person details:', error);
    }
  };

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
    
    if (!editForm.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    
    if (editForm.email && !validateEmail(editForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (editForm.phone_number && !validatePhoneNumber(editForm.phone_number)) {
      newErrors.phone_number = 'Phone number must contain only numbers';
    }
    
    if (editForm.date_of_birth && !validateDateOfBirth(editForm.date_of_birth)) {
      newErrors.date_of_birth = 'Date must be in YYYY-MM-DD format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Person',
      'Are you sure you want to delete this person?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePerson(id);
              router.back();
            } catch (error) {
              console.error('Error deleting person:', error);
            }
          },
        },
      ]
    );
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please check the form for errors');
      return;
    }

    try {
      await updatePerson(id, editForm);
      setPerson(editForm);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  if (!person) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {/* edit & delete buttons (absolute) */}
        <View style={styles.buttonContainer}>
        {!isEditing ? (
            <>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            </>
        ) : (
            <>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
                setIsEditing(false);
                setEditForm(person);
                setErrors({});
            }}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            </>
        )}
        </View>

        {/* detail info */}
        <View style={styles.detailsContainer}>
          <DetailField
            label="Full Name *"
            value={person.full_name}
            isEditing={isEditing}
            onChange={(text) => setEditForm({ ...editForm, full_name: text })}
            editValue={editForm.full_name}
            error={errors.full_name}
          />
          <DetailField
            label="Address"
            value={person.address}
            isEditing={isEditing}
            onChange={(text) => setEditForm({ ...editForm, address: text })}
            editValue={editForm.address}
          />
          <DetailField
            label="Phone Number"
            value={person.phone_number}
            isEditing={isEditing}
            onChange={(text) => setEditForm({ ...editForm, phone_number: text })}
            editValue={editForm.phone_number}
            keyboardType="phone-pad"
            error={errors.phone_number}
          />
          <DetailField
            label="Email"
            value={person.email}
            isEditing={isEditing}
            onChange={(text) => setEditForm({ ...editForm, email: text })}
            editValue={editForm.email}
            keyboardType="email-address"
            error={errors.email}
          />
          <DetailField
            label="City of Origin"
            value={person.city_of_origin}
            isEditing={isEditing}
            onChange={(text) => setEditForm({ ...editForm, city_of_origin: text })}
            editValue={editForm.city_of_origin}
          />
          <DetailField
            label="Date of Birth"
            value={person.date_of_birth}
            isEditing={isEditing}
            onChange={(text) => setEditForm({ ...editForm, date_of_birth: text })}
            editValue={editForm.date_of_birth}
            error={errors.date_of_birth}
          />
          <DetailField
            label="Religion"
            value={person.religion}
            isEditing={isEditing}
            onChange={(text) => setEditForm({ ...editForm, religion: text })}
            editValue={editForm.religion}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailField = ({ label, value, isEditing, onChange, editValue, keyboardType = 'default', error }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {isEditing ? (
      <>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={editValue || ''}
          onChangeText={onChange}
          keyboardType={keyboardType}
          placeholder={`Enter ${label.replace(' *', '')}`}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </>
    ) : (
      <Text style={value ? styles.value : styles.valueNotProvided}>{value || 'Not provided'}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 12,
    paddingTop: 6,
    zIndex: 1,
  },
  editButton: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  valueNotProvided: {
    fontSize: 16,
    color: '#AAA',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
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
});