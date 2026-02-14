// AdapterMyStars.js
import React from 'react';
import ReactStars from 'react-stars';

export default function MyStars({ size = 24, value = 0, onChange }) {
  return <ReactStars size={size} value={value} onChange={onChange} />;
}
// This component is a simple wrapper around the ReactStars component
// It allows you to set a default size and value, and also pass an onChange handler
// You can customize the size and value by passing props when using this component
// Example usage: <MyStars size={30} value={4} onChange={(newValue) => console.log(newValue)} />