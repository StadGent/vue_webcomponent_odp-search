import { Row } from '@/types/row'

export interface Dataset {
  nhits: number;
  parameters: { [key: string]: string };
  records: {
    fields: Row;
  }[];
}
