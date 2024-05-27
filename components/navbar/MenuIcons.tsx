import React, { createElement } from "react";
import { DocumentTextIcon,UserGroupIcon } from "../icons";

type TIcons = { [key: string]:  (props: React.ComponentProps<'svg'>) => JSX.Element};

const IconComponents:TIcons = {
  Default: DocumentTextIcon,
  DocumentText: DocumentTextIcon,
  UserGroup:UserGroupIcon
};

export function MenuIcons(props: { name: string; className?: string }) {
  const { name, className: overrides } = props;
  const className = [""].concat(overrides?.split(" ") || []).join(" ");
  if(name in IconComponents){
    let icon = IconComponents[name];
    return createElement(icon, { className });
  }else{
    let icon = IconComponents["Default"];
    return createElement(icon, { className });
  }
}
