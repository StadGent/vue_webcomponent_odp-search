export interface FormField {
  type?: string;
  label: string;
  column: string;
  value?: string;
  options: [Option | string];
}

export interface Option {
  name: string;
  value: string;
}
