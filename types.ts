
export interface Lead {
  id: string;
  name: string;
  propertyType: string;
  sentiment: 'Hot' | 'Warm' | 'Neutral' | 'Cold';
  lastMessage: string;
  timeAgo: string;
  qualificationScore: number;
  caslVerified: boolean;
  phone: string;
  email: string;
}

export interface Stats {
  gciProtected: string;
  activeConversations: number;
  responseSpeed: string;
  mctbEfficiency: number;
}

export enum ViewState {
  INSIGHTS = 'insights',
  VAULT = 'vault',
  RESULTS = 'results',
  SETTINGS = 'settings'
}
