"use client"

import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';





interface CheckResult {
  valid: boolean;
  message?: string;
}

interface CheckComponentProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}




const CheckComponent: FC<CheckComponentProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue || '');
  const [result, setResult] = useState<CheckResult | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setResult(undefined); // Clear previous result
  };

  const check = async () => {
    setIsChecking(true);
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://mailcheck.p.rapidapi.com/',
        params: {
          domain: value.includes('@') ? value.split('@')[1] : value, 
        },
        headers: {
          'X-RapidAPI-Key':'d2f3dc4321mshc24366b6a9d2bb6p1de96ejsn9c6813e944fc', 
          'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com',
        },
      });

      setResult({ valid: response.data.valid, message: response.data.message });
    } catch (error) {
      setResult({ valid: false, message: 'Error checking value' });
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (value) {
      check();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      {isChecking && <p>Checking...</p>}
      {result && (
        <p>
          {result.valid ? 'Valid' : 'Invalid'} {result.message && `(${result.message})`}
        </p>
      )}
      <button onClick={check} disabled={isChecking}>Check here if the link or e-mail is legit.</button>
    </div>
  );
};

export default CheckComponent;
