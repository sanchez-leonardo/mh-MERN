import React from 'react';

export default function AlternatingDiv({ show, message }) {
  return show ? <p>{message}</p> : null;
}
