import React from 'react';
import { BrushIcon, MailIcon, VideoIcon } from './Icons';
import { Service, Quantities } from '../types';

const ICONS: { [key: string]: React.FC<{ className?: string }> } = {
  design: BrushIcon,
  email: MailIcon,
  video: VideoIcon,
};

interface ServiceRowProps {
  service: Service;
  quantity: number;
  onQuantityChange: (serviceId: Service['id'], value: number) => void;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ service, quantity, onQuantityChange }) => {
  const Icon = ICONS[service.id];
  const handleValueChange = (val: number) => {
    onQuantityChange(service.id, Math.max(0, val));
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg">
          <Icon className="h-6 w-6 text-slate-500 dark:text-slate-300" />
        </div>
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100">{service.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ${service.price} / {service.description}
          </p>
        </div>
      </div>
      <div className="flex w-40 items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handleValueChange(quantity - 1)}
          className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label={`Decrease ${service.name} quantity`}
        >
          -
        </button>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => handleValueChange(parseInt(e.target.value, 10) || 0)}
          className="w-16 h-10 text-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          aria-label={`${service.name} quantity`}
        />
        <button
          type="button"
          onClick={() => handleValueChange(quantity + 1)}
          className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label={`Increase ${service.name} quantity`}
        >
          +
        </button>
      </div>
    </div>
  );
};

interface PriceInputFormProps {
    quantities: Quantities;
    setQuantities: React.Dispatch<React.SetStateAction<Quantities>>;
    services: Service[];
}

const PriceInputForm: React.FC<PriceInputFormProps> = ({
  quantities,
  setQuantities,
  services,
}) => {
  const handleQuantityChange = (serviceId: Service['id'], value: number) => {
    setQuantities((prev) => ({ ...prev, [serviceId]: value }));
  };

  return (
    <div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Select Your Services</h2>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {services.map((service) => (
                <ServiceRow
                    key={service.id}
                    service={service}
                    quantity={quantities[service.id]}
                    onQuantityChange={handleQuantityChange}
                />
            ))}
        </div>
    </div>
  );
};

export default PriceInputForm;