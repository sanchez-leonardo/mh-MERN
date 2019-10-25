import React from 'react';

export default function ListOfThings({ names }) {
  let listItems = names.map(item => <li key={item.id}>{item.name}</li>);

  return <ul>{listItems}</ul>;
}
