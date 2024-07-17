import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert/Alert';
import { OverridableStringUnion } from '@mui/types';
import { UUID } from 'crypto';
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
  field_image_styles: ObjectFit;
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

export enum Role {
  authenticated = "authenticated",
  administrator = "administrator",
  student = "student",
  teacher = "teacher",
}

export type Roles = Role[]

export type CurrentUser = {
  uid: string;
  roles: Roles;
  name: string;
}

export type UserAccount = {
  current_user: CurrentUser;
  csrf_token: string;
  logout_token: string;
}

export enum ObjectFit {
  contain = "contain",
  cover = "cover",
  fill = "fill",
  none = "none",
  "scale-down" = "scale-down",
  inherit = "inherit",
  initial = "initial",
  revert = "revert",
  "revert-layer" = "revert",
  unset= "unset"
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

export type Default_langcodes = Default_langcode[];

export type Default_langcode = {
  value: boolean;
};
export type Field_registered_lesson = {
  target_id: number;
  target_type: string;
  target_uuid: string;
  url: string;
};

export type Field_registered_lessons = Field_registered_lesson[];

export type AccountRole = {
  target_id: string;
  target_type: string;
  target_uuid: string;
};

export type Token = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type AccountRoles = AccountRole[];

export type StringObject = {
  value: string;
};



export type AccountInit = StringObject[];
export type Mail = StringObject[];
export type Name = StringObject[];
export type Preferred_admin_langcode = StringObject[];
export type Preferred_langcode = StringObject[];
export type Langcode = StringObject[];
export type Useruid = StringObject[];

export type NumberObject = {
  value: string;
};
export type Uid = NumberObject[];

export type Timestamp = {
  value: string;
  format: string;
};

export type Login = Timestamp[];
export type Access = Timestamp[];
export type Changed = Timestamp[];
export type Created = Timestamp[];
export type Timezone = Timestamp[];

export type OneStatus = {
  value: boolean;
};

export type Status = OneStatus[];

export type Picture = {
  target_id: number;
  alt: string;
  title: string;
  width: number;
  height: number;
  target_type: string;
  target_uuid: string;
  url: string
};

export type UserAccountDetails = {
  uid: Uid;
  uuid: Useruid;
  langcode: Langcode;
  preferred_langcode: Preferred_langcode;
  preferred_admin_langcode: Preferred_admin_langcode;
  name: Name;
  mail: Mail;
  timezone: Timezone;
  status: Status;
  created: Created;
  change: Changed;
  access: Access;
  login: Login;
  init: AccountInit;
  roles: AccountRoles;
  default_langcode: Default_langcodes;
  path: Path;
  field_registered_lesson: Field_registered_lessons;
  user_picture: Picture[];
}

export type userinfo = {
  sub: string;
  name: string;
  preferred_username: string;
  email: string;
  email_verified: boolean;
  profile: string;
  locale: string;
  zoneinfo: string;
  updated_at: number;
  roles: string[];
}

export type AccountCredentials = {
  email: string;
  password: string;
};

export type AccountResetCredentials = {
  name: string;
  temp_pass: string;
  new_pass: string;
};


export type alertType = {
  severity?: AlertColor;
  message: string;
};