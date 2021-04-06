A generic search component.
*please have a look at our demo's*

* [Full featured](./demo/full.html)
* [No images, no map](./demo/no-image.html)
* [Minimal](./demo/minimal.html)
* [Try it out with a real dataset](./demo/index.html)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## Properties

### Source

* type: String
* default: 'https://data.stad.gent/api/records/1.0/search/?dataset='

### dataset

* type: String
* *required: true*

### query

* type: String
* default: 'Inhoud'

Defines the label of the text input field.

### horizontal

* type: Boolean
* default: false

Determines if the teasers are rendered in a grid or as a stacked column.

### formFields

* type: Array as PropType<FormField[]>
* default: () => []

### sort

* type: String

### theme

type: String
default: 'cs--cyan'

## Events

This component throws events on filter and on opening a detail.  
These can be catched and passed on the Google Tag Manager.

[More information on passing custom events to GTM](https://www.simoahava.com/analytics/track-interactions-in-shadow-dom-google-tag-manager/)

For example:

```js
odpSearch.addEventListener('filter', sendToGTM)
odpSearch.addEventListener('detail', sendToGTM)

function sendToGTM(e) {
    if (window.dataLayers) {
      window.dataLayers.push({
        event: 'custom_event_' + e.type,
        custom_event: {
          detail: e.detail[0]
        }
      })
    }
}
```

## Types

### FormField 

```ts
export interface FormField {
  type?: string;
  label: string;
  column: string;
  value?: string;
  options: [{ name: string; value: string } | string];
}
```

### Return value of the source

```ts
export interface Dataset {
  nhits: number;
  parameters: { [key: string]: string };
  records: {
    fields: Row;
  }[];
}
```

### One row in the dataset

```ts
export interface Row {
  titel: string;
  beschrijving?: string;
  postcode?: string;
  gemeente?: string;
  coordinates?: string;
  website?: string;
  image_url?: string;
  teaser_text: string;
  teaser_img_url?: string;
  label_1?: string;
  label_2?: string;
  tag_1?: string;
  tag_2?: string;
  tag_3?: string;
  adres?: string;
  telefoon?: string;
  email?: string;
  lees_meer?: string;
}
```

**Coordinates are expected as comma separated string in  EPSG:3857 web-mercator** cfr: '410456.8852, 6633842.9202'  
**tag_1, tag_2 and tag_3 can be a comma separated strings, resulting in multiple tags per category**
