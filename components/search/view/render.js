import React from 'react';
import { events } from '../component';

export default function render({ state }) {
  return (
    <div className="search">
      <input
        type="text"
        autoFocus="true"
        onChange={events.SEARCH_CHANGED}
        placeholder={state.placeholder}
        value={state.searchText}
      />
    </div>
  );
}
