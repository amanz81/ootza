import 'next';

declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    // Add other properties as needed
  }
}