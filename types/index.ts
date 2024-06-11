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

export type lesson = {
  term_node_tid: string;
  draggableviews: string;
  view_node: string;
  title: string;
  field_subject_of_lesson: string;
  field_completed: string;
  nid: string;
};

export type listOfLessons = lesson[];

export type node = {
  jsonapi: Jsonapi;
  data: Data;
  links: Links;
  included: Included;
}
export type Jsonapi = {
  version: string;
  meta: Meta;
  individual: string;
  resourceName: string;
  pathPrefix: string;
  basePath: string;
  entryPoint: string;
}

export type Deprecated = { 
  "jsonapi.pathPrefix": string;
}

export type PathDetails = { 
  resolved: string;
  isHomePath: boolean;
  entity: Entity;
  label: string;
  jsonapi: Jsonapi;
  meta: Meta;
}






export type Meta = {
  links: Links;
  target_revision_id: number;
  drupal_internal__target_id: number;
  alt: string;
  title: string;
  width: number;
  height: number;
  deprecated: Deprecated;
}

export type Entity = {
  canonical: string;
  type: string;
  bundle: string;
  id: string;
  uuid: string;
}

export interface paragraphProps {
  data: {
    type: string;
    id: string;
    links: Links;
    attributes: Attributes;
    relationships: Relationships; }
  index: number;
  included: Included;
}

export type Links = {
  self: href;
  related: href;
}
export type href = {
  href: string;
}
export type FieldImage = {
  data: Data;
  links: Links;
}

export type Parent = {
  data: Data[];
  links: Links;
}

export type Data = {
  type: string;
  id: string;
  links: Links;
  attributes: Attributes;
  relationships: Relationships;
  meta: Meta;
}

export type field_text = {
  value: string;
  format: string;
  processed: string;
}

export type uri = {
  value: string;
  url: string;
}

export type Attributes = {
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
  parent_id: string;
  parent_type: string;
  default_langcode: boolean;
  parent_field_name: string;
  behavior_settings: any[];
  revision_translation_affected: boolean;
  path: Path;
  body: Body;
  field_text: field_text;
  filename: string;
  uri: uri;
}
export type Path = {
  alias: string;
  pid: number;
  langcode: string;
}
export type Body = {
  value: string;
  format: string;
  processed: string;
  summary: string;
}

export type NodeType =  {
  data: Data;
  links: Links;
}

export type ParagraphType =  {
  data: Data;
  links: Links;
}

export type Vid =  {
  data: Data;
  links: Links;
}

export type Revision_user =  {
  data: Data;
  links: Links;
}



export type Relationships = {
  node_type: NodeType;
  revision_uid: RevisionUidOrUidOrFieldSubjectOfLesson;
  uid: RevisionUidOrUidOrFieldSubjectOfLesson;
  field_subject_of_lesson: RevisionUidOrUidOrFieldSubjectOfLesson;
  field_paragraph_lesson: RevisionUidOrUidOrFieldSubjectOfLesson;
  paragraph_type: ParagraphType;
  field_image: FieldImage;
  vid: Vid;
  revision_user: Revision_user;
  parent: Parent;
  links: Links;
}

export type IncludeItem = {
  type: string;
  id: string;
  links: Links;
  attributes: Attributes;
  relationships: Relationships;
}

export type Included = IncludeItem[]

//export type Included = IncludedObj[]

/*
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

export type Meta2 = {
  target_revision_id: number;
  drupal_internal__target_id: number;
}

export type Links1 = {
  related: SelfOrRelated;
  self: SelfOrRelated;
}
*/




export type RevisionUidOrUidOrFieldSubjectOfLesson = {
  data: Data;
  links: Links;
}

//End Node Lesson

//Breadcrumb
export interface BreadcrumbItem {
  breadcrumb: React.ElementType | string | null;
  path: string;
}
export interface Options {
  // disable all default generation of breadcrumbs
  disableDefaults?: boolean;
  // exclude certain paths fom generating breadcrumbs
  excludePaths?: string[];
  // optionally define a default formatter for generating breadcrumbs from URL segments
  defaultFormatter?: (arg0: string) => string;
}

export interface breadcrumbPath {
  path: string;
  breadcrumb: string;
}

//End Breadcrumb

export type lessonid = {
  field_lesson_ref: string;
  field_score: string;
  field_pass: string;
};