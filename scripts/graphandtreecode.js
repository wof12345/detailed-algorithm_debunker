function generateTreeStruct(nodesList, edgeList) {
  let nodes = new vis.DataSet(nodesList);

  let edges = new vis.DataSet(edgeList);
  //   console.log(edges);

  let container = document.getElementById("mynetwork");

  let data = {
    nodes: nodes,
    edges: edges,
  };
  let options = {};

  let network = new vis.Network(container, data, options);
}

// let nodes = [
//   { id: 1, label: "Node 1" },
//   { id: 2, label: "Node 2" },
//   { id: 3, label: "Node 3" },
//   { id: 4, label: "Node 4" },
//   { id: 5, label: "Node 5" },
// ];

// let edges = [
//   { from: 1, to: 3 },
//   { from: 1, to: 5 },
//   { from: 2, to: 4 },
//   { from: 2, to: 5 },
// ];

// generateTreeStruct(nodes, edges);
