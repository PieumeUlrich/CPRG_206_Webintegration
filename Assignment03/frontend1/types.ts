
export interface Trip {
  id: string;
  destination: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  category: string;
}

export interface Booking {
  id: string;
  tripName: string;
  customerName: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  amount: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Payment' | 'Refund';
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface SearchResult {
  name: string;
  description: string;
  priceEstimate: string;
  bestTimeToVisit: string;
  topActivities: string[];
}
