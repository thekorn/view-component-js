import { ElementType } from 'domelementtype';
import {ProcessingInstruction, isText, isComment, isTag, isCDATA, isDocument, isDirective, NodeWithChildren, Text, Node, Comment, Element, Document } from 'domhandler';

async function getElement(name: string, attribs: any, children: Node[], components: Map<string, any>) {
  const cls = components?.get(name)
  if (cls) {
    const instance = new cls();
    const replacement = await instance.compile();
    return replacement
  } else {
    return new Element(name, { ...attribs }, children); 
  }
}


export async function traverseNode<T extends Node>(node: T, components: Map<string, any>): Promise<T> {
  let result: Node;

  if (isText(node)) {
      result = new Text(node.data);
  } else if (isComment(node)) {
      result = new Comment(node.data);
  } else if (isTag(node)) {
      const children = await cloneChildren(node.children, components);
      const clone = await getElement(node.name, { ...node.attribs }, children, components);
      children.forEach((child) => (child.parent = clone));

      // if (node["x-attribsNamespace"]) {
      //     clone["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
      // }
      // if (node["x-attribsPrefix"]) {
      //     clone["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
      // }

      result = clone;
  } else if (isCDATA(node)) {
      const children = await cloneChildren(node.children, components);
      const clone = new NodeWithChildren(ElementType.CDATA, children);
      children.forEach((child) => (child.parent = clone));
      result = clone;
  } else if (isDocument(node)) {
      const children = await cloneChildren(node.children, components);
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

async function cloneChildren(childs: Node[], components: Map<string, any>): Promise<Node[]> {
  const children =  await Promise.all(childs.map(async (child) => {
    return traverseNode(child, components)
  }));

  for (let i = 1; i < children.length; i++) {
      children[i].prev = children[i - 1];
      children[i - 1].next = children[i];
  }

  return children;
}
