import { Node, Edge } from 'reactflow';
import { MCPNodeData } from '@/types/mcp';

export function exportToJSON(nodes: Node<MCPNodeData>[], edges: Edge[]): string {
    const data = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        nodes,
        edges,
    };
    return JSON.stringify(data, null, 2);
}

export function exportToMarkdown(nodes: Node<MCPNodeData>[], edges: Edge[]): string {
    const sortedNodes = topologicalSort(nodes, edges);

    let markdown = `# MCP Workflow Report\n\n`;
    markdown += `생성 일시: ${new Date().toLocaleString('ko-KR')}\n\n`;
    markdown += `---\n\n`;

    // Summary
    markdown += `## 📊 요약\n\n`;
    markdown += `- 총 노드 수: ${nodes.length}\n`;
    markdown += `- 총 연결 수: ${edges.length}\n`;
    markdown += `- 완료된 노드: ${nodes.filter(n => n.data.status === 'success').length}\n\n`;
    markdown += `---\n\n`;

    // Workflow Details
    markdown += `## 🔄 워크플로우 상세\n\n`;

    sortedNodes.forEach((node, index) => {
        const weekEmoji = ['🎯', '🏗️', '📋', '🚀'][node.data.category === 'strategy' ? 0 :
            node.data.category === 'structure' ? 1 :
                node.data.category === 'resource' ? 2 : 3];

        markdown += `### ${index + 1}. ${weekEmoji} ${node.data.label}\n\n`;
        markdown += `**설명:** ${node.data.description}\n\n`;

        if (node.data.inputs.userPrompt) {
            markdown += `**입력:**\n\`\`\`\n${node.data.inputs.userPrompt}\n\`\`\`\n\n`;
        }

        if (node.data.inputs.upstreamData) {
            markdown += `**이전 단계 데이터:**\n\n`;
            markdown += `> 이전 노드의 출력을 입력으로 받았습니다.\n\n`;
        }

        if (node.data.outputResult) {
            markdown += `**결과:**\n\n`;
            markdown += `${node.data.outputResult}\n\n`;
        } else {
            markdown += `**결과:** ⚠️ 미실행\n\n`;
        }

        markdown += `---\n\n`;
    });

    return markdown;
}

function topologicalSort(nodes: Node<MCPNodeData>[], edges: Edge[]): Node<MCPNodeData>[] {
    const adjacencyList: { [key: string]: string[] } = {};
    const inDegree: { [key: string]: number } = {};

    // Initialize
    nodes.forEach(node => {
        adjacencyList[node.id] = [];
        inDegree[node.id] = 0;
    });

    // Build graph
    edges.forEach(edge => {
        adjacencyList[edge.source].push(edge.target);
        inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
    });

    // Find nodes with no incoming edges
    const queue: string[] = [];
    Object.keys(inDegree).forEach(nodeId => {
        if (inDegree[nodeId] === 0) {
            queue.push(nodeId);
        }
    });

    // Topological sort
    const sorted: string[] = [];
    while (queue.length > 0) {
        const current = queue.shift()!;
        sorted.push(current);

        adjacencyList[current].forEach(neighbor => {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        });
    }

    // Return nodes in sorted order (fallback to original order if cycle detected)
    if (sorted.length !== nodes.length) {
        return nodes;
    }

    return sorted.map(id => nodes.find(n => n.id === id)!).filter(Boolean);
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
