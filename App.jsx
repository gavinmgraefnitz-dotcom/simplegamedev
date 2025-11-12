// File: App.jsx
import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 50, y: 50 }, data: { label: "🎮 Start Game" }, type: "input" },
];

const initialEdges = [];

const bubblePresets = [
  { label: "🎮 Start Game", type: "input" },
  { label: "🧍 Spawn Player", type: "default" },
  { label: "⌨️ On Key Press", type: "default" },
  { label: "👾 Spawn Enemy", type: "default" },
  { label: "💥 On Collision", type: "default" },
  { label: "❤️ Subtract Health", type: "default" },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addBubble = (label, type) => {
    setNodes((nds) => [
      ...nds,
      {
        id: (nds.length + 1).toString(),
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        data: { label },
        type,
      },
    ]);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-60 bg-gray-800 text-white p-3 flex flex-col gap-2">
        <h2 className="text-lg font-bold mb-2">Game Bubbles</h2>
        {bubblePresets.map((b) => (
          <button
            key={b.label}
            className="bg-blue-600 hover:bg-blue-500 rounded p-2 text-left"
            onClick={() => addBubble(b.label, b.type)}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-gray-100">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
