export interface InputElement extends HTMLInputElement {
  inputmask?: any
}

export interface TextAreaElement extends HTMLTextAreaElement {
  inputmask?: any
}

export type FormElm = InputElement | TextAreaElement;

export enum CheckType {
  Text = "text",
  Name = "name",
  Email = "email",
  Tel = "tel",
  Date = "date",
  DateFeedback = "date-feedback",
  Select = "select",
  DocumentSeries = "document-series",
  DocumentNumber = "document-number"
}

export enum MaskType {
  Name = "name",
  Email = "email",
  Tel = "tel",
  Date = "date",
  DocumentSeries = "document-series",
  DocumentNumber = "document-number",
  Cyrillic = "cyrillic"
}

export enum ValidationCSSClass {
  Success,
  Error
}
