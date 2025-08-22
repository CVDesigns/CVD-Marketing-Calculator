import React, { useState } from 'react';
// CORRECTED IMPORTS: The curly braces have been removed from the component imports.
import PriceInputForm from './PriceInputForm';
import PriceResultDisplay from './PriceResultDisplay';
import ContactForm from './ContactForm';
import { CalculatorIcon } from './Icons'; // This one is correct as it's a named export

const SERVICES = [
  { id: 'design', name: 'Graphic Design', price: 75, description: 'social graphic' },
  { id: 'email', name: 'Email Campaign', price: 150, description: 'campaign' },
  { id: 'video', name: 'Video Production', price: 300, description: '15 second video' },
];

function App() {
  const [quantities, setQuantities] = useState({ design: 0, email: 0, video: 0 });
  const total = SERVICES.reduce((acc, service) => acc + (quantities[service.id] * service.price), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4 border border-blue-200 dark:border-blue-800">
            <CalculatorIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Marketing Media Custom Quote
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Get a custom quote for your marketing media needs.
          </p>
        </header>

        <main className="bg-[#fff7f7] dark:bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <PriceInputForm
            quantities={quantities}
            setQuantities={setQuantities}
            services={SERVICES}
          />
          <PriceResultDisplay quantities={quantities} services={SERVICES} />
        </main>

        {total > 0 && <ContactForm />}

        <footer className="text-center mt-8 text-sm text-slate-500 dark:text-slate-500">
          <p>This is a price estimate. Final costs may vary.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;