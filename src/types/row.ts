import { Teaser } from '@/types/teaser'

export interface Row extends Teaser {
  beschrijving?: string;
  postcode?: string;
  gemeente?: string;
  coordinates?: string;
  website?: string;
  image_url?: string;
}
