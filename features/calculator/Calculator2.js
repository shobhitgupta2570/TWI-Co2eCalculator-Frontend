import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const VehicleNumberInput = () => {
  const [box1, setBox1] = useState('');
  const [box2, setBox2] = useState('');
  const [box3, setBox3] = useState('');
  
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  const handleBox1Change = (text) => {
    if (text.length <= 2) {
      setBox1(text);
      if (text.length === 2) {
        box2Ref.current.focus();
      }
    }
  };

  const handleBox2Change = (text) => {
    if (text.length <= 4) {
      setBox2(text);
      if (text.length === 4) {
        box3Ref.current.focus();
      }
    }
  };

  const handleBox3Change = (text) => {
    if (text.length <= 4) {
      setBox3(text);
    }
  };

  const handleBox3Blur = () => {
    const totalDigits = box1.length + box2.length + box3.length;
    if (totalDigits === 9) {
      const newBox2 = box2.slice(0, -1);
      const newBox3 = box2.slice(-1) + box3;
      setBox2(newBox2);
      setBox3(newBox3);
    }
  };

  return (
    <>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={box1}
        onChangeText={handleBox1Change}
        keyboardType="numeric"
        maxLength={2}
        ref={box1Ref}
      />
      <TextInput
        style={styles.input}
        value={box2}
        onChangeText={handleBox2Change}
        keyboardType="numeric"
        maxLength={4}
        ref={box2Ref}
      />
      <TextInput
        style={styles.input}
        value={box3}
        onChangeText={handleBox3Change}
        onBlur={handleBox3Blur}
        keyboardType="numeric"
        maxLength={4}
        ref={box3Ref}
      />
      
    </View>

    <View>
      <TextInput style={styles.input}></TextInput></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    width: '30%',
    borderWidth: 1,
    padding: 8,
    textAlign: 'center',
  },
});

export default VehicleNumberInput;

