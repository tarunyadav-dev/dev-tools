# React Flow

React Flow is a React library for building interactive node-based editors, workflow builders, visual programming environments, AI agent pipelines, and graph applications.

It provides complete control over nodes, edges, viewport, interactions, and custom rendering while leaving business logic entirely to your application.

---

## Overview

React Flow is primarily a rendering engine.

It is responsible for:

- Rendering nodes
- Rendering edges
- Zooming
- Panning
- Selection
- Dragging
- Connection handling
- Viewport management

It is **not** responsible for:

- Saving graph data
- Business logic
- Database communication
- Authentication
- API calls

:::tip

Treat React Flow as the **View Layer** of your application.

Store nodes and edges inside Zustand, Redux, React Context, or another state management library.

:::

:::note

React Flow works exceptionally well with TypeScript because every node and edge can be strongly typed.

:::

:::success

For medium and large applications, separate rendering logic from graph business logic.

:::

---

## Installation

:::install

npm
npm install @xyflow/react

pnpm
pnpm add @xyflow/react

yarn
yarn add @xyflow/react

:::

---

## Basic Example

```tsx
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap
} from "@xyflow/react";

export default function Flow(){

    return(

        <div style={{height:"100vh"}}>

            <ReactFlow fitView>

                <Background />

                <MiniMap />

                <Controls />

            </ReactFlow>

        </div>

    );

}
```

---

## Folder Structure

:::tree

src/
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── FlowCanvas.tsx
│   ├── Sidebar.tsx
│   ├── Toolbar.tsx
│   └── CustomNode.tsx
├── hooks/
├── lib/
├── styles/
├── data/
└── types/

:::

---

## Why Use React Flow?

React Flow is useful whenever information can be represented as a graph.

Examples include:

- AI Workflow Builders
- Visual Programming
- State Machines
- Automation Pipelines
- BPMN Editors
- Mind Mapping Software
- Database Relationship Diagrams
- ETL Pipelines
- Dependency Graphs
- Neural Network Editors

---

## Core Components

### ReactFlow

The main canvas component.

Every graph is rendered inside this component.

### Background

Displays grid lines or dots behind the graph.

### Controls

Provides zoom controls.

### MiniMap

Displays a miniature overview of the graph.

---

## First Graph

```tsx
const nodes = [

    {
        id:"1",

        position:{
            x:100,
            y:100
        },

        data:{
            label:"Start"
        }

    }

];

const edges=[];

export default function App(){

    return(

        <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
        />

    );

}
```

---

## Node Model

Every node in React Flow requires three important properties:

| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique node identifier |
| position | XYPosition | Initial node position |
| data | object | Data passed to the custom node |

Optional properties include:

| Property | Description |
|----------|-------------|
| type | Custom node type |
| draggable | Enable dragging |
| selectable | Enable selection |
| hidden | Hide node |
| sourcePosition | Source handle position |
| targetPosition | Target handle position |

---

## Example Node

```tsx
const node = {

    id: "1",

    type: "default",

    position: {
        x: 150,
        y: 80
    },

    data: {
        label: "Chat Model"
    }

};
```

---

## Edge Model

Edges connect two nodes.

```tsx
const edge = {

    id: "e1",

    source: "1",

    target: "2",

    animated: true

};
```

---

## Common Props

| Prop | Type | Description |
|------|------|-------------|
| nodes | Node[] | Graph nodes |
| edges | Edge[] | Graph edges |
| fitView | boolean | Auto fit viewport |
| nodeTypes | object | Register custom nodes |
| edgeTypes | object | Register custom edges |
| defaultEdgeOptions | object | Global edge configuration |

---

## Important Events

| Event | Purpose |
|--------|----------|
| onConnect | Connect two nodes |
| onNodesChange | Node state updates |
| onEdgesChange | Edge state updates |
| onNodeClick | Handle node click |
| onEdgeClick | Handle edge click |
| onSelectionChange | Detect selection |

---

## React Hooks

React Flow provides useful hooks.

| Hook | Purpose |
|------|----------|
| useReactFlow | Access React Flow instance |
| useNodesState | Manage node state |
| useEdgesState | Manage edge state |
| useStore | Read internal store |
| useStoreApi | Access store API |

---

## State Management

For production projects avoid storing graph state inside individual node components.

Recommended options include:

- Zustand
- Redux Toolkit
- React Context
- Jotai

:::warning

Avoid recreating the entire nodes array during every render.

This causes unnecessary rerenders.

:::

---

## Custom Nodes

Register custom nodes using the `nodeTypes` property.

```tsx
import ChatNode from "./ChatNode";

const nodeTypes = {

    chat: ChatNode

};

<ReactFlow

    nodeTypes={nodeTypes}

    nodes={nodes}

    edges={edges}

/>
```

---

## Custom Edges

```tsx
import FloatingEdge from "./FloatingEdge";

const edgeTypes = {

    floating: FloatingEdge

};

<ReactFlow

    edgeTypes={edgeTypes}

    nodes={nodes}

    edges={edges}

/>
```

---

## Best Practices

- Use stable IDs.
- Memoize custom nodes.
- Split graph logic from rendering.
- Keep graph state outside React Flow.
- Lazy load heavy components.
- Separate reusable node components.

:::tip

Large applications should organize every custom node into its own folder.

:::

:::note

React Flow itself never stores your application data permanently.

:::

:::danger

Never mutate the nodes array directly.

Instead use immutable updates.

❌ Bad

```tsx
nodes.push(newNode);
```

✅ Good

```tsx
setNodes((nodes)=>[
    ...nodes,
    newNode
]);
```

:::

---

## Installation Guide

:::tabs

=== npm

```bash
npm install @xyflow/react
```

Recommended for standard Node.js projects.

=== pnpm

```bash
pnpm add @xyflow/react
```

Recommended for monorepos.

=== yarn

```bash
yarn add @xyflow/react
```

Recommended for existing Yarn projects.

:::

---

## Live Playground

:::playground

basic-flow

:::

---

## Interactive Demo

:::demo

basic-example

:::

---

## Embedded Component

:::component

FlowOverviewCard

:::

---

## Video Tutorial

:::video

https://www.youtube.com/watch?v=HyWYpM_S-2c

:::

---

## Playground Guide

The playground demonstrates the minimum configuration required to create an interactive React Flow canvas.

Inside the playground you can:

- Drag nodes
- Create new connections
- Delete selected nodes
- Zoom in
- Zoom out
- Pan around the canvas
- Inspect node data

Try modifying the node array and observe how React Flow updates the canvas automatically.

---

## Version

:::version

12.8.5

:::

---

## Difficulty

:::badge

Intermediate

:::

---

## Resources

:::resources

Official Documentation
https://reactflow.dev

Examples
https://reactflow.dev/examples

API Reference
https://reactflow.dev/api-reference/react-flow

GitHub Repository
https://github.com/xyflow/xyflow

Discord Community
https://discord.gg/RVmnytFmGW

NPM Package
https://www.npmjs.com/package/@xyflow/react

:::

---

## Related Libraries

:::related

lucide-react

zustand

framer-motion

react-hook-form

tailwind-css

nextjs

typescript

:::

---

## Keyboard Shortcuts

React Flow supports many common editor interactions.

| Shortcut | Description |
|----------|-------------|
| <kbd>Delete</kbd> | Delete selected nodes |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save workflow |
| <kbd>Ctrl</kbd> + <kbd>C</kbd> | Copy selection |
| <kbd>Ctrl</kbd> + <kbd>V</kbd> | Paste selection |
| Mouse Wheel | Zoom canvas |
| Middle Mouse | Pan viewport |

---

## Checklist

- [x] Install library
- [x] Render first graph
- [x] Create nodes
- [x] Create edges
- [x] Handle events
- [x] Register custom nodes
- [x] Register custom edges
- [ ] Undo / Redo
- [ ] Real-time collaboration
- [ ] Whiteboard features

---

## Internal References

Continue learning with these libraries.

- [Lucide React](lucide-react)
- [Zustand](zustand)
- [Next.js](nextjs)
- [Tailwind CSS](tailwind-css)
- [TypeScript](typescript)

---

## External References

Official Website

https://reactflow.dev

GitHub Repository

https://github.com/xyflow/xyflow

NPM Package

https://www.npmjs.com/package/@xyflow/react

---

## Common Errors

### Blank Canvas

The parent container must have a height.

```tsx
<div className="h-screen">

    <ReactFlow />

</div>
```

---

### Nodes Not Appearing

Verify every node has:

- id
- position
- data

```tsx
const node = {

    id:"1",

    position:{
        x:0,
        y:0
    },

    data:{
        label:"Hello"
    }

}
```

---

### Edges Not Rendering

Both source and target IDs must exist.

```tsx
const edge = {

    id:"e1",

    source:"1",

    target:"2"

}
```

---

### Performance Problems

Large applications should memoize custom node components.

```tsx
export default memo(ChatNode);
```

:::warning

Avoid generating random IDs inside render functions.

:::

:::tip

React.memo significantly improves rendering performance for large workflows.

:::

---

## API Overview

| Hook | Purpose |
|------|----------|
| useReactFlow | Access flow instance |
| useNodesState | Manage nodes |
| useEdgesState | Manage edges |
| useStore | Read internal store |
| useStoreApi | Access store API |

---

## Utility Functions

| Utility | Description |
|----------|-------------|
| addEdge | Create a new edge |
| applyNodeChanges | Update nodes |
| applyEdgeChanges | Update edges |
| getBezierPath | Create bezier edges |
| getStraightPath | Straight edges |
| getSmoothStepPath | Smooth edges |

---

> React Flow renders your graph. **Your application owns the graph.**

---

Use `useNodesState()` together with `useEdgesState()` for the quickest way to build a production-ready editor.

---

## Architecture

A recommended architecture is:

:::tree

src/
├── app/
├── components/
│   ├── nodes/
│   ├── edges/
│   ├── toolbar/
│   ├── sidebar/
│   └── minimap/
├── hooks/
├── services/
├── stores/
├── types/
├── utils/
└── data/

:::

---

## Recommended Project Structure

- Keep UI separate from graph logic.
- Keep node definitions inside a dedicated folder.
- Keep business logic inside services.
- Store graph state using Zustand.
- Keep utility functions reusable.

:::success

Following a clean architecture makes scaling React Flow projects much easier.

:::