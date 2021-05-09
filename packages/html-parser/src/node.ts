import { ElementType } from 'domelementtype';
import {ProcessingInstruction, isText, isComment, isTag, isCDATA, isDocument, isDirective, NodeWithChildren, Text, Node, Comment, Element, Document } from 'domhandler';

import { interpolate } from './template';

import * as logger from './logger';
import { assert } from 'console';

async function getElement(node: Element, children: Node[], components: Map<string, any>, params: Record<string, any>, slot: Node[]) {
  const cls = components?.get(node.name)
  
  if (cls) {
    const instance = new cls();
    const replacement = await instance.compile({ ...node.attribs }, children);
    return replacement
  } else if (node.name === 'slot') {
    const replacement = await cloneChildren(slot, components, params, slot)
    assert(replacement.length == 1)
    return replacement[0]
  } else {
    return new Element(node.name, { ...node.attribs }, children); 
  }
}


export async function traverseNode<T extends Node>(node: T, components: Map<string, any>, params: Record<string, any> = {}, slot: Node[] = []): Promise<T> {
  let result: Node;

  if (isText(node)) {
    result = new Text(params ? interpolate(node.data, params) : node.data);
  } else if (isComment(node)) {
    result = new Comment(node.data);
  } else if (isTag(node)) {
    
    const children = await cloneChildren(node.children, components, params, slot);
    const clone = await getElement(node, children, components, params, slot);
    children.forEach((child) => (child.parent = clone));

    // if (node["x-attribsNamespace"]) {
    //     clone["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
    // }
    // if (node["x-attribsPrefix"]) {
    //     clone["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
    // }
    

    result = clone;
  } else if (isCDATA(node)) {
    const children = await cloneChildren(node.children, components, params, slot);
    const clone = new NodeWithChildren(ElementType.CDATA, children);
    children.forEach((child) => (child.parent = clone));
    result = clone;
  } else if (isDocument(node)) {
    const children = await cloneChildren(node.children, components, params, slot);
    const clone = new Document(children);
    children.forEach((child) => (child.parent = clone));

    // if (node["x-mode"]) {
    //     clone["x-mode"] = node["x-mode"];
    // }

    result = clone;
  } else if (isDirective(node)) {
    const instruction = new ProcessingInstruction(node.name, node.data);

    // if (node["x-name"] != null) {
    //     instruction["x-name"] = node["x-name"];
    //     instruction["x-publicId"] = node["x-publicId"];
    //     instruction["x-systemId"] = node["x-systemId"];
    // }

    result = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node.type}`);
  }

  result.startIndex = node.startIndex;
  result.endIndex = node.endIndex;
  return result as T;
}

async function cloneChildren(childs: Node[], components: Map<string, any>, params: Record<string, any>, slot: Node[]): Promise<Node[]> {
  const children =  await Promise.all(childs.map(async (child) => {
    return traverseNode(child, components, params, slot)
  }));

  for (let i = 1; i < children.length; i++) {
      children[i].prev = children[i - 1];
      children[i - 1].next = children[i];
  }

  return children;
}
