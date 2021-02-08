export interface FormField {
  type?: string;
  label: string;
  column: string;
  value?: string;
  options: { name: string; value: string }[];
}
