import {
    ReactElement,
    ReactPortal,
  } from 'react';
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode =
| ReactChild
| ReactFragment
| ReactPortal
| boolean
| null
| undefined;

export type ReactNodes = {
children: ReactNode;
};
//Node Lesson
export interface node_lesson {
  jsonapi: Jsonapi;
  data: Data;
  links: Links;
}
export interface Jsonapi {
  version: string;
  meta: Meta;
}
export interface Meta {
  links: Links;
}
export interface Links {
  self: SelfOrRelated;
}
export interface SelfOrRelated {
  href: string;
}
export interface Data {
  type: string;
  id: string;
  links: Links;
  attributes: Attributes;
  relationships: Relationships;
}
export interface Attributes {
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  revision_timestamp: string;
  revision_log?: null;
  status: boolean;
  title: string;
  created: string;
  changed: string;
  promote: boolean;
  sticky: boolean;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  path: Path;
  body: Body;
}
export interface Path {
  alias: string;
  pid: number;
  langcode: string;
}
export interface Body {
  value: string;
  format: string;
  processed: string;
  summary: string;
}
export interface Relationships {
  node_type: NodeType;
  revision_uid: RevisionUidOrUidOrFieldSubjectOfLesson;
  uid: RevisionUidOrUidOrFieldSubjectOfLesson;
  field_subject_of_lesson: RevisionUidOrUidOrFieldSubjectOfLesson;
}
export interface NodeType {
  data: Data1;
  links: Links1;
}
export interface Data1 {
  type: string;
  id: string;
  meta: Meta1;
}
export interface Meta1 {
  drupal_internal__target_id: string;
}
export interface Links1 {
  related: SelfOrRelated;
  self: SelfOrRelated;
}
export interface RevisionUidOrUidOrFieldSubjectOfLesson {
  data: Data2;
  links: Links1;
}
export interface Data2 {
  type: string;
  id: string;
  meta: Meta2;
}
export interface Meta2 {
  drupal_internal__target_id: number;
}
//End Node Lesson