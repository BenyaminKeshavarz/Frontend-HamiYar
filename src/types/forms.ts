/**
 * Form-related types and interfaces
 */

export interface Signature {
  title: string;
  name: string;
  imageUrl: string;
}

/**
 * Form state - represents the current state of a form
 */
export interface FormState {
  isSubmitted: boolean;
  isSubmitting: boolean;
  isFormValid: boolean;
  isPrintView: boolean;
}

/**
 * Form configuration - represents UI configuration for form display
 */
export interface FormConfig {
  showEditButton?: boolean;
  qrImageSrc?: string;
  signature?: Signature;
}
