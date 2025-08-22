export interface Service {
  id: 'design' | 'email' | 'video';
  name: string;
  price: number;
  description: string;
}

export interface Quantities {
  design: number;
  email: number;
  video: number;
}