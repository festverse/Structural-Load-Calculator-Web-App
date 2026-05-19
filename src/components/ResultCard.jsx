import React from 'react';

const ResultCard = ({ results }) => {
  if (!results) return null;

  const cards = [
    {
      label: 'Dead Load Total',
      value: results.deadLoadTotal,
      color: 'bg-orange-100 border-orange-400',
      icon: '🏗️',
    },
    {
      label: 'Live Load Total',
      value: results.liveLoadTotal,
      color: 'bg-green-100 border-green-400',
      icon: '👥',
    },
    {
      label: 'Unfactored Total',
      value: results.unfactoredTotal,
      color: 'bg-blue-100 border-blue-400',
      icon: '📊',
    },
    {
      label: 'FactRequest timed out after 30000ms
