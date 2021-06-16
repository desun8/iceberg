export interface InputElement extends HTMLInputElement {
  inputmask?: any
}

export interface TextAreaElement extends HTMLTextAreaElement {
  inputmask?: any
}

export type FormElm = InputElement | TextAreaElement;

export enum CheckType {
  Name = "name",
  Email = "email",
  Tel = "tel",
  Date = "date",
  Select = "select",
  DocumentSeries = "document-series",
  DocumentNumber = "document-number"
}

export enum MaskType {
  Name = "name",
  Email = "email",
  Tel = "tel",
  DocumentSeries = "document-series",
  DocumentNumber = "document-number",
  Cyrillic = "cyrillic"
}
