import React, { useState, useEffect, useRef } from 'react';
import { Service, Quantities } from '../types';
import ContactForm from './ContactForm';

interface PriceResultDisplayProps {
  quantities: Quantities;
  services: Service[];
}

const easeOutCubic = (t: number): number => --t * t * t + 1;

const useAnimatedCounter = (endValue: number, duration: number = 500) => {
  const [animatedValue, setAnimatedValue] = useState(endValue);
  const startValueRef = useRef(endValue);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = startValueRef.current;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedValue(endValue);
        startValueRef.current = endValue;
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startValueRef.current = endValue;
    };
  }, [endValue, duration]);

  return animatedValue;
};

const AnimatedNumber: React.FC<{ value: number; formatter: (val: number) => string; }> = ({ value, formatter }) => {
  const animatedValue = useAnimatedCounter(value, 500);
  return <>{formatter(animatedValue)}</>;
};

const PriceResultDisplay: React.FC<PriceResultDisplayProps> = ({ quantities, services }) => {
  const [showForm, setShowForm] = useState(false);

  const lineItems = services
    .map(service => ({
      ...service,
      quantity: quantities[service.id],
      subtotal: quantities[service.id] * service.price,
    }))
    .filter(item => item.quantity > 0);

  const total = lineItems.reduce((acc, item) => acc + item.subtotal, 0);

  useEffect(() => {
    // If the total becomes 0, hide the form.
    if (total === 0) {
      setShowForm(false);
    }
  }, [total]);

  if (total === 0) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400 py-8 px-6 bg-white dark:bg-slate-800 rounded-lg mt-6 border border-slate-200 dark:border-slate-700">
        <p className="font-medium">Your quote will appear here.</p>
        <p className="text-sm">Add one or more services to see the estimated cost.</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
  }

  return (
    <div className="mt-6 animate-fade-in bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Your Quote</h3>
      <div className="space-y-3">
        {lineItems.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm">
                <p className="text-slate-600 dark:text-slate-300">
                    {item.name} <span className="text-slate-400 dark:text-slate-500">({item.quantity} x {formatCurrency(item.price)})</span>
                </p>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  <AnimatedNumber value={item.subtotal} formatter={formatCurrency} />
                </p>
            </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <p className="text-base font-bold text-slate-900 dark:text-white">Total Estimate</p>
        <p className="text-2xl font-bold text-[#008000] dark:text-green-400">
          <AnimatedNumber value={total} formatter={formatCurrency} />
        </p>
      </div>
      
      {!showForm ? (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition"
            aria-label="Proceed to enter contact details"
          >
            Let's Chat!
          </button>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            This isn't a commitment, it's just so I can contact you about your quote.
          </p>
        </div>
      ) : (
        <ContactForm lineItems={lineItems} total={total} />
      )}
    </div>
  );
};

export default PriceResultDisplay;